# SBAvailableAuction

The `SBAvailableAuction` class represents an alternative auction to the "main one" present on
a [`SBAuctionResponse`](object-model/sbauctionresponse).

| Property Name | Type                                              | Description                                                        |
|---------------|---------------------------------------------------|--------------------------------------------------------------------|
| `auction`     | <code>[SBAuction](object-model/sbauction)?</code> | The available auction details.                                     |
| `pnr`         | `String`                                          | Passenger Name Record (PNR) associated with the available auction. |
| `status`      | `String`                                          | Status of the available auction.                                   |

