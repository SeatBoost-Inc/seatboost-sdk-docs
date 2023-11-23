# SBUpgrade

The `SBUpgrade` class represents a seat upgrade on a flight.

| Property Name             | Type                                       | Description                                                                                                                                                         |
|---------------------------|--------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `auctionEndTimeUTC`       | `Date?`                                    | End time of the associated auction in Coordinated Universal Time (UTC).                                                                                             |
| `auctionId`               | `String`                                   | Identifier of the associated auction.                                                                                                                               |
| `auctionStartTimeUTC`     | `Date?`                                    | Start time of the associated auction in Coordinated Universal Time (UTC).                                                                                           |
| `authorizeOnJoin`         | `Int`                                      | Total amount to be authorized by the payment card when the user decides to join the auction. This value is composed by the `initialBid` and the `biddingBufferPct`. |
| `biddingBufferPct`        | `Int`                                      | Buffer percentage to be used in the payment's temporary hold.                                                                                                       |
| `code`                    | `String`                                   | Upgrade's seat class code.                                                                                                                                          |
| `description`             | `String`                                   | Detailed description of the upgrade.                                                                                                                                |
| `eligibilityErrorMessage` | `String`                                   | Error message related to eligibility for the upgrade.                                                                                                               |
| `initialBid`              | `Int`                                      | Initial bid amount to join the auction for the upgrade.                                                                                                             |
| `isBidder`                | `Bool?`                                    | Indicates whether the user is already a bidder in the auction for the upgrade.                                                                                      |
| `name`                    | `String`                                   | Upgrade's seat class name.                                                                                                                                          |
| `passengersRefNumbers`    | `[String]`                                 | Array of reference numbers for passengers eligible for the upgrade.                                                                                                 |
| `tips`                    | <code>[[SBTip](object-model/sbtip)]</code> | Array of tips associated with the upgrade.                                                                                                                          |
| `vatTax`                  | `Float`                                    | Value-added tax (VAT) tax for the upgrade.                                                                                                                          |
