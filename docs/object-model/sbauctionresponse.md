# SBAuctionResponse

The `SBAuctionResponse` class contains information about an auction and other related available auctions.
It is extended by [`SBAuctionPaymentResponse`](object-model/sbauctionpaymentresponse).

| **Property Name** | **Type** | **Description** |
|-|-|-|
| `auction` | <code>[SBAuction](object-model/sbauction)?</code> | The auction details. |
| `availableAuctions` | <code>[[SBAvailableAuction](object-model/sbavailableauction)]?</code> | An array of other available auctions for the same flight. |
