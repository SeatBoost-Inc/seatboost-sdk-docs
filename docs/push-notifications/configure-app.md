# Configure iOS App

All the necessary changes must be implemented within the **AppDelegate** of your app to ensure proper configuration and functionality.

1) You need to request the **GoogleService-Info.plist** file from the SeatBoost admin team, as this file is required to configure your iOS project properly for integrating with SeatBoost services.

2) Move your config file into the root of your Xcode project. If prompted, select to add the config file to all targets.

3) Add Firebase SDKs to your app puttting the line below in your **Podfile** and run **pod install**.

```
    pod 'Firebase/Messaging', '9.0.0'
```

4) Initialize Firebase in your app. Please, add the following initialization code to your application. 

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.

        ...
        
        if #available(iOS 10.0, *) {
            // For iOS 10 display notification (sent via APNS)
            UNUserNotificationCenter.current().delegate = self

            let authOptions: UNAuthorizationOptions = [.alert, .badge, .sound]
            UNUserNotificationCenter.current().requestAuthorization(
                options: authOptions,
                completionHandler: {_, _ in })
        } else {
            let settings: UIUserNotificationSettings =
                UIUserNotificationSettings(types: [.alert, .badge, .sound], categories: nil)
            application.registerUserNotificationSettings(settings)
        }

        application.registerForRemoteNotifications()

        FirebaseApp.configure()
    
        Messaging.messaging().delegate = self
        
        ...

    }
```

5) Add the code below to handle the notifications in the SeatBoost SDK, this will redirect the notification in memory messages that will refresh the UI components properly. 

```swift
    func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable: Any]) {

		...
        
        SBSdk.shared.handleNotification(userInfo)

        ...

    }
```


```swift
    func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable: Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {

    	...

        SBSdk.shared.handleNotification(userInfo)

        ...

        completionHandler(UIBackgroundFetchResult.newData)
    }
```

6) Implements the **didReceiveRegistrationToken** method to get and pass registrationToken to the SDK to configure the SeatBoost SDK Push Notifications Service.

```swift
extension AppDelegate : MessagingDelegate {
    
    func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) {
        if fcmToken != nil {
        
            SBSdk.shared.configurePushNotificationsService(registrationToken: fcmToken!, delegate: self)
            SBSdk.shared.initialize()
        }
    }
}
```