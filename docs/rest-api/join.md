## SBRestClient::join

The method is designed to enable a user to join a flight upgrade auction. This involves validating the request data, ensuring the user meets the criteria for joining the auction, and then registering the user for participation in the auction.


#### Parameters:

* **joinAuctionRequestData** (SBJoinAuctionRequestData): An object containing all the necessary information required for a user to join the flight upgrade auction. This data can include user details, flight information, and payment parameters.

<!-- tabs:start -->

#### **iOS**

```swift
public func join(_ data: SBJoinAuctionRequestData) -> SBPromise<SBJoinResponse>
```

#### **Android**

```kotlin
fun join(data: SBJoinAuctionRequestData): SBPromise<Pair<SBJoinResponse, SBPaymentResponse>>
```

<!-- tabs:end -->