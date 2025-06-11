# SBUpgradeContext

The `SBUpgradeContext` class encapsulates the context for an upgrade operation.

| **Property Name** | **Type** | **Description** |
|-|-|-|
| `findAuctionResult` | <code>[SBFindAuctionResult](object-model/sbfindauctionresult)?</code> | Result of a find auction operation in the context. |
| `selectedAirline` | <code>[SBAirline](object-model/sbairline)?</code> | The selected airline. |
| `selectedFlight` | <code>[SBFlight](object-model/sbflight)</code> | The selected flight from the selected airline. |
| `selectedPassengers` | <code>[[SBPassenger](object-model/sbpassenger)]</code> | Array of selected passengers for the upgrade. |
| `selectedUpgrade` | <code>[SBUpgrade](object-model/sbupgrade)</code> | The selected upgrade from the selected flight. |
| `upgradeOption` | `SBUpgradeOption` | The chosen upgrade option (.buynow, .auction, or .none). |
| `username` | `String` | Username of the user to be displayed on the leaderboard. |
