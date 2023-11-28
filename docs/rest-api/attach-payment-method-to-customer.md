# attachPaymentMethodToCustomer

> This method associates a payment method with a specific customer

#### Parameters:

* **customerId**: the identifier of a customer to whom the payment method will be attached.
* **paymentMethodId**: the identifier of the payment method to be attached to the customer.

> [!NOTE]
> if the parameter **customerId** is empty, the string returned in the promise will be a new customer id generated on the Stripe Server. This is particularly useful when the application does not have a Stripe customer id associated with the logged user yet.


#### Return Type:

* ```SBPromise<String>```: The method returns an object of type ```SBPromise<String>```. The method is asynchronous and returns a promise. In this case, the promise resolves to an object of type ```String```, 
<!-- tabs:start -->

#### **iOS**

```swift
public func attachPaymentMethodToCustomer(customerId: String, paymentMethodId: String) -> SBPromise<String>
```

#### **Android**

```kotlin
```

<!-- tabs:end -->