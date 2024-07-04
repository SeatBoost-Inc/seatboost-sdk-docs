# Configure SeatBoost Service (iOS)

The organization using the SeatBoost SDK must provide the following information to enable push notifications for the application:

* **Apple bundle ID**: You can find your Bundle Identifier in the General tab for your app's primary target in Xcode
* **App nickname**: The app nickname will be used throughout the Firebase console to represent this app. 
* **App Store ID**: You can find your App Store ID in your app's URL. In the example below, 123456789 is the App Store ID. https://itunes.apple.com/us/app/yourapp/id123456789
* **APNs Authentication Key**: Firebase Cloud Messaging will use APNs Authentication KEY to connect with APNs
* **Key ID**: The Key ID associated to the APNs auth key in the apple developer portal.
* **Team ID**: It is a unique identifier assigned to a development team or organization. This identifier is used to distinguish between different developer accounts and teams within the Apple ecosystem. 

The SeatBoost admin team will use these information to configure properly the SeatBoost Service and their Firebase Cloud Messaging environment.
