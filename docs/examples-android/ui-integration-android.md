# UI Integration Example

This guide shows how to integrate SeatBoost SDK Fragments into your app's Activities and customize their appearance to match your app's design.

## SDK Fragment Integration

The SeatBoost SDK provides pre-built Fragments that you can integrate into your Activities. This approach allows you to maintain your app's navigation structure while leveraging the SDK's functionality.

### Available SDK Fragments

The SDK includes the following Fragments:

- **SBLiveAuctionFragment** - Live auction interface
- **SBSelectUpgradeFragment** - Upgrade selection interface
- **SBEndAuctionFragment** - Auction completion interface

## Example 1: SelectUpgradeActivity

This example shows how to integrate the `SBSelectUpgradeFragment` into your Activity for upgrade selection functionality.

### Complete Example Activity

```kotlin
package com.example.myapp

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.industrialrocket.seatboost.sdk.fragment.SBSelectUpgradeFragment
import com.industrialrocket.seatboost.sdk.model.SBAirline
import com.industrialrocket.seatboost.sdk.model.SBFindAuctionResult
import com.industrialrocket.seatboost.sdk.model.SBUpgradeContext
import com.industrialrocket.seatboost.sdk.handler.SBSelectUpgradeHandler

class SelectUpgradeActivity : AppCompatActivity(), SBSelectUpgradeHandler {
    
    // Fragment parameters
    private var selectedAirline: SBAirline? = null
    private var findAuctionResult: SBFindAuctionResult? = null
    private var username: String = ""
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_select_upgrade)
        
        // Initialize parameters from intent
        initializeParameters()
        
        // Load the select upgrade fragment
        loadSelectUpgradeFragment()
    }
    
    private fun initializeParameters() {
        selectedAirline = intent.getParcelableExtra("selected_airline")
        findAuctionResult = intent.getParcelableExtra("find_auction_result")
        username = intent.getStringExtra("username") ?: ""
    }
    
    private fun loadSelectUpgradeFragment() {
        val fragment = SBSelectUpgradeFragment.newInstance()
        
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragment_container, fragment)
            .commit()
    }
    
    // SBSelectUpgradeHandler implementation
    override fun getUpgradeContext(): SBUpgradeContext {
        return SBUpgradeContext(
            selectedAirline = selectedAirline,
            findAuctionResult = findAuctionResult,
            selectedPassengers = listOf(),
            username = username,
        )
    }
}
```

### Layout File

Create `activity_select_upgrade.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
    
    <!-- Your custom toolbar -->
    <include layout="@layout/custom_toolbar" />
    
    <!-- Fragment container -->
    <FrameLayout
        android:id="@+id/fragment_container"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />
    
</LinearLayout>
```

### Usage

```kotlin
// Start the activity
val intent = Intent(this, SelectUpgradeActivity::class.java)
intent.putExtra("selected_airline", selectedAirline)
intent.putExtra("find_auction_result", findAuctionResult)
intent.putExtra("username", username)
startActivity(intent)
```

## Example 2: LiveAuctionActivity

This example shows how to integrate the `SBLiveAuctionFragment` into your Activity for live auction functionality.

### Complete Example Activity

```kotlin
package com.example.myapp

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.industrialrocket.seatboost.sdk.fragment.auction.SBLiveAuctionFragment
import com.industrialrocket.seatboost.sdk.model.SBAuction
import com.industrialrocket.seatboost.sdk.handler.SBLiveAuctionHandler

class LiveAuctionActivity : AppCompatActivity(), SBLiveAuctionHandler {
    
    // Fragment parameters
    private var isFirstTimeInAuction: Boolean = false
    private var auction: SBAuction? = null
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_live_auction)
        
        // Initialize parameters from intent
        initializeParameters()
        
        // Load the live auction fragment
        loadLiveAuctionFragment()
    }
    
    private fun initializeParameters() {
        isFirstTimeInAuction = intent.getBooleanExtra("is_first_time_in_auction", false)
        auction = intent.getParcelableExtra("auction")
    }
    
    private fun loadLiveAuctionFragment() {
        val fragment = SBLiveAuctionFragment.newInstance(
            isFirstTimeInAuction = isFirstTimeInAuction,
            auction = auction!!
        )
        
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragment_container, fragment)
            .commit()
    }
    
    // SBLiveAuctionHandler implementation
    override fun onAuctionExpired() {
        // Handle auction expiration
        finish()
    }
    
    override fun onParticipantRemoved() {
        // Handle participant removal
        finish()
    }
    
    override fun onEndAuction() {
        // Navigate to end auction screen
        val intent = Intent(this, EndAuctionActivity::class.java)
        intent.putExtra("auction", auction)
        startActivity(intent)
        finish()
    }
    
    override fun onBuyNow() {
        // Handle buy now functionality
        // Implement your buy now logic here
    }
}
```

### Layout File

Create `activity_live_auction.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
    
    <!-- Your custom toolbar -->
    <include layout="@layout/custom_toolbar" />
    
    <!-- Fragment container -->
    <FrameLayout
        android:id="@+id/fragment_container"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />
    
    <!-- Your custom bottom navigation -->
    <include layout="@layout/custom_bottom_nav" />
    
</LinearLayout>
```

### Usage

```kotlin
// Start the activity
val intent = Intent(this, LiveAuctionActivity::class.java)
intent.putExtra("is_first_time_in_auction", isFirstTimeInAuction)
intent.putExtra("auction", auction)
startActivity(intent)
```

## Example 3: EndAuctionActivity

This example shows how to integrate the `SBEndAuctionFragment` into your Activity for auction completion functionality.

### Complete Example Activity

```kotlin
package com.example.myapp

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.industrialrocket.seatboost.sdk.fragment.auction.SBEndAuctionFragment
import com.industrialrocket.seatboost.sdk.model.SBSeatUpgradeBase
import com.industrialrocket.seatboost.sdk.handler.SBEndAuctionHandler
import com.industrialrocket.seatboost.sdk.model.SBAvailableAuction
import com.industrialrocket.seatboost.sdk.model.SBAuction

class EndAuctionActivity : AppCompatActivity(), SBEndAuctionHandler {
    
    // Fragment parameters
    private var seatUpgradeBase: SBSeatUpgradeBase? = null
    private var isAuctionFinished: Boolean = false
    private var isBoughtNow: Boolean = false
    private var isWinner: Boolean = false
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_end_auction)
        
        // Initialize parameters from intent
        initializeParameters()
        
        // Load the end auction fragment
        loadEndAuctionFragment()
    }
    
    private fun initializeParameters() {
        seatUpgradeBase = intent.getParcelableExtra("seat_upgrade_base")
        isAuctionFinished = intent.getBooleanExtra("is_auction_finished", false)
        isBoughtNow = intent.getBooleanExtra("is_bought_now", false)
        isWinner = intent.getBooleanExtra("is_winner", false)
    }
    
    private fun loadEndAuctionFragment() {
        val fragment = SBEndAuctionFragment.newInstance(
            seatUpgradeBase = seatUpgradeBase!!,
            isAuctionFinished = isAuctionFinished,
            isBoughtNow = isBoughtNow,
            isWinner = isWinner
        )
        
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragment_container, fragment)
            .commit()
    }
    
    // SBEndAuctionHandler implementation
    override fun onGoToAvailableAuction(availableAuction: SBAvailableAuction) {
        // Handle navigation to available auction
        // Implement your navigation logic here
    }
    
    override fun onGoToAuction(auction: SBAuction) {
        // Handle navigation to auction
        val intent = Intent(this, LiveAuctionActivity::class.java)
        intent.putExtra("is_first_time_in_auction", false)
        intent.putExtra("auction", auction)
        startActivity(intent)
    }
    
    override fun getTokenFor(auctionID: String): String {
        // Return the token for the given auction ID
        // Implement your token retrieval logic here
        return ""
    }
    
    override fun onWinnerAnimationEnd() {
        // Handle winner animation end
        // Implement your logic here
    }
    
    override fun onUpgradeWon() {
        // Handle upgrade won
        // Implement your logic here
    }
}
```

### Layout File

Create `activity_end_auction.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
    
    <!-- Your custom toolbar -->
    <include layout="@layout/custom_toolbar" />
    
    <!-- Fragment container -->
    <FrameLayout
        android:id="@+id/fragment_container"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />
    
    <!-- Your custom bottom navigation -->
    <include layout="@layout/custom_bottom_nav" />
    
</LinearLayout>
```

### Usage

```kotlin
// Start the activity
val intent = Intent(this, EndAuctionActivity::class.java)
intent.putExtra("seat_upgrade_base", seatUpgradeBase)
intent.putExtra("is_auction_finished", isAuctionFinished)
intent.putExtra("is_bought_now", isBoughtNow)
intent.putExtra("is_winner", isWinner)
startActivity(intent)
```

## Example 4: PaymentActivity

This example shows how to integrate payment-related SDK Fragments into your Activity for handling upgrade payments and buy-now functionality.

### Complete Example Activity

```kotlin
package com.example.myapp

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.gson.Gson
import com.industrialrocket.seatboost.sdk.fragment.payment.SBPaymentFragment
import com.industrialrocket.seatboost.sdk.fragment.payment.SBPaymentHandler
import com.industrialrocket.seatboost.sdk.fragment.payment.SBPaymentCardDataHandler
import com.industrialrocket.seatboost.sdk.fragment.payment.iberiapay.IberiaPayPaymentFragment
import com.industrialrocket.seatboost.sdk.manager.CacheManager
import com.industrialrocket.seatboost.sdk.manager.StorageManager
import com.industrialrocket.seatboost.sdk.model.SBAuction
import com.industrialrocket.seatboost.sdk.model.SBUpgradeContext

class PaymentActivity : AppCompatActivity(), SBPaymentHandler {
    
    // Payment parameters
    private var upgradeContext: SBUpgradeContext? = null
    private var isFromLiveAuction: Boolean = false
    
    // Payment data handler
    override var dataHandler: SBPaymentCardDataHandler = MyPaymentCardDataHandler.newInstance(this)
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment)
        
        // Initialize parameters from intent
        initializeParameters()
        
        // Set up payment fragment based on airline configuration
        setupPaymentFragment()
        
        // Load the payment fragment
        loadPaymentFragment()
    }
    
    private fun initializeParameters() {
        val upgradeContextJSON = intent.getStringExtra("upgradeContext")
        if (upgradeContextJSON != null) {
            upgradeContext = Gson().fromJson(upgradeContextJSON, SBUpgradeContext::class.java)
        }
        isFromLiveAuction = intent.getBooleanExtra("isFromLiveAuction", false)
    }
    
    private fun setupPaymentFragment() {
        val airlineCode = StorageManager.getCurrentAirlineCode() ?: return
        val airline = CacheManager.bootstrap?.getAirlineByCode(airlineCode)
        
        // Check if airline uses custom payment provider (e.g., Iberia Pay)
        if (airline?.customMerchantKey != null) {
            val type = airline.customMerchantKey!!["type"]
            if (type == "IBERIA_PAY") {
                setupIberiaPayFragment(airline)
                return
            }
        }
        
        // Use standard payment fragment
        setupStandardPaymentFragment()
    }
    
    private fun setupIberiaPayFragment(airline: SBAirline) {
        val data = airline.customMerchantKey!!
        StorageManager.saveIberiaPayAuthInfo(
            hashMapOf(
                "clientKey" to data["clientKey"] as String,
                "url" to data["url"] as String,
                "env" to data["environment"] as String?
            )
        )
        
        val fragment = IberiaPayPaymentFragment.newInstance(upgradeContext!!)
        loadFragment(fragment)
    }
    
    private fun setupStandardPaymentFragment() {
        val fragment = SBPaymentFragment.newInstance(upgradeContext!!)
        loadFragment(fragment)
    }
    
    private fun loadPaymentFragment() {
        // Fragment is loaded in setupPaymentFragment()
    }
    
    private fun loadFragment(fragment: SBPaymentFragment) {
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragment_container, fragment)
            .commit()
    }
    
    // SBPaymentHandler implementation
    override fun onBack() {
        // Handle back navigation
        finish()
    }
    
    override fun onJoin(authToken: String, auction: SBAuction) {
        // Save auction token and navigate to live auction
        StorageManager.saveCurrentAuctionToken(authToken)
        auction.token = authToken
        
        if (auction.hasAuctionExpired()) {
            // Show auction expired message
            showMessage("Auction has expired")
        } else {
            // Navigate to live auction
            val intent = Intent(this, LiveAuctionActivity::class.java)
            intent.putExtra("isFirstTimeInAuction", true)
            intent.putExtra("auction", Gson().toJson(auction))
            startActivity(intent)
            finishAffinity()
        }
    }
    
    private fun showMessage(message: String) {
        // Implement your message display logic
    }
}
```

### Layout File

Create `activity_payment.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
    
    <!-- Your custom toolbar -->
    <include layout="@layout/custom_toolbar" />
    
    <!-- Fragment container -->
    <FrameLayout
        android:id="@+id/fragment_container"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />
    
</LinearLayout>
```

### Custom Payment Card Data Handler

```kotlin
class MyPaymentCardDataHandler : SBPaymentCardDataHandler {
    
    companion object {
        fun newInstance(context: Context): MyPaymentCardDataHandler {
            return MyPaymentCardDataHandler()
        }
    }
    
    override fun getPaymentCards(): List<SBPaymentCard> {
        // Return list of saved payment cards
        return StorageManager.getPaymentCards()
    }
    
    override fun savePaymentCard(card: SBPaymentCard) {
        // Save payment card to storage
        StorageManager.savePaymentCard(card)
    }
    
    override fun deletePaymentCard(cardId: String) {
        // Delete payment card from storage
        StorageManager.deletePaymentCard(cardId)
    }
    
    override fun validateCard(cardNumber: String, expiryDate: String, cvv: String): Boolean {
        // Implement card validation logic
        return isValidCardNumber(cardNumber) && isValidExpiryDate(expiryDate) && isValidCVV(cvv)
    }
    
    private fun isValidCardNumber(cardNumber: String): Boolean {
        // Implement Luhn algorithm or other validation
        return cardNumber.length >= 13 && cardNumber.length <= 19
    }
    
    private fun isValidExpiryDate(expiryDate: String): Boolean {
        // Validate MM/YY format
        val regex = "^(0[1-9]|1[0-2])/([0-9]{2})$".toRegex()
        return regex.matches(expiryDate)
    }
    
    private fun isValidCVV(cvv: String): Boolean {
        // Validate CVV (3-4 digits)
        return cvv.length in 3..4 && cvv.all { it.isDigit() }
    }
}
```

### Usage

```kotlin
// Start the payment activity
val intent = Intent(this, PaymentActivity::class.java)
intent.putExtra("upgradeContext", Gson().toJson(upgradeContext))
intent.putExtra("isFromLiveAuction", false)
startActivity(intent)
```

## Example 5: BuyNowActivity

This example shows how to integrate the `SBBuyNowFragment` for instant upgrade purchases.

### Complete Example Activity

```kotlin
package com.example.myapp

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.gson.Gson
import com.industrialrocket.seatboost.sdk.fragment.payment.SBBuyNowFragment
import com.industrialrocket.seatboost.sdk.fragment.payment.SBBuyNowHandler
import com.industrialrocket.seatboost.sdk.fragment.payment.SBBuyNowParams
import com.industrialrocket.seatboost.sdk.fragment.payment.SBBuyNowFromAuctionParams
import com.industrialrocket.seatboost.sdk.fragment.payment.SBBuyNowFromUpgradeParams
import com.industrialrocket.seatboost.sdk.fragment.payment.iberiapay.IberiaPayBuyNowFragment
import com.industrialrocket.seatboost.sdk.manager.StorageManager
import com.industrialrocket.seatboost.sdk.model.SBAuction
import com.industrialrocket.seatboost.sdk.model.SBBuyNowData
import com.industrialrocket.seatboost.sdk.model.SBInstantUpgrade

class BuyNowActivity : AppCompatActivity(), SBBuyNowHandler {
    
    // Buy now parameters
    private lateinit var buyNowData: SBBuyNowData
    private var upgradeContext: SBUpgradeContext? = null
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment)
        
        // Initialize buy now data
        initializeBuyNowData()
        
        // Load the appropriate buy now fragment
        loadBuyNowFragment()
    }
    
    private fun initializeBuyNowData() {
        buyNowData = Gson().fromJson(intent.getStringExtra("data"), SBBuyNowData::class.java)
        
        val upgradeContextJSON = intent.getStringExtra("upgradeContext")
        if (upgradeContextJSON != null) {
            upgradeContext = Gson().fromJson(upgradeContextJSON, SBUpgradeContext::class.java)
        }
    }
    
    private fun loadBuyNowFragment() {
        val airlineCode = StorageManager.getCurrentAirlineCode() ?: return
        val airline = CacheManager.bootstrap?.getAirlineByCode(airlineCode)
        
        val fragment = if (airline?.customMerchantKey != null && 
                          airline.customMerchantKey!!["type"] == "IBERIA_PAY") {
            // Use Iberia Pay fragment
            IberiaPayBuyNowFragment.newInstance(
                buyNowData,
                upgradeContext?.findAuctionResult?.customMerchantInfo ?: hashMapOf()
            )
        } else {
            // Use standard buy now fragment
            createStandardBuyNowFragment()
        }
        
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragment_container, fragment)
            .commit()
    }
    
    private fun createStandardBuyNowFragment(): SBBuyNowFragment {
        val buyNowParams: SBBuyNowParams = if (buyNowData.isBuyNow2) {
            SBBuyNowFromUpgradeParams().apply {
                upgradeContext = this@BuyNowActivity.upgradeContext
            }
        } else {
            SBBuyNowFromAuctionParams().apply {
                auction = buyNowData.auction
                auctionToken = StorageManager.getCurrentAuctionToken()
                if (auctionToken.isEmpty()) {
                    auctionToken = StorageManager.getServerToken() ?: ""
                }
            }
        }
        
        return SBBuyNowFragment.newInstance(buyNowData, buyNowParams)
    }
    
    // SBBuyNowHandler implementation
    override fun onBuy(auction: SBAuction) {
        // Handle successful auction purchase
        val intent = Intent(this, EndAuctionActivity::class.java)
        intent.putExtra("auctionBase", Gson().toJson(auction))
        intent.putExtra("isWinner", true)
        startActivity(intent)
        finishAffinity()
    }
    
    override fun onBuy(instantUpgrade: SBInstantUpgrade, authToken: String) {
        // Handle successful instant upgrade purchase
        instantUpgrade.token = authToken
        StorageManager.addInstantUpgrade(instantUpgrade.id.toString(), instantUpgrade.token!!)
        
        val intent = Intent(this, EndAuctionActivity::class.java)
        intent.putExtra("instantUpgrade", Gson().toJson(instantUpgrade))
        intent.putExtra("isWinner", true)
        startActivity(intent)
        finishAffinity()
    }
}
```

### Usage

```kotlin
// Start the buy now activity
val intent = Intent(this, BuyNowActivity::class.java)
intent.putExtra("data", Gson().toJson(buyNowData))
intent.putExtra("upgradeContext", Gson().toJson(upgradeContext))
startActivity(intent)
```

## Payment Fragment Features

### Supported Payment Providers

1. **Standard Payment Processing** - Default Stripe integration
2. **Iberia Pay** - Custom payment provider for Iberia airlines
3. **Custom Merchants** - Extensible system for airline-specific payment providers

### Key Features

- **Multiple Payment Methods** - Credit cards, saved cards, digital wallets
- **Security** - PCI-compliant payment processing
- **Validation** - Real-time card validation and error handling
- **Localization** - Multi-language and currency support
- **Customization** - Airline-specific branding and payment flows

## Troubleshooting

### Common Issues

1. **Fragment not displaying**: Ensure the fragment container has proper dimensions
2. **Context errors**: Make sure your Activity implements the required interfaces
3. **Parameter passing**: Verify all required parameters are passed to fragment constructors
4. **Theme conflicts**: Check for theme conflicts between your app and the SDK

### Debug Tips

- Use Android Studio's Layout Inspector to debug fragment layouts
- Check logcat for any SDK-related errors
- Verify that all required dependencies are properly included
- Test on different Android versions and screen sizes

## Next Steps

- [Basic Integration Example](/examples/basic-integration.md) - Basic Android integration
- [Getting Started - Android](/getting-started-android.md) - Complete setup guide
- [UI Components](/ui/) - SDK UI components documentation
- [REST API](/rest-api/) - API endpoints and usage
- [Object Model](/object-model/) - Data models and structures
- [Push Notifications](/push-notifications/configure-android-app.md) - Android push notification setup
