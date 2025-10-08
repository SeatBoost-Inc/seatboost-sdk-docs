## SBRestClient::getAircraft

The method is designed to fetch detailed information about the aircraft assigned to a given flight. 

##### Parameters:

* **flight** (String): An object that represents the flight for which the aircraft information is to be retrieved.

##### Return Type:

* ```SBPromise<SBAircraft>```: This method returns an ```SBPromise<SBAircraft>``` object. It is asynchronous and returns a promise. Once the operation is finished, the promise resolves to an [SBAircraft](object-model/sbaircraft.md) object containing the aircraft data.

<!-- tabs:start -->

#### **iOS**

```swift
public func getAircraft(flight: SBFlight) -> SBPromise<SBAircraft?>
```

#### **Android**

```kotlin
fun getAircraft(flight: SBFlight): SBPromise<SBAircraftResponse>
```

<!-- tabs:end -->