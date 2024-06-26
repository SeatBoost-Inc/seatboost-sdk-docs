# SBAirline

The `SBAirline` class is designed to encapsulate the attributes associated with an airline entity.

| **Property Name**   | **Type**              | **Description**                                                                                                  |
|---------------------|-----------------------|------------------------------------------------------------------------------------------------------------------|
| `code`              | `String`              | The airline's [IATA](https://www.iata.org/) unique code.                                                         |
| `customMerchantKey` | `Map<String, Object>` | JSON attribute containing configuration data for custom payment platforms (if the airline doesn't allow Stripe). |
| `icons`             | `[String]`            | Array of paths of icons associated with the airline.                                                             |
| `name`              | `String`              | The human-readable name of the airline.                                                                          |
| `requestInvoiceUrl` | `String`              | URL for requesting an invoice from the airline.                                                                  |
| `resources`         | `Map<String, String>` | Localization resources, including global and airline specific resources.                                         |
| `theme`             | `Map<String, Object>` | Theme-related information for the airline (optional).                                                            |
| `usesSignedBarcode` | `Bool`                | Indicates if the airline uses signed barcodes.                                                                   |

