# SBWinner

The `SBWinner` class represents a boarding pass. It is referenced by [`SBAuction`](object-model/sbauction).

| Property Name        | Type     | Description                                                                      |
|----------------------|----------|----------------------------------------------------------------------------------|
| `barcode`            | `String` | Barcode of the boarding pass.                                                    |
| `boardingGroup`      | `String` | Boarding group.                                                                  |
| `boardingTime`       | `String` | Boarding time.                                                                   |
| `carryOn`            | `String` | Information about the carry-on for the winner.                                   |
| `confirmationNumber` | `String` | Passenger Name Record (PNR) of the flight related to the boarding pass.          |
| `departureDate`      | `Date?`  | Departure date of the flight.                                                    |
| `destination`        | `String` | [IATA](https://www.iata.org/) code representing the destination airport.         |
| `gate`               | `String` | Gate for boarding.                                                               |
| `givenName`          | `String` | Given name of the winner on the boarding pass.                                   |
| `origin`             | `String` | [IATA](https://www.iata.org/) code representing the origin airport.              |
| `refNumber`          | `String` | Reference number from the airline that represents which user this is on the PNR. |
| `seatNumber`         | `String` | Seat number assigned to the boarding pass.                                       |
| `surname`            | `String` | Surname of the winner on the boarding pass.                                      |





