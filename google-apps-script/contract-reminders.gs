const CONTRACT_REMINDER_HEADERS = [
  "current_contract_status",
  "contract_end_date",
  "wants_contract_reminder",
  "reminder_days_before",
  "reminder_due_date",
  "reminder_sent",
  "reminder_sent_at",
  "consent_to_contact"
];

const BILL_SAVER_ADMIN_EMAIL_FALLBACK = "savemybillpei@gmail.com";

function getBillSaverAdminEmail() {
  return (
    PropertiesService.getScriptProperties().getProperty("BILL_SAVER_ADMIN_EMAIL") ||
    BILL_SAVER_ADMIN_EMAIL_FALLBACK
  );
}

function ensureContractReminderHeaders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
  if (!sheet) throw new Error('Sheet "Leads" was not found.');

  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const missingHeaders = CONTRACT_REMINDER_HEADERS.filter((header) => !headers.includes(header));

  if (missingHeaders.length) {
    sheet.getRange(1, lastColumn + 1, 1, missingHeaders.length).setValues([missingHeaders]);
  }
}

function sendContractReminderAlerts() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
  if (!sheet) throw new Error('Sheet "Leads" was not found.');

  const adminEmail = getBillSaverAdminEmail();

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return;

  const headers = values[0];
  const indexOf = (name) => headers.indexOf(name);
  const requiredHeaders = [
    "reminder_due_date",
    "reminder_sent",
    "reminder_sent_at",
    "wants_contract_reminder",
    "customer_name",
    "customer_phone",
    "customer_email",
    "contract_end_date",
    "current_provider",
    "service_type"
  ];

  if (requiredHeaders.some((header) => indexOf(header) < 0)) {
    throw new Error("The Leads sheet is missing one or more contract reminder headers.");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let rowIndex = 1; rowIndex < values.length; rowIndex += 1) {
    const row = values[rowIndex];
    const wantsReminder = String(row[indexOf("wants_contract_reminder")]).toLowerCase() === "true";
    const reminderSent = String(row[indexOf("reminder_sent")]).toLowerCase() === "true";
    const dueDateValue = row[indexOf("reminder_due_date")];

    if (!wantsReminder || reminderSent || !dueDateValue) continue;

    const dueDate = new Date(dueDateValue);
    dueDate.setHours(0, 0, 0, 0);
    if (Number.isNaN(dueDate.getTime()) || dueDate > today) continue;

    const body = [
      "A customer's contract reminder is due.",
      "",
      `Name: ${row[indexOf("customer_name")]}`,
      `Phone: ${row[indexOf("customer_phone")]}`,
      `Email: ${row[indexOf("customer_email")]}`,
      `Provider: ${row[indexOf("current_provider")]}`,
      `Service type: ${row[indexOf("service_type")]}`,
      `Contract end date: ${row[indexOf("contract_end_date")]}`
    ].join("\n");

    MailApp.sendEmail(adminEmail, "Save My Bill contract reminder due", body);
    sheet.getRange(rowIndex + 1, indexOf("reminder_sent") + 1).setValue(true);
    sheet.getRange(rowIndex + 1, indexOf("reminder_sent_at") + 1).setValue(new Date());
  }
}

function sendLeadNotificationEmail(payload) {
  const adminEmail = getBillSaverAdminEmail();
  const data = payload || {};
  const source = data.source || data.lead_source || "website_lead";
  const customerName = data.customer_name || data.name || "";
  const customerEmail = data.customer_email || data.email || "";
  const customerPhone = data.customer_phone || data.phone || "";
  const serviceType = data.service_type || "";
  const city = data.city_or_area || data.city || "";
  const provider = data.current_provider || "";
  const monthlyPrice = data.current_monthly_bill || data.monthly_price || "";
  const selectedOffer = data.selected_offer_name || data.top_recommendation_name || "";
  const selectedProvider = data.selected_offer_provider || data.top_recommendation_provider || "";
  const notes = data.customer_note || data.notes || "";
  const landingPage = data.landing_page || "";

  const subject =
    source === "weekly_offer_subscription"
      ? "Save My Bill weekly offer subscription"
      : "New Save My Bill PEI lead";

  const body = [
    "A new Save My Bill PEI submission was written to Google Sheets.",
    "",
    `Source: ${source}`,
    `Language: ${data.language || ""}`,
    `Name: ${customerName}`,
    `Email: ${customerEmail}`,
    `Phone: ${customerPhone}`,
    `Preferred contact: ${data.preferred_contact_method || data.preferred_contact || ""}`,
    `Service type: ${serviceType}`,
    `City / area: ${city}`,
    `Current provider: ${provider}`,
    `Current monthly bill: ${monthlyPrice}`,
    `Selected offer: ${[selectedProvider, selectedOffer].filter(Boolean).join(" - ")}`,
    `Estimated annual savings: ${data.selected_offer_estimated_annual_savings || data.top_recommendation_annual_savings || ""}`,
    `Contract status: ${data.current_contract_status || ""}`,
    `Contract end date: ${data.contract_end_date || ""}`,
    `Wants reminder: ${data.wants_contract_reminder || ""}`,
    `Notes: ${notes}`,
    `Landing page: ${landingPage}`,
    "",
    "This email was sent after the Apps Script Web App accepted the submission."
  ].join("\n");

  MailApp.sendEmail(adminEmail, subject, body);
}
