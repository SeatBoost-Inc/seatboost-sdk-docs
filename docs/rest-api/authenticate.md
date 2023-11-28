# authenticate

This method is employed to authenticate an user on the SeatBoost Server and grant access to their account.

#### Parameters:

* **email**: the email address of the user being authenticated.
* **deviceId**: unique identifier for the device used for authentication.
* **registrationToken**: a token associated with the push notification process.

#### Return Type:

* ```SBPromise<SBBidder>```: The method returns an object of type ```SBPromise<SBBidder>```. The method is asynchronous and returns a promise. In this case, the promise resolves to an object of type ```SBBidder```, the current bidder authenticated (logged user) is encapsulated within SBBidder.


<!-- tabs:start -->

#### **iOS**

```swift
public func authenticate(_ email: String, deviceId: String, registrationToken: String) -> SBPromise<SBBidder> 
```

#### **Android**

```kotlin
```

<!-- tabs:end -->