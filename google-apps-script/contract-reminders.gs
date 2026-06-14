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

  const adminEmail = PropertiesService.getScriptProperties().getProperty("BILL_SAVER_ADMIN_EMAIL");
  if (!adminEmail) {
    throw new Error("Set BILL_SAVER_ADMIN_EMAIL in Apps Script project properties before enabling reminders.");
  }

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

    MailApp.sendEmail(adminEmail, "Bill Saver contract reminder due", body);
    sheet.getRange(rowIndex + 1, indexOf("reminder_sent") + 1).setValue(true);
    sheet.getRange(rowIndex + 1, indexOf("reminder_sent_at") + 1).setValue(new Date());
  }
}
