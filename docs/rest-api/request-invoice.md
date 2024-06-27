## SBRestClient::requestInvoice

By providing the necessary details such as the auction ID, authentication token, confirmation number, and billing customer information this method is intended to be utilized to request an invoice for a particular flight upgrade auction. 

#### Parameters:

* **auctionId** (String): A String representing the ID of the auction for which the invoice is being requested.
* **authToken** (String): A String representing an authentication token used for security and authorization purposes.
* **confirmationNumber** (String): TODO.
* **billingCustomer** (String): An instance of SBBillingCustomer, a class that contains billing information about the customer.

<!-- tabs:start -->


#### **iOS**

```swift
public func requestInvoice(auctionId: String, authToken: String, confirmationNumber: String, billingCustomer: SBBillingCustomer) -> SBPromise<Void>
```

#### **Android**

```kotlin
```

<!-- tabs:end -->