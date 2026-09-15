## SBRestClient::findAuctions

Use this method to fetch all the flight upgrade auctions that are available for a specific reservation code.


#### Parameters:

* **data**: 

<!-- tabs:start -->

#### **iOS**

```swift
public func findAuctions(_ data: SBFindAuctionsRequestBody) -> SBPromise<SBFindAuctionResult>
```

#### **Android**

```kotlin
fun findAuctions(data: SBFindAuctionRequestBody): SBPromise<SBFindAuctionResult>
```

<!-- tabs:end -->