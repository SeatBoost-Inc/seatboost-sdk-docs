# SBAvailableAuction

The `SBAvailableAuction` class represents an alternative auction to the "main one" present on
a [`SBAuctionResponse`](object-model/sbauctionresponse).

| Property Name | Type                                              | Description                                                        |
|---------------|---------------------------------------------------|--------------------------------------------------------------------|
| `auction`     | <code>[SBAuction](object-model/sbauction)?</code> | The available auction details.                                     |
| `status`      | `String`                                          | Status of the available auction.                                   |
| `pnr`         | `String`                                          | Passenger Name Record (PNR) associated with the available auction. |
