# SBBid

The `SBBid` class represents a bid and stores some key attributes, including the bid amount, bidder's name, bid
outcome (winning or losing), bid type, and reason for bid losses.

| **Property Name** | **Type**                                               | **Description**                               |
|-------------------|--------------------------------------------------------|-----------------------------------------------|
| `amount`          | `Float`                                                | The monetary value of the bid.                |
| `name`            | `String`                                               | The name or identifier of the bidder.         |
| `winner`          | `Bool`                                                 | Indicates whether the bid is a winning bid.   |
| `bidType`         | <code>[SBBidType](object-model/sbbid#sbbidtype)</code> | The type of the bid.                          |
| `lossReason`      | `String`                                               | The reason for bid failure in case of a loss. |

## SBBidType

The `SBBidType` enum defines different types of bids.

| **Enum Case** | **Description**                                                         |
|---------------|-------------------------------------------------------------------------|
| `INITIAL_BID` | Represents an initial bid, made by the server when joining the auction. |
| `AUCTION_BID` | Represents a bid made by the user during the auction.                   |
| `FINAL_ROUND` | Represents a bid made by the user during the final round.               |
