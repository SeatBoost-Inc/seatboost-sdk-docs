## SBRestClient::getPaymentMethods


Call this method to retrieve a list of all payment methods linked to a specific customer. 

#### Parameters:

* **customerId** (String): the identifier of a customer.

<!-- tabs:start -->

#### **iOS**

```swift
public func getPaymentMethods(customerId: String) -> SBPromise<[SBPaymentCard]>
```

#### **Android**

```kotlin
```

<!-- tabs:end -->