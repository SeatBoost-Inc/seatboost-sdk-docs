# Configure SeatBoost Service (Android)

The organization using the SeatBoost SDK must provide the following information to enable push notifications for the Android application. The SeatBoost admin team will configure the Firebase project and provide the necessary configuration files.

## Required Information

To configure push notifications for your Android app, you need to provide the SeatBoost admin team with the following information:

### 1. Android Package Information

- **Package Name**: The unique identifier for your Android app (e.g., `com.yourcompany.yourapp`)
- **App Nickname**: A friendly name used throughout the Firebase console to represent this app

### 2. Optional Information

- **SHA-1 Fingerprint**: Required for Firebase authentication and Google Sign-In
- **SHA-256 Fingerprint**: Additional security fingerprint (recommended)

## How to Obtain Required Information

### Package Name

The package name can be found in your `AndroidManifest.xml` file:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.yourcompany.yourapp">
    <!-- Your app configuration -->
</manifest>
```

Or in your `build.gradle` file:

```gradle
android {
    defaultConfig {
        applicationId "com.yourcompany.yourapp"
        // Other configuration
    }
}
```

### SHA Fingerprints

#### For Debug Builds

To get the SHA-1 fingerprint for debug builds:

**Using Keytool (Command Line):**
```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

**Using Android Studio:**
1. Open your project in Android Studio
2. Go to **Gradle** tab (usually on the right side)
3. Navigate to **app** → **Tasks** → **android** → **signingReport**
4. Double-click **signingReport**
5. Copy the SHA-1 fingerprint from the output

#### For Release Builds

To get the SHA-1 fingerprint for release builds:

**Using Keytool (Command Line):**
```bash
keytool -list -v -keystore /path/to/your/release-key.keystore -alias your-key-alias
```

**Using Android Studio:**
1. Open your project in Android Studio
2. Go to **Build** → **Generate Signed Bundle/APK**
3. Select **APK** and click **Next**
4. Choose your keystore and enter the password
5. Click **Next** and then **Finish**
6. The SHA-1 fingerprint will be displayed in the build output

## Information Submission Template

When submitting the required information to the SeatBoost admin team, use the following template:

```
Android Push Notifications Configuration Request

App Information:
- Package Name: com.yourcompany.yourapp
- App Nickname: Your App Name

Optional Security Information:
- SHA-1 Fingerprint (Debug): AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD
- SHA-1 Fingerprint (Release): 11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44
- SHA-256 Fingerprint (Debug): AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99
- SHA-256 Fingerprint (Release): 11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44

Additional Notes:
- [Any specific requirements or notes]
```

## Firebase Configuration

After you submit the required information, the SeatBoost admin team will:

1. **Register your Android app** in the Firebase project
2. **Configure Firebase Cloud Messaging** for your package name
3. **Generate the `google-services.json` file** for your app
4. **Provide you with the configuration file** and setup instructions

## Security Considerations

### Keystore Management

- **Never share your keystore file** or private key
- **Only provide SHA fingerprints** to the SeatBoost team
- **Use different keystores** for debug and release builds
- **Backup your keystore** in a secure location

### Firebase Security

- **Firebase project access** is managed by the SeatBoost team
- **API keys are restricted** to specific Android package names
- **Usage is monitored** through Firebase Console

## Next Steps

After submitting the required information:

1. Wait for the SeatBoost team to configure Firebase
2. Receive the `google-services.json` file
3. [Configure your Android app](push-notifications/configure-android-app.md) to receive notifications
4. Test the integration using the provided configuration
5. Implement notification handling in your app
6. Deploy to production with proper testing

For more information about Firebase Cloud Messaging, see the [official documentation](https://firebase.google.com/docs/cloud-messaging/android/client).
