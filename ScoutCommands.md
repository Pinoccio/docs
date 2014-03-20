# power

## power.ischarging

#### Description
`int power.ischarging()`

Determines if the Scout is charging its battery via USB. This will also mirror the orange charging LED next to the USB port, which also shines when charging, and turns off when either fully-charged, or the Scout is not plugged in.

```js
> print power.ischarging
> 1
```

#### Parameters
None

#### Return Values
Returns `0` if the Scout is not charging, and `1` if it is charging.

#### Warning
The results of this command are undefined if you don't have a battery plugged into the Scout, and only powering it via USB.  This is due to the Lipo battery charger constantly trying to charge the non-existent battery.


## power.percent

#### Description
`int power.percent()`

All Scouts have an on-board fuel gauge that tells you the status of the battery. This returns the percentage of battery life left on the Scout.

```js
> print power.percent
> 85
```

#### Parameters
None

#### Return Values
Returns a value of 0 to 100 based on the percentage of charge the battery contains.

#### Warning
The results of this command are undefined if you don't have a battery plugged into the Scout, and only powering it via USB.  This is due to the fuel gauge being unable to determine how much battery charge is available when there is no battery present.


## power.voltage

#### Description
`int power.voltage()`

All Scouts have an on-board fuel gauge that tells you the status of the battery. This returns the current voltage of the battery, multiplied by 100.  Divide the result by 100 to get the actual battery voltage: e.g. `414` is really 4.14 volts.

```js
> print power.voltage
> 414
```

#### Parameters
None

#### Return Values
Returns a value of ~3.4 volts to ~4.2 volts, based on the current voltage of the battery.

#### Warning
The results of this command are undefined if you don't have a battery plugged into the Scout, and only powering it via USB.  This is due to the fuel gauge being unable to determine how much battery voltage is available when there is no battery present.


## power.enablevcc

#### Description
`void power.enablevcc()`

This provides 3.3 volts to the **3V3** header pin.  Turn this on if you want to power any external devices connected to the **3V3** header pin.

```js
> power.enablevcc
>
```

#### Parameters
None

#### Return Values
None, but after running this command, the **3V3** header will be at 3.3 volts.


## power.disablevcc

#### Description
`void power.disablevcc()`

This turns off power to the **3V3** header pin.  You would turn this off if you want to remove power from any external devices connected to the **3V3** pin, perhaps to save battery life.

```js
> power.disablevcc
>
```

#### Parameters
None

#### Return Values
None, but after running this command, the **3V3** header will be at 0 volts.


## power.sleep
#### Description
`void power.sleep(ms)`

Puts the Scout to sleep for *ms* milliseconds.  Upon waking up, it will continue to run the commands it was running prior to sleeping.  When a Scout is asleep, it cannot communicate with any other boards or the web.  The good news is that it'll be in an extremely low power state, so your battery will last much longer!

```js
> power.sleep(1000)
>
```

The Scout can be woken up by an external pin change event on pin D4, D5, D7, or when the fuel gauge's battery alarm is triggered.  If any of these pins change state from an external source, like a button, it will wake up the Scout.


#### Parameters
- *ms* - The number of milliseconds to sleep.  One second equals 1000 milliseconds.  The maximum time a Scout can sleep is ~49 days.

#### Return Values
None, but after running this command, the Scout will be asleep.


## power.report

#### Description
`power.report`

Print a JSON response of the power status of the Scout. Included is the battery percent charge available, the voltage of the battery, if the battery is currently charging, and if power is available on the **3V3** header pin.

```js
> power.report
>
{
 "type":"power",
 "battery":100,
 "voltage":417,
 "charging":false,
 "vcc":true
}
```


#### Parameters
None

#### Return Values
A JSON representation of the current state of power for the Scout.

- *type* - The type of report returned.  In this case it will be the string *power*
- *battery* - The amount of battery percentage available in the battery. Range is 0 to 100.
- *voltage* - The voltage of the battery, x100--so *417* is 4.17 volts.  Range is between 3.4 volts and 4.2 volts.
- *charging* - A true/false value showing if the battery is currently charing.
- *vcc* - A true/false value showing if power is enabled to the **3V3** header pin that powers backpacks.

# mesh networking

## mesh.config
#### Description
`mesh.config(scoutId, troopId, channel=20)`

Set the mesh radio settings for this scout. You can set the unique ID of the scout, the troop that this scout is associated with, as well as what channel the scout should use to communicate with other scouts on the network.

```js
> mesh.config(1, 2, 20)
>
```

#### Parameters
- *scoutId* - The unique ID of this scout on the mesh network. Valid range is 0 to 65535.
- *troopId* - The ID of the troop this scout is associated with, also known as a PAN ID. Valid range is 0 to 65535.
- *channel* - The 802.15.4 channel for this troop.  Valid range is 11 to 26. All scouts in a troop must be on the same channel. Default is *20*.

#### Return Values
None

## mesh.setpower
#### Description
`mesh.setpower(powerLevel)`

Set the mesh radio power settings for this scout.  The higher the power, generally there is longer range and less drop-outs, but requires more battery power.


```js
> mesh.setpower(1)
>
```

#### Parameters
- *powerLevel* - The power level set using the following map

  * *0*:   3.5 dBm
  * *1*:   3.3 dBm
  * *2*:   2.8 dBm
  * *3*:   2.3 dBm
  * *4*:   1.8 dBm
  * *5*:   1.2 dBm
  * *6*:   0.5 dBm
  * *7*:  -0.5 dBm
  * *8*:  -1.5 dBm
  * *9*:  -2.5 dBm
  * *10*: -3.5 dBm
  * *11*: -4.5 dBm
  * *12*: -6.5 dBm
  * *13*: -8.5 dBm
  * *14*: -11.5 dBm
  * *15*: -16.5 dBm

#### Return Values
None


## mesh.setdatarate
#### Description
`mesh.setdatarate(dataRate)`

Set the mesh radio data rate, from 250kbit/sec up to 2Mbit/sec for this scout.  The higher the speed chosen, the less signal sensitivity the radio has--which usually translates to less radio range in the real world.


```js
> mesh.setpower(0)
>
```

#### Parameters
- *dataRate* - The data rate to set, using the following map

  * *0*:   250 kb/s  | -100 dBm
  * *1*:   500 kb/s  |  -96 dBm
  * *2*:   1000 kb/s |  -94 dBm
  * *3*:   2000 kb/s |  -86 dBm

#### Return Values
None


## mesh.key
#### Description
`mesh.key(key)`

Set the mesh radio security key, enabling the AES128 hardware encryption.  All Scouts in a troop should use the same key in order to communicate.

```js
> mesh.key("TestSecurityKey1")
>
```

#### Parameters
- *key* - The security key to use.  The key given should be 0-16 characters.

#### Return Values
None


## mesh.resetkey

#### Description
`mesh.resetkey()`

Resets the mesh radio security key.

```js
> mesh.resetkey()
>
```

#### Parameters
None

#### Return Values
None


## mesh.joingroup

#### Description
`mesh.joingroup(groupId)`

Add this Scout to a mesh group. All scouts in a group will receive messages sent to that group.  All Scouts are assigned to groups 1-9 by default.

```js
> mesh.joingroup(8)
>
```

#### Parameters
- *groupId* - The group to join.  Valid group IDs are 1-65535.  

#### Return Values
None


## mesh.leavegroup

#### Description
`mesh.leavegroup(groupId)`

Remove this Scout from a mesh group.  All Scouts are assigned to groups 1-9 by default.

```js
> mesh.leavegroup(8)
>
```

#### Parameters
- *groupId* - The group to leave.  Valid group IDs are 1-65535.  

#### Return Values
None


## mesh.ingroup

#### Description
`mesh.ingroup(groupId)`

Determine if this Scout is in the given group.

```js
> mesh.ingroup(6)
>
```

#### Parameters
- *groupId* - The group ID to check to determine if the Scout is a member.  Valid group IDs are 1-65535.  

#### Return Values
None


## mesh.send
#### Description
`mesh.send(scoutId, message)`

Send a message from this Scout to another Scout.

```js
> mesh.send(3, "hello")
>
```

#### Parameters
- *scoutId* - The scout ID to which the message is sent.
- *message* - The message to send to the Scout. This is a text string, surrounded in quotes, and should be no longer than 100 characters.

#### Return Values
None


## mesh.report
#### Description
`mesh.report()`

Prints a JSON response of the mesh radio status of the Scout.

```js
> mesh.report()
> 
{
  "type":"mesh",
  "scoutid":6,
  "troopid":1,
  "routes":1,
  "channel":20,
  "rate":"250 kb/s",
  "power":"3.5 dBm"
}
```

#### Parameters
None

#### Return Values
A JSON representation of the current state of mesh networking for the Scout.

- *type* - The type of report returned.  In this case it will be the string *mesh*
- *scoutid* - The unique ID of this particular Scout. Range is between 0 and 65535
- *troopid* - The ID specific to this particular Troop. Range is between 0 and 65535. Also known as a PAN ID.
- *routes* - The number of Scouts this Scout is routing packets for.
- *channel* - The 802.15.4 channel this Scout is listening on. Valid range is 11 to 26. 
- *rate* - The data rate the radio on this Scout is currently set to.
- *power* - The radio power setting this Scout is currently set to.

## mesh.routing

#### Description
`mesh.routing()`

Prints an output of the current mesh routing table for this Scout, in a human-readable format.

```js
> mesh.routing()
> 
> mesh.routing
|    Fixed    |  Multicast  |    Score    |    DstAdd   | NextHopAddr |    Rank     |     LQI     |
|      0      |      0      |      3      |      2      |      2      |     130     |     254     |
|      0      |      0      |      3      |      3      |      3      |     130     |     254     |
|      0      |      0      |      3      |      4      |      4      |     129     |     254     |
```

#### Parameters
None

#### Return Values
A human-readable representation of the current routing table.


## mesh.announce
#### Description
`mesh.announce(groupId, message)`

Send a message to an entire group of Scouts at once.

```js
> mesh.announce(2, "hi")
> 
```

#### Parameters
- *groupId* - The group to send the message to.  Valid group IDs are 1-65535.  
- *message* - The message to send to the Scout. This is a text string, surrounded in quotes, and should be no longer than 100 characters.

#### Return Values
None

## mesh.signal
#### Description
`mesh.signal()`

Return the last received message’s signal strength (RSSI.)  Typical values returned will be somewhere between -30 and -95, with lower numbers being a lower signal.  Since they’re negative values, -95 is a weaker signal than -30.

```js
> print mesh.signal()
> -39
```

#### Parameters
None

#### Return Values
The RSSI value of the last received message.

# miscellaneous

## temperature

#### Description
`temperature()`

Print the value of the on-chip temperature sensor, in Celsius.

```js
> temperature
> 21
```

#### Parameters
None

#### Return Values
The value of the on-chip temperature in Celsius.

## randomnumber
#### Description
`randomnumber()`

Print a random number, seeded from random noise on the RF antenna. True hardware random number generator!

```js
> randomnumber
> 21543
```

#### Parameters
None

#### Return Values
The value of a random number.  The range is -32768 to 32767.

## uptime
#### Description
`uptime()`

Print the number of milliseconds the Scout has been running since the last reset. One second is equal to 1000 milliseconds.

```js
> uptime
> 203403
```

#### Parameters
None

#### Return Values
The number of milliseconds since the last reset. 

# led

## led.blink
#### Description
`led.blink(red, green, blue, ms=500)`

Blink the RGB LED with the given colors.  An optional fourth argument chooses how long the LED will be on when it blinks.  The default time is 500 milliseconds. 

```js
> led.blink(0, 255, 255)
> 
```

#### Parameters
- *red* - The value of the red color for the LED.  Valid values are 0 to 255 with 0 being off and 255 being fully on.
- *green* - The value of the green color for the LED.  Valid values are 0 to 255 with 0 being off and 255 being fully on.
- *blue* - The value of the blue color for the LED.  Valid values are 0 to 255 with 0 being off and 255 being fully on.
- *ms* - **Optional** How long the LED should be on when it blinks.  Defaults to 500 milliseconds. 

#### Return Values
None

## led.off
#### Description
`led.off()`

Turn off the LED.  This turns off the LED if it's currently on, as well as disables any ongoing blinking that was set by a previous command.

```js
> led.off()
> 
```

#### Parameters
None

#### Return Values
None

## led.red
#### Description
`led.red(ms=0, continuous=0)`

Turn the LED red.  If the optional first argument is passed in, the LED will blink that many milliseconds and turn off again.  If the optional second argument is passed in, the LED will blink continuously until you call another LED command or `led.off`.

```js
> led.red()
> 
```

#### Parameters
- *ms* - **Optional** The duration in milliseconds the LED should be on.  If nothing's passed in, the LED will stay on indefinitely.
- *continuous* - **Optional** If a **1** is passed in here, the LED will blink indefinitely. Defaults to **0**.

#### Return Values
None

## led.green
#### Description
`led.green(ms=0, continuous=0)`

Turn the LED green.  If the optional first argument is passed in, the LED will blink that many milliseconds and turn off again.  If the optional second argument is passed in, the LED will blink continuously until you call another LED command or `led.off`.

```js
> led.green()
> 
```

#### Parameters
- *ms* - **Optional** The duration in milliseconds the LED should be on.  If nothing's passed in, the LED will stay on indefinitely.
- *continuous* - **Optional** If a **1** is passed in here, the LED will blink indefinitely. Defaults to **0**.

#### Return Values
None

## led.blue
#### Description
`led.blue(ms=0, continuous=0)`

Turn the LED blue.  If the optional first argument is passed in, the LED will blink that many milliseconds and turn off again.  If the optional second argument is passed in, the LED will blink continuously until you call another LED command or `led.off`.

```js
> led.blue()
> 
```

#### Parameters
- *ms* - **Optional** The duration in milliseconds the LED should be on.  If nothing's passed in, the LED will stay on indefinitely.
- *continuous* - **Optional** If a **1** is passed in here, the LED will blink indefinitely. Defaults to **0**.

#### Return Values
None


## led.cyan
#### Description
`led.cyan(ms=0, continuous=0)`

Turn the LED cyan.  If the optional first argument is passed in, the LED will blink that many milliseconds and turn off again.  If the optional second argument is passed in, the LED will blink continuously until you call another LED command or `led.off`.

```js
> led.cyan()
> 
```

#### Parameters
- *ms* - **Optional** The duration in milliseconds the LED should be on.  If nothing's passed in, the LED will stay on indefinitely.
- *continuous* - **Optional** If a **1** is passed in here, the LED will blink indefinitely. Defaults to **0**.

#### Return Values
None

## led.purple
#### Description
`led.purple(ms=0, continuous=0)`

Turn the LED purple.  If the optional first argument is passed in, the LED will blink that many milliseconds and turn off again.  If the optional second argument is passed in, the LED will blink continuously until you call another LED command or `led.off`.

```js
> led.purple()
> 
```

#### Parameters
- *ms* - **Optional** The duration in milliseconds the LED should be on.  If nothing's passed in, the LED will stay on indefinitely.
- *continuous* - **Optional** If a **1** is passed in here, the LED will blink indefinitely. Defaults to **0**.

#### Return Values
None

## led.magenta
#### Description
`led.magenta(ms=0, continuous=0)`

Turn the LED magenta.  If the optional first argument is passed in, the LED will blink that many milliseconds and turn off again.  If the optional second argument is passed in, the LED will blink continuously until you call another LED command or `led.off`.

```js
> led.magenta()
> 
```

#### Parameters
- *ms* - **Optional** The duration in milliseconds the LED should be on.  If nothing's passed in, the LED will stay on indefinitely.
- *continuous* - **Optional** If a **1** is passed in here, the LED will blink indefinitely. Defaults to **0**.

#### Return Values
None

## led.yellow
#### Description
`led.yellow(ms=0, continuous=0)`

Turn the LED yellow.  If the optional first argument is passed in, the LED will blink that many milliseconds and turn off again.  If the optional second argument is passed in, the LED will blink continuously until you call another LED command or `led.off`.

```js
> led.yellow()
> 
```

#### Parameters
- *ms* - **Optional** The duration in milliseconds the LED should be on.  If nothing's passed in, the LED will stay on indefinitely.
- *continuous* - **Optional** If a **1** is passed in here, the LED will blink indefinitely. Defaults to **0**.

#### Return Values
None

## led.orange
#### Description
`led.orange(ms=0, continuous=0)`

Turn the LED orange.  If the optional first argument is passed in, the LED will blink that many milliseconds and turn off again.  If the optional second argument is passed in, the LED will blink continuously until you call another LED command or `led.off`.

```js
> led.orange()
> 
```

#### Parameters
- *ms* - **Optional** The duration in milliseconds the LED should be on.  If nothing's passed in, the LED will stay on indefinitely.
- *continuous* - **Optional** If a **1** is passed in here, the LED will blink indefinitely. Defaults to **0**.

#### Return Values
None


## led.white
#### Description
`led.white(ms=0, continuous=0)`

Turn the LED white.  If the optional first argument is passed in, the LED will blink that many milliseconds and turn off again.  If the optional second argument is passed in, the LED will blink continuously until you call another LED command or `led.off`.

```js
> led.white()
> 
```

#### Parameters
- *ms* - **Optional** The duration in milliseconds the LED should be on.  If nothing's passed in, the LED will stay on indefinitely.
- *continuous* - **Optional** If a **1** is passed in here, the LED will blink indefinitely. Defaults to **0**.

#### Return Values
None

## led.torch
#### Description
`led.torch(ms=0, continuous=0)`

Turn the LED the Scout's torch color.  If the optional first argument is passed in, the LED will blink that many milliseconds and turn off again.  If the optional second argument is passed in, the LED will blink continuously until you call another LED command or `led.off`.

```js
> led.torch()
> 
```

#### Parameters
- *ms* - **Optional** The duration in milliseconds the LED should be on.  If nothing's passed in, the LED will stay on indefinitely.
- *continuous* - **Optional** If a **1** is passed in here, the LED will blink indefinitely. Defaults to **0**.

#### Return Values
None

## led.sethex
#### Description
`led.sethex(hexValue)`

Set the LED to the *hexValue* given. Similar to HTML, “RRGGBB”, but no hash at the beginning.

```js
> led.hexvalue("FF0000")
> 
```

#### Parameters
- *hexValue* - A hex value string of the color to set the LED. “RRGGBB” is the format of the string.

#### Return Values
None


## led.setrgb
#### Description
`led.setrgb(red, green, blue)`

Set the LED to the red, green, and blue values given. 

```js
> led.setrgb(255, 0, 0)
> 
```

#### Parameters
- *red* - The value of the red color for the LED.  Valid values are 0 to 255 with 0 being off and 255 being fully on.
- *green* - The value of the green color for the LED.  Valid values are 0 to 255 with 0 being off and 255 being fully on.
- *blue* - The value of the blue color for the LED.  Valid values are 0 to 255 with 0 being off and 255 being fully on.

#### Return Values
None

## led.savetorch(red, green, blue)
#### Description
`led.setrgb(red, green, blue)`

Set the LED to the red, green, and blue values given. 

```js
> led.setrgb(255, 0, 0)
> 
```

#### Parameters
- *red* - The value of the red color for the LED.  Valid values are 0 to 255 with 0 being off and 255 being fully on.
- *green* - The value of the green color for the LED.  Valid values are 0 to 255 with 0 being off and 255 being fully on.
- *blue* - The value of the blue color for the LED.  Valid values are 0 to 255 with 0 being off and 255 being fully on.

#### Return Values
None


Save the torch color to values given by *red*, *green*, and *blue*.

## led.report()
Print JSON of the current LED red, green, and blue values, and the torch color’s values.
```
{
 "type":"led",
 "led":[0,0,255],
 "torch":[0,255,0]
}
```
# pins
TODO
pin.on
pin.off
pin.makeinput
pin.makeinputup
pin.makeoutput
pin.setmode
pin.read
pin.write
pin.report.digital
pin.report.analog

# backpack

## backpack.report
Print JSON of the current backpacks attached to the Scout.
```
{
 "_":"bps",
 "a":[1,0,1,16,0,0,74,192]
}
```

## backpack.list
Lists all backpacks attached:
```
 01000116000074192
```

# scout

## scout.report
Print JSON of the Scout information, including information like family, hardware version, serial number, and build.
```
 {
 "type":"scout",
 "lead":false,
 "version":1,
 "hardware":1,
 "family":1000,
 "serial":2000052,
 "build":20140130
}
```
## scout.isleadscout
Returns true if the Scout is a Lead Scout, and has a Wi-Fi backpack attached.

## scout.sethqtoken(token)
Write the HQ token for this Scout given by *token*.

## scout.gethqtoken()
Print the HQ token currently assigned to this Scout.

## scout.delay(ms)
Delay the Scout for *ms* milliseconds.  Radio, shell, and other systems will continue to run, so it’s non-blocking.

## scout.daisy()
This will wipe a Scout and make it factory-fresh.  Running it once will ask you to run it again to confirm.  When run a second time, it will reset all settings in a Wi-Fi backpack, if attached, and will reset the mesh radio settings, HQ token, and mesh key.

## scout.boot
Restart the Scout.

# HQ

## hq.settoken(<token>)
Set the HQ token for this Scout.

## hq.gettoken()
Print the HQ token for this Scout.

# events

## events.start()
Start the event handler to trigger reports, callbacks, and eventing internals.

## events.stop()
Stop all event handlers on a Scout.

## events.setfreqs(digitalMs=50, analogMs=60000, peripheralMs=60000)
Set the frequency of the various event handlers. *digitalMs* will set how often the digital pin event handlers are called, and default to twenty times per second.  *analogMs* will set how often the analog pin event handlers are called, and default to once every 60 seconds.  *peripheralMs* will set how often the peripheral event handlers are called, and default to once every 60 seconds.  The peripherals include the battery percentage, voltage, charging flag, battery alarm, and temperature.

# key/value
TODO
## key

## key.print

## key.number

## key.save

# lead scout

## wifi.report()
Print the current report of the Wi-Fi connection:

```
{
 "type":"wifi",
 "version":0,
 "connected":true,
 "hq":true
}
```

## wifi.status()
Print human-readable information about the Wi-Fi module:

```
Wi-Fi Versions: S2W APP VERSION=2.5.1
S2W GEPS VERSION=2.5.1
S2W WLAN VERSION=2.5.1
MAC=20:f8:5e:a1:4a:57
WSTATE=CONNECTED     MODE=AP
BSSID=00:1b:63:2c:18:b3   SSID="Pinoccio" CHANNEL=2   SECURITY=WPA2-PERSONAL
RSSI=-50
IP addr=10.0.1.128   SubNet=255.255.255.0  Gateway=10.0.1.1
DNS1=10.0.1.1       DNS2=0.0.0.0
Rx Count=94     Tx Count=10232
CID  TYPE  MODE  LOCAL PORT  REMOTE PORT  REMOTE IP
1  TCP-SSL CLIENT  48838    22757    173.255.220.185
```

## wifi.list()
Print out a list of Wi-Fi access points (APs) nearby

```
       BSSID        SSID   Channel Type   RSSI  Security
 44:94:fc:62:b2:72, Louise  , 01, INFRA , -85 , WPA2-PERSONAL
 00:1b:63:2c:18:b3, Pinoccio, 02, INFRA , -52 , WPA2-PERSONAL
No.Of AP Found:2
```


## wifi.config(wifiAPName, wifiAPPassword)
Set the Wi-Fi access point name and password in order to connect.

## wifi.dhcp(hostname=NULL)
Enable DHCP for the Wi-Fi backpack.  An optional *hostname* can be passed if desired, but not required.

## wifi.static(ip, netmask, gateway, dns)
Set static IP settings for the Wi-Fi backpack.  *ip* is the static IP you wish to assign to the backpack.  *netmask* is the netmask.  *gateway* is usually the IP address of your router, and *dns* is the DNS server you’d like to use.

## wifi.reassociate()
Calling this makes the Wi-Fi backpack reassociate with its AP as well as attempt to auto-connect to HQ.

## wifi.command(command)
Send a raw command to the Wi-Fi module.  Please see the Gainspan GS1011MIPS datasheet for the raw commands.

## wifi.ping(hostname)
TODO: Ping a remote server.  Hostname can be a fully-qualified domain name, or can be an IP address.

## wifi.dnslookup(hostname)
TODO: Look up the IP address of the given *hostname*.

## wifi.gettime()
Return the current time, as fetched from the Wi-Fi backpack via network time protocol (NTP.)  The time returned is in UTC.

```
9/2/2014,21:48:43,1391982523746
```
