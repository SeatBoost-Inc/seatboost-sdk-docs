## SBRestClient::placeBid

The method is designed to allow a user to place a bid in a flight upgrade auction. This involves validating the bid, checking the user's authentication, and ensuring the bid meets the auction's requirements before it is recorded.

#### Parameters:

* **auctionId** (String): A unique identifier for the flight upgrade auction where the bid is to be placed.
* **authToken** (String): An authentication token that verifies the user's identity and ensures they have the necessary permissions to place a bid.
* **amount** (String): The amount of the bid being placed by the user.
* **bidWinBidType** (TODO): TODO.

<!-- tabs:start -->

#### **iOS**

```swift
public func placeBid(_ auctionId: String, authToken: String, amount: Int, bidWinBidType: SBBidWinBidType) -> SBPromise<SBAuctionResponse>
```

#### **Android**

```kotlin
fun placeBid(auctionId: String, authToken: String, amount: String, isFinalBid: Boolean = false): SBPromise<SBAuctionResponse>
```

<!-- tabs:end -->