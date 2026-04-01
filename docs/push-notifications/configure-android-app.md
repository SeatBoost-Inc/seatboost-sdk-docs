# Configure Android App

This guide will help you configure push notifications for Android using Firebase Cloud Messaging (FCM) with the SeatBoost SDK.

## Prerequisites

- Android Studio
- SeatBoost SDK integrated (see [Getting Started - Android](/getting-started-android.md))
- **Minimum API level:** follow your SDK package; current reference integrations use **API 26+**
- Firebase configuration completed by the SeatBoost team
- Your own authentication flow that calls `SeatBoostSDK.login` after the user signs in (FCM token is associated with the session on the server)

## 1. Firebase Configuration

> **Note:** The Firebase project configuration and `google-services.json` file are provided by the SeatBoost admin team after you submit the required information (see [Configure SeatBoost Service (Android)](configure-android-service.md)).

### 1.1 Add google-services.json

1. **Receive the `google-services.json` file** from the SeatBoost admin team
2. **Place the file** in the `app/` module of your Android project
3. **Ensure the file is handled** according to your security policy (often committed for debug; treat release secrets appropriately)

### 1.2 Configure Dependencies

Add the Google Services Gradle plugin and Firebase dependencies.

**Option A — Kotlin DSL (`build.gradle.kts`)**

**Root `build.gradle.kts`:**
```kotlin
plugins {
    id("com.google.gms.google-services") version "4.4.3" apply false
    // Optional: Crashlytics
    // id("com.google.firebase.crashlytics") version "3.0.6" apply false
}
```

**App module `build.gradle.kts`:**
```kotlin
plugins {
    id("com.android.application")
    id("com.google.gms.google-services")
    // id("com.google.firebase.crashlytics") // optional
}

dependencies {
    implementation(platform("com.google.firebase:firebase-bom:34.3.0"))
    implementation("com.google.firebase:firebase-messaging")
    implementation("com.google.firebase:firebase-analytics")
    // implementation("com.google.firebase:firebase-crashlytics") // optional
}
```

**Option B — Groovy (`build.gradle`)** (common in older or multi-module templates)

**Root `build.gradle`:**
```groovy
buildscript {
    dependencies {
        classpath("com.google.gms:google-services:4.4.3")
        // classpath("com.google.firebase:firebase-crashlytics-gradle:3.0.6") // optional
    }
}
```

**App module `build.gradle`:**
```groovy
apply plugin: "com.android.application"
apply plugin: "com.google.gms.google-services"
// apply plugin: "com.google.firebase.crashlytics" // optional

dependencies {
    implementation platform("com.google.firebase:firebase-bom:34.3.0")
    implementation "com.google.firebase:firebase-messaging"
    implementation "com.google.firebase:firebase-analytics"
    // implementation "com.google.firebase:firebase-crashlytics" // optional
}
```

Use the Firebase BoM version that matches your project; `34.3.0` is a known-good line with recent SDK work.

### 1.3 Sync Project

After adding the plugin and dependencies, **sync** the project with Gradle.

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

Adjust `android:name` to match the package and class name of your service.

### 2.2 Optional Notification Customization

If your app does not already define notification icon and color, you can add:

```xml
<meta-data
        android:name="com.google.firebase.messaging.default_notification_icon"
        android:resource="@mipmap/ic_notification" />

<meta-data
        android:name="com.google.firebase.messaging.default_notification_color"
        android:resource="@color/notification_color" />
```

## 3. Application Class: SDK Init, Channel, and FCM Token

Initialize the SeatBoost SDK in the same `Application` class you use for the rest of your app. The initializer **`context`** parameter must be your `Application` instance. Include **`appVendor`** (2-letter IATA), environment name, and the **four base URLs** for your tier (see [Getting Started - Android](/getting-started-android.md)).

Create the notification channel on **Android 8+** before showing notifications. After init, request an FCM token if none is stored yet so `StorageManager` can supply it on `SeatBoostSDK.login`.

```kotlin
import android.app.Application
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.graphics.Color
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import com.google.firebase.messaging.FirebaseMessaging
import com.industrialrocket.seatboost.sdk.SeatBoostSDK
import com.industrialrocket.seatboost.sdk.cache.SeatBoostCache
import com.industrialrocket.seatboost.sdk.manager.StorageManager
// ... SBLog implementation imports (see Getting Started)

class MyApplication : Application() {

    override fun onCreate() {
        super.onCreate()

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
            context = this,
            defaultEnvironmentName = "production",
            appVendor = "AB",
            baseAPIUrl = "https://api.seatboost.com/",
            baseV2APIUrl = "https://api-v2.seatboost.com/",
            basePaymentUrl = "https://payment.seatboost.com/",
            baseIdentityUrl = "https://identity.seatboost.com/",
            appVersion = "MyApp/${BuildConfig.VERSION_NAME}-Android",
        ) { _, _ -> /* SBLog factory — see Getting Started */ }

        SeatBoostSDK.initResources(resources)
        SeatBoostSDK.setAirlineCode("AB") // your IATA airline code
    }

    private fun ensureFCMTokenForSeatBoost() {
        if (StorageManager.getFCMToken().isEmpty()) {
            FirebaseMessaging.getInstance().token.addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    StorageManager.saveFCMToken(task.result)
                } else {
                    Log.e("FCM", "Failed to get token", task.exception)
                }
            }
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun createNotificationChannel() {
        val channelId = getString(R.string.seatboost_notification_channel_id)
        val channel = NotificationChannel(
            channelId,
            "SeatBoost Notifications",
            NotificationManager.IMPORTANCE_DEFAULT
        ).apply {
            lightColor = Color.BLUE
            vibrationPattern = longArrayOf(0, 200, 100, 200)
            enableVibration(true)
            lockscreenVisibility = Notification.VISIBILITY_PRIVATE
            enableLights(true)
        }
        val nm = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        nm.createNotificationChannel(channel)
    }
}
```

## 4. Firebase Messaging Service

Implement `FirebaseMessagingService`. Persist the token, ignore messages when the user is not logged in to SeatBoost, and route payload handling by `msg` when the user has relevant auctions in `StorageManager`.

The SDK ships with **GreenRobot EventBus** on the classpath; you can post `AuctionParticipantRemovedEvent` (from the SDK) when `msg` is `participant_updated`. Other message types (`reward_issued`, `flight_updated`, default auction updates) can be handled in your app (UI refresh, custom events) as needed.

```kotlin
package com.example.myapp.fcm

import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.industrialrocket.seatboost.sdk.events.AuctionParticipantRemovedEvent
import com.industrialrocket.seatboost.sdk.manager.StorageManager
import org.greenrobot.eventbus.EventBus

class SBFirebaseMessagingService : FirebaseMessagingService() {

    override fun onNewToken(token: String) {
        super.onNewToken(token)
        
        // Save FCM token to SeatBoost SDK storage
        StorageManager.saveFCMToken(token)
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)

        // Check if user is logged in to SeatBoost
        if (!StorageManager.isLoggedIn()) {
            return
        }

        val data = remoteMessage.data
        val auctionId = data["auction"]
        
        // Validate auction exists in SeatBoost cache
        if (!StorageManager.hasPastAuction(auctionId)) {
            return
        }

        when (data["msg"]) {
            "reward_issued" -> { /* optional: parse data["reward"] if you show rewards in-app */ }
            "flight_updated" -> { /* optional: refresh flight UI using data["flightStatus"] */ }
            "participant_updated" -> {
                val removed = data["isParticipantRemoved"]?.toBoolean() ?: false
                EventBus.getDefault().post(AuctionParticipantRemovedEvent(removed))
            }
            else -> { /* optional: handle auction status via data["status"] */ }
        }
    }
}
```

## 5. Login and FCM Token

After your user authenticates with **your** identity provider, call SeatBoost login so the server receives the current FCM token (saved in `StorageManager`) together with the session:

```kotlin
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import com.industrialrocket.seatboost.sdk.SeatBoostSDK
import com.industrialrocket.seatboost.sdk.manager.StorageManager

suspend fun loginToSeatBoost(email: String) = withContext(Dispatchers.IO) {
    SeatBoostSDK.login(
        email = email,
        firebaseToken = StorageManager.getFCMToken(),
        appVersion = SeatBoostSDK.instance.APP_VERSION,
    )
}
```

If push is disabled or the token is not yet available, `getFCMToken()` may be empty until `onNewToken` or `ensureFCMTokenForSeatBoost` completes; a later login or token refresh can update the backend.

## 6. Notification Types (Payload)

Typical `data` keys:

| `msg` (optional)        | Role |
|-------------------------|------|
| `reward_issued`         | Reward payload in `reward` (JSON string) |
| `flight_updated`        | Flight status in `flightStatus` |
| `participant_updated`   | `isParticipantRemoved` — SDK event `AuctionParticipantRemovedEvent` |
| (default / other)       | Auction-related updates; often includes `status` |

Always validate `auction` and the user’s relationship to that auction (for example via `StorageManager.hasPastAuction`) before updating UI.

## 7. Resource Configuration

### 7.1 Required Strings

Add the necessary strings in `res/values/strings.xml`:

```xml
<resources>
    <!-- Required: Notification channel ID (must match AndroidManifest.xml) -->
    <string name="seatboost_notification_channel_id" translatable="false">seatboost_channel_id</string>
</resources>
```

### 7.2 Optional Colors and Icons

See section 2.2 and [Android notification guidelines](https://developer.android.com/guide/topics/ui/notifiers/notifications).

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

**Important:** Before proceeding, ensure you have completed the Firebase backend configuration as described in the [previous step](configure-android-service.md). This includes:

- [ ] **Information submitted to SeatBoost team** (package name, SHA-1 fingerprints)
- [ ] **google-services.json file received** from SeatBoost team
- [ ] Firebase project configured by SeatBoost team

If you haven't completed these steps yet, please follow the instructions in the [Firebase Configuration](configure-android-service.md) page first.

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
