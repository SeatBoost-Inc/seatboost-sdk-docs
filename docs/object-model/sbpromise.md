# SBPromise

This class implements the promise design pattern used for handling asynchronous operations. All the REST API operations (implemented by SBRestClient public methods) return a promise and you can handle the asynchronous response using the callbacks below.

* **done**: The done callback handles the success case and receive an object returned by the SeatBoost server for that operation.

* **fail**: The fail callback handles errors and receive the error object.

* **always**: The always callback runs always, after success or error and receive the the object (or nil) and the error (or nil).

```
	SBRestClient.shared.method(... parameters ...)
		.done {
			(object) -> () in
			...
		}
		.fail {
			(error) -> () in
			...
		}
		.always {
			(object, error) -> () in
			...
		}
```


