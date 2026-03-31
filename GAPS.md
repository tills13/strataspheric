# Strata Management Company - Feature Gap Analysis

Analysis of gaps from the perspective of a strata management company managing multiple stratas remotely.

---

## Critical Gaps

### 1. No Multi-Strata Portfolio View

The app is built around individual stratas. A management company needs a cross-strata dashboard — one login to see all their stratas, overdue invoices across the portfolio, upcoming meetings, pending approvals, etc. Right now they'd need to switch subdomains constantly.

### 2. No Work Order / Maintenance Request System

This is arguably the #1 daily workflow for remote strata managers. Owners submit maintenance requests (leaky pipe, broken gate), the manager triages, assigns contractors, tracks status, and closes. There's no ticket/work-order entity at all — the inbox system is flat messaging, not a structured workflow.

### 3. No Vendor/Contractor Management

No way to track preferred vendors, get quotes, assign work, or track contractor invoices vs. strata expenses. Remote managers coordinate heavily with trades and need this integrated.

### 4. No Financial Reporting or Budgeting

- No operating fund vs. contingency reserve fund tracking
- No budget creation or tracking against actuals
- No financial statements (income/expense reports, balance sheets)
- No levy/assessment calculation tools
- Invoices exist but there's no accounting layer underneath

### 5. No Compliance / Bylaw Management

- No bylaw document management with version history
- No violation tracking or infraction notices
- No compliance deadlines or regulatory reminders (e.g., AGM deadlines, insurance renewals, depreciation reports)

### 6. No Insurance Tracking

Strata managers track building insurance policies, renewal dates, claim history, and certificate distribution. Nothing here supports that.

---

## Significant Gaps

### 7. No Voting / Resolution System

AGMs and SGMs require formal voting (special resolutions, 3/4 votes, etc.). The meetings feature has agendas and minutes but no structured voting, quorum tracking, or proxy management.

### 8. No Unit/Lot Registry

There's no concept of "units" — just users with memberships. A strata manager needs to know unit numbers, entitlements (unit factors/shares), parking stalls, storage lockers, and which owner maps to which unit. This also drives levy calculations.

### 9. No Levy / Assessment Management

The biggest recurring financial task — calculating per-unit levies based on entitlements, generating bulk invoices, tracking arrears. The current invoice system is manual and one-at-a-time.

### 10. No Document Categorization Required by Legislation

Most jurisdictions require specific document categories (Form B certificates in BC, strata plans, engineering reports, depreciation reports). The files system is flat with no enforced taxonomy.

### 11. No Audit Trail / Activity History

There's a basic activity timeline, but no comprehensive audit log showing who changed what and when — critical for a management company proving they acted on behalf of the strata.

### 12. No Owner Portal vs. Manager Portal Distinction

The permission system has roles within a strata, but there's no concept of an external manager who isn't an owner but has admin access. A management company employee isn't an "Administrator" in the strata sense — they're a hired agent.

---

## Moderate Gaps

### 13. No Reporting / Export

No ability to generate PDF reports, export financials to CSV, or produce documents like Form B info certificates that managers regularly issue.

### 14. No Task / To-Do Management

Beyond meetings and inbox, managers need task tracking — follow-ups, deadlines, delegated items. No kanban or task system exists.

### 15. No Emergency Contact / After-Hours System

Remote managers need an emergency contact tree, building access codes, utility shutoff locations, and after-hours procedures per building.

### 16. No Communication Templates

Managers send repetitive notices (AGM notice, levy reminder, rule violation). No template system exists — every message is composed from scratch.

### 17. No Integration with Accounting Software

No export to Xero, QuickBooks, or MYOB — which is where most management companies actually run their books.

### 18. No Multi-User Management Company Accounts

No concept of a management company with multiple employees who each manage different stratas. No assignment, workload visibility, or handoff workflow.

---

## Priority Summary

| Priority | Feature | Why |
|----------|---------|-----|
| **P0** | Portfolio dashboard (cross-strata view) | Can't manage 50 stratas by switching subdomains |
| **P0** | Work orders / maintenance requests | Core daily workflow |
| **P0** | Unit registry with entitlements | Foundation for levies, voting, and compliance |
| **P0** | Manager role (external to strata) | Current roles assume strata members, not hired managers |
| **P1** | Levy calculation + bulk invoicing | Biggest recurring financial task |
| **P1** | Financial reporting + budgeting | Required by legislation in most jurisdictions |
| **P1** | Vendor management | Heavy daily coordination |
| **P1** | Voting / resolutions | Core governance requirement |
| **P2** | Compliance tracking + document taxonomy | Regulatory requirements |
| **P2** | Reporting / PDF export | Regular deliverable to strata councils |

---

The app has solid bones for communication, meetings, amenities, and basic invoicing. The biggest structural gap is that it's built around a single strata's self-management rather than an external company managing a portfolio of stratas. Bridging that requires the portfolio view, the manager role concept, and the unit registry as foundational pieces — most other features build on top of those.
