# Bidding Screen

> This screen is used to facilitate a competitive bidding process among passengers who are interested in securing a better seat or an upgraded class for their upcoming flights. The purpose of this screen is to allow passengers to bid monetary amounts in an attempt to secure a higher class of service, such as moving from economy to business class. This screen is pretty intuitive and the user should intercat with the paddles in order to increment their current bid amount.

<table width="100%" style="border-collapse: collapse; border: none;">
    <tr valign="top">
        <td width="25%">
            <img src="ui/images/bidding.jpg"/>
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
            <img src="ui/images/bidding-2.jpg"/>
        </td>
        <td width="70%">
            Final round
        </td>
    </tr>
</table>

## SBBiddingController

> In order to use this UI component on your application you have to initialize it with some fields:

| **Property Name**   | **Type**                        | **Description**                                                          |
|---------------------|---------------------------------|--------------------------------------------------------------------------|
| currentAuction      | `SBAuction?`                    | The auction used to play the bidding process                             |
| currentAuctionToken | `String`                        | The auction token used to play the bidding process                       |
| delegate            | `SBBiddingControllerDelegate!`  | The delegate instance used to receive the user interface events          |
| isJoin              | `Bool`                          | A boolean informing if the auction instance has just created from a join |

## SBBiddingControllerDelegate

```swift
public protocol SBBiddingControllerDelegate: AnyObject {
    func onAuctionEnding()
    func onParticipantRemoved()
    func onEndAuction()
    func onBuyNow()
    func getConfettiParentView() -> UIView?
}
```

