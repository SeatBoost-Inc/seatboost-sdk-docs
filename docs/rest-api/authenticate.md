## SBRestClient::authenticate

This method is employed to authenticate an user on the SeatBoost Server and grant access to their account.

#### Parameters:

* **email** (String): the email address of the user being authenticated.
* **deviceId** (String): unique identifier for the device used for authentication.
* **registrationToken** (String): a token associated with the push notification process.

> [!NOTE]
> If you don't want the push notification feature in your application use **registrationToken** empty. A push notification is a message that is "pushed" from the SeatBoost Server to a user's device informing an SeatBoost domain event: auction updated, auction ended, gate changed, etc.


#### Return Type:

* ```SBPromise<SBBidder>```: The method returns an object of type ```SBPromise<SBBidder>```. The method is asynchronous and returns a promise. In this case, the promise resolves to an object of type ```SBBidder```, the current bidder authenticated (logged user) is encapsulated within SBBidder.


<!-- tabs:start -->

#### **iOS**

> [!NOTE]
> getting deviceId in Swift ?

```swift
public func authenticate(_ email: String, deviceId: String, registrationToken: String) -> SBPromise<SBBidder> 
```

#### **Android**

```kotlin
fun authenticate(email: String, deviceId: String, registrationToken: String): SBPromise<SBBidder>
```

<!-- tabs:end -->