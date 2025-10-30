
# Basic Integration Example

## Load the Bootstrap

Before using any of the SDK functionality, Seatboost's bootstrap must be loaded.  
To do that, call the following inside a coroutine:

```kotlin
CacheManager.bootstrap = SBRestClient.shared.bootstrap()
````

You can do this any time between the SDK’s initialization and the first usage of any SDK functionality.

---

## Auctions and Instant Upgrades History

You can call:

```kotlin
SBRestClient.shared.historySuspend(
    StorageManager.getServerToken() ?: "",
    StorageManager.getPastAuctions(),
    StorageManager.getPastInstantUpgrades()
)
```

This is a **suspending function**, which returns a [`SBHistoryResponse`](../object-model/sbhistoryresponse.md) and throws an exception if the request fails.

Alternatively, you can call:

```kotlin
SBRestClient.shared.history(
    StorageManager.getServerToken() ?: "",
    StorageManager.getPastAuctions(),
    StorageManager.getPastInstantUpgrades()
)
```

This version returns an [`SBPromise<SBHistoryResponse>`](../object-model/sbhistoryresponse.md)
(also see [`SBPromise`](../object-model/sbpromise.md)).

---

## SBAirlineFlow

The `SBAirlineFlow` is a fragment that implements all the functionality required for a basic integration.

You need a `FrameLayout` on your activity or parent fragment, and it also needs to implement `SBAirlineFlowListener`.

You can initialize the `SBAirlineFlow` like this:

```kotlin
SBAirlineFlow.newInstance(
    StorageManager.getServerToken() ?: "",
    StorageManager.getCurrentAirlineCode()!!,
    args.sdkDestination!!,
    args.sdkObj!!
)
```

* `sdkDestination` is the string representation of one of the `SDKDestination` enum values.
* `sdkObj` is the JSON representing the object required to load the provided destination.
  These will be one of `SBAuction`, `SBCompletedAuction`, or `SBInstantUpgrade`, depending on which auction/instant upgrade the user selected.

---

### Example Fragment Hosting `SBAirlineFlow`

```kotlin
package com.seatboost.aerobest.ui.sdk

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import com.google.gson.Gson
import com.industrialrocket.seatboost.sdk.extensions.push
import com.industrialrocket.seatboost.sdk.flow.SBAirlineFlow
import com.industrialrocket.seatboost.sdk.flow.SBAirlineFlowListener
import com.industrialrocket.seatboost.sdk.flow.SDKDestination
import com.industrialrocket.seatboost.sdk.manager.StorageManager
import com.industrialrocket.seatboost.sdk.model.PNRLookupInfo
import com.industrialrocket.seatboost.sdk.model.SBServerError
import com.seatboost.aerobest.R
import com.seatboost.aerobest.databinding.FragmentDashboardBinding
import com.seatboost.aerobest.ui.enterpnr.EnterPNR
import com.seatboost.aerobest.ui.util.Util.showOkDialog

class SDKFragment : Fragment(), SBAirlineFlowListener {

    private val args: SDKFragmentArgs by navArgs()
    private var _binding: FragmentDashboardBinding? = null
    private val binding get() = _binding!!

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentDashboardBinding.inflate(inflater, container, false)
        val root: View = binding.root

        if (savedInstanceState == null) {
            val frag = if (args.sdkDestination.isNullOrEmpty()) {
                EnterPNR.newInstance()
            } else {
                SBAirlineFlow.newInstance(
                    StorageManager.getServerToken() ?: "",
                    StorageManager.getCurrentAirlineCode()!!,
                    args.sdkDestination!!,
                    args.sdkObj!!
                )
            }
            pushFragment(frag, false)
        }

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onRequestFailure(ex: Throwable) {
        var message = ex.message
        if (ex is SBServerError) {
            message = ex.errorMessage ?: ex.originalThrowable?.message
        }
        showOkDialog(message ?: "Something went wrong", requireContext())
    }

    override fun onAuctionExpired() {
        showOkDialog("Auction has expired.", requireContext())
        findNavController().navigate(SDKFragmentDirections.actionSdkToHome())
    }

    override fun onParticipantRemoved() {
        showOkDialog("You've been removed from this auction.", requireContext())
        findNavController().navigate(SDKFragmentDirections.actionSdkToHome())
    }

    override fun onLookupError() {
        childFragmentManager.popBackStack()
        childFragmentManager.push(R.id.seatboostFrame, EnterPNR())
    }

    fun performLookup(pnrLookupInfo: PNRLookupInfo) {
        val flow = SBAirlineFlow.newInstance(
            StorageManager.getServerToken() ?: "",
            StorageManager.getCurrentAirlineCode()!!,
            SDKDestination.DESTINATION_LOOKUP.toString(),
            Gson().toJson(pnrLookupInfo)
        )
        childFragmentManager.push(R.id.seatboostFrame, flow)
    }

    private fun pushFragment(fragment: Fragment, addToBackstack: Boolean = true) {
        val transaction = childFragmentManager.beginTransaction()
        transaction.replace(R.id.seatboostFrame, fragment)

        if (addToBackstack) {
            val tag = fragment::class.java.simpleName
            transaction.addToBackStack(tag)
        }

        transaction.commit()
    }
}
```

---

### Example Fragment Implementing History and Redirecting to `SBAirlineFlow`

```kotlin
package com.seatboost.aerobest.ui.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.navigation.NavDirections
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.gson.Gson
import com.industrialrocket.seatboost.sdk.flow.SDKDestination
import com.industrialrocket.seatboost.sdk.manager.CacheManager
import com.industrialrocket.seatboost.sdk.manager.StorageManager
import com.industrialrocket.seatboost.sdk.model.DisplayableItem
import com.industrialrocket.seatboost.sdk.model.SBAuction
import com.industrialrocket.seatboost.sdk.model.SBCompletedAuction
import com.industrialrocket.seatboost.sdk.model.SBInstantUpgrade
import com.industrialrocket.seatboost.sdk.model.SBUpgradeType
import com.industrialrocket.seatboost.sdk.services.SBRestClient
import com.seatboost.aerobest.MainActivity
import com.seatboost.aerobest.databinding.FragmentHomeBinding
import com.seatboost.aerobest.ui.adapter.AuctionListAdapter
import com.seatboost.aerobest.ui.util.Util.showOkDialog
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.lang.Exception

class HomeFragment : Fragment(), AuctionListAdapter.Listener {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onResume() {
        super.onResume()
        val act = requireActivity() as MainActivity
        act.setLoading(true)
        lifecycleScope.launch(Dispatchers.IO) {
            try {
                if (CacheManager.bootstrap == null) {
                    CacheManager.bootstrap = SBRestClient.shared.bootstrap()
                }
                val history = SBRestClient.shared.historySuspend(
                    StorageManager.getServerToken() ?: "",
                    StorageManager.getPastAuctions(),
                    StorageManager.getPastInstantUpgrades()
                )
                withContext(Dispatchers.Main) {
                    binding.recyclerView.layoutManager = LinearLayoutManager(requireContext())
                    var items: List<DisplayableItem> = arrayListOf()
                    items = items.plus(history.currentAuctions)
                    items = items.plus(history.instantUpgrades)
                    items = items.plus(history.completedAuctions)
                    binding.recyclerView.adapter = AuctionListAdapter(items, this@HomeFragment)
                    if (act.lifecycle.currentState.isAtLeast(Lifecycle.State.STARTED)) {
                        act.setLoading(false)
                        act.enableLookup()
                    }
                }
            } catch (ex: Exception) {
                withContext(Dispatchers.Main) {
                    showOkDialog("Failed to load current auctions", requireContext())
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onAuctionClick(item: SBAuction) {
        if (item.myUpgradeType == SBUpgradeType.BOUGHT_NOW) {
            navigateTo(
                HomeFragmentDirections.actionHomeToSdk(
                    SDKDestination.DESTINATION_BUY_NOW.name,
                    Gson().toJson(item)
                )
            )
            return
        }
        navigateTo(
            HomeFragmentDirections.actionHomeToSdk(
                SDKDestination.DESTINATION_LIVE_AUCTION.name,
                Gson().toJson(item)
            )
        )
    }

    override fun onCompletedClick(item: SBCompletedAuction) {
        navigateTo(
            HomeFragmentDirections.actionHomeToSdk(
                SDKDestination.DESTINATION_END_AUCTION.name,
                Gson().toJson(item)
            )
        )
    }

    override fun onInstantUpgradeClick(item: SBInstantUpgrade) {
        navigateTo(
            HomeFragmentDirections.actionHomeToSdk(
                SDKDestination.DESTINATION_INSTANT_UPGRADE.name,
                Gson().toJson(item)
            )
        )
    }

    private fun navigateTo(directions: NavDirections) {
        findNavController().navigate(directions)
    }
}
```
These examples are taken from SeatBoost's demo app, called AeroBest. You can also take a look at the AeroBest code to see a complete example.
