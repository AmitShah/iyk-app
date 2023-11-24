#Getting tag ids

### Get tag id from new chip
# replace from scanning chip
curl -X GET 'https://api.iyk.app/chips/find?e=9A4E6F7C771D1F48377EF8B4E1788ECE&c=88E8D88D6ED17D1F&d=101'
-H 'x-iyk-api-key:  ' -H 'Content-Type: application/json'


curl -X GET 'https://api.iyk.app/chips/find?e=360153C6B53E49CE75660CB062DCD46D&c=CA42E7D72A45FAB1&d=101'
-H 'x-iyk-api-key:  ' -H 'Content-Type: application/json'


### Setting redirect url for tags:
# TAG 1
curl -X PATCH 'https://api.iyk.app/chips' --data-raw '{
    "tagUIDs": ["1293660434600336"],
        "updates": {
            "redirectUrl":  "https://go.cb-w.com/dapp?cb_url=https%3A%2F%2Fiyk-app.vercel.app%2F"
	    }
}' -H 'x-iyk-api-key:  ' -H 'Content-Type: application/json'

# TAG 2
curl -X PATCH 'https://api.iyk.app/chips' --data-raw '{
    "tagUIDs": ["1302456527622544"],
        "updates": {
            "redirectUrl":  "https://go.cb-w.com/dapp?cb_url=https%3A%2F%2Fiyk-app.vercel.app%2F"
	    }
}' -H 'x-iyk-api-key:  ' -H 'Content-Type: application/json'

# TAG 3
curl -X PATCH 'https://api.iyk.app/chips' --data-raw '{
    "tagUIDs": ["1311252620644752"],
        "updates": {
            "redirectUrl": "https://go.cb-w.com/dapp?cb_url=https%3A%2F%2Fiyk-app.vercel.app%2F"
	    }
}' -H 'x-iyk-api-key:  ' -H 'Content-Type: application/json'
