# SBAuctionBase

The `SBAuctionBase` class contains the base (or common) information for an auction, and it is extended by [`SBAuction`](object-model/sbauction) and [`SBCompletedAuction`](object-model/sbcompletedauction).

| **Property Name**          | **Type**                                      | **Description**                                                                                          |
|----------------------------|-----------------------------------------------|----------------------------------------------------------------------------------------------------------|
| `airlineCode`              | `String`                                      | The airline's [IATA](https://www.iata.org/) unique code.                                                 |
| `auctionId`                | `String`                                      | Identifier for the auction.                                                                              |
| `buyNowPrice`              | `Int`                                         | "Buy It Now" price for the auction.                                                                      |
| `currency`                 | `String`                                      | Currency used in the auction.                                                                            |
| `currencyPlusNMoney`       | `Int`                                         | TODO                                                                                                     |
| `currencySymbol`           | `String`                                      | Currency symbol, e.g., `$` , `€` , etc.                                                                  |
| `departureTimeUTC`         | `Date?`                                       | Flight's departure time in Coordinated Universal Time (UTC).                                             |
| `departureTimeLocal`       | `Date?`                                       | Flight's departure time in the timezone of the airport's city.                                           |
| `destination`              | `String`                                      | The [IATA](https://www.iata.org/) unique code of the destination airport.                                |
| `destinationCity`          | `String`                                      | City of the destination airport.                                                                         |
| `flightNumber`             | `String`                                      | Flight number associated with the auction.                                                               |
| `heldAmount`               | `Int?`                                        | The amount held on the credit card for the auction.                                                      |
| `myBid`                    | <code>[SBMyBid](object-model/sbmybid)?</code> | Bid information of the related user.                                                                     |
| `myUpgradeType`            | `Int`                                         | Type of auction upgrade. `1` if it is a regular auction upgrade, or `2` if it is a "bought now" upgrade. |
| `numWinners`               | `Int`                                         | TODO                              .                                                                      |
| `originalDepartureTimeUTC` | `Date?`                                       | Initial flight's departure time in UTC, before any delays have occurred.                                 |
| `origin`                   | `String`                                      | The [IATA](https://www.iata.org/) unique code of the origin airport.                                     |
| `originCity`               | `String`                                      | City of the origin airport.                                                                              |
| `upgradeClassCode`         | `String`                                      | Code representing the upgrade class.                                                                     |
| `upgradeClassName`         | `String`                                      | Name of the upgrade class.                                                                               |

