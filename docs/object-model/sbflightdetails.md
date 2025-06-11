# SBFlightDetails

The `SBFlightDetails` class encapsulates some information about the details of a flight. It is referenced
by [`SBAuction`](object-model/sbauction).

| **Property Name** | **Type** | **Description** |
|-|-|-|
| `aircraftType` | `String` | The type of aircraft for the flight. |
| `arrivalGate` | `String` | The arrival gate at the destination airport. |
| `arrivalTerminal` | `String` | The arrival terminal at the destination airport. |
| `arrivalTimeLocal` | `Date?` | Local arrival time at the destination airport. |
| `boardingTimeLocal` | `Date?` | Local boarding time for the flight. |
| `departureGate` | `String` | The departure gate at the origin airport. |
| `departureTerminal` | `String` | The departure terminal at the origin airport. |
| `originalDepartureGate` | `String` | The original departure gate before any changes. |
| `originalDepartureTerminal` | `String` | The original departure terminal before any changes. |
| `status` | `String` | The status of the flight (e.g., scheduled, delayed, departed). |
