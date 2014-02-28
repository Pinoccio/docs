
# account

## login

POST /v1/login

login to pinocc.io


```sh
 curl -X POST -v --data 'email=youremail&password=tacos' https://api.pinocc.io/v1/login

```

```js
{"data":{"token":"7fc11b7554f0cd303bad94eb0eb36e2d","account":19}}

```

## register

POST /v1/register

register for pinocc.io

```sh
 curl -X POST -v --data 'email=youremail&password=tacos' https://api.pinocc.io/v1/register
```

```js
{"data":{"token":"7fc11b7554f0cd303bad94eb0eb36e2d","account":19}}

```

## Account info

GET /v1/account

get your account data


```sh
curl 'https://api.pinocc.io/v1/account?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

```js
{
  "data":{
    "email":"youremail",
    "firstname":"",
    "lastname":"",
    "id":19,
    "gravatar":"https://www.gravatar.com/avatar/132e4d83bbcc3b9e53b76d241025481-?d=https%3A%2F%2Fpinocc.io%2Fmodules%2Fcontent%2Ftpl%2Fimages%2Fdefault-avatar.png"
  }
}

```

# Troops

## Make a troop

POST /v1/troop

create a new troop and assign it a token.

```sh

curl -X POST 'https://api.pinocc.io/v1/troop?token=980146260e87f0dfc02f10e733ca5d73'

```

```js

{"data":{"id":"1","token":"af49e76320781a7b9722a137039b7f99","account":19}}

```

## Get all your troops 

GET /v1/troops

get all of your accounts troops.

```sh

curl 'https://api.pinocc.io/v1/troops?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

```js

{"data":[{"id":"1","account":19,"token":"af49e76320781a7b9722a137039b7f99","online":false}]}

```

## Get a troop

GET /v1/{troop id}

get the data for your first troop

```sh

curl 'https://api.pinocc.io/v1/1?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

```js

{"data":{"account":19,"id":"1","token":"af49e76320781a7b9722a137039b7f99","online":false}}

```

## Update a troop

PATCH /v1/{troop id}

update data associated with your troop

right now ```name``` is the only supported key.

```sh
curl -X PATCH --data "name=old sport" 'https://api.pinocc.io/v1/1?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

## Delete a troop
DELETE /v1/{troop id}

```sh
curl -X DELETE 'https://api.pinocc.io/v1/1?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

# Scouts

## Create a scout

POST /v1/{troop id}/scout

add a new scout to your troop

```sh

curl -X POST 'https://api.pinocc.io/v1/1/scout?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

```js

{"data":{"id":1,"time":1388185122294}}

```

## Get scouts in a troop

GET /v1/{troop id}/scouts

get all of the scouts in your troop. returns an object keyed off of scout id or false if no scouts are associated.

```sh

curl  'https://api.pinocc.io/v1/1/scouts?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

```js

{"data":{"1":{"id":1,"time":1388185122294,"updated":1388186085191,"name":"old yeller"}}}

```
## Get a scout

GET /v1/{troop id}/{scout id}

get the data for your a scout.

```js
curl  'https://api.pinocc.io/v1/1/1?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

```js

{"data":{"id":1,"time":1388185122294}}

```

## Update a scout

PATCH /v1/{troop id}/{scout id}

update data in your scout

right now ```name``` is the only supported key.

```sh

curl -X PATCH --data "name=old yeller" 'https://api.pinocc.io/v1/1/1?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

```js

{"data":{"id":1,"time":1388185122294,"updated":1388186085191,"name":"old yeller"}}

```

## Delete a scout

DELETE /v1/{troop id}/{scout id}

```sh
curl -X DELETE 'https://api.pinocc.io/v1/1/1?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```


## Run a bitlash command

GET /v1/{troop id}/{scout id}/command/:command

GET  /v1/{troop id}/{scout id}/command?command=command

POST /v1/{troop id}/{scout id}/command  data: command=command

POST /v1/{troop id}/{scout id}/command  data: '{"command":"command"}'

command may be passed as a querystring key or a post data key named "command"

post data may be query string formatted or json


```sh

curl  'https://api.pinocc.io/v1/1/1/command/led.report?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

```js

//success

{"data":{"c": {"r":0,"g":0,"b":0}, "t": {"r":255,"g":255,"b":255}}}

// timeout

{"error":{"code":500,"message":"command timed out. troop:7fc11b7554f0cd303bad94eb0eb36e2d, scout:1, command:led.report"},"data":{"reply":""}}
```

# Streams 

## Realtime stream of changes.

GET /v1/sync

get the state of all of your troops and scouts and realtime events as the state changes. this stream never stops unless the connection is interrupted. 

```sh
 
curl https://api.pinocc.io/v1/sync?token=7fc11b7554f0cd303bad94eb0eb36e2d

```

data is newline delimited json.

```sh

{"data":{}}

```

## Historical and Realtime Stats Stream

GET /v1/stats

get a stream of time series data from start time to end time for any report. 
- if no end time is provided or the end time is in the future events will continue as they happen in real time.
- if no start time is provided you will ony get events starting from now as they happen in real time.


TODO: document the options!

```sh
 
curl https://api.pinocc.io/v1/stats?token=7fc11b7554f0cd303bad94eb0eb36e2d&report=temp&scout=1&troop=1

```

data is newline delimited json.

```sh

{"data":{}}

```

