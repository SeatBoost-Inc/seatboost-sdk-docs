## SBRestClient::validateDisplayName

The method is designed to validate a user's chosen display name for an specific flight upgrade auction. This ensures that the display name adheres to any predefined rules or constraints, such as uniqueness, length, character and words restrictions.


#### Parameters:

* **auctionId** (String):A unique identifier for the flight upgrade auction in which the display name is being used.
* **displayName** (String): The display name chosen by the user that needs to be validated.

<!-- tabs:start -->

#### **iOS**

```swift
public func validateDisplayName(auctionId: String, displayName: String) -> SBPromise<Void>
```

#### **Android**

```kotlin
```

<!-- tabs:end -->