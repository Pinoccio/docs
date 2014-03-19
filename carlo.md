
# making calls.

Pinoccio provides an http API, a command line tool, a nodejs api client, and a client side library to build web interfaces to interact with your troops.


# account

## login

#### POST /v1/login

Creates a new token for making calls against the api.

```sh

 curl -X POST -v --data '{"email":"youremail","password":"boats"}' https://api.pinocc.io/v1/login
 # or you may use query string format 
 curl -X POST -v --data 'email=youremail&password=boats' https://api.pinocc.io/v1/login

```

#### Parameters

- email
- password

#### Return Values
Returns a JSON object with a token and account key in the data property if successful. You will need this session token for all calls that require authentication with the api.

```js
{"data":{"token":"7fc11b7554f0cd303bad94eb0eb36e2d","account":19}}

```

or an error 

```js
{"error":{"code":403,"message":"Error: incorrect password"}}

```


## register

#### POST /v1/register

register for pinocc.io

```sh
 curl -X POST -v --data 'email=youremail&password=boats' https://api.pinocc.io/v1/register
```

#### Parameters

required.

- email
- password
- hasAgreedToTerms

optional.

- firstname
- lastname

#### Return values

Returns a JSON object with a token and account key in the data property if successful. You will need this session token for all calls that require authentication with the api.

```js
{"data":{"token":"7fc11b7554f0cd303bad94eb0eb36e2d","account":19}}

```

or an error 

```js
{"error":{"code":500,"message":"this email is already registered"}}
```

## Account info

#### GET /v1/account

get your account data


```sh
curl 'https://api.pinocc.io/v1/account?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

#### Parameters
None.

#### Return values.

a JSON object of the accout properties.

```js
{
  "data":{
    "email":"youremail",
    "firstname":"",
    "lastname":"",
    "id":19,
    "gravatar":"https://www.gravatar.com/avatar/132e4d83bbcc3b9e53b76d241025481-?d=https%3A%2F%2Fpinocc.io%2Fmodules%2Fcontent%2Ftpl%2Fimages%2Fdefault-avatar.png",
    "hasAgreedToTerms":true
  }
}
```

or an error 

```js
{"error":{"code":403,"message":"Error: not logged in"}}
```

# Troops

## Make a troop

#### POST /v1/troop

create a new troop and assign it a token.

```sh

curl -X POST 'https://api.pinocc.io/v1/troop?token=980146260e87f0dfc02f10e733ca5d73'

```

#### Parameters

optional

- name

#### Return values

an object with the troops data. 


```js
{"data":{"id":"1","token":"af49e76320781a7b9722a137039b7f99","account":19}}

```

or an error 

```js
{"error":{"code":403,"message":"Error: not logged in"}}
```

The token here is a unique troop identifier used in provisioning. scout.sethqtoken({troop token})

This troop will NOT appear in GET /v1/troops result until a lead scout with the matching {troop token} connects to base. when this happens it will also create the first scout object for your troop.


## Get all your troops 

#### GET /v1/troops

get all of your accounts troops.

```sh

curl 'https://api.pinocc.io/v1/troops?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

#### Parameters

None.

#### Return values

data is an array of troop objects.

```js

{"data":[{"id":"1","account":19,"token":"af49e76320781a7b9722a137039b7f99","online":false}]}

```

or an error 

```js
{"error":{"code":403,"message":"Error: not logged in"}}
```


## Get a troop

#### GET /v1/{troop id} 

get the data for your a troop by troop id

```sh

curl 'https://api.pinocc.io/v1/{troop id}?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

#### Parameters

required

- v1/{troop id} 

#### Return Values.

returns a troop object by id. also contains "online" which represents is a lead scout in the troop has an open socket to base

```js

{"data":{"account":19,"id":"1","token":"af49e76320781a7b9722a137039b7f99","online":false}}
```
 or an error

```js
{"error":"could not find token for troop 1000"}
```

## Update a troop

#### PATCH /v1/{troop id}

update data associated with your troop

```sh
curl -X PATCH --data '{"name":"old sport"}' 'https://api.pinocc.io/v1/1?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

#### Parameters

right now ```name``` is the only supported key.

#### Return values.
returns the updated troop object

```js
{"data":{"account":"19","token":"af49e76320781a7b9722a137039b7f99","name":"old sport","updated":"1395214271078"}}
```


## Delete a troop

#### DELETE /v1/{troop id}

delete a troop by troop id. if you have a lead scout provisioned with this troop it will need to be added to a new troop before oyu can send it commands again.

```sh
curl -X DELETE 'https://api.pinocc.io/v1/{troop id}?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

#### Parameters

- v1/{troop id}

#### Return values.

returns true

```js
{"data":true}
```
or an error

```js
{"error":"could not find token for troop 1000"}
```

# Scouts

## Create a scout

#### POST /v1/{troop id}/scout

add a new scout to your troop

```sh

curl -X POST 'https://api.pinocc.io/v1/{troop id}/scout?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

#### Parameters.

- v1/{troop id}

#### Return values.

the id in this result is the scout id. 

```js

{"data":{"id":1,"time":1388185122294}}

```

In provisioning it must be passed to mesh.config({scout id},{troop id})


## Get scouts in a troop

#### GET /v1/{troop id}/scouts

get all of the scouts in your troop. returns an object keyed off of scout id or false if no scouts are associated.

```sh

curl  'https://api.pinocc.io/v1/1/scouts?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

#### Parameters.

- {troop id}

#### Return values.

Returns an array of all of the scouts in the troop

```js

{"data":[{"id":1,"time":1388185122294,"updated":1388186085191,"name":"old yeller"}]}

```


## Get a scout

#### GET /v1/{troop id}/{scout id}

get the data for a scout by id.

```js
curl  'https://api.pinocc.io/v1/{troop id}/{scout id}?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

#### Parameters.

- {troop id}
- {scout id}

#### Return values.

```js

{"data":{"id":1,"time":1388185122294}}

```


## Update a scout

#### PATCH /v1/{troop id}/{scout id}

update data for a scout

right now ```name``` is the only supported key.

```sh

curl -X PATCH --data '{"name":"old yeller"}' 'https://api.pinocc.io/v1/{troop id}/{scout id}?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

#### Parameters

- {troop id}
- {scout id}
- {name}

#### Return values.

```js

{"data":{"id":1,"time":1388185122294,"updated":1388186085191,"name":"old yeller"}}

```

## Delete a scout

#### DELETE /v1/{troop id}/{scout id}

delete a scout by scout id.

```sh
curl -X DELETE 'https://api.pinocc.io/v1/{troop id}/{scout id}?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

#### Parameters.

None.

#### Return value.

When you delete a scout. if connected. api will issue a ```scout.daisy;scout.daisy``` to reset the scout to factory.


## Run a bitlash command

#### GET /v1/{troop id}/{scout id}/command/{command}

GET  /v1/{troop id}/{scout id}/command?command={command}

POST /v1/{troop id}/{scout id}/command  data: command={command}

POST /v1/{troop id}/{scout id}/command  data: '{"command":"command"}'

Execute bitlash commands on scouts. this includes passing new functions for event handing etc. Commands can be found in the <a href="/scoutcommands.html">Scout Commands Doc</a>

```sh

curl  'https://api.pinocc.io/v1/1/1/command/led.report?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

#### Parameters.

- {troup id}
- {scout id}
- command
  - the command may be specifid as a url chunk {command} if it contains vlad uri characters.
  - as a query string parameter
  - or in post data

#### Return values.

returns the response to the command.


```js

{
  data:{
    "type":"reply",
    "from":1,
    "id":"sv90",
    "end":true,
    "reply":"{\"type\":\"led\",\"led\":[0,0,0],\"torch\":[0,255,0]}",
    "account":"19",
    "tid":"2",
    "_t":1395217755680
  }
}

```

or on error 

```js
{"error":"scout error: no response true"}
```


# Streams 

## Realtime stream of changes.

#### GET /v1/sync

get the state of all of your troops and scouts and realtime events as the state changes. this stream will continue as long as the connection is active. 

```sh
 
curl https://api.pinocc.io/v1/sync?token=7fc11b7554f0cd303bad94eb0eb36e2d

```

### Parameters.

None.

### Return values.

data is newline delimited json.

```sh
{"data":{"account":"19","troop":"2","type":"connection","value":{"status":"online","ip":"192.168.43.157"},"time":1395217621149}}
{"data":{"account":"19","troop":"2","scout":"2","type":"name","value":"two"}}
{"data":{"account":"19","troop":"2","scout":"1","type":"analog","value":{"type":"analog","mode":[-1,-1,-1,-1,-1,-1,-1,-1],"state":[-1,-1,-1,-1,-1,-1,-1,-1],"_t":1395217621339.001},"time":1395217621339.001}}
{"data":{"account":"19","troop":"2","scout":"2","type":"analog","value":{"type":"analog","mode":[-1,-1,-1,-1,-1,-1,-1,-1],"state":[-1,-1,-1,-1,-1,-1,-1,-1],"_t":1395217621641},"time":1395217621641}}
{"data":{"account":"19","troop":"2","scout":"3","type":"analog","value":{"type":"analog","mode":[-1,-1,-1,-1,-1,-1,-1,-1],"state":[-1,-1,-1,-1,-1,-1,-1,-1],"_t":1395217621643},"time":1395217621643}}
{"data":{"account":"19","troop":"2","scout":"1","type":"available","value":{"scout":1,"available":1,"_t":1395219255686.001,"type":"available"},"time":1395219255686.001}}
{"data":{"account":"19","troop":"2","scout":"2","type":"available","value":{"scout":2,"available":1,"_t":1395219255690.002,"type":"available"},"time":1395219255690.002}}
{"data":{"account":"19","troop":"2","scout":"3","type":"available","value":{"scout":3,"available":1,"_t":1395219255688.001,"type":"available"},"time":1395219255688.001}}
{"data":{"account":"19","troop":"2","scout":"4","type":"available","value":{"scout":4,"available":1,"_t":1395219255357.001,"type":"available"},"time":1395219255357.001}}
{"data":{"account":"19","troop":"2","scout":"1","type":"backpacks","value":{"type":"backpacks","list":[],"_t":1395217621338.001},"time":1395217621338.001}}
{"data":{"account":"19","troop":"2","scout":"1","type":"digital","value":{"type":"digital","mode":[-1,-1,-1,-1,-1,-1,-1],"state":[-1,-1,-1,-1,-1,-1,-1],"_t":1395217621339},"time":1395217621339}}
{"data":{"account":"19","troop":"2","scout":"1","type":"led","value":{"type":"led","led":[0,0,0],"torch":[0,255,0],"_t":1395217754435},"time":1395217754435}}
{"data":{"account":"19","troop":"2","scout":"3","type":"led","value":{"type":"led","led":[0,0,0],"torch":[255,255,255],"_t":1395217621643.001},"time":1395217621643.001}}
{"data":{"account":"19","troop":"2","scout":"1","type":"mesh","value":{"type":"mesh","scoutid":1,"troopid":2,"routes":3,"channel":20,"rate":"250 kb/s","power":"3.5 dBm","_t":1395217621340},"time":1395217621340}}
{"data":{"account":"19","troop":"2","scout":"2","type":"mesh","value":{"type":"mesh","scoutid":2,"troopid":2,"routes":1,"channel":20,"rate":"250 kb/s","power":"3.5 dBm","_t":1395217621640},"time":1395217621640}}
{"data":{"account":"19","troop":"2","scout":"3","type":"mesh","value":{"type":"mesh","scoutid":3,"troopid":2,"routes":1,"channel":20,"rate":"250 kb/s","power":"3.5 dBm","_t":1395217621642.003},"time":1395217621642.003}}
{"data":{"account":"19","troop":"2","scout":"1","type":"power","value":{"type":"power","battery":99,"voltage":415,"charging":false,"vcc":true,"_t":1395217621338},"time":1395217621338}}
{"data":{"account":"19","troop":"2","scout":"2","type":"power","value":{"type":"power","battery":42,"voltage":378,"charging":false,"vcc":true,"_t":1395219255690.001},"time":1395219255690.001}}
{"data":{"account":"19","troop":"2","scout":"3","type":"power","value":{"type":"power","battery":69,"voltage":391,"charging":false,"vcc":true,"_t":1395219351227},"time":1395219351227}}
{"data":{"account":"19","troop":"2","scout":"4","type":"power","value":{"type":"power","battery":37,"voltage":376,"charging":false,"vcc":true,"_t":1395218438748},"time":1395218438748}}
{"data":{"account":"19","troop":"2","scout":"1","type":"scout","value":{"type":"scout","lead":true,"version":1,"hardware":1,"family":1000,"serial":2000193,"build":2014031102,"_t":1395217621255},"time":1395217621255}}
{"data":{"account":"19","troop":"2","scout":"1","type":"temp","value":{"type":"temp","current":41,"high":41,"low":34,"_t":1395219407355},"time":1395219407355}}
{"data":{"account":"19","troop":"2","scout":"2","type":"temp","value":{"type":"temp","current":30,"high":34,"low":26,"_t":1395219446102},"time":1395219446102}}
{"data":{"account":"19","troop":"2","scout":"3","type":"temp","value":{"type":"temp","current":25,"high":32,"low":22,"_t":1395217851050},"time":1395217851050}}
{"data":{"account":"19","troop":"2","scout":"4","type":"temp","value":{"type":"temp","current":30,"high":30,"low":24,"_t":1395219458729},"time":1395219458729}}
{"data":{"account":"19","troop":"2","scout":"1","type":"uptime","value":{"type":"uptime","millis":33083780,"free":18521,"random":15089,"reset":"External","_t":1395217621337},"time":1395217621337}}

```

## Historical and Live Stats Stream

#### GET /v1/stats

get a stream of time series data from start time to end time for any report. 
- if no end time is provided or the end time is in the future events will continue as they happen in real time.
- if no start time is provided you will ony get events starting from now as they happen in real time.


```sh
 
curl https://api.pinocc.io/v1/stats?token=7fc11b7554f0cd303bad94eb0eb36e2d&report={report}&scout={scout id}&troop={troop id}

```

#### Parameters
required

- troop
- scout
- report
  - the name of the report you would like to pull. 
  - led, power, temp, uptime, mesh, digital, backpacks, analog, announce
 
optional

- start
  - the time to start bstreaming data from.
- end
  - the time to stop streaming data from.
- tail
  - if i have no more old data should i wait for new data to arrive?

#### Return values.

data is newline delimited json. 

```sh

{"data":{TODO}}

```

with curl or the cli tool it streams to stdout. in the nodejs api client it returns a stream.


