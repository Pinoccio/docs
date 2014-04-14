# power

## power.ischarging

#### Description
`int power.ischarging()`

Determines if the Scout is charging its battery via USB. This will also mirror the orange charging LED next to the USB port, which also shines when charging, and turns off when either fully-charged, or the Scout is not plugged in.

```bash
> print power.ischarging
```

#### Parameters
None

#### Return Values
Returns **0** if the Scout is not charging, and **1** if it is charging.

```bash
> 1
```

#### Warning
The results of this command are undefined if you don't have a battery plugged into the Scout, and only powering it via USB.  This is due to the Lipo battery charger constantly trying to charge the non-existent battery.


## power.percent

#### Description
`int power.percent()`

All Scouts have an on-board fuel gauge that tells you the status of the battery. This returns the percentage of battery life left on the Scout.

```bash
> print power.percent
```

#### Parameters
None

#### Return Values
Returns a value of 0 to 100 based on the percentage of charge the battery contains.

```bash
> 85
```

#### Warning
The results of this command are undefined if you don't have a battery plugged into the Scout, and only powering it via USB.  This is due to the fuel gauge being unable to determine how much battery charge is available when there is no battery present.


## power.voltage

#### Description
`int power.voltage()`

All Scouts have an on-board fuel gauge that tells you the status of the battery. This returns the current voltage of the battery, multiplied by 100.  Divide the result by 100 to get the actual battery voltage: e.g. `414` is really 4.14 volts.

```bash
> print power.voltage
```

#### Parameters
None

#### Return Values
Returns a value of ~3.4 volts to ~4.2 volts, based on the current voltage of the battery.

```bash
> 414
```

#### Warning
The results of this command are undefined if you don't have a battery plugged into the Scout, and only powering it via USB.  This is due to the fuel gauge being unable to determine how much battery voltage is available when there is no battery present.


## power.enablevcc

#### Description
`void power.enablevcc()`

This provides 3.3 volts to the 3V3 header pin.  Turn this on if you want to power any external devices connected to the 3V3 header pin.

```bash
> power.enablevcc
```

#### Parameters
None

#### Return Values
None, but after running this command, the 3V3 header pin will be at 3.3 volts.


## power.disablevcc

#### Description
`void power.disablevcc()`

This turns off power to the 3V3 header pin.  You would turn this off if you want to remove power from any external devices connected to the 3V3 header pin, perhaps to save battery life.

```bash
> power.disablevcc
```

#### Parameters
None

#### Return Values
None, but after running this command, the 3V3 header pin will be at 0 volts.


<!--
## power.sleep
#### Description
`void power.sleep(ms)`

Puts the Scout to sleep for *ms* milliseconds.  Upon waking up, it will continue to run the commands it was running prior to sleeping.  When a Scout is asleep, it cannot communicate with any other boards or the web.  The good news is that it'll be in an extremely low power state, so your battery will last much longer!

```bash
> power.sleep(1000)
```

The Scout can be woken up by an external pin change event on pin D4, D5, D7, or when the fuel gauge's battery alarm is triggered.  If any of these pins change state from an external source, like a button, it will wake up the Scout.


#### Parameters
- *ms* - The number of milliseconds to sleep.  One second equals 1000 milliseconds.  The maximum time a Scout can sleep is ~49 days.

#### Return Values
None, but after running this command, the Scout will be asleep.
-->

## power.report

#### Description
`power.report`

Print a JSON response of the power status of the Scout. Included is the battery percent charge available, the voltage of the battery, if the battery is currently charging, and if power is available on the 3V3 header pin.

```bash
> power.report
```

#### Parameters
None

#### Return Values

A JSON representation of the current state of power for the Scout.

```
{
 "type":"power",
 "battery":100,
 "voltage":417,
 "charging":false,
 "vcc":true
}
```

- *type* - The type of report returned.  In this case it will be the string **power**
- *battery* - The amount of battery percentage available in the battery. Range is 0 to 100.
- *voltage* - The voltage of the battery, x100--so **417** is 4.17 volts.  Range is between 3.4 volts and 4.2 volts.
- *charging* - A true/false value showing if the battery is currently charing.
- *vcc* - A true/false value showing if power is enabled to the 3V3 header pin that powers backpacks.

# mesh networking

## mesh.config
#### Description
`mesh.config(scoutId, troopId, channel=20)`

Set the mesh radio settings for this scout. You can set the unique ID of the scout, the troop that this scout is associated with, as well as what channel the scout should use to communicate with other scouts on the network.

```bash
> mesh.config(1, 2, 20)
```

#### Parameters
- *scoutId* - The unique ID of this scout on the mesh network. Valid range is 0 to 65535.
- *troopId* - The ID of the troop this scout is associated with, also known as a PAN ID. Valid range is 0 to 65535.
- *channel* - The 802.15.4 channel for this troop.  Valid range is 11 to 26. All scouts in a troop must be on the same channel. Default is **20**.

#### Return Values
None

## mesh.setpower
#### Description
`mesh.setpower(powerLevel)`

Set the mesh radio power settings for this scout.  The higher the power, generally there is longer range and less drop-outs, but requires more battery power.


```bash
> mesh.setpower(1)
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


```bash
> mesh.setpower(0)
```

#### Parameters
- *dataRate* - The data rate to set, using the following map

  * *0*:   250 kb/s  | -100 dBm
  * *1*:   500 kb/s  |  -96 dBm
  * *2*:   1000 kb/s |  -94 dBm
  * *3*:   2000 kb/s |  -86 dBm

#### Return Values
None


## mesh.setkey
#### Description
`mesh.setkey("key")`

Set the mesh radio security key, enabling the AES128 hardware encryption.  All Scouts in a troop should use the same key in order to communicate.

```bash
> mesh.setkey("TestSecurityKey1")
```

#### Parameters
- *key* - The security key to use.  The key given should be 0-16 characters.

#### Return Values
None


## mesh.getkey
#### Description
`mesh.getkey()`

Get the mesh radio security key that enables the AES128 hardware encryption.

```bash
> mesh.getkey()
```

#### Parameters
None

#### Return Values
None

```bash
> TestSecurityKey1
```


## mesh.resetkey

#### Description
`mesh.resetkey()`

Resets the mesh radio security key.

```bash
> mesh.resetkey
```

#### Parameters
None

#### Return Values
None


## mesh.joingroup

#### Description
`mesh.joingroup(groupId)`

Add this Scout to a mesh group. All scouts in a group will receive messages sent to that group.  All Scouts are assigned to groups 1-9 by default.

```bash
> mesh.joingroup(8)
```

#### Parameters
- *groupId* - The group to join.  Valid group IDs are 1-65535.

#### Return Values
None


## mesh.leavegroup

#### Description
`mesh.leavegroup(groupId)`

Remove this Scout from a mesh group.  All Scouts are assigned to groups 1-9 by default.

```bash
> mesh.leavegroup(8)
```

#### Parameters
- *groupId* - The group to leave.  Valid group IDs are 1-65535.

#### Return Values
None


## mesh.ingroup

#### Description
`mesh.ingroup(groupId)`

Determine if this Scout is in the given group.

```bash
> mesh.ingroup(6)
```

#### Parameters
- *groupId* - The group ID to check to determine if the Scout is a member.  Valid group IDs are 1-65535.

#### Return Values
Returns **1** if the scout is a member of the given group, **0** otherwise.

```bash
> 1
```


## mesh.send
#### Description
`mesh.send(scoutId, "message")`

Send a message from this Scout to another Scout.

```bash
> mesh.send(3, "hello")
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

```bash
> mesh.report
```

#### Parameters
None

#### Return Values
A JSON representation of the current state of mesh networking for the Scout.

```
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

- *type* - The type of report returned.  In this case it will be the string **mesh**
- *scoutid* - The unique ID of this particular Scout. Range is between **0** and **65535**.
- *troopid* - The ID specific to this particular Troop. Range is between **0** and **65535**. Also known as a PAN ID.
- *routes* - The number of Scouts this Scout is routing packets for.
- *channel* - The 802.15.4 channel this Scout is listening on. Valid range is **11** to **26**.
- *rate* - The data rate the radio on this Scout is currently set to.
- *power* - The radio power setting this Scout is currently set to.

## mesh.routing

#### Description
`mesh.routing()`

Prints an output of the current mesh routing table for this Scout, in a human-readable format.

```bash
> mesh.routing
```

#### Parameters
None

#### Return Values
A human-readable representation of the current routing table.

```
|    Fixed    |  Multicast  |    Score    |    DstAdd   | NextHopAddr |    Rank     |     LQI     |
|      0      |      0      |      3      |      2      |      2      |     130     |     254     |
|      0      |      0      |      3      |      3      |      3      |     130     |     254     |
|      0      |      0      |      3      |      4      |      4      |     129     |     254     |
```


## mesh.announce
#### Description
`mesh.announce(groupId, "message")`

Send a message to an entire group of Scouts at once.

```bash
> mesh.announce(2, "hi")
```

#### Parameters
- *groupId* - The group to send the message to.  Valid group IDs are **1** to **65535**.
- *message* - The message to send to the Scout. This is a text string, surrounded in quotes, and should be no longer than 100 characters.

#### Return Values
None

## mesh.signal
#### Description
`mesh.signal()`

Return the last received message’s signal strength (RSSI.)  Typical values returned will be somewhere between -30 and -95, with lower numbers being a lower signal.  Since they’re negative values, -95 is a weaker signal than -30.

```bash
> print mesh.signal
```

#### Parameters
None

#### Return Values
The RSSI value of the last received message.

```bash
> -39
```

# miscellaneous

## temperature

#### Description
`temperature()`

Print the value of the on-chip temperature sensor, in Celsius.

```bash
> temperature
```

#### Parameters
None

#### Return Values
The value of the on-chip temperature in Celsius.

```js
> 21
```


## randomnumber
#### Description
`randomnumber()`

Print a random number, seeded from random noise on the RF antenna. True hardware random number generator!

```bash
> randomnumber
```

#### Parameters
None

#### Return Values
The value of a random number.  The range is -32768 to 32767.

```bash
> 21543
```

## uptime
#### Description
`uptime()`

Print the number of milliseconds the Scout has been running since the last reset. One second is equal to 1000 milliseconds.

```bash
> uptime
```

#### Parameters
None

#### Return Values
The number of milliseconds since the last reset.

```bash
> 203403
```

# led
## led.blink
#### Description
`led.blink(red, green, blue, ms=500, continuous=0)`

Blink the RGB LED with the given colors.  An optional fourth argument chooses how long the LED will be on when it blinks.  The default time is 500 milliseconds.  If the optional fifth argument is passed in, the LED will blink continuously until you call another LED command or `led.off`.

```bash
> led.blink(0, 255, 255)
```

#### Parameters
- *red* - The value of the red color for the LED.  Valid values are **0** to **255** with **0** being off and **255** being fully on.
- *green* - The value of the green color for the LED.  Valid values are **0** to **255** with **0** being off and **255** being fully on.
- *blue* - The value of the blue color for the LED.  Valid values are **0** to **255** with **0** being off and **255** being fully on.
- *ms* - **Optional** How long the LED should be on when it blinks.  Defaults to **500** milliseconds.
- *continuous* - **Optional** If a **1** is passed in here, the LED will blink indefinitely. Defaults to **0**.

#### Return Values
None

## led.off
#### Description
`led.off()`

Turn off the LED.  This turns off the LED if it's currently on, as well as disables any ongoing blinking that was set by a previous command.

```bash
> led.off
```

#### Parameters
None

#### Return Values
None

## led.red
#### Description
`led.red(ms=0, continuous=0)`

Turn the LED red.  If the optional first argument is passed in, the LED will blink that many milliseconds and turn off again.  If the optional second argument is passed in, the LED will blink continuously until you call another LED command or `led.off`.

```bash
> led.red
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

```bash
> led.green
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

```bash
> led.blue
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

```bash
> led.cyan
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

```bash
> led.purple
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

```bash
> led.magenta
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

```bash
> led.yellow
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

```bash
> led.orange
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

```bash
> led.white
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

```bash
> led.torch
```

#### Parameters
- *ms* - **Optional** The duration in milliseconds the LED should be on.  If nothing's passed in, the LED will stay on indefinitely.
- *continuous* - **Optional** If a **1** is passed in here, the LED will blink indefinitely. Defaults to **0**.

#### Return Values
None

## led.sethex
#### Description
`led.sethex("hexValue")`

Set the LED to the *hexValue* given. Similar to HTML, “RRGGBB”, but no hash at the beginning.

```bash
> led.hexvalue("FF0000")
```

#### Parameters
- *hexValue* - A hex value string of the color to set the LED. “RRGGBB” is the format of the string.

#### Return Values
None


## led.setrgb
#### Description
`led.setrgb(red, green, blue)`

Set the LED to the red, green, and blue values given.

```bash
> led.setrgb(255, 0, 0)
```

#### Parameters
- *red* - The value of the red color for the LED.  Valid values are **0** to **255** with **0** being off and **255** being fully on.
- *green* - The value of the green color for the LED.  Valid values are **0** to **255** with **0** being off and **255** being fully on.
- *blue* - The value of the blue color for the LED.  Valid values are **0** to **255** with **0** being off and **255** being fully on.

#### Return Values
None

## led.savetorch
#### Description
`led.savetorch(red, green, blue)`

Save the torch color to values given by red, green, and blue.

```bash
> led.savetorch(255, 0, 0)
```

#### Parameters
- *red* - The value of the red color for the LED.  Valid values are **0** to **255** with **0** being off and **255** being fully on.
- *green* - The value of the green color for the LED.  Valid values are **0** to **255** with **0** being off and **255** being fully on.
- *blue* - The value of the blue color for the LED.  Valid values are **0** to **255** with **0** being off and **255** being fully on.

#### Return Values
None


## led.report
#### Description
`led.report()`

```bash
> led.report
```

#### Parameters
None

#### Return Values
A JSON representation of the current state of the LED.

```
{
  "type":"led",
  "led":[0,0,0],
  "torch":[255,0,0]
}
```

- *type* - The type of report returned.  In this case it will be the string **led**
- *led* - The current state of the LED with the values of red, green, and blue.
- *torch* - The torch color saved to this Scout with the values of red, green, and blue.

# pins
## pin.makeinput
#### Description
`pin.makeinput("pinName", inputType=INPUT_PULLUP)`

Make the given pin an input.

```bash
> pin.makeinput("d2")
```

#### Parameters
- *pinName* - A string value of the pin to make an input. Valid values are **"d2"** through **"d8"** and **"a0"** through **"a7"**.
- *inputType* - Optional. Set to **INPUT** if you want the pull-up resistor to be disabled. Set to **INPUT_PULLUP** if you want the pull-up resistor enabled.  Set to **INPUT_PULLUP** by default.

#### Return Values
None

## pin.makeoutput
#### Description
`pin.makeoutput("pinName")`

Make the given pin an output.  Once a pin is an output, you can set it high or low.

```bash
> pin.makeoutput("d2")
```

#### Parameters
- *pinName* - A string value of the pin to make an output. Valid values are **"d2"** through **"d8"** and **"a0"** through **"a7"**.

#### Return Values
None

## pin.disable
#### Description
`pin.disable("pinName")`

Disable the given pin.  A disabled pin will not send any events to other Scouts or to HQ.

```bash
> pin.disable("d2")
```

#### Parameters
- *pinName* - A string value of the pin to disable. Valid values are **"d2"** through **"d8"** and **"a0"** through **"a7"**.

#### Return Values
None


## pin.setmode
#### Description
`pin.setmode("pinName", pinMode)`

Set the pin mode for a given pin.

```bash
> pin.setmode("d2", INPUT_PULLUP)
```

#### Parameters
- *pinName* - A string value of the pin to set the mode. Valid values are **"d2"** through **"d8"** and **"a0"** through **"a7"**.
- *pinMode* - The mode to set the pin. Valid values are *INPUT*, *OUTPUT*, *INPUT_PULLUP*, and *DISABLED*.

#### Return Values
None


## pin.read
#### Description
`pin.read("pinName")`

Get the value for the given pin.

```bash
> pin.read("d2")
```

#### Parameters
- *pinName* - A string value of the pin to read. Valid values are **"d2"** through **"d8"** and **"a0"** through **"a7"**.

#### Return Values
The current value of the pin.  For digital pins the value will be **0** or **1**.  For analog pins the value will be **0** to **1023**.


## pin.write
#### Description
`pin.write("pinName", pinValue)`

Set the value for the given pin.

```bash
> pin.write("d2", HIGH)
```

#### Parameters
- *pinName* - A string value of the pin to write. Valid values are **"d2"** through **"d8"** and **"a0"** through **"a7"**.
- *pinValue* - The value to set the pin to.  Possible values are **HIGH** or **LOW**.

#### Return Values
None


## pin.report.digital
#### Description
`pin.report.digital()`

Get a report of the pin values and pin modes of the digital pins, d2 through d8.

```bash
> pin.report.digital
```

#### Parameters
None

#### Return Values
A JSON representation of the current state of the digital pins.

```
{
  "type":"digital",
  "mode":[-1,-1,-1,-1,-1,-1,-1],
  "state":[-1,-1,-1,-1,-1,-1,-1]
}
```

- *type* - The type of report returned.  In this case it will be the string **digital**
- *mode* - An array of pin modes for "d2" to "d8". **-1** is *DISABLED*, **0**, is *INPUT*, **1** is *OUTPUT*, and **2** is *INPUT_PULLUP*
- *state* - An array of pin values for "d2" to "d8". **-1** is *DISABLED*, **0**, is *LOW*, and **1** is *HIGH*.

## pin.report.analog
#### Description
`pin.report.analog()`

Get a report of the pin values and pin modes of the analog pins, a0 through a7.

```bash
> pin.report.analog
```

#### Parameters
None

#### Return Values
A JSON representation of the current state of the digital pins.

```
{
  "type":"analog",
  "mode":[-1,-1,-1,-1,-1,-1,-1,-1],
  "state":[-1,-1,-1,-1,-1,-1,-1,-1]
}
```

- *type* - The type of report returned.  In this case it will be the string *analog*
- *mode* - An array of pin modes for "d2" to "d8". **-1** is *DISABLED*, **0**, is *INPUT*, **1** is *OUTPUT*, and **2** is *INPUT_PULLUP*
- *state* - An array of pin values for "a0" to "a7". **-1** is *DISABLED*, ranges **0** to **1023** are possible for analog inputs.


# scout
## scout.report
#### Description
`scout.report()`

Get a report of the Scout's information, including family, hardware version, serial number, and build.

```bash
> scout.report
```

#### Parameters
None

#### Return Values
A JSON representation of the current state of the digital pins.

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

- *type* - The type of report returned.  In this case it will be the string **scout**
- *lead* - Will be **true** if this Scout is a Lead Scout, **false** otherwise.
- *version* - The version of this report. Later report versions may have more or different fields.
- *hardware* - The hardware version of this Scout.
- *family* - The family that this hardware belongs to. **1000** is the only valid value at this time.
- *serial* - A unique serial number of this Scout.
- *build* - The build number of the firmware on this Scout. Useful for auto-updating.

## scout.isleadscout
#### Description
`scout.isleadscout()`

Determines if this is a Lead Scout or not.

```bash
> scout.isleadscout
```

#### Parameters
None

#### Return Values
Returns **0** if this is not a Lead Scout, and **1** if it is a Lead Scout and has a Wi-Fi backpack attached.

```bash
> 0
```

<!--
## scout.delay
#### Description
`scout.delay(ms)`

Delay the Scout for the given milliseconds. Radio, shell, Wi-Fi, and other systems will continue to run, so it’s non-blocking.  The interactive shell will return a prompt again once the delay has expired.

```bash
> scout.delay(1000)
```

#### Parameters
- *ms* - The number of milliseconds to delay.

#### Return Values
None.
-->

## scout.daisy
#### Description
`scout.daisy()`

Wipe a Scout clean and make it factory-fresh.  Running this once will ask you to run it again to confirm the factory reset.  When run a second time, it will reset all settings in a Wi-Fi backpack, if attached, and will reset the mesh radio settings, HQ token, and mesh security key.  It will not reset the hardware, family, and serial IDs of the Scout.

```bash
> scout.daisy
> Factory reset requested. Send command again to confirm.
> scout.daisy
> Ok, terminating. Goodbye Dave.
```

#### Parameters
None

#### Return Values
None


## scout.boot
#### Description
`scout.boot()`

Restarts the Scout using the watchdog timer, so all pins are reset and initial state is restored.

```bash
> scout.boot
```

#### Parameters
None

#### Return Values
None

```
Hello from Pinoccio!
 (Shell based on Bitlash v2.0 (c) 2014 Bill Roy)
 17774 bytes free
 Build 2014032001
 Field Scout ready
>
```


# HQ
## hq.settoken
#### Description
`hq.settoken("token")`

Saves the unique user HQ token for this Scout given by the argument.

```bash
> scout.sethqtoken("8abc0800a80a08w0asd0f80asd")
```

#### Parameters
- *token* - The unique HQ token to associate this troop to the user account on HQ.

#### Return Values
None


## hq.gettoken
#### Description
`hq.gettoken()`

Prints the unique user HQ token for this Scout.

```bash
> scout.gethqtoken
```

#### Parameters
None

#### Return Values
- *token* - The unique HQ token associated with this Scout.

```bash
> 8abc0800a80a08w0asd0f80asd
```

# events

## events.start
#### Description
`events.start()`

Start the event handler to trigger reports, callbacks, and eventing internals.

```bash
> events.start
```

#### Parameters
None

#### Return Values
None



## events.stop
#### Description
`events.stop()`

Stop the event handler that triggers reports, callbacks, and eventing internals.  If events are turned off, no reports will be triggered, and HQ will not reflect the state of the Scout any further until events are turned on again.

```bash
> events.stop
```

#### Parameters
None

#### Return Values
None

## events.setcycle
#### Description
`events.setcycle(digitalMs, analogMs, peripheralMs)`

Set the frequency of the various event handlers. These values will slow down or speed up the responsiveness of various events, split into digital, analog, and the peripheral sets.

```bash
> events.setcycle(100, 1000, 60000)
```

#### Parameters
- *digitalMs* - How often the digital pin event handlers are called. Defaults to 50ms, or twenty times per second.
- *analogMs* - How often the analog pin event handlers are called. Defaults to 60000ms, or once a minute.
- *peripheralMs* - How often the peripheral event handlers are called.  Defaults to 60000ms, or once a minute.  The peripherals include the battery percentage, voltage, charging flag, battery alarm, and temperature.

#### Return Values
None

<!--
# event callbacks

## event.message
#### Description
`event.message(fromScoutId, key)`

This callback will be executed whenever the Scout receives a message via the mesh network

```bash
> events.start
```

#### Parameters
None

#### Return Values
None



## events.stop
#### Description
`events.stop()`

Stop the event handler that triggers reports, callbacks, and eventing internals.  If events are turned off, no reports will be triggered, and HQ will not reflect the state of the Scout any further until events are turned on again.

```bash
> events.stop
```

#### Parameters
None

#### Return Values
None

## events.setcycle
#### Description
`events.setcycle(digitalMs, analogMs, peripheralMs)`

Set the frequency of the various event handlers. These values will slow down or speed up the responsiveness of various events, split into digital, analog, and the peripheral sets.

```bash
> events.setcycle(100, 1000, 60000)
```

#### Parameters
- *digitalMs* - How often the digital pin event handlers are called. Defaults to 50ms, or twenty times per second.
- *analogMs* - How often the analog pin event handlers are called. Defaults to 60000ms, or once a minute.
- *peripheralMs* - How often the peripheral event handlers are called.  Defaults to 60000ms, or once a minute.  The peripherals include the battery percentage, voltage, charging flag, battery alarm, and temperature.

#### Return Values
None
-->

# lead scout

## wifi.report
#### Description
`wifi.report()`

Print the current report of the Wi-Fi connection.  Note, this command only works on a Lead Scout.

```bash
> wifi.report
```

#### Parameters
None

#### Return Values
A JSON representation of the current state of the Wi-Fi connection.

```
{
 "type":"wifi",
 "version":0,
 "connected":true,
 "hq":true
}
```

- *type* - The type of report returned.  In this case it will be the string *wifi*
- *connected* - Will be *true* if this Lead Scout is connected to a Wi-Fi access point, *false* otherwise.
- *hq* - Will be *true* if this Lead Scout is connected to HQ over a TCP SSL connection, *false* otherwise.

## wifi.status
#### Description
`wifi.status()`

Print detailed, human-readable information about the Wi-Fi module.  Note, this command only works on a Lead Scout.

```bash
> wifi.status
```

#### Parameters
None

#### Return Values
The information about the Wi-Fi module.

```
S2W APP VERSION=2.5.1
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

## wifi.list
#### Description
`wifi.list()`

Print out a list of Wi-Fi access points (APs) nearby.  Note, this command only works on a Lead Scout.

```bash
> wifi.list
```

#### Parameters
None

#### Return Values
The list of access points found.

```
       BSSID        SSID   Channel Type   RSSI  Security
 44:94:fc:62:b2:72, Louise  , 01, INFRA , -85 , WPA2-PERSONAL
 00:1b:63:2c:18:b3, Pinoccio, 02, INFRA , -52 , WPA2-PERSONAL
No.Of AP Found:2
```


## wifi.config
#### Description
`wifi.config("wifiAPName", "wifiAPPassword")`

Associate this Lead Scout with a new access point (AP.)  Note, this command only works on a Lead Scout.

Once you call this command, you have to run `wifi.reassociate` to actually connect to the new AP.  This command just saves the AP credentials to use on the next association.

```bash
> wifi.config("My Access Point", "password")
```

#### Parameters
- *wifiAPName* - The name of the access point. Be sure to enclose in double quotes, i.e. *"name"*.
- *wifiAPPassword* - The password of the access point.  Be sure to enclose in double quotes, i.e. *"name"*.

#### Return Values
None. Run `wifi.reassociate` to actually connect to the new access point.


## wifi.dhcp
#### Description
`wifi.dhcp("hostname")`

Enable DHCP on the Wi-Fi backpack.  An optional *hostname* can be passed if desired, but not required.  This must be run before `wifi.reassociate` in order to take effect.  If you wish to manually enter your IP information, use `wifi.static` below.

```bash
> wifi.dhcp
```

#### Parameters
- *hostname* - Optional. If you want to assign a hostname to this device during the DHCP process. If no hostname is given, it will default to "Pinoccio".

#### Return Values
None


## wifi.static
#### Description
`wifi.static("ip", "netmask", "gateway", "dns")`

Set static IP settings for the Wi-Fi backpack.

```bash
> wifi.static("192.168.1.100", "255,255,255.0", "192.168.1.1", "8.8.8.8")
```

#### Parameters
- *ip* - The static IP you wish to assign to the backpack.
- *netmask* - The netmask to assign to the backpack.
- *gateway* - The gateway to assign to the backpack. This is usually the IP address of your router.
- *dns* - The DNS server you'd like to use. Only one DNS server is available at this time.

#### Return Values
None


## wifi.reassociate
#### Description
`wifi.reassociate()`

Cause the Wi-Fi backpack to re-associate with the access point given in the most recent call to `wifi.config`.  The backpack will first attempt to connect to the access point.  Once that's successful, it will attempt to make a TCP connection to HQ. After that, it will establish an SSL handshake for encryption.  Once it's complete, `wifi.report` will confirm if everything has connected successfully.

The backpack will always attempt to keep a connection to HQ, as well as keep associated with the access point.  If the access point is reset, or the connection to HQ is interrupted, it will attempt to reconnect on its own.

Note, during the connection phase, specifically during the SSL handshake, the Scout may become somewhat unresponsive for a few seconds.  This is normal, and the shell prompt should return shortly afterwards.

```bash
> wifi.reassociate
```

#### Parameters
None

#### Return Values
None


## wifi.command
#### Description
`wifi.command("command")`

Send a raw command to the Wi-Fi module.  Please see the Gainspan GS1011MIPS datasheet for the raw commands.

Note, this is an advanced command, and you can put the Wi-Fi backpack into an unknown state with this command, so please be careful!

```bash
> wifi.command("AT+VER=?")
```

#### Parameters
- *command* - The AT command to send to the Wi-Fi module. Must be surrounded by double-quotes.

#### Return Values
The response of the raw command.

```
S2W APP VERSION=2.5.1
S2W GEPS VERSION=2.5.1
S2W WLAN VERSION=2.5.1
```

<!--
## wifi.gettime
#### Description
`wifi.gettime()`

Print the current time, fetched from the Wi-Fi backpack via network time protocol (NTP.)  The time returned is in UTC.

```bash
> wifi.gettime
```

#### Parameters
None

#### Return Values
The current time, in the format DD/MM/YYYY,HH:MM:SS,<number of milliseconds since 1/1/1970>

```
22/3/2014,18:18:48,1395512328039
```
-->