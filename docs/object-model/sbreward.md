# SBReward

The `SBReward` class represents a reward for the authenticated user. It is referenced
by [`SBAuction`](object-model/sbauction).

| Property Name       | Type     | Description                                         |
|---------------------|----------|-----------------------------------------------------|
| `rewardId`          | `Int`    | Unique identifier for the reward.                   |
| `type`              | `String` | The type or category of the reward.                 |
| `text`              | `String` | Textual description of the reward.                  |
| `siteUrl`           | `String` | URL associated with the reward.                     |
| `termsOfServiceUrl` | `String` | URL for the terms of service related to the reward. |
| `iconPath`          | `String` | Path or filename for the reward icon.               |
| `fullIconPath`      | `String` | Full path or URL for the reward icon.               |
| `expirationDate`    | `Date?`  | Date when the reward expires (if applicable).       |
| `code`              | `String` | Code associated with the reward (if applicable).    |
