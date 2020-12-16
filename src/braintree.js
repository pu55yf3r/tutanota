let clientToken = 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUyTURneU1UVXlPVFlzSW1wMGFTSTZJalU1WW1aa1lqRTFMVFl6WmpNdE5HUXlZaTA0TnprMExXWmhOemxrTnpWbU1ESTRNU0lzSW5OMVlpSTZJbk50ZURoMGJXWm5OamcxZG1nMVpEUWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pYzIxNE9IUnRabWMyT0RWMmFEVmtOQ0lzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPblJ5ZFdWOUxDSnlhV2RvZEhNaU9sc2liV0Z1WVdkbFgzWmhkV3gwSWwwc0luTmpiM0JsSWpwYklrSnlZV2x1ZEhKbFpUcFdZWFZzZENKZExDSnZjSFJwYjI1eklqcDdmWDAuaGg1TmJjS2JvaFlnVG1neWZhRmJqdk9qR3NvcUNQUUQ1UjJwa3RIZU9fUDlhZW9UbDgxeXZtdWRQdXJPR2Z1MHpNdE5lTHZ5bWJMNmFNR0VLMkQtNkEiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvc214OHRtZmc2ODV2aDVkNC9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJncmFwaFFMIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9ncmFwaHFsIiwiZGF0ZSI6IjIwMTgtMDUtMDgiLCJmZWF0dXJlcyI6WyJ0b2tlbml6ZV9jcmVkaXRfY2FyZHMiXX0sImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy9zbXg4dG1mZzY4NXZoNWQ0L2NsaWVudF9hcGkiLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJtZXJjaGFudElkIjoic214OHRtZmc2ODV2aDVkNCIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwidmVubW8iOiJvZmYiLCJjaGFsbGVuZ2VzIjpbImN2diJdLCJ0aHJlZURTZWN1cmVFbmFibGVkIjp0cnVlLCJhbmFseXRpY3MiOnsidXJsIjoiaHR0cHM6Ly9vcmlnaW4tYW5hbHl0aWNzLXNhbmQuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9zbXg4dG1mZzY4NXZoNWQ0In0sInBheXBhbEVuYWJsZWQiOnRydWUsInBheXBhbCI6eyJiaWxsaW5nQWdyZWVtZW50c0VuYWJsZWQiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYWxsb3dIdHRwIjp0cnVlLCJkaXNwbGF5TmFtZSI6IlR1dGFvIEdtYkgiLCJjbGllbnRJZCI6bnVsbCwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwibWVyY2hhbnRBY2NvdW50SWQiOiIzYjJ0ZGh3Z3piZGpueno0IiwiY3VycmVuY3lJc29Db2RlIjoiVVNEIn19'
let nonce = '5b72ef2b-ac12-0e6b-1404-a600776250c0'
let bin = '411111'

//FIXME remove braintree/client.js and braintree-hosted-fields.js from libs?

setupHostedFields()

function setupHostedFields() {

	braintree.threeDSecure.create({
		authorization: clientToken,
		version: 2
	}).then(threeDS => {
		return threeDS.verifyCard({
			onLookupComplete: function (data, next) {
				console.log("lookup-complete", data)
				next()
			},
			amount: '100.00',
			nonce: nonce,
			bin: bin,
			// email: billingFields.email.input.value,
			// billingAddress: {
			// 	givenName: billingFields['billing-given-name'].input.value,
			// 	surname: billingFields['billing-surname'].input.value,
			// 	phoneNumber: billingFields['billing-phone'].input.value.replace(/[\(\)\s\-]/g, ''), // remove (), spaces, and - from phone number
			// 	streetAddress: billingFields['billing-street-address'].input.value,
			// 	extendedAddress: billingFields['billing-extended-address'].input.value,
			// 	locality: billingFields['billing-locality'].input.value,
			// 	region: billingFields['billing-region'].input.value,
			// 	postalCode: billingFields['billing-postal-code'].input.value,
			// 	countryCodeAlpha2: billingFields['billing-country-code'].input.value
			// }
		})

	}).then((result) => {
		console.log("success", result)
	}).catch(e => console.log("error", e))


}

