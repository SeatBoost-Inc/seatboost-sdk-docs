# Getting Started with the Android SDK

This guide outlines the steps to install and configure the SeatBoost Android SDK in your project.

## Requirements

- **Java 17 or later** for both `sourceCompatibility` / `targetCompatibility` and the Kotlin `jvmTarget`. Java 17 is the minimum (the SDK is built with 17).
- **Minimum SDK:** API **26** and above.
- **Data Binding** enabled on the app module. The SDK AAR participates in Data Binding merging.
- **JitPack** in your repository list. The SDK resolves some third-party libraries through JitPack.

## Installation

Follow these steps to add the SDK to your Android application:

1.  **Unzip SDK:** Unzip the provided `seatboost-sdk-android.zip` file.
2.  **Locate Repo:** Inside, you will find a folder that acts as a **local Maven repository** (often named `seatboost` or `seatboostsdk`). Use the folder name and path you receive with your SDK drop.
3.  **Add Maven repositories:** Add the local repository **and** the JitPack repository to your **root** `build.gradle` (or your `settings.gradle` / `dependencyResolutionManagement` repository block, depending on your Gradle setup).

    Place the local Maven folder at a known path (for example `seatboostsdk/` or `libs/seatboost/` at the project root).

    *Example for root `build.gradle` (Groovy):*
    ```groovy
    allprojects {
        repositories {
            google()
            mavenCentral()
            maven { url = uri("https://jitpack.io") }
            maven {
                url = uri("$rootDir/seatboostsdk") // or "$rootDir/libs/seatboost"
            }
        }
    }
    ```

4.  **Add dependency:** In your **app module's** `build.gradle` file, add the SeatBoost SDK. Use the **artifact version supplied with your SDK package** (reference integrations have used `4.0`).

    *Example for app `build.gradle` (Groovy):*
    ```groovy
    dependencies {
        // ... other dependencies
        implementation("com.industrialrocket:seatboost-sdk:4.0")
    }
    ```

5.  **Java language level (minimum 17):** The SDK is compiled with Java 17. Your app must use **17 or later**. If you already use Java 21 (or another newer level), leave your `compileOptions` and Kotlin `jvmTarget` as they are. You only need to change them if they are still below 17:

    ```groovy
    android {
        compileOptions {
            sourceCompatibility JavaVersion.VERSION_17
            targetCompatibility JavaVersion.VERSION_17
        }
    }
    ```

    If the app uses Kotlin and `jvmTarget` is still below 17, set it to `"17"` or to the same newer level you already use for Java.

6.  **Enable Data Binding (required):** The SDK AAR participates in Data Binding merging. Enable Data Binding on the **app** module:

    ```groovy
    android {
        buildFeatures {
            dataBinding true
        }
    }
    ```

7.  **Sync Project:** Sync your Gradle files in Android Studio.

---

## Configuration

The SDK must be initialized before use. We recommend performing this initialization within a custom Android `Application` class.

If you don't have one, create a new class that extends `Application` and register it in your `AndroidManifest.xml`.

When calling `SeatBoostSDK.init()`, you must provide:

- **`context`:** Your `Application` instance.
- **`appVendor`:** The **2-digit IATA code** of the airline consuming the SDK (for example `"AB"`).
- **`defaultEnvironmentName`:** A logical environment name (`"PRE_PROD"` or `"PROD"`). Use the values and **base URLs** provided for your program.
- **Base URLs:** `baseAPIUrl`, `baseV2APIUrl`, `basePaymentUrl`, and `baseIdentityUrl` for your environment. SeatBoost will supply the correct endpoints for each tier.


**Example `MyApplication.kt`:**

```kotlin
import android.app.Application
import android.app.Activity
import android.util.Log
import androidx.fragment.app.Fragment
import com.industrialrocket.seatboost.sdk.cache.SeatBoostCache
import com.industrialrocket.seatboost.sdk.SeatBoostSDK
import com.industrialrocket.seatboost.sdk.model.SBServerError
import com.industrialrocket.seatboost.sdk.utils.SBLog

/**
 * Custom Application class for initializing the SeatBoost SDK.
 * Remember to register this class in your AndroidManifest.xml file.
 *
 * <application
 * android:name=".MyApplication"
 * ... >
 * </application>
 */
class MyApplication : Application() {

    override fun onCreate() {
        super.onCreate()

        // 1. Create an instance of SeatBoostCache
        val mSBCache = SeatBoostCache()

        // 2. Initialize the SeatBoostSDK
        SeatBoostSDK.init(
            cache = mSBCache,
            context = this,
            defaultEnvironmentName = "PRE_PROD",
            appVendor = "AB", // 2-digit IATA code of your airline
            baseAPIUrl = "https://pre-prod.bidwinengine.com/",
            baseV2APIUrl = "https://pre-prod-api.bidwinengine.com/",
            basePaymentUrl = "https://pre-prod-payment.bidwinengine.com/",
            baseIdentityUrl = "https://pre-prod-iam.bidwinengine.com/",
            appVersion = "MyApp/1.0-Android" // Or: "MyApp/${BuildConfig.VERSION_NAME}-Android"
        ) { _, _ ->
            // Return your custom logger implementation
            object : SBLog {
                override fun d(vararg messages: String) {
                    Log.d("SDK", messages.joinToString())
                }

                override fun w(vararg messages: String) {
                    Log.w("SDK", messages.joinToString())
                }

                override fun e(vararg messages: String) {
                    Log.e("SDK", messages.joinToString())
                }

                override fun e(e: Throwable, vararg messages: String) {
                    Log.e("SDK", e.message + ": " + messages.joinToString())
                }

                override fun trackScreen(
                    activity: Activity,
                    fragment: Fragment?,
                    classOverride: String?
                ) {
                    // Implement your analytics screen tracking logic here
                }

                override fun logEvent(
                    name: String,
                    vararg params: Pair<String, Any?>
                ) {
                    // Implement your analytics event logging logic here
                }

                override fun recordException(error: SBServerError) {
                    // Implement your exception reporting logic (e.g., Crashlytics)
                }

                override fun recordException(error: Throwable) {
                    // Implement your exception reporting logic (e.g., Crashlytics)
                }
            }
        }

        // 3. Initialize resources
        SeatBoostSDK.initResources(resources)

        // 4. Set the airline code
        SeatBoostSDK.setAirlineCode("SDK") // Replace "SDK" with the airline code for your integration
    }
}
```
