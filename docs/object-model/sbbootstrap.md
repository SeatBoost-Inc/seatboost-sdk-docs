# SBBooststrap

The `SBBootstrap` class represents the bootstrap configuration for the SDK.

| **Property Name** | **Type** | **Description** |
|-|-|-|
| `airlines` | <code>[[SBAirline](object-model/sbairline)]</code> | An array of airlines that support auctions. |
| `appExpirationDate` | `String` | The app expiration date represented by a string. |
| `appReviewCallTime` | `Int?` | Delay in seconds to call the "review app" dialog in the Result Screen. |
| `configSecrets` | `String` | Configuration screts used to switch environment. |
| `finalRoundPercentWarning` | `Int?` | An optional percentage used for final round warnings calculations. |
| `iosMinVersion` | `String` | The minimum iOS version required for the SDK. |
| `messages` | `Map<String, String>` | A dictionary of global messages, keyed by message id. |
| `nonAuctionableAirlines` | <code>[[SBAirline](object-model/sbairline)]</code> | An array of airlines that do not support auctions. |
| `paymentServiceUrl` | `String` | The URL for the payment service. |
| `resources` | `Map<String, String>` | A dictionary with commom SDK resources, keyed bu resource name. |
| `stripeKey` | `String` | The Stripe key. |
