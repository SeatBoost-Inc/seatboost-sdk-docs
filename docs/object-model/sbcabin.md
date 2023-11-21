# SBCabin

The `SBCabin` class describe the features of an aircraft cabin. It is referenced
by [`SBAircraft`](object-model/sbaircraft).

| Property Name  | Type                                                          | Description                                                                         |
|----------------|---------------------------------------------------------------|-------------------------------------------------------------------------------------|
| `classCode`    | `String`                                                      | Code of the cabin/seat class.                                                       |
| `cabinVisuals` | <code>[[SBCabinVisual](object-model/sbcabinvisual.md)]</code> | Array of [SBCabinVisual](object-model/sbcabinvisual.md) representing cabin details. |
| `description`  | `String`                                                      | Textual description of the cabin features.                                          |
