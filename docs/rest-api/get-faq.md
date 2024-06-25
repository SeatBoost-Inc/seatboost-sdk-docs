## SBRestClient::getFAQ

This method retrieves the hierarchical structure for the SeatBoost FAQ, the data returned is a list of FAQ categories, and each category contains multiple "questions and answers".

<!-- tabs:start -->

#### **iOS**

```swift
public func getFAQ() -> SBPromise<[SBFAQCategory]>
```

#### **Android**

```kotlin
```

<!-- tabs:end -->

## SBRestClient::getFAQ (by airline)

This method retrieves the same structure above but with the data per airline. 

<!-- tabs:start -->

#### **iOS**

```swift
public func getFAQ(airlineCode: String) -> SBPromise<[SBFAQCategory]>
```

#### **Android**

```kotlin
```

<!-- tabs:end -->