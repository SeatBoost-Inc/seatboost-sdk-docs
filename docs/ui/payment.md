# Payment


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
    func presentingViewController() -> UIViewController
}
```

* onJoin: this method is called when the user goes through all the screens on the payment process, including the payment method, and clicks on the **Place start bid** button to join to the auction.

* presentingViewController: the view controller used as reference to show the confetti animation

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

![Auction Terms](images/payment-1.jpg "Auction Terms")
![Tips](images/payment-2.jpg "Tips")
![Confirmation](images/payment-3.jpg "Confirmation")
![Payment Method](images/payment-4.jpg "Payment Method")