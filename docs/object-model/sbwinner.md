# SBWinner

The `SBWinner` class represents a boarding pass. It is referenced by [`SBAuction`](object-model/sbauction).

| Property Name        | Type     | Description                                                              |
|----------------------|----------|--------------------------------------------------------------------------|
| `confirmationNumber` | `String` | Confirmation number for the winner.                                      |
| `refNumber`          | `String` | Reference number associated with the winner.                             |
| `givenName`          | `String` | Given name of the winner on the boarding pass.                           |
| `surname`            | `String` | Surname of the winner on the boarding pass.                              |
| `seatNumber`         | `String` | Seat number assigned to the boarding pass.                               |
| `barcode`            | `String` | Barcode of the boarding pass.                                            |
| `gate`               | `String` | Gate for boarding.                                                       |
| `boardingTime`       | `String` | Boarding time.                                                           |
| `boardingGroup`      | `String` | Boarding group.                                                          |
| `carryOn`            | `String` | Information about the carry-on for the winner.                           |
| `origin`             | `String` | [IATA](https://www.iata.org/) code representing the origin airport.      |
| `destination`        | `String` | [IATA](https://www.iata.org/) code representing the destination airport. |
| `departureDate`      | `Date?`  | Departure date of the flight.                                            |
