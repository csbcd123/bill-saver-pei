# Contract reminder setup

1. Add `contract-reminders.gs` to the existing Save My Bill Apps Script project.
2. Run `ensureContractReminderHeaders()` once to append the reminder columns to the `Leads` sheet.
3. Add the administrator email under **Project Settings > Script Properties**:
   - Property: `BILL_SAVER_ADMIN_EMAIL`
   - Value: the email that should receive follow-up alerts
4. Create a daily time-driven trigger for `sendContractReminderAlerts`.

The reminder job emails the administrator only. It does not automatically email or text customers.

## New lead email notifications

`contract-reminders.gs` also includes `sendLeadNotificationEmail(payload)`.

In the existing Apps Script Web App `doPost(e)` handler, call this function only after the lead has been successfully written to the `Leads` sheet:

```js
function doPost(e) {
  const payload = JSON.parse(e.postData.contents || "{}");

  // Existing logic:
  // 1. Ensure headers exist
  // 2. Append payload values to the Leads sheet

  sendLeadNotificationEmail(payload);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

By default, notification emails go to `savemybillpei@gmail.com`. To override this without changing code, set the Apps Script property:

- Property: `BILL_SAVER_ADMIN_EMAIL`
- Value: the email that should receive new lead notifications
