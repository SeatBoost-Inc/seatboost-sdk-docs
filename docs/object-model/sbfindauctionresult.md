# SBFindAuctionResult

The `SBFindAuctionResult` class represents the result of a lookup operation for a Passenger Name Record (PNR).
It is referenced by [`SBUpgradeContext`](object-model/sbupgradecontext).

| Property Name         | Type                                                   | Description                                                                                    |
|-----------------------|--------------------------------------------------------|------------------------------------------------------------------------------------------------|
| `confirmationNumber`  | `String`                                               | Passenger Name Record (PNR).                                                                   |
| `requireBlockBidding` | `Bool`                                                 | Indicates whether the user needs to include all related passengers to proceed with an upgrade. |
| `pnrIneligible`       | `Bool`                                                 | Indicates if the PNR is ineligible to an upgrade.                                              |
| `flights`             | <code>[[SBFlight](object-model/sbflight)]</code>       | Array of flights associated with the PNR.                                                      |
| `passengers`          | <code>[[SBPassenger](object-model/sbpassenger)]</code> | Array of passengers associated with PNR.                                                       |
