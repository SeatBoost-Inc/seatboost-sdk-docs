# SBFlight

The `SBFlight` class encapsulates information about a flight and its upgrades.

| Property Name             | Type                                               | Description                                                              |
|---------------------------|----------------------------------------------------|--------------------------------------------------------------------------|
| `airlineCode`             | `String`                                           | The airline's [IATA](https://www.iata.org/) unique code.                 |
| `arrivalTimeLocal`        | `Date?`                                            | Local arrival time at the destination airport.                           |
| `arrivalTimeUTC`          | `Date?`                                            | Arrival time in Coordinated Universal Time (UTC).                        |
| `currency`                | `String`                                           | Currency used in the auction.                                            |
| `currencySymbol`          | `String`                                           | Currency symbol, e.g., `$` , `€` , etc.                                  |
| `departureTimeLocal`      | `Date?`                                            | Local departure time from the origin airport.                            |
| `departureTimeUTC`        | `Date?`                                            | Departure time in Coordinated Universal Time (UTC).                      |
| `destination`             | `String`                                           | [IATA](https://www.iata.org/) code representing the destination airport. |
| `destinationCity`         | `String`                                           | City of the destination airport.                                         |
| `duration`                | `String`                                           | Duration of the flight.                                                  |
| `eligibilityErrorMessage` | `String`                                           | Error message related to eligibility for upgrades.                       |
| `flightNumber`            | `String`                                           | Flight number.                                                           |
| `origin`                  | `String`                                           | [IATA](https://www.iata.org/) code representing the origin airport.      |
| `originCity`              | `String`                                           | City of the origin airport.                                              |
| `tips`                    | <code>[[SBTip](object-model/sbtip)]</code>         | Array of tips associated with the flight.                                |
| `upgrades`                | <code>[[SBUpgrade](object-model/sbupgrade)]</code> | Array of upgrades available for the flight.                              |
