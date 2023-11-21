# SBAircraft

The `SBAuctionBase` class contains the base (or common) information for an auction, and it is extended by [`SBAuction`](object-model/sbauction) and [`SBCompletedAuction`](object-model/sbcompletedauction).

| **Property Name**          | **Type**                                      | **Description**                                                                                          |
|----------------------------|-----------------------------------------------|----------------------------------------------------------------------------------------------------------|
| `auctionId`                | `String`                                      | Identifier for the auction.                                                                              |
| `airlineCode`              | `String`                                      | The airline's [IATA](https://www.iata.org/) unique code.                                                 |
| `flightNumber`             | `String`                                      | Flight number associated with the auction.                                                               |
| `departureTimeUTC`         | `Date?`                                       | Flight's departure time in Coordinated Universal Time (UTC).                                             |
| `departureTimeLocal`       | `Date?`                                       | Flight's departure time in the timezone of the airport's city.                                           |
| `originalDepartureTimeUTC` | `Date?`                                       | Initial flight's departure time in UTC, before any delays have occurred.                                 |
| `origin`                   | `String`                                      | The [IATA](https://www.iata.org/) unique code of the origin airport.                                     |
| `originCity`               | `String`                                      | City of the origin airport.                                                                              |
| `destination`              | `String`                                      | The [IATA](https://www.iata.org/) unique code of the destination airport.                                |
| `destinationCity`          | `String`                                      | City of the destination airport.                                                                         |
| `upgradeClassCode`         | `String`                                      | Code representing the upgrade class.                                                                     |
| `upgradeClassName`         | `String`                                      | Name of the upgrade class.                                                                               |
| `myBid`                    | <code>[SBMyBid](object-model/sbmybid)?</code> | Bid information of the related user.                                                                     |
| `currencySymbol`           | `String`                                      | Currency symbol, e.g., `$` , `€` , etc.                                                                  |
| `currency`                 | `String`                                      | Currency used in the auction.                                                                            |
| `heldAmount`               | `Int?`                                        | The amount held on the credit card for the auction.                                                      |
| `myUpgradeType`            | `Int`                                         | Type of auction upgrade. `1` if it is a regular auction upgrade, or `2` if it is a "bought now" upgrade. |
| `buyNowPrice`              | `Int`                                         | "Buy It Now" price for the auction.                                                                      |
