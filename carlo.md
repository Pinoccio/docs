
# making calls.

Pinoccio provides an http API, a command line tool, a nodejs API client, and a client side library to build web interfaces to interact with your troops.

The api endpoint is https://api.pinocc.io


## curl

Make api calls from your terminal for much win!

```
 curl https://api.pinocc.io/ok

```

## cli

The command line tool is the node module ```pinoccio```

#### Install

npm install the module globally to get the pinoccio command. you may need to sudo.

```sh
sudo npm install -g pinoccio
```

#### Use

The pinoccio command should now be avaiable in your terminal. Running ```pinoccio``` in the terminal will print a list of avaiable commands.


```sh
pinoccio login
pinoccio rest get v1/troops

```

See the repo on github <a href="https://github.com/pinoccio/client-node-pinoccio">https://github.com/pinoccio/client-node-pinoccio</a> for more info!

## Browser

You may load the client side API js directly from https://api.pinocc.io/pinoccio.js 
Or you may include it in your projects via browserify by depending on ```pinoccio``` node module

Same repo <a href="https://github.com/pinoccio/client-node-pinoccio">https://github.com/pinoccio/client-node-pinoccio</a>.

#### Install

Install the module and save the version in your package.json!

```
npm install --save pinoccio
```

#### Use

Include the script tag in your page.

```js

<script src="https://api.pinocc.io/pinoccio.js"></script>
```

This exposes a global ```pinoccioAPI``` which you may use like

```
<script> 
var api = pinoccioAPI()
api.rest({url:"/v1/account"},function(err,data){
  console.log('muchg win? ',error,data)
})
</script>

```

Or require in your browserified client side code (<a href="https://www.npmjs.org/package/browserify">https://www.npmjs.org/package/browserify</a>)

```js
var pinoccio = require('pinoccio');
var api = pinoccio();

console.log('much win!')

```

# account

## login

#### POST /v1/login

Creates a new token for making calls against the API.

```sh

 curl -X POST -v --data '{"email":"youremail","password":"boats"}' https://api.pinocc.io/v1/login
 # or you may use query string format 
 curl -X POST -v --data 'email=youremail&password=boats' https://api.pinocc.io/v1/login

```

#### Parameters

- email
- password

#### Return Values
Returns a JSON object with a token and account key in the data property if successful. You will need this session token for all calls that require authentication with the API.

```js
{"data":{"token":"7fc11b7554f0cd303bad94eb0eb36e2d","account":19}}

```

or an error 

```js
{"error":{"code":403,"message":"Error: incorrect password"}}

```


## register

#### POST /v1/register

Register for pinocc.io

```sh
 curl -X POST -v --data 'email=youremail&password=boats' https://api.pinocc.io/v1/register
```

#### Parameters

Required.

- email
- password
- hasAgreedToTerms

Optional.

- firstname
- lastname

#### Return values

Returns a JSON object with a token and account key in the data property if successful. You will need this session token for all calls that require authentication with the API.

```js
{"data":{"token":"7fc11b7554f0cd303bad94eb0eb36e2d","account":19}}

```

Or an error 

```js
{"error":{"code":500,"message":"this email is already registered"}}
```

## Account info

#### GET /v1/account

Get your account data


```sh
curl 'https://api.pinocc.io/v1/account?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

#### Parameters
None.

#### Return values.

A JSON object of the accout properties.

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

Or an error 

```js
{"error":{"code":403,"message":"Error: not logged in"}}
```

## logout

#### POST /v1/logout

Logout an auth token

```sh

curl -X POST  https://api.pinocc.io/v1/logout?token=7fc11b7554f0cd303bad94eb0eb36e2d

```

#### Parameters

- token

  - the token you wish to logout

#### Return values

A json oblect with confirmation.

```sh

{"data":true}

```

## Readonly token

#### POST /v1/account/token

Create a "read only" account token. This means you can pass it out and people can only read your troop data but cannot control them.

```sh
curl -X POST  https://api.pinocc.io/v1/account/token?token=7fc11b7554f0cd303bad94eb0eb36e2d

```

More granular permission control comming soon.

#### Parameters

None. for now.

#### Return values

A json object with the read only view of the account's info.

```js
{"data":{"perms":{"read":true},"firstname":"","lastname":"","account":19,"token":"b27a3af628e595eb6035e6a6c84e3cda","gravatar":"https://www..."}}

```

# Troops

## Make a troop

#### POST /v1/troop

create a new troop.

```sh

curl -X POST 'https://api.pinocc.io/v1/troop?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

#### Parameters

Optional

- name

#### Return values

an object with the troops data. 


```js
{"data":{"id":1,"token":"af49e76320781a7b9722a137039b7f99","account":19,"name":"optional name"}}

```

Or an error 

```js
{"error":{"code":403,"message":"Error: not logged in"}}
```

The token here is a unique troop identifier used in provisioning. scout.sethqtoken({troop token})

This troop will NOT appear in GET /v1/troops result until a lead scout with the matching {troop token} connects to base. when this happens it will also create the first scout object for your troop.


## Get all your troops 

#### GET /v1/troops

Gat all of your accounts troops.

```sh

curl 'https://api.pinocc.io/v1/troops?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

#### Parameters

None.

#### Return values

Data is an array of troop objects.

```js

{"data":[{"id":1,"account":19,"name":"name","online":false}]}

```

Or an error 

```js
{"error":{"code":403,"message":"Error: not logged in"}}
```


## Get a troop

#### GET /v1/{troop id} 

Get the data for your a troop by troop id

```sh

curl 'https://api.pinocc.io/v1/{troop id}?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

#### Parameters

Required

- v1/{troop id} 

#### Return Values.

Returns a troop object by id. also contains "online" which represents is a lead scout in the troop has an open socket to base

```js

{"data":{"account":19,"id":1,"online":false,"name":"name"}}
```
 or an error

```js
{"error":"could not find token for troop 1000"}
```

Note that the name property of the troop object will be undefined if a name was never assigned to the troop.

## Update a troop

#### PATCH /v1/{troop id}

Update data associated with your troop

```sh
curl -X PATCH --data '{"name":"old sport"}' 'https://api.pinocc.io/v1/1?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

#### Parameters

For right now, ```name``` is the only supported key.

#### Return values.
Returns the updated troop object

```js
{"data":{"account":"19","token":"af49e76320781a7b9722a137039b7f99","name":"old sport","updated":"1395214271078"}}
```


## Delete a troop

#### DELETE /v1/{troop id}

Delete a troop by troop id. If you have a lead scout provisioned with this troop it will need to be added to a new troop before you can send it commands again.

```sh
curl -X DELETE 'https://api.pinocc.io/v1/{troop id}?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

#### Parameters

- v1/{troop id}

#### Return values.

Returns true

```js
{"data":true}
```
Or an error

```js
{"error":"could not find token for troop 1000"}
```

## Get your troop's token

#### GET /v1/{troop id}/token

After the troop has been created you will need to access the troop token if you want to provision more scouts.

```sh
curl 'https://api.pinocc.io/v1/{troop id}/token?token=7fc11b7554f0cd303bad94eb0eb36e2d'
```

#### Parameters

required

- {troop id} 

#### Return Values

Returns a json string, the troop token.

```
"af49e76320781a7b9722a137039b7f99"
```

# Scouts

## Create a scout

#### POST /v1/{troop id}/scout

Add a new scout to your troop

```sh

curl -X POST 'https://api.pinocc.io/v1/{troop id}/scout?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

#### Parameters.

- v1/{troop id}

#### Return values.

The id in this result is the scout id. 

```js

{"data":{"id":1,"time":1388185122294}}

```

In provisioning it must be passed to mesh.config({scout id},{troop id})


## Get scouts in a troop

#### GET /v1/{troop id}/scouts

Get all of the scouts in your troop. 

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

Get the data for a scout by id.

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

Update data for a scout

For right now, ```name``` is the only supported key.

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

Delete a scout by scout id.

```sh
curl -X DELETE 'https://api.pinocc.io/v1/{troop id}/{scout id}?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

#### Parameters.

None.

#### Return value.

When you delete a scout, if connected. API will issue a ```scout.daisy;scout.daisy``` to reset the scout to factory.


## Run a bitlash command

#### GET /v1/{troop id}/{scout id}/command/{command}

GET  /v1/{troop id}/{scout id}/command?command={command}

POST /v1/{troop id}/{scout id}/command  data: command={command}

POST /v1/{troop id}/{scout id}/command  data: '{"command":"command"}'

Execute bitlash commands on scouts. this includes passing new functions for event handing etc. Commands can be found in the <a href="/scoutcommands.html">Scout Commands Doc</a>

```sh

curl  'https://api.pinocc.io/v1/1/1/command/led.report?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

<a href="http://jsfiddle.net/soldair/6cuJv/7/">try an example in jsfiddle!</a>

#### Parameters.

- {troup id}
- {scout id}
- command
  - the command may be specifid as a url chunk {command} if it contains vlad uri characters.
  - as a query string parameter
  - or in post data

#### Return values.

Returns the response to the command.


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

Get the state of all of your troops and scouts and realtime events as the state changes. This stream will continue as long as the connection is active. 

```sh
 
curl https://api.pinocc.io/v1/sync?token=7fc11b7554f0cd303bad94eb0eb36e2d

```

<a href="http://jsfiddle.net/soldair/NYPTf/2/">try an example in jsfiddle!</a>

### Parameters.

optional

- stale

  - default false
  - if stale is set to a truthy value (1,true,1337 etc) the last known state of every report will be returned. 
  - Events the have occured before the last ```online``` event will have a stale:1 flag set. This will help you distinguish reports that may not reflect the current state of your troop.

- tail

  - default true
  - if you pass a falsy value (0,false etc) the sync stream will end when it has sent the current state. It will not continue streaming forever

### Return values.

data is newline delimited json.

```sh
{"data":{"account":"19","troop":"2","type":"connection","value":{"status":"online","ip":"192.168.43.157"},"time":1395217621149}}
{"data":{"account":"19","troop":"2","scout":"1","type":"analog","value":{"type":"analog","mode":[-1,-1,-1,-1,-1,-1,-1,-1],"state":[-1,-1,-1,-1,-1,-1,-1,-1],"_t":1395217621339.001},"time":1395217621339.001}}
{"data":{"account":"19","troop":"2","scout":"1","type":"available","value":{"scout":1,"available":1,"_t":1395219255686.001,"type":"available"},"time":1395219255686.001}}
{"data":{"account":"19","troop":"2","scout":"1","type":"backpacks","value":{"type":"backpacks","list":[],"_t":1395217621338.001},"time":1395217621338.001}}
{"data":{"account":"19","troop":"2","scout":"1","type":"digital","value":{"type":"digital","mode":[-1,-1,-1,-1,-1,-1,-1],"state":[-1,-1,-1,-1,-1,-1,-1],"_t":1395217621339},"time":1395217621339}}
{"data":{"account":"19","troop":"2","scout":"1","type":"led","value":{"type":"led","led":[0,0,0],"torch":[0,255,0],"_t":1395217754435},"time":1395217754435}}
{"data":{"account":"19","troop":"2","scout":"1","type":"mesh","value":{"type":"mesh","scoutid":1,"troopid":2,"routes":3,"channel":20,"rate":"250 kb/s","power":"3.5 dBm","_t":1395217621340},"time":1395217621340}}
{"data":{"account":"19","troop":"2","scout":"1","type":"power","value":{"type":"power","battery":99,"voltage":415,"charging":false,"vcc":true,"_t":1395217621338},"time":1395217621338}}
{"data":{"account":"19","troop":"2","scout":"1","type":"scout","value":{"type":"scout","lead":true,"version":1,"hardware":1,"family":1000,"serial":2000193,"build":2014031102,"_t":1395217621255},"time":1395217621255}}
{"data":{"account":"19","troop":"2","scout":"1","type":"temp","value":{"type":"temp","current":41,"high":41,"low":34,"_t":1395219407355},"time":1395219407355}}
{"data":{"account":"19","troop":"2","scout":"1","type":"uptime","value":{"type":"uptime","millis":33083780,"free":18521,"random":15089,"reset":"External","_t":1395217621337},"time":1395217621337}}

```

## Historical and Live Stats Stream

#### GET /v1/stats

Get a stream of time series data from start time to end time for any report. 
- if no end time is provided or the end time is in the future events will continue as they happen in real time.
- if no start time is provided you will ony get events starting from now as they happen in real time.


```sh
 
curl https://api.pinocc.io/v1/stats?token=7fc11b7554f0cd303bad94eb0eb36e2d&report={report}&scout={scout id}&troop={troop id}

```

here is a live example. getting all <a href="http://codepen.io/anon/pen/zrLCK/">led reports for a time range</a>

#### Parameters
required

- troop
- scout
- report
  - the name of the report you would like to pull. 
  - led, power, temp, uptime, mesh, digital, backpacks, analog, announce
 
optional

- start
  - the unix timestamp to in ms start streaming data from.
- end
  - the unix timestamp in ms to stop streaming data from.
- tail
  - if i have no more old data should i wait for new data to arrive?

#### Return values.

Data is newline delimited json. sorted by time. Below are is example of power reports.

```sh
{"data":{"account":"19","troop":"1","scout":"1","type":"power","value":{"type":"power","battery":96,"voltage":415,"charging":false,"vcc":true,"_t":1395176893461.001},"time":1395176893461.001}}
{"data":{"account":"19","troop":"1","scout":"1","type":"power","value":{"type":"power","battery":96,"voltage":413,"charging":false,"vcc":true,"_t":1395176943720},"time":1395176943720}}
{"data":{"account":"19","troop":"1","scout":"1","type":"power","value":{"type":"power","battery":96,"voltage":410,"charging":false,"vcc":true,"_t":1395177123715},"time":1395177123715}}
{"data":{"account":"19","troop":"1","scout":"1","type":"power","value":{"type":"power","battery":96,"voltage":418,"charging":false,"vcc":true,"_t":1395177183714},"time":1395177183714}}
{"data":{"account":"19","troop":"1","scout":"1","type":"power","value":{"type":"power","battery":96,"voltage":418,"charging":true,"vcc":true,"_t":1395177183863},"time":1395177183863}}
{"data":{"account":"19","troop":"1","scout":"1","type":"power","value":{"type":"power","battery":97,"voltage":418,"charging":true,"vcc":true,"_t":1395177363708},"time":1395177363708}}
{"data":{"account":"19","troop":"1","scout":"1","type":"power","value":{"type":"power","battery":98,"voltage":415,"charging":false,"vcc":true,"_t":1395178209292},"time":1395178209292}}
{"data":{"account":"19","troop":"1","scout":"1","type":"power","value":{"type":"power","battery":98,"voltage":415,"charging":false,"vcc":true,"_t":1395178940937.001},"time":1395178940937.001}}
{"data":{"account":"19","troop":"1","scout":"1","type":"power","value":{"type":"power","battery":98,"voltage":412,"charging":false,"vcc":true,"_t":1395185082971},"time":1395185082971}}
{"data":{"account":"19","troop":"1","scout":"1","type":"power","value":{"type":"power","battery":98,"voltage":413,"charging":false,"vcc":true,"_t":1395185083581},"time":1395185083581}}
{"data":{"account":"19","troop":"1","scout":"1","type":"power","value":{"type":"power","battery":98,"voltage":413,"charging":true,"vcc":true,"_t":1395185083683},"time":1395185083683}}
{"data":{"account":"19","troop":"2","scout":"1","type":"power","value":{"type":"power","battery":99,"voltage":418,"charging":true,"vcc":true,"_t":1395185383644},"time":1395185383644}}
{"data":{"account":"19","troop":"2","scout":"1","type":"power","value":{"type":"power","battery":99,"voltage":416,"charging":true,"vcc":true,"_t":1395185503642},"time":1395185503642}}
{"data":{"account":"19","troop":"2","scout":"1","type":"power","value":{"type":"power","battery":99,"voltage":416,"charging":false,"vcc":true,"_t":1395185503726},"time":1395185503726}}
{"data":{"account":"19","troop":"2","scout":"1","type":"power","value":{"type":"power","battery":99,"voltage":415,"charging":false,"vcc":true,"_t":1395185563641},"time":1395185563641}}
{"data":{"account":"19","troop":"2","scout":"1","type":"power","value":{"type":"power","battery":99,"voltage":415,"charging":false,"vcc":true,"_t":1395217621338},"time":1395217621338}}

```

With curl or the cli tool it streams to stdout, in the nodejs API client it returns a stream.


