# SBAuthV2Response

The `SBAuthV2Response` class represents the response returned after a successful authentication request.

| **Property Name** | **Type**                                                       | **Description**                                                               |
| ----------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `access`          | [`SBAuthV2TokenWrapper`](./sbauthv2tokenwrapper.md) | Contains the access token used for authorized API requests.                   |
| `refresh`         | [`SBAuthV2TokenWrapper`](./sbauthv2tokenwrapper.md) | Contains the refresh token used to obtain new access tokens when they expire. |
| `bidder`          | [`SBBidder`](./sbbidder.md)            | Information about the authenticated bidder, if applicable.                    |
