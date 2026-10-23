# Basic Integration Example

This is the iOS integration path. Your app owns login, the passenger's auction list, and PNR entry. The SDK owns the auction screens through [`SBBasicFlowController`](/ui/basic-flow.md).

Complete the [installation steps](/getting-started-ios.md) first.

The sample helpers (`Session`, `DBService`, `Config`) are from the SeatBoost sample app. Replace them with your own session, storage, and configuration.

## Load the Bootstrap

`SBSdk.shared.initialize()` loads bootstrap configuration (airlines, themes, messages). You can also load it explicitly any time after `configureApp` and before presenting SDK UI:

```swift
SBRestClient.shared.bootstrap()
    .done { _ in
        // Airline catalog is available on SBBootstrap.shared
    }
    .fail { error in
        self.alert(title: "Server error", message: error.localizedDescription)
    }
```

---

## Authentication

Authenticate the passenger before presenting the auction flow.

```Swift
func authenticate(email: String) {  
    SBActivityIndicator.shared.show()
    
    SBRestClient.shared.authenticate(email, exp: "", signature: "", mids: nil)
    .done { authToken in
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

Pass `exp`, `signature`, and `mids` when your airline SSO provides them; otherwise empty strings / `nil` are valid for email-only login.

---

## Auctions and Instant Upgrades History

After login, refresh the passenger's current, completed, and instant-upgrade lists for your home screen. On success the SDK writes those lists onto `SBRestClient.shared.session`; the promise returns the associated tokens.

A first call can pass `nil` for the previous keys. Later calls should send the keys you already stored so the server can merge history across devices.

```swift
func loadHistory() {
    let authToken = SBRestClient.shared.session.authToken

    SBRestClient.shared.history(authToken: authToken, auctions: nil, instantUpgrades: nil)
        .done { historyResponse in
            let session = SBRestClient.shared.session
            // session.activeAuctions, session.completedAuctions, session.instantUpgrades
            // historyResponse.currentAuctionsTokens / completedAuctionsTokens / instantUpgradeTokens
            self.reloadAuctionList()
        }
        .fail { error in
            self.alert(title: "Server error", message: error.localizedDescription)
        }
}
```

When the user selects an item from that list, reopen it with `SBBasicFlowController`. Call `status` first if you need a fresh `SBAuction` instance:

```swift
func openAuction(_ auction: SBAuction) {
    let token = DBService.shared.getAuthTokenForEmail(Session.shared.email, andAuctionId: auction.auctionId)

    let flow = SBBasicFlowController.create(
        auctionToken: token,
        auction: auction,
        currentAvailableAuctions: nil
    )
    flow.basicFlowDelegate = self
    flow.datasource = Session.shared
    flow.modalPresentationStyle = .fullScreen
    present(flow, animated: true)
}
```

---

## Retrieve auctions (PNR lookup)

Call `findAuctions` with the passenger's PNR, then pass the result into `SBUpgradeContext` before presenting the flow.

```Swift
func retrieveAuctions() {
    let firstName = Config.shared.firstName
    let lastName = Config.shared.lastName
    
    let data = SBFindAuctionsRequestBody(confirmationNumber: Config.shared.reservationCode, // PNR
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

## Present the auction flow

Present `SBBasicFlowController`. It hosts select-upgrade, payment, live bidding, buy-now, and end-auction. Your app does not embed those screens itself.

```Swift
func startAuctionFlow() {
    let upgradeContext = SBUpgradeContext()
    
    upgradeContext.selectedAirline = SBBootstrap.shared.getAirlineByCode(Config.shared.airlineCode) // Use your airline code
    upgradeContext.findAuctionResult = findAuctionResult // The results from findAuctions
    upgradeContext.username = Session.shared.username // The name used by the user for auctions
    let basicFlowController = SBBasicFlowController.create(upgradeContext: upgradeContext)
    
    basicFlowController.basicFlowDelegate = self // SBBasicFlowControllerDelegate
    basicFlowController.datasource = Session.shared // SBUnlockedPaymentCardDataSource subclass
    basicFlowController.modalPresentationStyle = .fullScreen
    
    self.present(basicFlowController, animated: true)
}
```

`datasource` must be an `SBPaymentCardDataSource`. For apps that do not lock saved cards behind a PIN, subclass `SBUnlockedPaymentCardDataSource` and persist `customerId` / `platformId` (see `Session` in the sample app).

### SBBasicFlowControllerDelegate

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
        // The user closed the flow from bidding
    }
}
```

If the auction ends or this participant is removed, the flow dismisses itself. Those events are not delivered on the delegate; `onClose` is only called when the user taps close on bidding.

See [Basic Flow Controller](/ui/basic-flow.md) for the `create` APIs.
