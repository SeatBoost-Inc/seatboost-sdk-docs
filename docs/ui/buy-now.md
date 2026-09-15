# Buy Now Screen

> When a user decides to exit an auction and opt for an instant upgrade instead, clicking on the Buy Instant Upgrade button on the Bidding Screen, the app can use this component to guide the user through a screen that facilitates the purchase of the upgrade. 

<table width="100%" style="border-collapse: collapse; border: none;">
    <tr valign="top">
        <td width="25%">
            <img src="ui/images/buy-now-1.png"/>
        </td>
        <td width="70%">
            <p><b>Instant Purchase Conditions</b></p>
            <p>This step displays the terms and conditions for an instant flight upgrade and requires the user to agree with them in order to proceed.</p>
        </td>
    </tr>
        <tr valign="top">
        <td width="25%">
            <img src="ui/images/buy-now-2.png"/>
        </td>
        <td width="70%">
            <p><b>Payment Detail</b></p>
            <p>The Payment Detail step is similar what we have before joining the auction, where users are prompted to choose how they will pay for the instant upgrade: selecting a previous saved payment method or creating a new one.</p>
        </td>
    </tr>
</table>


## SBBuyNowController

> In order to use this UI component on your application you have to initialize it with some fields:

| **Property Name**   | **Type**                             | **Description**                                                             |
|---------------------|--------------------------------------|-----------------------------------------------------------------------------|
| params              | `SBBuyNowParams?`                    | `SBBuyNowFromAuctionParams` or `SBBuyNowFromUpgradeParams`                  |
| delegate            | `SBBuyNowControllerDelegate!`        | The delegate instance used to receive the user interface events             |
| datasource          | `SBPaymentCardDataSource!`           | The data source instance used provide information about the payment methods |

From a live auction, set `SBBuyNowFromAuctionParams` (`auction`, `auctionToken`). From select upgrade, set `SBBuyNowFromUpgradeParams` (`upgradeContext`).

## SBBuyNowControllerDelegate

```swift
public protocol SBBuyNowControllerDelegate: AnyObject {
    func onBack()
    func onBuy(auction: SBAuction!)
    func onBuy(instantUpgrade: SBInstantUpgrade!, authToken: String)
    func onBuyFail(error: Error)
}
```
