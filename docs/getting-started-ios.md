# Getting Started with SeatBoost SDK

This guide will walk you through setting up the SeatBoost SDK in your iOS project from scratch.

### Requirements

The SeatBoost SDK requires XCode 14 or later and is compatible with apps targeting iOS 13 or above.

### Installation

- Move the SeatBoostSdk.xcframework into the target project in XCode. Choose the option to copy files to destination.
- Go to the project configuration, select `General` tab, make sure that SeatBoostSdk is in section `Frameworks, Libraries, and Embedded Contents` and select option `Embed & Sign`.
- Install the SeatBoostSdk dependencies to the project:

```Podfile
    pod 'AFNetworking', :git => 'https://github.com/dalmer/AFNetworking', :branch => '2.x.NoWebView'
    pod 'AMXFontAutoScale', '~> 1.2'
    pod 'APNumberPad', '1.1.3'
    pod 'DeviceKit', '~> 1.0'
    pod 'FontAwesome.swift', '1.4.4'
    pod 'MDHTMLLabel', :git => 'https://github.com/mattdonnelly/MDHTMLLabel', :branch => 'master'
    pod 'MMMarkdown'
    pod 'NTPKit'
    pod 'ISO8601DateFormatter'
    pod 'SDWebImage'
    pod 'Stripe', '~> 24.5.0'
    pod 'StripeCardScan', '~> 24.5.0'
    pod 'SwiftSoup'
    pod 'SwipeView'
    pod 'TPKeyboardAvoiding'
    pod 'Adyen'
```

Please, contact SeatBoost support team to obtain the SDK binary version for integration into your application.

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
