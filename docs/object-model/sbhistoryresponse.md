# SBHistoryResponse

Contains the history of auctions and instant upgrades.

---

## Fields

| **Property Name** | **Type** | **Description** |
|-|-|-|
| `currentAuctions` | `List<`[SBAuction](./sbauction.md)`>` | A list of currently ongoing auctions. |
| `currentAuctionsTokens` | `Map<String, String>` | A dictionary of tokens for ongoing auctions, keyed by the auction ID. |
| `completedAuctions` | `List<`[SBCompletedAuction](./sbcompletedauction.md)`>` | List of closed auctions. |
| `completedAuctionsTokens` | `Map<String, String>` | A dictionary of tokens for closed auctions, keyed by the auction ID. |
| `completedAuctions` | `List<`[SBInstantUpgrade](./sbinstantupgrade.md)`>` | List of instant upgrades. |
| `instantUpgradeTokens` | `Map<String, String>` | A dictionary of tokens for instant upgrades, keyed by the instant upgrade ID. |
