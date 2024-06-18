# SBAuctionPaymentResponse

The `SBAuctionPaymentResponse` class contains information about the payment and is associated with an auction.
It extends [`SBAuctionResponse`](object-model/sbauctionresponse) and is extended
by [`SBJoinResponse`](object-model/sbjoinresponse).

| Property Name   | Type     | Description                                                                                                                         |
|-----------------|----------|-------------------------------------------------------------------------------------------------------------------------------------|
| `paymentId`     | `String` | Identifier for the payment method used. This attribute is only present on responses from Join or Buy Now requests.                  |
| `paymentSecret` | `String` | Secret key for the payment associated with the response. This attribute is only present on responses from Join or Buy Now requests. |
| `paymentStatus` | `String` | Status of the payment. This attribute is only present on responses from Join or Buy Now requests.                                   |

