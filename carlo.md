
### index

* <a href="#login">login</a>
* <a href="#register">register</a>
* <a href="#account">account details</a>
* <a href="#new-troop">make a troop</a>
* <a href="#troops">get all troops</a>
* <a href="#troop-get">get a troop</a>
* <a href="#troop-patch">update a troop</a>
* <a href="#troop-del">delete a troop</a>
* <a href="#new-scout">add a new scout</a>
* <a href="#scouts">get a troops scouts</a>
* <a href="#scout-get">get a scout</a>
* <a href="#scout-patch">update a scout</a>
* <a href="#scout-del">delete a scout</a>
* <a href="#commands">list bitlash commands</a>
* <a href="#command">run bitlash commands</a>
* <a href="#lightshow">run a lightshow on a scout</a>


<a name="login"><a>
###POST /v1/login

login to pinocc.io

```sh
 curl -X POST -v --data 'email=youremail&password=tacos' https://api.pinocc.io/v1/login

```

```js
{"data":{"token":"7fc11b7554f0cd303bad94eb0eb36e2d","account":19}}

```

<a name="regsiter"><a>
###POST /v1/register

register for pinocc.io

```sh
 curl -X POST -v --data 'email=youremail&password=tacos' https://api.pinocc.io/v1/register
```

```js
{"data":{"token":"7fc11b7554f0cd303bad94eb0eb36e2d","account":19}}
```
<a name="account"></a>
###GET /v1/account

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
<a name="new-troop"></a>
###POST /v1/troop

create a new troop and assign it a token.

```sh

curl -X POST 'https://api.pinocc.io/v1/troop?token=980146260e87f0dfc02f10e733ca5d73'

```

```js

{"data":{"id":"1","token":"af49e76320781a7b9722a137039b7f99","account":19}}

```

<a name="troops"></a>
###GET /v1/troops

get all of your accounts troops.

```sh

curl 'https://api.pinocc.io/v1/troops?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

```js

{"data":[{"id":"1","account":19,"token":"af49e76320781a7b9722a137039b7f99","online":false}]}

```

<a name="troop-get"></a>
###GET /v1/{troop id}

get the data for your first troop

```sh

curl 'https://api.pinocc.io/v1/1?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

```js

{"data":{"account":19,"id":"1","token":"af49e76320781a7b9722a137039b7f99","online":false}}

```

<a name="troop-patch"></a>
###PATCH /v1/{troop id}

update data associated with your troop

right now ```name``` is the only supported key.

```sh
curl -X PATCH --data "name=old sport" 'https://api.pinocc.io/v1/1?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

<a name="troop-del"></a>
###DELETE /v1/{troop id}

```sh
curl -X DELETE 'https://api.pinocc.io/v1/1?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

<a name="new-scout"></a>
###POST /v1/{troop id}/scout

add a new scout to your troop

```sh

curl -X POST 'https://api.pinocc.io/v1/1/scout?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

```js

{"data":{"id":1,"time":1388185122294}}

```
<a name="scouts"></a>
###GET /v1/{troop id}/scouts

get all of the scouts in your troop. returns an object keyed off of scout id or false if no scouts are associated.

```sh

curl  'https://api.pinocc.io/v1/1/scouts?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

```js

{"data":{"1":{"id":1,"time":1388185122294,"updated":1388186085191,"name":"old yeller"}}}

```
<a name="scout-get"></a>
###GET /v1/{troop id}/{scout id}

get the data for your a scout.

```js
curl  'https://api.pinocc.io/v1/1/1?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

```js

{"data":{"id":1,"time":1388185122294}}

```

<a name="scout-patch"></a>
###PATCH /v1/{troop id}/{scout id}

update data in your scout

right now ```name``` is the only supported key.

```sh

curl -X PATCH --data "name=old yeller" 'https://api.pinocc.io/v1/1/1?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

```js

{"data":{"id":1,"time":1388185122294,"updated":1388186085191,"name":"old yeller"}}

```

<a name="scout-del"></a>
###DELETE /v1/{troop id}/{scout id}

```sh
curl -X DELETE 'https://api.pinocc.io/v1/1/1?token=7fc11b7554f0cd303bad94eb0eb36e2d'

```

<a name="commands"></a>
###GET /v1/{troop id}/{scout id}/commands

print a list of available bitlash commands

if the scout is offline you will get an error after a timeout. TODO accept timeout as an argument. its 10 seconds now.

```sh
curl  'https://api.pinocc.io/v1/1/1/commands?token=7fc11b7554f0cd303bad94eb0eb36e2d'
```
```js
// success

{"data":["backpack.report","hq.connect","hq.disconnect","led.blue","led.bluevalue","led.cyan","led.green","led.greenvalue","led.hexvalue","led.magenta","led.off","led.orange","led.purple","led.red","led.redvalue","led.report","led.savetorch","led.setrgb","led.settorch","led.white","led.yellow","mesh.broadcastrun","mesh.config","mesh.ingroup","mesh.joingroup","mesh.key","mesh.leavegroup","mesh.ping","mesh.pinggroup","mesh.publish","mesh.remoterun","mesh.report","mesh.resetkey","mesh.setpower","mesh.subscribe","pin.makeinput","pin.makeoutput","pin.off","pin.on","pin.read","pin.report","pin.write","power.disablevcc","power.enablevcc","power.ischarging","power.percent","power.report","power.sleep","power.voltage","randomnumber","scout.gethqtoken","scout.isleadscout","scout.otaboot","scout.report","scout.sethqtoken","temperature","wifi.command","wifi.config","wifi.connect","wifi.list","wifi.report"]}

// timeout error

{"error":{"code":500,"message":"command timed out. troop:7fc11b7554f0cd303bad94eb0eb36e2d, scout:1, command:help"}

```

<a name="command"><a>
###GET  /v1/{troop id}/{scout id}/command/:command

GET  /v1/{troop id}/{scout id}/command?command=command

POST /v1/{troop id}/{scout id}/command  data: command=command

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
