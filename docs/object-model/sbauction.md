# SBAuction

The `SBAuction` class extends the [`SBAuctionBase`](object-model/sbauctionbase) class and represents an auction.

| **Property Name** | **Type** | **Description** |
|-|-|-|
| `awarded` | `Bool?` | Indicates whether the auction has been awarded. |
| `bids` | <code>[[SBBid](object-model/sbbid)]</code> | An array of bids submitted for the auction. |
| `buyNowVatTax` | `Float` | Value-added tax (VAT) tax for the buy-now option in the auction. |
| `confirmationNumber` | `String` | Value-added tax (VAT) tax for the buy-now option in the auction. |
| `finalRoundSize` | `Int` | The size of the final round in the auction. |
| `finalRoundSeconds` | `Int` | The duration of the final round in seconds. |
| `finalRoundWarning` | `Int?` | Warning time for the final round, if applicable. |
| `flightDetails` | <code>[SBFlightDetails](object-model/sbflightdetails)?</code> | Details about the flight associated with the auction. |
| `endTime` | `Date?` | The end time of the auction. |
| `haulType` | <code>[SBHaulType](object-model/sbhaultype)?</code> | The haul type of the flight. |
| `initialBid` | `Int` | The initial bid amount for the auction. |
| `largeBid` | `Int` | The amount for a large bid in the auction. |
| `messages` | <code>[[SBMessage](object-model/sbmessage)]</code> | An array of messages to be displayed on a carousel in the live auction screen. |
| `messageRotateTime` | `Int` | The time interval for rotating messages during the auction. |
| `numPassengers` | `Int` | The number of passengers eligible for the auction. |
| `rewards` | <code>[[SBReward](object-model/sbreward)]</code> | An array of rewards associated with the auction. |
| `smallBid` | `Int` | The amount for a small bid in the auction. |
| `startTime` | `Date?` | The start time of the auction. |
| `status` | `String` | The status of the auction. |
| `type` | `String` | The type or category of the auction. |
| `upgradeMethod` | `String` | The method used for upgrades in the auction. |
| `winners` | <code>[[SBWinner](object-model/sbwinner)]</code> | An array of boarding passes for the authenticated user in the auction. |
