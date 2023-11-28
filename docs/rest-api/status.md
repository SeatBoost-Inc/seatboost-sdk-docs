## SBRestClient::status

This method fetches comprehensive details for a particular auction.

#### Parameters:

* auctionId: the identifier of the auction
* authToken: the authentication token for that auction

#### Return Type:

* ```SBPromise<SBAuctionResponse>```: The method returns an object of type ```SBPromise<SBAuctionResponse>```. The method is asynchronous and returns a promise. In this case, the promise resolves to an object of type ```SBAuctionResponse```, the auction status information is encapsulated within SBAuctionResponse.

<!-- tabs:start -->

#### **iOS**

```swift
public func status(_ auctionId: String, authToken: String) -> SBPromise<SBAuctionResponse>
```

#### **Android**

```kotlin
```

<!-- tabs:end -->