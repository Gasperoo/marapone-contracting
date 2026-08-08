# Data Pack Production Brief

**Purpose:** Right now, `/data-packs` sells six SKUs (five packs + the bundle) that have real pricing and real copy but no underlying file. This brief specifies exactly what file(s) to produce for each SKU so there's an actual asset to attach to checkout and email to a buyer.

**Scope confirmed:** real, jurisdiction-specific data exists across Canada, the US, and Europe. Every pack below should be built to that full scope — every buyer, regardless of whether they're in Ontario, Texas, or Germany, should receive a file with real data for their own jurisdiction, not a generic template with their region's numbers missing. Source of truth for all of it is what already exists in the product engines.

**Source of truth:** Per the Regions & Rate Packs page, Blueprint Auditor, SpecChecker, AI Estimator, Bid Leveler, and ScopeGuard already store their rates, code references, and trade knowledge as editable JSON data files rather than hardcoded logic, across all Canadian provinces/territories, all 50 US states, and the EU plus UK/Ireland. Every pack is an export/repackage job from that existing data — not new research, not new writing. Pull straight from the engine's data files for each jurisdiction.

**Standing rule regardless of scope:** every jurisdiction-specific number that ships in a paid file — a code reference, a tax rate, a permit fee — carries a source and a last-verified date in the file itself. That's not a hedge against the data being real; it's just good practice for anything a customer will rely on, and it makes it trivial to spot the (hopefully rare) case where a specific jurisdiction's entry in the engine is thinner than the rest, so it can get filled in before release rather than after a customer notices.

---

## Pack 1 — Building Code Compliance Library ($89)

**Deliverable:** `marapone-building-code-compliance-library.zip`

**Structure:**
```
/index.csv                      → jurisdiction, last_checked date, source
/START-HERE.pdf                 → how to use this, disclaimer
/canada/ontario/checklist.pdf
/canada/ontario/checklist.csv
/canada/british-columbia/checklist.pdf  ...one folder per province/territory
/usa/california/checklist.pdf   ...one folder per state
/eu/germany/checklist.pdf       ...one folder per EU country, plus /uk/ and /ireland/
```

**CSV columns:** `check_id, category, requirement, code_reference, section, plain_language_note, last_checked, source`

**Sourcing:** Export the code-check ruleset directly from Blueprint Auditor's existing per-jurisdiction data for every province/territory, state, and EU country plus UK/Ireland — the same data the engine runs against real drawings. Keep the category structure (means of egress, fire separation, accessibility, etc.) consistent across jurisdictions so the pack reads as one system, not 90 different documents.

**Disclaimer, every jurisdiction file, no exceptions:** "Reference material only — not a substitute for review by a licensed professional in your jurisdiction." This stays regardless of how deep the underlying data is; codes get amended, and a dated reference file should always say so.

---

## Pack 2 — Assembly Property Schema ($89)

**Deliverable:** `marapone-assembly-property-schema.zip`

**Structure:**
```
/north-america/csi-masterformat-assemblies.json
/north-america/csi-masterformat-assemblies.csv
/europe/en-eurocode-assemblies.json
/europe/en-eurocode-assemblies.csv
/schema-reference.pdf           → plain-language definition of each of the 27 properties
/README.md                      → explains the two standards are kept separate, not cross-mapped
```

**Sourcing:** Export both halves from SpecChecker's existing data — the CSI MasterFormat-aligned assemblies for North America and the EN/Eurocode-aligned assemblies for Europe. Keep the two standards in separate files rather than merging them into one "universal" schema; they're genuinely different classification systems, and a buyer using one shouldn't have to filter out the other.

---

## Pack 3 — Estimating Rate Pack, 2026 Edition ($99)

**Deliverable:** `marapone-estimating-rate-pack-2026.zip`

**Structure:**
```
/index.csv                      → jurisdiction, tax_type, rate, effective_date, source_url
/contingency-risk-framework.pdf → the 27-rule framework, written generically (not jurisdiction-bound)
/canada/[province]/rates.pdf
/usa/[state]/rates.pdf
/eu/[country]/rates.pdf
```

**Sourcing:** Export real, dated figures for every jurisdiction — GST/HST/PST for Canada, sales tax for every US state, VAT for every EU country, plus permits and development charges/impact fees wherever the engine has them. One thing worth building in regardless of data depth: permits and development charges are often set at the municipal level, so where the engine's data is state/province/country-level rather than city-level, say so explicitly in that jurisdiction's file ("state baseline shown; city-level permit fees vary — see [local authority]") rather than presenting a single number as if it applies everywhere in that jurisdiction. That's a formatting/precision detail, not a gap in the data.

**Versioning:** this is the one pack that goes stale on a clock. Re-release annually as a new dated SKU ("2027 Edition") rather than silently patching the 2026 file.

---

## Pack 4 — Bid-Leveling Template ($59)

**Deliverable:** `marapone-bid-leveling-template.xlsx` (primary file), plus `scope-checklist.csv` and `how-to-use.pdf`

**Structure (tabs in the .xlsx):**
- `Scope Checklist` — the 155 scope elements × 15 trade packages, exported from Bid Leveler's existing data.
- `Comparison Matrix` — blank, with formulas for entering multiple subcontractor quotes and flagging gaps against the checklist.
- `Region Notes` — plain-language notes on where North American and European tendering conventions differ (bonding norms, retainage vs. retention terminology, typical holdback periods).

---

## Pack 5 — Master Scope Requirement Checklist ($59)

**Deliverable:** `marapone-master-scope-checklist.pdf` and `.csv`, plus the same `region-notes.pdf` approach as Pack 4.

**Structure:** 215 requirements × 20 trade packages, each row tagged with its CSI code, exported from ScopeGuard's existing data.

---

## Bundle — The Full Data Pack Bundle ($349)

**Deliverable:** `marapone-full-data-pack-bundle.zip` containing the five deliverables above, unmodified, plus one `START-HERE.pdf` index explaining what's in each folder and linking back to each pack's own README.

---

## Production standards (apply to all six)

- **PDF template:** one consistent branded layout (logo, page numbers, footer disclaimer) reused across every pack — build it once.
- **CSV standard:** UTF-8, consistent header row, one schema per content type across all five packs.
- **Every jurisdiction-specific file carries its source and last-checked date**, visible in the file itself, not just the index.
- **No placeholder or lorem ipsum text ships in a paid file.**
- **QA pass before upload:** zip opens cleanly, file names match exactly what the product page promises, every jurisdiction listed on the sales page is actually present in the zip with real data in it.
- **Once built, upload each zip/file directly to whatever checkout platform ends up handling payment** — these files are the attachment that turns checkout from a contact form into an actual purchase.

## v1 scope

Build all six SKUs to full Canada / US / Europe coverage as specified above. The only per-jurisdiction exception is the municipal-level permit/development-charge precision note in Pack 3 — everything else ships as real, dated, sourced data for every included jurisdiction, matching exactly what the product page already claims.
