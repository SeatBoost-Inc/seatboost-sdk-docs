# SBBuyNowRequestData

The `SBBuyNowRequestData` class represents the body data to make a "Buy Now" request for an upgrade.

| **Property Name** | **Type** | **Description** |
|-|-|-|
| `auctionId` | `String` | The ID of the auction associated with the Buy Now. |
| `confirmationNumber` | `String` | The confirmation number (PNR) for the booking. |
| `currency` | `String` | The currency code for the price (e.g., "USD"). |
| `haulType` | <code>[[SBHaulType](object-model/sbhaultype)]</code> | The haul type of the flight (e.g., short haul, long haul). |
| `passengers` | <code>[[SBPassenger](object-model/sbpassenger)]</code> | An array of passengers for whom the upgrade is being purchased. |
| `paymentParams` | <code>[SBPaymentParams](object-model/sbpaymentparams)?</code> | Optional payment parameters for processing the transaction. |
| `price` | `Int` | The price for the Buy Now upgrade. |
