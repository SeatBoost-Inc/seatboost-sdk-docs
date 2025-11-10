# Getting Started with SeatBoost SDK

This guide will walk you through setting up the SeatBoost SDK in your iOS project from scratch.

### Requirements

The SeatBoost SDK requires XCode 14 or later and is compatible with apps targeting iOS 13 or above.

### Installation

The SeatBoost SDK is distributed as a local pod that includes all necessary dependencies. Follow these steps to integrate it into your project:

#### 1. Obtain the SDK Package

Contact the SeatBoost support team to obtain the `seatboost-ios-sdk.zip` file, which contains the complete SDK repository.

#### 2. Extract and Setup the SDK

1. Extract the `seatboost-ios-sdk.zip` file to your project parent directory
2. Ensure the extracted folder is named `seatboost-ios-sdk` and is located at the same level as your main app project

#### 3. Update Your Podfile

Update your main app's `Podfile` to include the SeatBoost SDK as a local pod. Add the following configuration:

- Use the base `SeatBoostSdk` pod for the standard (Stripe-based) payment flows.
- If your airline requires Adyen through IberiaPay, also include the optional `SeatBoostSdk/IberiaPay` subspec to enable the Adyen dependencies.

```Podfile
platform :ios, '13.0'
use_frameworks!

target 'YourAppName' do
  # YourApp pods
  # ...

  # Override specific SDK dependencies that need custom git sources
  pod 'AFNetworking', :git => 'https://github.com/dalmer/AFNetworking', :branch => '2.x.NoWebView'
  pod 'MDHTMLLabel', :git => 'https://github.com/mattdonnelly/MDHTMLLabel', :branch => 'master'

  # Main SDK - this will automatically pull in all other dependencies
  pod 'SeatBoostSdk', :path => '../seatboost-ios-sdk/SeatBoostSdk-Local.podspec'

  # Optional: Adyen support for airlines using IberiaPay
  # pod 'SeatBoostSdk/IberiaPay', :path => '../seatboost-ios-sdk/SeatBoostSdk-Local.podspec'
  
  # Optional: Add Firebase if push notifications are needed
  # pod 'FirebaseAnalytics'
  # pod 'Firebase/Crashlytics'
  # pod 'Firebase/Messaging'
end

# Script to fix deployment target for old libraries
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      # Fix deployment target/architecture for libraries that have old targets
      if ['SwipeView', 'NTPKit', 'AFNetworking', 'DeviceKit', 'FontAwesome.swift', 'MDHTMLLabel', 'MMMarkdown', 'APNumberPad', 'ISO8601DateFormatter', 'AMXFontAutoScale'].include?(target.name)
        config.build_settings['ONLY_ACTIVE_ARCH'] = 'NO'
        config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
        config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '13.0'
      end
    end
  end
end
```

#### 4. Install Dependencies

Run the following command in your project directory:

```bash
pod install
```

#### 5. Configure Xcode Build Settings

**Important:** You must disable "User script sandboxing" in your Xcode project build settings:

1. Open your project workspace in Xcode (e.g., `YourAppName.xcworkspace`)
2. In the project navigator, select your app target
3. Go to **Targets** → **YourAppName** → **Build Options**
4. Find "User Script Sandboxing" and set it to **No**

This step is required for the SDK to function properly with the local pod installation.

### Configuration

Before you can use the SDK, you must configure it with the correct server endpoints. This is a crucial step that should be done when your application launches.

The best place to do this is within your `AppDelegate.swift`'s `application(_:didFinishLaunchingWithOptions:)` method.

```Swift
import SeatBoostSdk

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    let deviceId = UIDevice.current.identifierForVendor?.uuidString

    SBSdk.shared.configureApp(appVendor: "AeroBest",
                                  serverURL: Config.shared.serverUrl,
                                  serverV2URL: Config.shared.serverV2Url,
                                  identityServerUrl: Config.shared.identityServerUrl,
                                  paymentServerUrl: Config.shared.paymentServerUrl,
                                  deviceId: deviceId!)
    SBSdk.shared.initialize()
				
    // Existing code.
}
```
