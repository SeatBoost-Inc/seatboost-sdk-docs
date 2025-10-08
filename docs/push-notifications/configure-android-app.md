# Configure Android App

This guide will help you configure push notifications for Android using Firebase Cloud Messaging (FCM) with the SeatBoost SDK.

## Prerequisites

- Android Studio
- SeatBoost SDK integrated
- Minimum Android API level 21
- Firebase configuration completed by SeatBoost team
- Your own authentication system integrated

## 1. Firebase Configuration

> **Note**: The Firebase project configuration and `google-services.json` file will be provided by the SeatBoost admin team after you submit the required information.

### 1.1 Add google-services.json

1. **Receive the `google-services.json` file** from the SeatBoost admin team
2. **Place the file** in the `app/` folder of your Android project
3. **Ensure the file is added** to your project's source control

### 1.2 Configure Dependencies

Add the following dependencies to your `build.gradle` files:

**Project root level `<project>/build.gradle.kts`:**
```kotlin
plugins {
    // ...
    // Add the dependency for the Google services Gradle plugin
    id("com.google.gms.google-services") version "4.4.3" apply false
}
```

**Module level `<project>/<app-module>/build.gradle.kts` (app):**
```kotlin
plugins {
    id("com.android.application")
    // Add the Google services Gradle plugin
    id("com.google.gms.google-services")
    // ...
}

dependencies {
    // Import the Firebase BoM
    implementation(platform("com.google.firebase:firebase-bom:34.3.0"))
    
    // Firebase dependencies for push notifications
    implementation("com.google.firebase:firebase-messaging")
    implementation("com.google.firebase:firebase-analytics")
    implementation("com.google.firebase:firebase-crashlytics")
}
```

### 1.3 Sync Project

After adding the plugin and SDKs, **sync your Android project** with Gradle files.

## 2. AndroidManifest.xml Configuration

### 2.1 Required Permissions

Add the necessary permissions to your `AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- Required permissions for push notifications -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <application>
        <!-- Your existing application configuration -->

        <!-- Your Firebase Messaging Service -->
        <service
                android:name=".fcm.SBFirebaseMessagingService"
                android:exported="true"
                android:stopWithTask="false">
            <intent-filter android:priority="999">
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>

        <!-- Default notification channel -->
        <meta-data
                android:name="com.google.firebase.messaging.default_notification_channel_id"
                android:value="@string/seatboost_notification_channel_id" />

    </application>
</manifest>
```

### 2.2 Optional Notification Customization

If your company's app doesn't already have notification icon and color configurations, you can add these meta-data tags to your AndroidManifest.xml:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application>

        <!-- Optional: Custom notification icon -->
        <meta-data
            android:name="com.google.firebase.messaging.default_notification_icon"
            android:resource="@mipmap/ic_notification" />

        <!-- Optional: Custom notification color -->
        <meta-data
            android:name="com.google.firebase.messaging.default_notification_color"
            android:resource="@color/notification_color" />

    </application>
</manifest>
```

**Note**: These configurations are optional. If your app already has notification styling configured, you can skip this step. If not provided, Android will use default system icons and colors. The SeatBoost SDK handles notification display through its own `NotificationUtil` class.

## 3. Application Class Configuration

### 3.1 Initialize SeatBoost SDK

Configure the SeatBoost SDK in your `Application` class:

```kotlin
class MyApplication : Application() {
    
    override fun onCreate() {
        super.onCreate()
        
        // Create notification channel for Android 8.0+
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            createNotificationChannel()
        }
        
        // Initialize SeatBoost SDK
        initializeSeatBoostSDK()
        
        // Ensure FCM token is available for SeatBoost
        ensureFCMTokenForSeatBoost()
    }
    
    private fun initializeSeatBoostSDK() {
        val cache = SeatBoostCache()
        SeatBoostSDK.init(
            cache = cache,
            applicationInstance = this,
            defaultEnvironmentName = "production",
            baseAPIUrl = "https://api.seatboost.com",
            baseV2APIUrl = "https://api-v2.seatboost.com",
            basePaymentUrl = "https://payment.seatboost.com",
            baseIdentityUrl = "https://identity.seatboost.com",
            appVersion = BuildConfig.VERSION_NAME
        ) { title, enable ->
            // Factory to create logs
            SeatBoostLog(title, enable)
        }
    }
    
    private fun ensureFCMTokenForSeatBoost() {
        val currentToken = StorageManager.getFCMToken()
        if (currentToken.isEmpty()) {
            FirebaseMessaging.getInstance().token
                .addOnCompleteListener { task ->
                    if (task.isSuccessful) {
                        val token = task.result
                        StorageManager.saveFCMToken(token)
                        Log.d("FCM", "FCM Token generated: $token")
                    } else {
                        Log.e("FCM", "Failed to get FCM token: ${task.exception}")
                    }
                }
        }
    }
    
    @RequiresApi(Build.VERSION_CODES.O)
    private fun createNotificationChannel() {
        val channelId = getString(R.string.seatboost_notification_channel_id)
        val channelName = "SeatBoost Notifications"
        val importance = NotificationManager.IMPORTANCE_DEFAULT
        
        val channel = NotificationChannel(channelId, channelName, importance).apply {
            lightColor = Color.BLUE
            vibrationPattern = longArrayOf(0, 200, 100, 200)
            enableVibration(true)
            lockscreenVisibility = Notification.VISIBILITY_PRIVATE
            enableLights(true)
        }
        
        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.createNotificationChannel(channel)
    }
}
```

## 4. Firebase Messaging Service

### 4.1 Create Your Messaging Service

Create a class that extends `FirebaseMessagingService` in your app:

```kotlin
class SBFirebaseMessagingService : FirebaseMessagingService() {
    
    companion object {
        private const val TAG = "MyFirebaseMessaging"
    }
    
    override fun onNewToken(token: String) {
        super.onNewToken(token)
        Log.d(TAG, "Refreshed token: $token")
        
        // Save FCM token to SeatBoost SDK storage
        StorageManager.saveFCMToken(token)
        
        // If user is logged in to SeatBoost, the token will be sent to server
        // during the next authentication call
    }
    
    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)
        Log.d(TAG, "From: ${remoteMessage.from}")
        
        // Check if user is logged in to SeatBoost
        if (!StorageManager.isLoggedIn()) {
            Log.d(TAG, "User not logged in to SeatBoost, ignoring notification")
            return
        }
        
        // Process the SeatBoost message
        processSeatBoostMessage(remoteMessage)
    }
    
    private fun processSeatBoostMessage(remoteMessage: RemoteMessage) {
        val data = remoteMessage.data
        val auctionId = data["auction"]
        
        // Validate auction exists in SeatBoost cache
        if (auctionId == null || !StorageManager.hasPastAuction(auctionId)) {
            Log.d(TAG, "Invalid auction ID or auction not found: $auctionId")
            return
        }
        
        val messageType = data["msg"]
        when (messageType) {
            "reward_issued" -> handleRewardIssued(data, auctionId)
            "flight_updated" -> handleFlightUpdate(data, auctionId)
            "participant_updated" -> handleParticipantUpdate(data)
            else -> handleAuctionUpdate(data, auctionId)
        }
    }
    
    private fun handleRewardIssued(data: Map<String, String>, auctionId: String) {
        val rewardJson = data["reward"]
        if (rewardJson != null) {
            try {
                val reward = Gson().fromJson(rewardJson, Reward::class.java)
                EventBus.getDefault().post(RewardIssuedEvent(auctionId, reward))
            } catch (e: Exception) {
                Log.e(TAG, "Error parsing reward: ${e.message}")
            }
        }
    }
    
    private fun handleFlightUpdate(data: Map<String, String>, auctionId: String) {
        val flightStatus = data["flightStatus"]
        if (flightStatus != null) {
            EventBus.getDefault().post(FlightUpdatedEvent(auctionId, flightStatus))
        }
    }
    
    private fun handleParticipantUpdate(data: Map<String, String>) {
        val isParticipantRemoved = data["isParticipantRemoved"]?.toBoolean() ?: false
        EventBus.getDefault().post(ParticipantUpdatedEvent(isParticipantRemoved))
    }
    
    private fun handleAuctionUpdate(data: Map<String, String>, auctionId: String) {
        val status = data["status"]
        if (status != null) {
            EventBus.getDefault().post(AuctionUpdatedEvent(auctionId, status))
        }
    }
}
```

## 5. Integration with Your Authentication System

### 5.1 Login Integration

Integrate SeatBoost authentication with your existing login system:

```kotlin
class AuthenticationManager {
    
    fun loginUser(email: String, password: String) {
        // Your company's login logic
        performCompanyLogin(email, password)
        
        // Authenticate with SeatBoost SDK
        authenticateWithSeatBoost(email)
    }
    
    private fun authenticateWithSeatBoost(email: String) {
        // The FCM token will be automatically included in the authentication request
        LoginManager.logInWithEmail(email)
    }
    
    fun logoutUser() {
        // Your company's logout logic
        performCompanyLogout()
        
        // Logout from SeatBoost
        LoginManager.logout()
    }
}
```

## 6. Notification Types and Handling

### 6.1 Supported Notification Types

The SeatBoost SDK supports the following notification types:

| Type | Description | Data Fields |
|------|-------------|-------------|
| `auction_updated` | Auction status changes | `auction`, `status` |
| `reward_issued` | New reward available | `auction`, `reward` (JSON) |
| `flight_updated` | Flight status changes | `auction`, `status`, `flightStatus` |
| `participant_updated` | Participant list changes | `auction`, `isParticipantRemoved` |

### 6.2 Event Handling

Use EventBus to handle notification events in your activities:

```kotlin
class MainActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Register for SeatBoost events
        EventBus.getDefault().register(this)
    }
    
    override fun onDestroy() {
        super.onDestroy()
        EventBus.getDefault().unregister(this)
    }
    
    @Subscribe
    fun onAuctionUpdated(event: AuctionUpdatedEvent) {
        // Update UI with new auction information
        updateAuctionUI(event.auction)
    }
    
    @Subscribe
    fun onAuctionEnded(event: AuctionEndEvent) {
        // Handle auction end
        showAuctionEndDialog(event.auction, event.availableAuctions)
    }
    
    @Subscribe
    fun onFlightUpdated(event: FlightUpdatedEvent) {
        // Update flight information
        updateFlightStatus(event.auction)
    }
    
    @Subscribe
    fun onParticipantRemoved(event: AuctionParticipantRemovedEvent) {
        // Handle participant changes
        if (event.isParticipantRemoved) {
            showParticipantRemovedMessage()
        }
    }
    
    @Subscribe
    fun onAuctionChangedMessaging(event: AuctionChangedMessagingEvent) {
        // Handle auction status changes from notifications
        // This event is triggered when the SDK needs to fetch updated auction data
        // The callback will be executed when the auction data is retrieved
        event.callback.onRequestSuccess(auctionResponse)
    }
}
```

## 7. Resource Configuration

### 7.1 Required Strings

Add the necessary strings in `res/values/strings.xml`:

```xml
<resources>
    <!-- Required: Notification channel ID (must match AndroidManifest.xml) -->
    <string name="seatboost_notification_channel_id" translatable="false">seatboost_channel_id</string>
    
</resources>
```

### 7.2 Optional Notification Color

If you want to customize the notification color, add it in `res/values/colors.xml`:

```xml
<resources>
    <!-- Optional: Custom notification colors -->
    <color name="notification_color">#FF1976D2</color>

</resources>
```

### 7.3 Optional Notification Icons

If you want to customize notification icons, create them in `res/mipmap/`:
- `ic_notification.png` (24x24dp)
- `ic_notification.png` (36x36dp)
- `ic_notification.png` (48x48dp)

## 8. Permission Handling

### 8.1 Request Notification Permission

Request notification permission for Android 13+:

```kotlin
class PermissionManager {
    
    fun requestNotificationPermission(activity: Activity) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(
                    activity,
                    Manifest.permission.POST_NOTIFICATIONS
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                ActivityCompat.requestPermissions(
                    activity,
                    arrayOf(Manifest.permission.POST_NOTIFICATIONS),
                    REQUEST_NOTIFICATION_PERMISSION
                )
            }
        }
    }
    
    companion object {
        const val REQUEST_NOTIFICATION_PERMISSION = 1001
    }
}
```

### 8.2 Handle Permission Results

```kotlin
override fun onRequestPermissionsResult(
    requestCode: Int,
    permissions: Array<out String>,
    grantResults: IntArray
) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    
    when (requestCode) {
        PermissionManager.REQUEST_NOTIFICATION_PERMISSION -> {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Permission granted, notifications will work
                Log.d(TAG, "Notification permission granted")
            } else {
                // Permission denied, show explanation
                showNotificationPermissionDeniedDialog()
            }
        }
    }
}
```

## 9. Final Steps

### 9.1 Complete Integration Checklist

After completing the Android app configuration, ensure you have:

- [ ] Added Firebase dependencies to your `build.gradle`
- [ ] Downloaded and added `google-services.json` to your app module
- [ ] Created and registered `SBFirebaseMessagingService` in `AndroidManifest.xml`
- [ ] Added required permissions to `AndroidManifest.xml`
- [ ] Implemented notification channel creation (Android 8.0+)
- [ ] Set up FCM token management in your `Application` class
- [ ] Integrated with your existing authentication system
- [ ] Added notification permission handling (Android 13+)
- [ ] Implemented event handling for notification types

### 9.2 Firebase Backend Configuration

**Important:** Before proceeding, ensure you have completed the Firebase backend configuration as described in the [previous step](push-notifications/configure-android-service.md). This includes:

- [ ] **Information submitted to SeatBoost team** (package name, SHA-1 fingerprints)
- [ ] **google-services.json file received** from SeatBoost team
- [ ] Firebase project configured by SeatBoost team

If you haven't completed these steps yet, please follow the instructions in the [Firebase Configuration](push-notifications/configure-android-service.md) page first.

### 9.3 Support and Resources

- **SeatBoost Support:** Contact the SeatBoost team for assistance
- **Firebase Documentation:** [Firebase Cloud Messaging for Android](https://firebase.google.com/docs/cloud-messaging/android/client)
- **Android Notification Best Practices:** [Android Notification Guidelines](https://developer.android.com/guide/topics/ui/notifiers/notifications)

### 9.4 Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Notifications not received | Check FCM token registration and Firebase configuration |
| Service not registered | Verify `SBFirebaseMessagingService` in `AndroidManifest.xml` |
| Permission denied | Implement proper permission handling for Android 13+ |
| Token not updating | Ensure `onNewToken()` is properly implemented |

---

**Congratulations!** You have successfully configured push notifications for the SeatBoost SDK in your Android application. The integration is now ready for testing and production deployment.
