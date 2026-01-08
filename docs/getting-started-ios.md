# Getting Started with SeatBoost SDK

This guide will walk you through setting up the SeatBoost SDK in your iOS project from scratch.

### Requirements

The SeatBoost SDK requires Xcode 14 or later and is compatible with apps targeting iOS 13.0 or above.

### Installation

The SeatBoost iOS SDK is distributed as an XCFramework that can be integrated into your project via drag-and-drop in Xcode.

## Installation Steps

### 1. Download the XCFramework

Contact the SeatBoost support team to obtain the XCFramework distribution package. Extract `SeatBoostSdk.xcframework` from the distribution package.

### 2. Add Framework to Xcode Project

- Open your Xcode project
- Drag `SeatBoostSdk.xcframework` into your project navigator
- In the dialog, ensure:
  - ✅ **Copy items if needed** is checked
  - Your app target is selected
- Click **Finish**

### 3. Configure Build Settings

- Select your app target in Xcode
- Go to **General** tab
- Under **Frameworks, Libraries, and Embedded Content**:
  - Find `SeatBoostSdk.xcframework`
  - Set it to **Embed & Sign**

### 4. Configure Linker Flags (if using Objective-C)

If your project contains Objective-C code:
- Go to **Build Settings** tab
- Search for **Other Linker Flags**
- Add `-ObjC` (the SDK includes Objective-C categories)

### 5. Add Required Dependencies

The XCFramework has **most dependencies statically linked** into the framework binary. However, some dependencies must be added separately because their types are exposed in the SDK's public API.

**Required Dependencies:**

These **must be added** to your project because their types are part of the SDK's public API:

- **Stripe**
- **StripePayments**
- **StripePaymentsUI**
- **StripeCardScan**
- **SwipeView**
- **MDHTMLLabel**
- **APNumberPad**
- **SwiftSoup**

Add them via CocoaPods or Swift Package Manager. Here's an example using CocoaPods:

```ruby
platform :ios, '13.0'
use_frameworks!

target 'YourApp' do
  # Stripe modules required because Stripe types are part of SeatBoostSdk public API
  pod 'Stripe', '~> 24.5.0'
  pod 'StripePayments', '~> 24.5.0'
  pod 'StripePaymentsUI', '~> 24.5.0'
  pod 'StripeCardScan', '~> 24.5.0'

  # Required because they're used in public API
  pod 'SwipeView'
  pod 'MDHTMLLabel'
  pod 'APNumberPad', '1.1.3'
  pod 'SwiftSoup'

  # Optional: Only if using IberiaPay payment methods
  # pod 'Adyen'
end
```

Then run:
```bash
pod install
```

**Optional Dependencies:**

##### Adyen SDK (Optional)

**Required only if**: Your airline uses IberiaPay payment methods.

Most airlines use Stripe and **do not need** Adyen. Add only if required:

```ruby
pod 'Adyen'
```

##### Firebase (Optional)

Add Firebase if you need push notifications:

```ruby
pod 'Firebase/Messaging'
pod 'Firebase/Analytics'
```

### XCFramework Notes

- **Minimum iOS**: 13.0
- **Swift Version**: 5.9+
- **Privacy Manifest**: Included in the framework
- **Resources**: Storyboards, nibs, fonts, and assets are embedded in the framework
- **Updating**: Replace the `.xcframework` when upgrading to a new SDK version

## Privacy Manifest

The SDK includes a `PrivacyInfo.xcprivacy` file that declares:

- **Email address collection**: For app functionality (not linked, not for tracking)
- **Disk space API access**: Reason code E174.1
- **UserDefaults API access**: Reason code CA92.1

### Handling Multiple PrivacyInfo Files

If your app has its own `PrivacyInfo.xcprivacy` file:

1. **Recommended**: Keep both files separate. iOS will automatically merge them during the build process.
2. **Alternative**: Manually merge the contents. Ensure all declarations from the SDK's privacy manifest are included in your merged file.

If you encounter build errors like "Multiple commands produce PrivacyInfo.xcprivacy", verify that both privacy manifests are properly referenced in their respective targets.

### Configuration

Before you can use the SDK, you must call `configureApp` to set up the SDK with the correct server endpoints and airline identifier. This is a crucial step that should be done when your application launches.

The best place to do this is within your `AppDelegate.swift`'s `application(_:didFinishLaunchingWithOptions:)` method. When calling `configureApp`, you must provide the `appVendor` parameter, which should be set to the **2-digit IATA code** of the airline consuming the SDK. For example, if your airline's IATA code is "AB", use `"AB"` as the `appVendor` value.

```Swift
import SeatBoostSdk

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    let deviceId = UIDevice.current.identifierForVendor?.uuidString

    SBSdk.shared.configureApp(appVendor: "AB", // 2-digit IATA code of your airline
                              serverURL: Config.shared.serverUrl,
                              serverV2URL: Config.shared.serverV2Url,
                              identityServerUrl: Config.shared.identityServerUrl,
                              paymentServerUrl: Config.shared.paymentServerUrl,
                              deviceId: deviceId!)
    SBSdk.shared.initialize()
				
    // Existing code.
}
```
