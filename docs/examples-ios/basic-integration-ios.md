# Basic Integration Example

This example shows how to integrate the SeatBoost SDK into your iOS app with basic functionality. Make sure you have completed the [installation steps](/getting-started-ios.md) before proceeding with this integration.

## Authentication

The user needs to be authenticated using his email before proceeding with the SeatBoost flow.

```Swift
func authenticate(email: String) {  
    SBActivityIndicator.shared.show()
    
    SBRestClient.shared.authenticate(email, exp: "", signature: "", mids: nil)
    .done { bidder in
        SBActivityIndicator.shared.hide()
        Session.shared.email = email
        Session.shared.username = email.components(separatedBy: "@")[0]
        DBService.shared.saveLastLogin(Date(), forEmail: email)
        // You can perform an action after user is successfuly logged in
    }.fail { error in
        SBActivityIndicator.shared.hide()
        self.alert(title: "Server error", message: error.localizedDescription)
    }
}
```

## Retrieve auctions

With the user successfuly logged in, you need to retrieve the availlable auctions for the the user PNR.

```Swift
func retrieveAuctions() {
    let firstName = Config.shared.firstName
    let lastName = Config.shared.lastName
    
    let data = SBFindAuctionsRequestData(confirmationNumber: Config.shared.reservationCode, // PNR
                                         airlineCode: Config.shared.airlineCode, // Your airline code
                                         dateOfTravel: Date(),
                                         firstName: firstName,
                                         lastName: lastName,
                                         dateOfBirth: Date())
    
    SBRestClient.shared.findAuctions(data).done { findAuctionResult in
        self.findAuctionResult = findAuctionResult
    }.fail { error in
        self.alert(title: "Server error", message: error.localizedDescription)
    }
}
```

## Presenting the Auction Flow

After successfully finding auctions with `findAuctions()`, you can present the UI flow.

```Swift
func startAuctionFlow() {
    let upgradeContext = SBUpgradeContext()
    
    upgradeContext.selectedAirline = SBBootstrap.shared.getAirlineByCode(Config.shared.airlineCode) // Use your airline code
    upgradeContext.findAuctionResult = findAuctionResult // The results from findAuctions
    upgradeContext.username = Session.shared.username // The name used by the user for auctions
    let basicFlowController = SBBasicFlowController.create(upgradeContext: upgradeContext)
    
    basicFlowController.basicFlowDelegate = self // SBBasicFlowControllerDelegate
    basicFlowController.datasource = Session.shared // SBUnlockedPaymentCardDataSource
    
    self.present(basicFlowController, animated: true)
}
```

Example of SBBasicFlowControllerDelegate

```Swift
extension FlightsViewController: SBBasicFlowControllerDelegate {
    func getTokenFor(auctionId: String) -> String {
        // Return the token for the given auction
        return DBService.shared.getAuthTokenForEmail(Session.shared.email,
                                                     andAuctionId: auctionId)
    }

    func onJoin(auctionId: String, authToken: String, bidderName: String) {
        // Save the token for the auction the user joined
        DBService.shared.saveAuthToken(authToken,
                                       forEmail: Session.shared.email,
                                       andAuctionId: auctionId)
        Session.shared.username = bidderName
    }

    func getLastUsedBidderName() -> String {
        return Session.shared.username
    }

    func onClose() {
        // Handle the close event
    }
}
```
