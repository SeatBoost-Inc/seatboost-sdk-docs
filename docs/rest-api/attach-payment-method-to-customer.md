# attachPaymentMethodToCustomer

> This method attach a payment method to a customer

##### Parameters:

* customerId: the identifier of a customer to whom the payment method will be attached.
* paymentMethodId: the identifier of the payment method to be attached to the customer.

##### Return Type:

* ```SBPromise<String>```: The method returns an object of type ```SBPromise<String>```. The method is asynchronous and returns a promise. In this case, the promise resolves to an object of type ```String```, if the customerId is empty, the string returned in the promise will be a new customerId.

<!-- tabs:start -->

#### **iOS**

```swift
public func attachPaymentMethodToCustomer(customerId: String, paymentMethodId: String) -> SBPromise<String>
```

#### **Android**

```kotlin
```

<!-- tabs:end -->