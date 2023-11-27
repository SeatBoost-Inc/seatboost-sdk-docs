# Select Upgrade Screen

> bla bla bla

![Select Upgrade](images/select-upgrade-1.jpg "Select Upgrade")
![Select Upgrade with Passengers](images/select-upgrade-2.jpg "Select Upgrade with Passengers")

## SBSelectUpgradeController

> In order to use this UI component on your application you have to initialize it with some fields:

| **Property Name** | **Type**                                           | **Description**                                                 |
|-------------------|----------------------------------------------------|-----------------------------------------------------------------|
| upgradeContext    | [SBUpgradeContext!](object-model/sbupgradecontext) | The upgrade context data used to pre populate the screen        |
| delegate          | `SBSelectUpgradeControllerDelegate!`               | The delegate instance used to receive the user interface events |

> At least ```selectedAirline``` and ```findAuctionResult``` should be provided in the ```upgradeContext``` object to get the component working


## SBSelectUpgradeControllerDelegate

* onSelect: this method is called when the user selects/fills all the screen fields and clicks on the **Ready to Bid** button. The component will pass the flight/upgrade/paasengers/username parameters to the delegate instance.

* onGotoAuction: this method is called when the user selects an auction already running.

* onGotoEndAuction: this method is called when the user selects an auction already finished.

* getTokenFor: this method is called everytime the component needs a specific token for a particular auction

* importHistory: this method is called when the user clicks on the import history link


```swift
public protocol SBSelectUpgradeControllerDelegate: AnyObject {
    func onSelect(flight: SBFlight!, upgrade: SBUpgrade!, passengers: [SBPassenger], username: String)
    func onGotoAuction(_ auction: SBAuction!, availableAuctions: [SBAvailableAuction]?)
    func onGotoEndAuction(_ auction: SBAuctionBase!, availableAuctions: [SBAvailableAuction]?)
    func getTokenFor(auctionId: String) -> String
    func importHistory()
}
```
