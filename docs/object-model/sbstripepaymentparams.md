# SBStripePaymentParams

The `SBStripePaymentParams` class extends the [`SBPaymentParams`](object-model/sbpaymentparams) class and contains the
params for a Stripe Payment.

| Property Name           | Type     | Description                                                                                                                  |
|-------------------------|----------|------------------------------------------------------------------------------------------------------------------------------|
| `secondPaymentMethodId` | `String` | ID of the second payment method/card. Will be used after the auction ends if the user bid exceeds the pre-authorized amount. |
