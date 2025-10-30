# SBHistoryResponse

`open class SBHistoryResponse`

A response model containing historical data related to auctions and upgrades.

---

## Fields

* **currentAuctions**: `List<`[sbauction.md](./sbauction.md)`>`
    * A list of currently active auctions.

* **currentAuctionsTokens**: `Map<String, String>`
    * A dictionary of tokens for current (active) auctions, keyed by auction ID.

* **completedAuctions**: `List<`[sbcompletedauction.md](./sbcompletedauction.md)`>`
    * A list of auctions that have already finished.

* **completedAuctionsTokens**: `Map<String, String>`
    * A dictionary of tokens for completed auctions, keyed by auction ID.

* **instantUpgrades**: `List<`[sbinstantupgrade.md](./sbinstantupgrade.md)`>`
    * A list of instant upgrade history items.

* **instantUpgradeTokens**: `Map<String, String>`
    * A dictionary of tokens for instant upgrades.
