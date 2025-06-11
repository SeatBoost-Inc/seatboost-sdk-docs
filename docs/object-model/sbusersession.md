# SBUserSession

The `SBUserSession` class manages the state of a user's session.

| **Property Name** | **Type** | **Description** |
|-|-|-|
| `activeAuctions` | `[SBAuction]` | An array of currently active auctions the user is participating in. |
| `authToken` | `String` | The primary authentication token for the user. |
| `bidder` | `SBBidder` | Information about the current bidder. |
| `completedAuctions` | `[SBCompletedAuction]` | An array of auctions the user has participated in that have completed. |
| `instantUpgrades` | `[SBInstantUpgrade]` | An array of instant upgrades the user has bought. |
| `refreshToken` | `String` | A token used to refresh the authToken. |
| `rewards` | `[SBReward]` | An array of rewards earned by the user. |
