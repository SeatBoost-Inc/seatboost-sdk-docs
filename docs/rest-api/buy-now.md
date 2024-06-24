## SBRestClient::buyNow

This method is designed to enable a user to instantly buy an upgrade in an ongoing auction. 

#### Parameters:

* **auctionId** (String): A unique identifier for the auction where the instant upgrade is to be purchased..
* **authToken** (String): An authentication token that validates the user's identity and ensures they have the necessary permissions to perform the action.
* **paymentParams** (String): A set of parameters containing payment information required to process the transaction. This may include details like payment method, amount, currency, and any other necessary billing information.

<!-- tabs:start -->

#### **iOS**

```swift
public func buyNow(_ auctionId: String, authToken: String, paymentParams: SBPaymentParams) -> SBPromise<SBAuctionPaymentResponse>
```

#### **Android**

```kotlin
```

<!-- tabs:end -->