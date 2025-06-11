# SBAuctionPaymentResponse

The `SBAuctionPaymentResponse` class contains information about the payment and is associated with an auction. It extends [`SBAuctionResponse`](object-model/sbauctionresponse) and is extended by [`SBJoinResponse`](object-model/sbjoinresponse).

| **Property Name** | **Type** | **Description** |
|-|-|-|
| `paymentStatus` | `String` | Status of the payment. This attribute is only present on responses from Join or Buy Now requests. |
| `threeDSParams` | <code>[SBThreeDSParams](object-model/sbthreedsparams.md)</code> | Params related to a 3DS request from a payment platform. |


