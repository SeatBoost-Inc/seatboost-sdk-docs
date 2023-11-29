# Rest Client (SBRestClient class)

The SBRestClient class is used to encapsulate the functionality related to making requests, handling responses, and managing the SeatBoost Rest API's endpoints. 

All the asynchronous methods in the SBRestClient adhere to a **promise pattern**, where promises act as placeholders for the eventual results of the operations. This allows for more efficient and organized handling of asynchronous tasks, ensuring a structured and streamlined approach to managing the outcomes of the operations once they are completed.

In the example below, the **method** returns a **promise&lt;result&gt;**, indicating that it will eventually provide a **result** or an **error**. When using the SDK promise class (SBPromise), you can use the **done** block for successful results and the **fail** block for handling errors.

<!-- tabs:start -->

#### **iOS**


```swift
SBRestClient.shared.method(params)
	.done { 
		result in
	    print(result)
	}
	.fail { 
		error in
	    print("Error: \(error)")
	}
```

#### **Android**

```kotlin
```

<!-- tabs:end -->


| Properties                          | Methods                                                                        |
|-------------------------------------|--------------------------------------------------------------------------------|
| [serverUrl](rest-api/server-url.md) | [attachPaymentMethodToCustomer](rest-api/attach-payment-method-to-customer.md) |
|                                     | [authenticate](rest-api/authenticate.md)                                       |
|                                     | [findAuctions](rest-api/find-auctions.md)                                      |
|                                     | [getPaymentMethods](rest-api/get-payment-methods.md)                           |
|                                     | [removePaymentMethod](rest-api/remove-payment-method.md)                       |
|                                     | [status](rest-api/status.md)                                                   |  


* SBBootstrap.shared.stripeKey