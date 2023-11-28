## SBRestClient::updateBidder

> Update information about a bidder.

##### Parameters:

* **firstName** (String and optional): It represents the first name of the bidder, in case of nil, this info will not be updated.
* **lastName** (String and optional): The last name of the bidder, in case of nil, this info will not be updated.
* **dateOfBirth** (Date and optional): It represents the date of birth of the bidder, sameway, in case of nil, this info will not be updated.

##### Return Type:

* ```SBPromise<SBBidder>```: The method returns an object of type ```SBPromise<SBBidder>``` . The method is asynchronous and returns a promise. The promise resolves to an object of type ```SBBidder```, with the updated bidder once the operation is completed.

<!-- tabs:start -->

#### **iOS**

```swift
public func updateBidder(_ firstName: String!, lastName: String!, dateOfBirth: Date!) -> SBPromise<SBBidder>
```

#### **Android**

```kotlin
```

<!-- tabs:end -->