# SBAirline

The `SBAirline` class is designed to encapsulate the attributes associated with an airline entity.

| **Property Name** | **Type** | **Description** |
| ---| ---| --- |
| `code` | `String` | The airline's [IATA](https://www.iata.org/) unique code. |
| `name` | `String` | The human-readable name of the airline. |
| `theme` | `Map<String, Object>` | Theme-related information for the airline (optional). |
| `icons` | `[String]` | Array of paths of icons associated with the airline. |
| `requestInvoiceUrl` | `String` | URL for requesting an invoice from the airline. |
| `usesSignedBarcode` | `Bool` | Indicates if the airline uses signed barcodes. |
