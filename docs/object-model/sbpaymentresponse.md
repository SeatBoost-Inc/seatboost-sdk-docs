# SBPaymentResponse

The `SBPaymentResponse` The class represents the response from a payment processing attempt when joining an auction, processing an instant upgrade, or buying now.

| **Property Name** | **Type** | **Description** |
|-|-|-|
| `paymentStatus` | `String` | The payment status (e.g., "requires_action"). |
| `threeDSParams` | `SBThreeDSParams?` | Optional 3D Secure parameters when futher authorization is required. |
