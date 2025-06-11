# SBIberiaPayComponent

The `SBIberiaPayComponent` class contains information about the 3DS Action that should be performed by the mobile app.

| **Property Name** | **Type** | **Description** |
|-|-|-|
| `action` | <code>[SBIberiaPayAction](object-model/sbiberiapayaction)?</code> | 3DS Action object to be used by [Adyen](https://www.adyen.com/) SDK in order to handle the 3DS action. |
| `provider` | `String` | Provider of the 3DS Action, should be always "Adyen". |
| `result` | `Map<String, Object>?` | Result data of the 3DS Action. |

