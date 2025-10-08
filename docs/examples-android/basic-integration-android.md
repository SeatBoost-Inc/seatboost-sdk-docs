# Basic Integration Example

This example shows how to integrate the SeatBoost SDK into your Android app with basic functionality.

## Complete Example Activity

```kotlin
package com.example.myapp

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.industrialrocket.seatboost.sdk.SeatBoostSDK
import com.industrialrocket.seatboost.sdk.cache.SeatBoostCache
import com.industrialrocket.seatboost.sdk.events.BidderLoginEvent
import com.industrialrocket.seatboost.sdk.events.AuctionUpdatedEvent
import com.industrialrocket.seatboost.sdk.events.BidderLogoutEvent
import com.industrialrocket.seatboost.sdk.events.AuctionEndEvent
import com.industrialrocket.seatboost.sdk.events.ToastEvent
import org.greenrobot.eventbus.EventBus
import org.greenrobot.eventbus.Subscribe

class MainActivity : AppCompatActivity() {
    
    private lateinit var seatBoostSDK: SeatBoostSDK
    private lateinit var cache: SeatBoostCache
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // Configure SDK resources
        SeatBoostSDK.setResources(resources)
        
        // Get SDK instance and cache
        seatBoostSDK = SeatBoostSDK.instance
        cache = seatBoostSDK.mSBCache
        
        // Register for events
        EventBus.getDefault().register(this)
        
        // Initialize UI
        setupUI()
        
        // Example: Load auctions
        loadAuctions()
    }
    
    private fun setupUI() {
        // Your UI setup code here
        // Example: Set up buttons, text views, etc.
    }
    
    private fun loadAuctions() {
        // Example: Access auctions from cache
        val auctions = cache.auctions
        if (auctions.isNotEmpty()) {
            // Display auctions in your UI
            displayAuctions(auctions)
        }
    }
    
    private fun displayAuctions(auctions: List<Any>) {
        // Your code to display auctions in RecyclerView or other UI components
    }
    
    // Event handlers
    @Subscribe
    fun onAuctionUpdated(event: AuctionUpdatedEvent) {
        runOnUiThread {
            // Update your UI with auction data
            updateAuctionDisplay(event.auction)
        }
    }
    
    @Subscribe
    fun onAuctionEnded(event: AuctionEndEvent) {
        runOnUiThread {
            // Handle auction end
            handleAuctionEnd(event.auction)
        }
    }
    
    @Subscribe
    fun onBidderLogin(event: BidderLoginEvent) {
        runOnUiThread {
            if (event.isSuccess) {
                // Handle successful login
                handleSuccessfulLogin(event.accessToken)
            } else {
                // Handle login failure
                handleLoginFailure()
            }
        }
    }
    
    @Subscribe
    fun onBidderLogout(event: BidderLogoutEvent) {
        runOnUiThread {
            // Handle user logout
            handleUserLogout()
        }
    }
    
    @Subscribe
    fun onToastEvent(event: ToastEvent) {
        runOnUiThread {
            // Show toast message from SDK
            showToast(event.message)
        }
    }
    
    // Helper methods
    private fun updateAuctionDisplay(auction: Any) {
        // Update your auction display UI
    }
    
    private fun handleAuctionEnd(auction: Any) {
        // Handle auction end logic
    }
    
    private fun handleSuccessfulLogin(accessToken: String) {
        // Handle successful login
        // Example: Update UI to show user is logged in
    }
    
    private fun handleLoginFailure() {
        // Handle login failure
        // Example: Show error message
    }
    
    private fun handleUserLogout() {
        // Handle user logout
        // Example: Clear user data and update UI
    }
    
    private fun showToast(message: String) {
        // Show toast message
        android.widget.Toast.makeText(this, message, android.widget.Toast.LENGTH_SHORT).show()
    }
    
    // Example: Login user
    fun loginUser(email: String) {
        // Create login event
        val loginEvent = BidderLoginEvent(
            isSuccess = true, // This would be determined by your login logic
            accessToken = "user_token_here", // This would come from your authentication
            preventDashboardNavigation = false
        )
        
        // Post event to EventBus
        EventBus.getDefault().post(loginEvent)
    }
    
    // Example: Logout user
    fun logoutUser() {
        val logoutEvent = BidderLogoutEvent()
        EventBus.getDefault().post(logoutEvent)
    }
    
    override fun onDestroy() {
        super.onDestroy()
        EventBus.getDefault().unregister(this)
    }
}
```

## Fragment Example

```kotlin
package com.example.myapp

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.industrialrocket.seatboost.sdk.SeatBoostSDK
import com.industrialrocket.seatboost.sdk.events.AuctionUpdatedEvent
import org.greenrobot.eventbus.EventBus
import org.greenrobot.eventbus.Subscribe

class AuctionFragment : Fragment() {
    
    private lateinit var seatBoostSDK: SeatBoostSDK
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_auction, container, false)
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        // Get SDK instance
        seatBoostSDK = SeatBoostSDK.instance
        
        // Register for events
        EventBus.getDefault().register(this)
        
        // Setup UI
        setupAuctionUI()
    }
    
    private fun setupAuctionUI() {
        // Your auction UI setup code
    }
    
    @Subscribe
    fun onAuctionUpdated(event: AuctionUpdatedEvent) {
        // Update auction UI
        updateAuctionUI(event.auction)
    }
    
    private fun updateAuctionUI(auction: Any) {
        // Update your auction UI components
    }
    
    override fun onDestroyView() {
        super.onDestroyView()
        EventBus.getDefault().unregister(this)
    }
}
```

## Service Example

```kotlin
package com.example.myapp

import android.app.Service
import android.content.Intent
import android.os.IBinder
import com.industrialrocket.seatboost.sdk.SeatBoostSDK
import com.industrialrocket.seatboost.sdk.events.AuctionUpdatedEvent
import org.greenrobot.eventbus.EventBus
import org.greenrobot.eventbus.Subscribe

class AuctionService : Service() {
    
    private lateinit var seatBoostSDK: SeatBoostSDK
    
    override fun onCreate() {
        super.onCreate()
        
        // Get SDK instance
        seatBoostSDK = SeatBoostSDK.instance
        
        // Register for events
        EventBus.getDefault().register(this)
    }
    
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // Start your auction monitoring logic here
        startAuctionMonitoring()
        return START_STICKY
    }
    
    private fun startAuctionMonitoring() {
        // Your auction monitoring logic
    }
    
    @Subscribe
    fun onAuctionUpdated(event: AuctionUpdatedEvent) {
        // Handle auction updates in background
        handleAuctionUpdate(event.auction)
    }
    
    private fun handleAuctionUpdate(auction: Any) {
        // Process auction update
    }
    
    override fun onDestroy() {
        super.onDestroy()
        EventBus.getDefault().unregister(this)
    }
    
    override fun onBind(intent: Intent?): IBinder? {
        return null
    }
}
```

## Key Points

1. **Always register for EventBus events** in `onCreate()` or `onViewCreated()`
2. **Always unregister** in `onDestroy()` or `onDestroyView()`
3. **Use `runOnUiThread()`** when updating UI from event handlers
4. **Configure SDK resources** by calling `SeatBoostSDK.setResources(resources)`
5. **Access SDK instance** through `SeatBoostSDK.instance`
6. **Use the cache** to access stored data like auctions and user information

## Common Events to Handle

- `BidderLoginEvent` - User login events
- `BidderLogoutEvent` - User logout events
- `AuctionUpdatedEvent` - Auction data updates
- `AuctionEndEvent` - Auction end events
- `ToastEvent` - Toast messages from SDK

## Next Steps

- [UI Integration Example](/examples/ui-integration.md) - Advanced Android UI integration implementation
- [Getting Started - Android](/getting-started-android.md) - Complete setup guide
- [UI Components](/ui/) - SDK UI components documentation
- [REST API](/rest-api/) - API endpoints and usage
- [Object Model](/object-model/) - Data models and structures
- [Push Notifications](/push-notifications/configure-android-app.md) - Android push notification setup
