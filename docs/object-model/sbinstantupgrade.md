# SBInstantUpgrade

The `SBInstantUpgrade` class represents an instant upgrade.

| **Property Name** | **Type** | **Description** |
|-|-|-|
| `amount` | `Float` | The amount paid for the instant upgrade. |
| `currency` | `String` | The currency code for the amount (e.g., "USD"). |
| `currencySymbol` | `String` | The currency symbol for the amount (e.g., "$"). |
| `flightInfo` | <code>[SBFlightInfo](object-model/sbflightinfo)</code> | Basic flight information for the upgraded flight. |
| `id` | `Int` | The unique identifier for the instant upgrade. |
| `potentialAuctionId` | `String` | An identifier for a potential auction this instant upgrade might be related to. |
| `upgradeClassCode` | `String` | The code for the upgraded class (e.g., "J"). |
| `upgradeClassName` | `String` | The display name of the upgraded class. |
| `upgrades` | <code>[[SBWinner](object-model/sbwinner)]</code> | An array of winner for this upgrade. |
