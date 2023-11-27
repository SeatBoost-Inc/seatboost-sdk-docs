# End Auction Screen

> This screen is used to show the flight upgrade auction status after it has finished or after the user buy an instant upgrade.

<table width="100%" style="border-collapse: collapse; border: none;">
    <tr valign="top">
        <td width="25%">
            <img src="ui/images/end-auction-1.jpg"/>
        </td>
        <td width="70%">
        </td>
    </tr>
    <tr valign="top">
        <td width="25%">
            <img src="ui/images/end-auction-2.jpg"/>
        </td>
        <td width="70%">
        </td>
    </tr>
    <tr valign="top">
        <td width="25%">
            <img src="ui/images/end-auction-3.jpg"/>
        </td>
        <td width="70%">
        </td>
    </tr>
</table>

## SBEndAuctionController

> In order to use this UI component on your application you have to initialize it with some fields:

| **Property Name**        | **Type**                           | **Description**                                                   |
|--------------------------|------------------------------------|-------------------------------------------------------------------|
| currentAuction           | `SBAuction?`                       | The auction instance                                              |
| currentAuctionToken      | `String`                           | The auction token                                                 |
| currentAvailableAuctions | [SBAvailableAuction]?              | An array of SBAvailableAuction                                    |
| delegate                 | `SBEndAuctionControllerDelegate!`  | The delegate instance used to receive the user interface events   |

## SBEndAuctionControllerDelegate

```swift
public protocol SBEndAuctionControllerDelegate: AnyObject {
    func onGotoAvailableAuction(_ availableAuction: SBAvailableAuction)
    func onGotoAuction(_ auction: SBAuctionBase)
}
```