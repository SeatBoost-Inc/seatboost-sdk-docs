# Payment Screen

> The next UI component is the Payment Screen. It is used to show some important information before selecting the payment method to perform the join to the auction.

<table width="100%" style="border-collapse: collapse; border: none;">
    <tr valign="top">
        <td width="25%">
            <img src="ui/images/payment-1.jpg"/>
        </td>
        <td width="70%">
            <p><b>Auction Terms</b></p>
            <p>The auction terms screen is the step within the component that provides users with important information, rules, and terms related to participating in an auction. This screen is designed to inform users about the terms and conditions they need to be aware of before engaging in the auction process. The goal of the auction terms screen is to ensure transparency, provide a clear understanding of the auction process, and establish a set of rules that create a fair and enjoyable experience for all participants.</p>
            <p>Before users can proceed to participate in the auction, there is a button indicating that they have read and agree to the auction terms. Users are required to actively accept the terms before moving forward.</p>
        </td>
    </tr>
    <tr valign="top">
        <td width="25%">
            <img src="ui/images/payment-2.jpg"/>
        </td>
        <td width="70%">
            <p><b>Tips</b></p>
            <p>A screen with a list of useful tips before joining the auction is designed to provide guidance and essential information to users, ensuring they have a better understanding of the auction process and can participate more effectively. This screen is optional depending on the tips existence or not and it appears on the terms step.</p>
            <p>This screen aims to empower users with the knowledge they need to make informed decisions during the auction, enhancing their overall satisfaction with the platform and increasing the likelihood of a positive bidding experience.</p>
        </td>
    </tr>
    <tr valign="top">
        <td width="25%">
            <img src="ui/images/payment-3.jpg"/>
        </td>
        <td width="70%">
            <p><b>Review</b></p>
            <p>A review screen is a crucial step in the user interface where users can carefully examine and confirm their selections (flight/upgrade/auction) before going to the payment step.</p>
        </td>
    </tr>
    <tr valign="top">
        <td width="25%">
            <img src="ui/images/payment-4.jpg"/>
        </td>
        <td width="70%">
            <p><b>Payment</b></p>
            <p>The Payment step is a pivotal step in the process where users are prompted to choose how they will pay for the auction. The user can select a previous saved payment method or create a new one before finally joining to the auction</p>
        </td>
    </tr>
</table>


## SBPaymentController

> In order to use this UI component on your application you have to initialize it with some fields:

| **Property Name** | **Type**                             | **Description**                                                             |
|-------------------|--------------------------------------|-----------------------------------------------------------------------------|
| upgradeContext    | `SBUpgradeContext!`                  | The upgrade context data used to pre populate the screen                    |
| delegate          | `SBPaymentControllerDelegate!`       | The delegate instance used to receive the user interface events             |
| datasource        | `SBPaymentCardControllerDataSource!` | The data source instance used provide information about the payment methods |

> All the attributes in the ```upgradeContext``` should be provided to get the component working

## SBPaymentControllerDelegate

```swift
public protocol SBPaymentControllerDelegate: AnyObject {
    func onBack()
    func onJoin(authToken: String, auction: SBAuction!)
    func authenticationPresentingViewController() -> UIViewController
}
```

* onJoin: this method is called when the user goes through all the screens on the payment process, including the payment method, and clicks on the **Place start bid** button to join to the auction.

* presentingViewController: The Stripe SDK will modally present additional view controllers on top of the view controller, when required for user authentication, like in the Challenge Flow for 3DS2 transactions.

## SBPaymentCardControllerDataSource

```swift
public protocol SBPaymentCardControllerDataSource: AnyObject {
    func getCustomerId() -> String // self.currentCustomerId == ""
    
    func isPaymentsLocked() -> Bool
    func unlockPayments(success: @escaping () -> (), failure: @escaping (_ error: String) -> (), cancel: (() -> ())!, exceededAttempts: (() -> ())!)
    func getPayments() -> [SBPaymentCard]
    func savePayment(isJoin: Bool, card: SBPaymentCard, success: @escaping () -> (), failure: @escaping (_ error: String) -> (), cancel: (() -> ())!, exceededAttempts: (() -> ())!)
    func removePayment(_ card: SBPaymentCard, success: @escaping () -> (), failure: @escaping (_ error: String) -> ())
}
```