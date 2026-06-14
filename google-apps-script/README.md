# Contract reminder setup

1. Add `contract-reminders.gs` to the existing Bill Saver Apps Script project.
2. Run `ensureContractReminderHeaders()` once to append the reminder columns to the `Leads` sheet.
3. Add the administrator email under **Project Settings > Script Properties**:
   - Property: `BILL_SAVER_ADMIN_EMAIL`
   - Value: the email that should receive follow-up alerts
4. Create a daily time-driven trigger for `sendContractReminderAlerts`.

The reminder job emails the administrator only. It does not automatically email or text customers.
