---
name: revenue-accounting-anomaly-detector
description: Scans historical and completed jobs to identify accounting errors, missing costs, or illogical profit margins.
---
# Revenue & Accounting Anomaly Detector

This skill acts as an automated financial auditor for BWS Lager. It helps ensure that your event accounting is accurate before exporting data for taxes or end-of-month reviews.

## Execution Steps

1. **Fetch Financial Data**
   - Retrieve all jobs that are marked as `COMPLETED` or have past dates.
   - Load the global `revenue-config` to understand standard company margins and staff rates.

2. **Audit Jobs**
   - Scan for jobs with high `revenue` but `0` internal or external costs (likely a forgotten entry).
   - Flag any job where the resulting `profitMargin` is negative (losing money on the job) or unusually high (e.g., > 95%), which might indicate missing expenses.
   - Check if any staff members have `0` logged hours on a massive production, or if total costs exceed a realistic threshold.

3. **Report Generation**
   - Output a list of "Flagged Jobs" requiring manual accounting review.
   - Include direct links to the job details or job form so the user can quickly jump in and correct the missing numbers.
