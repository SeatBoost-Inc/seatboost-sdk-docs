# SBPassenger

The `SBPassenger` class represents a passenger of a flight.

| **Property Name** | **Type** | **Description** |
|-|-|-|
| `available` | `Bool` | A property indicating if the passenger is currently available for selection or an upgrade action. Defaults to `true`. |
| `canUpgrade` | `Bool?` | Indicates whether the passenger is eligible to an upgrade. |
| `fullName` | `String` | The full name of the passenger (givenName + surname). |
| `givenName` | `String` | Given name of the passenger. |
| `notAvailableUpgradeOption` | `SBUpgradeOption` | A property indicating the upgrade option for which this passenger is not available, if any. Defaults to `.none`. |
| `refNumber` | `String` | Reference number from the airline that represents the user on a Passenger Name Record (PNR). |
| `surname` | `String` | Surname of the passenger. |
| `type` | `String?` | An optional string indicating the type of passenger. |
