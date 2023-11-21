# SBAuction

The `SBAuction` class extends the [`SBAuctionBase`](object-model/sbauctionbase) class and represents an auction.

| **Property Name** | **Type**                       | **Description** |
| ---|--------------------------------| --- |
| `status` | `String`                       | The status of the auction. |
| `awarded` | `Bool?`                        | Indicates whether the auction has been awarded. |
| `type` | `String`                       | The type or category of the auction. |
| `finalRoundSize` | `Int`                          | The size of the final round in the auction. |
| `finalRoundSeconds` | `Int`                          | The duration of the final round in seconds. |
| `finalRoundWarning` | `Int?`                         | Warning time for the final round, if applicable. |
| `initialBid` | `Int`                          | The initial bid amount for the auction. |
| `smallBid` | `Int`                          | The amount for a small bid in the auction. |
| `largeBid` | `Int`                          | The amount for a large bid in the auction. |
| `startTime` | `Date?`                        | The start time of the auction. |
| `endTime` | `Date?`                        | The end time of the auction. |
| `flightDetails` | `SBFlightDetails?`             | Details about the flight associated with the auction. |
| `bids` | <code>[[SBBid](object-model/sbbid)]</code> | An array of bids submitted for the auction. |
| `rewards` | `[SBReward]`                   | An array of rewards associated with the auction. |
| `messages` | `[SBMessage]`                  | An array of messages related to the auction. |
| `messageRotateTime` | `Int`                          | The time interval for rotating messages during the auction. |
| `upgradeMethod` | `String`                       | The method used for upgrades in the auction. |
| `numPassengers` | `Int`                          | The number of passengers eligible for the auction. |
| `winners` | `[SBWinner]`                   | An array of winners for the auction. |
| `buyNowVatTax` | `Float`                        | Value-added tax (VAT) tax for the buy-now option in the auction. |
