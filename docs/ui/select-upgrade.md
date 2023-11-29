# Select Upgrade Screen

> The first UI component is the Select Upgrade Screen. It is used to select and fill all the initial and required information to join to an auction before select the payment method. 

<table width="100%" style="border-collapse: collapse; border: none;">
    <tr valign="top">
        <td width="25%">
            <img src="ui/images/select-upgrade-1.png"/>
        </td>
        <td width="70%">
            <p>It starts with a list of available flights, displaying relevant information about them. Users can browse through the list and select a desired flight. Once a flight is chosen, there might be presented a list of available upgrades for the selected flight. This could include options like premium seating, business class, or other upgrade choices. Users can view details of each upgrade option, including amenities and start bid.</p>
        </td>
    </tr>
    <tr valign="top">
        <td width="25%">
            <img src="ui/images/select-upgrade-2.png"/>
        </td>
        <td width="70%">
            <p>Eventually, following the upgrade selection, users are prompted to specify the passengers who will be included in the upgrade, see screen below. Before confirming the upgrade (and the passengers if needed), the user is asked to provide a display name that will be used in the upgrade auction process. This display name could be a username or any identifier the user is comfortable with.</p>
        </td>
    </tr>
</table>

## SBSelectUpgradeController

> In order to use this UI component on your application you have to initialize it with some fields:

| **Property Name** | **Type**                                           | **Description**                                                 |
|-------------------|----------------------------------------------------|-----------------------------------------------------------------|
| upgradeContext    | [SBUpgradeContext!](object-model/sbupgradecontext) | The upgrade context data used to pre populate the screen        |
| delegate          | `SBSelectUpgradeControllerDelegate!`               | The delegate instance used to receive the user interface events |


> [!WARNING]
> At least **selectedAirline** and **findAuctionResult** should be provided in the **upgradeContext** object to get the component working


## SBSelectUpgradeControllerDelegate

* onSelect: this method is called when the user selects/fills all the screen fields and clicks on the **Ready to Bid** button. The component will pass the flight/upgrade/paasengers/username parameters to the delegate instance.

* onGotoAuction: this method is called when the user selects an active (running ) or finished auction.


```swift
public protocol SBSelectUpgradeControllerDelegate: AnyObject {
    func onSelect(upgradeContext: SBUpgradeContext!)
    func onGotoAuction(auctionId: String)
}
```
