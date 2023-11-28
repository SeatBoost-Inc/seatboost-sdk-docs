## SBRestClient::serverUrl

This property serves the purpose of specifying the URL of the SeatBooost Server that the SDK should connect to.

> [!WARNING]
> Prior to engaging with any SeatBoost SDK functionality, it is imperative that you configure this setting during the app initialization phase. 


<!-- tabs:start -->

#### **iOS**

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

	...

	SBRestClient.shared.server = "..."

	...

}
```

#### **Android**

```kotlin
```

<!-- tabs:end -->

> [!NOTE]
> Please, contact our support for the URLs you should use in your test, development, and production environments.