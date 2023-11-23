# SBUpgradeContext

The `SBUpgradeContext` class encapsulates the context for an upgrade operation.

| Property Name        | Type                                                                  | Description                                              |
|----------------------|-----------------------------------------------------------------------|----------------------------------------------------------|
| `selectedAirline`    | <code>[SBAirline](object-model/sbairline)?</code>                     | The selected airline.                                    |
| `findAuctionResult`  | <code>[SBFindAuctionResult](object-model/sbfindauctionresult)?</code> | Result of a find auction operation in the context.       |
| `selectedFlight`     | <code>[SBFlight](object-model/sbflight)</code>                        | The selected flight from the selected airline.           |
| `selectedUpgrade`    | <code>[SBUpgrade](object-model/sbupgrade)</code>                      | The selected upgrade from the selected flight.           |
| `selectedPassengers` | <code>[[SBPassenger](object-model/sbpassenger)]</code>                | Array of selected passengers for the upgrade.            |
| `username`           | `String`                                                              | Username of the user to be displayed on the leaderboard. |
