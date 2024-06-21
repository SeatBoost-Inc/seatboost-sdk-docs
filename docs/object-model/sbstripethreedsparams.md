# SBStripeThreeDSParams

The `SBStripeThreeDSParams` class extends the [`SBThreeDSParams`](object-model/sbthreedsparams) class and contains the
params for a Stripe 3DS Action that should be performed by the mobile app.

| Property Name   | Type     | Description                                                                                                                         |
|-----------------|----------|-------------------------------------------------------------------------------------------------------------------------------------|
| `paymentId`     | `String` | Identifier for the payment method used. This attribute is only present on responses from Join or Buy Now requests.                  |
| `paymentSecret` | `String` | Secret key for the payment associated with the response. This attribute is only present on responses from Join or Buy Now requests. |
