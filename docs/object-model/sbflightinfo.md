# SBFlight

The `SBFlightInfo` class represents a detailed information about a flight.

| **Property Name** | **Type** | **Description** |
|-|-|-|
| `airlineCode` | `String` | The airline's [IATA](https://www.iata.org/) unique code. |
| `arrivalTimeLocal` | `Date?` | Local arrival time at the destination airport. |
| `departureTimeLocal` | `Date?` | Local departure time from the origin airport. |
| `departureTimeUTC` | `Date?` | Departure time in Coordinated Universal Time (UTC). |
| `destination` | `String` | [IATA](https://www.iata.org/) code representing the destination airport. |
| `destinationCity` | `String` | City of the destination airport. |
| `flightNumber` | `String` | Flight number. |
| `origin` | `String` | [IATA](https://www.iata.org/) code representing the origin airport. |
| `originCity` | `String` | City of the origin airport. |
