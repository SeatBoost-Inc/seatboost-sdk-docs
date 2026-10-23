# Bidding Screen

> This screen is used to facilitate a competitive bidding process among passengers who are interested in securing a better seat or an upgraded class for their upcoming flights. The purpose of this screen is to allow passengers to bid monetary amounts in an attempt to secure a higher class of service, such as moving from economy to business class. This screen is pretty intuitive and the user should intercat with the paddles in order to increment their current bid amount.

<table width="100%" style="border-collapse: collapse; border: none;">
    <tr valign="top">
        <td width="25%">
            <img src="ui/images/bidding.png"/>
        </td>
        <td width="70%">
            <p>A leaderboard displaying the bidder display names and their corresponding current bid amounts.</p>
            <p>A button to buy an instant upgrade.</p>
            <p>Information about the current flight, including the departure/arrival airports and reservation code.</p>
            <p>A visible countdown timer indicating the time remaining in the auction.</p>
            <p>Three interactive paddles representing bidding amounts: the user can interact with them to place a new bid and increment the bid amount.</p>
        </td>
    </tr>
    <tr valign="top">
        <td width="25%">
            <img src="ui/images/bidding-2.png"/>
        </td>
        <td width="70%">
            Final round
        </td>
    </tr>
</table>

## SBBiddingCoordinator

SDK 4.0 presents live bidding as SwiftUI. Create a `UIViewController` with `SBBiddingCoordinator` and push or present it from your navigation stack. Keep a strong reference to the coordinator while the screen is visible.

```swift
let coordinator = SBBiddingCoordinator()
let biddingVC = coordinator.makeViewController(
    auction: auction,
    auctionToken: auctionToken,
    isJoin: isJoin,
    onAuctionEnding: { },
    onParticipantRemoved: { },
    onEndAuction: { updatedAuction in },
    onBuyNow: { updatedAuction in },
    onClose: { }
)
navigationController?.pushViewController(biddingVC, animated: true)
```

| **Parameter**        | **Type**              | **Description**                                                          |
|----------------------|-----------------------|--------------------------------------------------------------------------|
| auction              | `SBAuction`           | The auction used to play the bidding process                             |
| auctionToken         | `String`              | The auction token used to play the bidding process                       |
| isJoin               | `Bool`                | `true` when the auction instance has just been created from a join       |
| onAuctionEnding      | `() -> Void`          | Called when the auction is ending                                        |
| onParticipantRemoved | `() -> Void`          | Called when this participant is removed                                  |
| onEndAuction         | `(SBAuction) -> Void` | Called with the updated auction when the auction finishes                |
| onBuyNow             | `(SBAuction) -> Void` | Called when the user starts an instant upgrade from bidding              |
| onClose              | `() -> Void`          | Called after the user dismisses the screen                               |

