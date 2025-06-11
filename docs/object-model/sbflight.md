# SBFlight

The `SBFlight` class extends from <code>[[SBFlightInfo](object-model/sbflightinfo)]</code> and encapsulates information about a flight and its upgrades.

| **Property Name** | **Type** | **Description** |
|-|-|-|
| `aircraft` | `String?` | Flight's aircraft name. |
<!-- | `arrivalTimeUTC` | `Date?` | Arrival time in Coordinated Universal Time (UTC). | -->
| `currency` | `String` | Currency used in the auction. |
| `currencySymbol` | `String` | Currency symbol, e.g., `$` , `€` , etc. |
| `duration` | `String` | Duration of the flight. |
| `eligibilityErrorMessage` | `String` | Error message related to eligibility for upgrades. |
| `tips` | <code>[[SBTip](object-model/sbtip)]</code> | Array of tips associated with the flight. |
| `upgrades` | <code>[[SBUpgrade](object-model/sbupgrade)]</code> | Array of upgrades available for the flight. |
| `ssrs` | `String?` | Special Service Requests (SSRs) associated with the flight. |