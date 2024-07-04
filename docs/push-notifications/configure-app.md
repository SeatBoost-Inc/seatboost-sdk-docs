# Configure iOS App


```swift
    func registerForFirebaseNotification(application: UIApplication) {
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
    }
```

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.

        ...

        let deviceId = UIDevice.current.identifierForVendor?.uuidString
        
        SBSdk.shared.configureApp(appVendor: "AeroBest", serverURL: Config.sharedInstance.serverUrl, deviceId: deviceId!)
        
        self.registerForFirebaseNotification(application: application)

        FirebaseApp.configure()
    
        Messaging.messaging().delegate = self
        
        ...

    }
```

```swift
    // [START receive_message]
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
    // [END receive_message]
```

```swift
extension AppDelegate : MessagingDelegate {
    
    // [START refresh_token]
    func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) {
        if fcmToken != nil {
        
            SBSdk.shared.configurePushNotificationsService(registrationToken: fcmToken!, delegate: self)
            SBSdk.shared.initialize()
        }
    }
    // [END refresh_token]
}
```

```swift
extension AppDelegate: SBPushNotificationsDelegate {
    
    func auctionUpdated(_ auctionResponse: SeatBoostSdk.SBAuctionResponse) {
    }
    
    func getAuctionToken(forEmail: String, andAuctionId: String) -> String {
        DBService.sharedInstance.getAuthTokenForEmail(Session.sharedInstance.email, andAuctionId: andAuctionId)
    }
}
```