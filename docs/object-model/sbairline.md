# SBAirline

The `SBAirline` class is designed to encapsulate the attributes associated with an airline entity.

| **Property Name** | **Type** | **Description** |
|-|-|-|
| `additionalStartingBid` | `Bool` | Indicates if the bidder will have the possibility to input an additional bid before joining the auction. This should enables a block view in the upgrade selection screen. |
| `code` | `String` | The airline's [IATA](https://www.iata.org/) unique code. |
| `customMerchantKey` | `Map<String, Object>` | JSON attribute containing configuration data for custom payment platforms (if the airline doesn't allow Stripe). |
| `icons` | `[String]` | Array of paths of icons associated with the airline. |
| `name` | `String` | The human-readable name of the airline. |
| `paymentMethod` | <code>[SBAirlinePaymentMethod](object-model/sbairlinepaymentmethod.md)</code> | The payment method that will be used for the airline. |
| `requestInvoiceUrl` | `String` | URL for requesting an invoice from the airline. |
| `resources` | `Map<String, String>` | Localization resources, including global and airline specific resources. |
| `singleBidderLeaderboard` | `Bool` | Indicates if the airline should show single leaderboard when there is only one bidder in the auction. |
| `theme` | `Map<String, Object>` | Theme-related information for the airline (optional). |
| `usesSignedBarcode` | `Bool` | Indicates if the airline uses signed barcodes. |
