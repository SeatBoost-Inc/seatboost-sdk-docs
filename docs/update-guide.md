# Update Guide (3.8 → 4.0)

Use this checklist when upgrading a third-party airline app from SeatBoost SDK **3.8** to **4.0**.

Third-party apps follow the same integration as the Aerobest sample apps: the host owns login, history, and PNR lookup; the SDK owns the auction screens (`SBAirlineFlow` on Android, `SBBasicFlowController` on iOS).

---

## Android

See [Getting Started - Android](getting-started-android.md) and [Basic Integration](examples-android/basic-integration-android.md).

- [ ] **Local Maven folder:** replace with the 4.0 `seatboost-sdk-android.zip` contents.
- [ ] **`settings.gradle`:** point the local `maven` URL at that 4.0 folder.

```groovy
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        maven { url = uri("https://jitpack.io") }
        maven { url = uri("${rootDir}/seatboostsdk") }
    }
}
```

- [ ] **`build.gradle`:** bump the SDK artifact from `3.8` to `4.0`.

```groovy
implementation("com.industrialrocket:seatboost-sdk:4.0")
```

- [ ] **`build.gradle`:** set Java 17 (or later) for `sourceCompatibility`, `targetCompatibility`, and Kotlin `jvmTarget` if it is below 17.

```groovy
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
}
```

- [ ] **Sync Gradle** and rebuild.

---

## iOS

See [Getting Started - iOS](getting-started-ios.md) and [Basic Integration](examples-ios/basic-integration-ios.md).

- [ ] **`SeatBoostSdk.xcframework`:** replace with the 4.0.0 package. Set it to **Embed & Sign**.
- [ ] **Xcode:** use 15 or later (iOS 13.0+, Swift 5.9+).
- [ ] **Clean** the project and rebuild.
