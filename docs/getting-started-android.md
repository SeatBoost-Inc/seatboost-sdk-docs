# Getting Started with SeatBoost SDK

This guide will walk you through setting up the SeatBoost SDK in your Android project from scratch.

## Installation

### 1. Project Setup

Add the SDK module to your project:

```gradle
// settings.gradle
include ':app'
include ':seatboostsdk'
```

### 2. Dependencies

Add the following dependencies to your `build.gradle` (app level):

```gradle
dependencies {
    // SeatBoost SDK
    implementation project(path: ":seatboostsdk")
    
    // Required dependencies
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    
    // Retrofit for API communication
    implementation 'com.squareup.retrofit2:retrofit:2.6.1'
    implementation 'com.squareup.retrofit2:converter-gson:2.6.1'
    implementation 'com.squareup.retrofit2:adapter-rxjava2:2.6.1'
    
    // RxJava
    implementation 'io.reactivex.rxjava2:rxjava:2.2.20'
    implementation 'io.reactivex.rxjava2:rxandroid:2.1.1'
    
    // Gson
    implementation 'com.google.code.gson:gson:2.10.1'
    
    // EventBus
    implementation 'org.greenrobot:eventbus:3.0.0'
    
    // Joda Time
    implementation 'net.danlew:android.joda:2.9.9.4'
    
    // Material Dialogs
    implementation 'com.afollestad.material-dialogs:core:3.3.0'
    implementation 'com.afollestad.material-dialogs:bottomsheets:3.3.0'
    
    // Camera for code scanning
    implementation "androidx.camera:camera-camera2:1.4.2"
    implementation "androidx.camera:camera-lifecycle:1.4.2"
    implementation "androidx.camera:camera-view:1.4.2"
    
    // ML Kit for barcode reading
    implementation 'com.google.android.gms:play-services-mlkit-barcode-scanning:18.3.1'
    
    // Stripe for payments
    implementation('com.stripe:stripe-android:20.38.0') {
        exclude group: 'com.google.code.gson', module: 'gson'
    }
    
    // Adyen for payments
    implementation "com.adyen.checkout:3ds2:4.13.6"
    
    // Firebase (optional)
    implementation 'com.google.firebase:firebase-messaging:23.4.1'
    
    // Other optional dependencies
    implementation 'com.squareup.picasso:picasso:2.71828'
    implementation 'com.github.Cutta:TagView:1.3'
    implementation 'com.github.jinatonic.confetti:confetti:1.1.0'
}
```

### 3. AndroidManifest.xml Configuration

Add the required permissions:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

<uses-feature android:name="android.hardware.camera.any" />
```

Add the SDK activities:

```xml
<activity
    android:name="com.industrialrocket.seatboost.sdk.activity.BarCodeScannerActivity"
    android:exported="false"
    android:windowSoftInputMode="stateHidden" />

<activity
    android:name="com.industrialrocket.seatboost.sdk.activity.HelpActivity"
    android:configChanges="orientation"
    android:screenOrientation="unspecified"
    android:theme="@style/TransparentDialog"
    android:windowSoftInputMode="adjustResize" />
```

### 4. BuildConfig Configuration

Configure environment URLs in your `build.gradle`:

```gradle
android {
    buildTypes {
        debug {
            buildConfigField "String", "BASE_URL", "\"https://dev.bidwinengine.com/\""
            buildConfigField "String", "BASE_V2_URL", "\"https://dev-api.bidwinengine.com/\""
            buildConfigField "String", "BASE_PAYMENT_URL", "\"https://dev-payment.bidwinengine.com/\""
            buildConfigField "String", "BASE_IDENTITY_URL", "\"https://dev-iam.bidwinengine.com/\""
            buildConfigField "String", "DEFAULT_NAME", "\"DEVELOPMENT\""
        }
        
        release {
            buildConfigField "String", "BASE_URL", "\"https://www.bidwinengine.com/\""
            buildConfigField "String", "BASE_V2_URL", "\"https://api.bidwinengine.com/\""
            buildConfigField "String", "BASE_PAYMENT_URL", "\"https://payment.bidwinengine.com/\""
            buildConfigField "String", "BASE_IDENTITY_URL", "\"https://iam.bidwinengine.com/\""
            buildConfigField "String", "DEFAULT_NAME", "\"PROD\""
        }
    }
}
```

## Initialization

### 1. Application Class Setup

```kotlin
class MyApplication : Application() {
    
    override fun onCreate() {
        super.onCreate()
        
        // Initialize the SDK
        val cache = SeatBoostCache()
        SeatBoostSDK.init(
            cache = cache,
            applicationInstance = this,
            defaultEnvironmentName = BuildConfig.DEFAULT_NAME,
            baseAPIUrl = BuildConfig.BASE_URL,
            baseV2APIUrl = BuildConfig.BASE_V2_URL,
            basePaymentUrl = BuildConfig.BASE_PAYMENT_URL,
            baseIdentityUrl = BuildConfig.BASE_IDENTITY_URL,
            appVersion = BuildConfig.VERSION_NAME
        ) { title, enable ->
            // Configure custom logging system
            MyCustomLogger(title, enable)
        }
    }
}
```

### 2. Resources Configuration

In your Activities, configure the SDK resources:

```kotlin
class MainActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Configure SDK resources
        SeatBoostSDK.setResources(resources)
        
        // Rest of your implementation
    }
}
```

## Next Steps

- [Basic Integration Example](examples/basic-integration.md) - Complete Android integration examples
- [UI Integration Example](examples/ui-integration.md) - Android UI integration implementation
- [UI Components](ui/) - SDK UI components documentation
- [REST API](rest-api/) - API endpoints and usage
- [Object Model](object-model/) - Data models and structures
- [Push Notifications](push-notifications/configure-android-app.md) - Android push notification setup
