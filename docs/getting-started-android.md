# Getting Started with the Android SDK

This guide outlines the steps to install and configure the SeatBoost Android SDK in your project.

## Installation

Follow these steps to add the SDK to your Android application:

1.  **Unzip SDK:** Unzip the provided `seatboost-sdk-android.zip` file.
2.  **Locate Repo:** Inside, you will find a folder named `seatboost`. This folder is a local Maven repository.
3.  **Add Maven Repo:** Add this local repository to your **root** project's `build.gradle` file. Place the `seatboost` folder (e.g., within a `libs` directory) in your project's root.

    *Example for root `build.gradle` (Groovy):*
    ```groovy
    allprojects {
        repositories {
            // ... other repositories
            maven {
                url = uri("$rootDir/libs/seatboost")
            }
        }
    }
    ```

4.  **Add Dependency:** In your **app module's** `build.gradle` file, add the SeatBoost SDK as a new dependency:

    *Example for app `build.gradle` (Groovy):*
    ```groovy
    dependencies {
        // ... other dependencies
        implementation("com.industrialrocket:seatboost-sdk:1.0.0")
    }
    ```

5.  **Sync Project:** Sync your Gradle files in Android Studio.

---

## Configuration

The SDK must be initialized before use. We recommend performing this initialization within a custom Android `Application` class.

If you don't have one, create a new class that extends `Application` and register it in your `AndroidManifest.xml`.

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

        // 1. Create an instance of the SeatBoostCache
        val mSBCache = SeatBoostCache()

        // 2. Initialize the SeatBoostSDK
        SeatBoostSDK.init(
            cache = mSBCache,
            context = this,
            defaultEnvironmentName = "PRE_PROD",
            baseAPIUrl = "[https://pre-prod.bidwinengine.com/](https://pre-prod.bidwinengine.com/)",
            baseV2APIUrl = "[https://pre-prod-api.bidwinengine.com/](https://pre-prod-api.bidwinengine.com/)",
            basePaymentUrl = "[https://pre-prod-payment.bidwinengine.com/](https://pre-prod-payment.bidwinengine.com/)",
            baseIdentityUrl = "[https://pre-prod-iam.bidwinengine.com/](https://pre-prod-iam.bidwinengine.com/)",
            appVersion = "AeroBest/1.0-Android" // Replace with your app name/version
        ) { title, enable ->
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
