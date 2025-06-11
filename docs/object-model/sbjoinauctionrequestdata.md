# SBJoinAuctionRequestData

| **Property Name** | **Type** | **Description** |
|-|-|-|
| `auctionId` | `String` | Identifier for the auction. |
| `displayName` | `String` | TODO. |
| `paymentMethodId` | `String` | ID of the payment method. |
| `secondPaymentMethodId` | `String` | ID of the second payment method/card. Will be used after the auction ends if the user bid exceeds the pre-authorized amount. |
| `confirmationNumber` | `String` | Passenger Name Record (PNR) of the flight related to the boarding pass. |
| `passengers` | `[SBPassenger] | Array of passengers associated with PNR. |
| `startBidValue` | `Int` | TODO. |
| `extraPaymentDetails` | `NSDictionary?` | Extra payment details required by the IberiaPay service. Which include information like "vaultId", "firstName", "lastName", etc.|