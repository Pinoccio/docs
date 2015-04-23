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
The results of this command are undefined if you don't have a battery plugged into the Scout, and only powering it via USB.  This is due to the Lipo battery charger constantly trying to charge the non-existent battery.  Check to see if a battery is attached first using the `power.hasbattery` command.


## power.hasbattery

#### Description
`int power.hasbattery()`

Determines if a battery is currently attached to the Scout.

```bash
> print power.hasbattery
```

#### Parameters
None

#### Return Values
Returns **0** if the no battery is attached, and **1** if it is attached.

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


## power.isvccenabled

#### Description
`int power.isvccenabled()`

This returns the current state of the power supplied to the 3V3 header pin.

```bash
> print power.isvccenabled
```

#### Parameters
None

#### Return Values
Returns 1 if the VCC pin is currently enabled, 0 otherwise

## power.sleep
#### Description
`void power.sleep(ms, ["callback"])`

Puts the Scout to sleep for *ms* milliseconds.  Upon waking up, it will run the ScoutScript function *callback*.  When a Scout is asleep, it cannot communicate with any other boards or the web, nor will any event handlers run.  However, it'll be in an extremely low power state, so your battery will last much longer!

*callback* will receive two arguments when it's called: the total sleep duration (e.g. the first argument to power.sleep as-is) as well as the number of milliseconds left to sleep.  Normally, the second argument will be 0. However, when the sleep was interrupted, it can be non-zero.

When sleep is interrupted, the callback function can return a non-zero value to continue sleeping until the full sleep duration has passed. When the callback returns 0, no further sleeping happens (though the callback can of course call `power.sleep` again to schedule another sleep interval.)

It is advisable to always let the `power.sleep` callback function return a value. If no value is explicitly returned, the return value of the last statement in the callback function is used, which might not be what you want.

Pinoccio lab measurements showed a current draw of 12.5µA when the board is in the sleep state, though various factors can cause this to be higher.

```bash
> power.sleep(1000, "wakeupfunction")
```

#### Parameters
- *ms* - The number of milliseconds to sleep.  One second equals 1000 milliseconds.  The minimum useful time a Scout can sleep is ~100ms, and the maximum time is ~50 days. Actual sleep time might be different from the given value because the timer used uses 31ms increments and the scout finishes up unfinished business before actually going to sleep.
- *command* - **Optional** Any valid ScoutScript command to run upon waking up.  This command can call `power.sleep` again without problem, to have any sleep/wake cycle you want.


#### Return Values
None. This command returns immediately and any subsequent commands are processed *before* going to sleep.

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

```json
{
 "type":"power",
 "battery":100,
 "voltage":417,
 "charging":false,
 "vcc":true,
 "at":1006918
}
```

- *type* - The type of report returned.  In this case it will be the string **power**
- *battery* - The amount of battery percentage available in the battery. Range is 0 to 100.
- *voltage* - The voltage of the battery, x100--so **417** is 4.17 volts.  Range is between 3.4 volts and 4.2 volts.
- *charging* - A true/false value showing if the battery is currently charing.
- *vcc* - A true/false value showing if power is enabled to the 3V3 header pin that powers backpacks.
- *at* - The milliseconds since restart at which this report was run

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

## mesh.setchannel
#### Description
`mesh.setchannel(channelId)`

Set the mesh radio channel for this Scout.

**Important:** You'll want all the Scouts in your Troop to change to this new channel as well, so the practical usage should be `command.all("mesh.setchannel",26)`.

```bash
> mesh.channel(26)
```

#### Parameters
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
> mesh.setdatarate(0)
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

```json
{
  "type":"mesh",
  "scoutid":6,
  "troopid":1,
  "routes":1,
  "channel":20,
  "rate":"250 kb/s",
  "power":"3.5 dBm",
  "at":1006981
}
```

- *type* - The type of report returned.  In this case it will be the string **mesh**
- *scoutid* - The unique ID of this particular Scout. Range is between **0** and **65535**.
- *troopid* - The ID specific to this particular Troop. Range is between **0** and **65535**. Also known as a PAN ID.
- *routes* - The number of Scouts this Scout is routing packets for.
- *channel* - The 802.15.4 channel this Scout is listening on. Valid range is **11** to **26**.
- *rate* - The data rate the radio on this Scout is currently set to.
- *power* - The radio power setting this Scout is currently set to.
- *at* - The milliseconds since restart at which this report was run

## mesh.from
#### Description
`mesh.from`

Returns the scout id that last commanded this scout (useful to auto-generate replies).

```bash
> mesh.from
```

#### Parameters
None

#### Return Values
- *fromId* - id of the Scout that last commanded this Scout.

```bash
> 42
```

## mesh.each
#### Description
`mesh.each("command")`

Runs `command(id,lqi,via)` for every other Scout currently visible on the mesh (as seen with `mesh.routing`).

```bash
> mesh.each("for.each.do.this")
```

#### Parameters
- *command* - the command that will be called with the `id`, `lqi`, and `via` of each Scout in the routing table.

#### Return Values
None

```bash
// runs for.each.do.this(id,lqi,via) for each Scout in the routing table
```

## mesh.fieldtest
#### Description
`mesh.fieldtest(seconds)`

Turns on a fieldtest mode that runs a constant mesh ping for this many seconds, the scout running the fieldtest will turn red for no mesh, yellow for weak mesh, and blink green for good mesh, and every other scout it is meshed with will blink blue

```bash
> mesh.fieldtest(30)
```

#### Parameters
- *seconds* - The number of seconds to stay in test mode.

#### Return Values
None

## mesh.routing

#### Description
`mesh.routing()`

Prints an output of the current mesh routing table for this Scout, in a human-readable format.  For detailed information regarding these values see Table 4-1 of [AVR2130: Lightweight Mesh Developer Guide](http://www.atmel.com/Images/Atmel-42028-Lightweight-Mesh-Developer-Guide_Application-Note_AVR2130.pdf), page 14.

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

## message.scout (deprecated)
#### Description
`message.scout(scoutId, "message")`

Send a message from this Scout to another Scout.

```bash
> message.scout(3, "hello")
```

#### Parameters
- *scoutId* - The scout ID to which the message is sent.
- *message* - The message to send to the Scout. This is a text string, surrounded in quotes, and should be no longer than 100 characters.

#### Return Values
None

## message.group (deprecated)
#### Description
`message.group(groupId, "message")`

Send a message to an entire group of Scouts at once.

```bash
> mesh.group(2, "hi")
```

#### Parameters
- *groupId* - The group to send the message to.  Valid group IDs are **1** to **65535**.
- *message* - The message to send to the Scout. This is a text string, surrounded in quotes, and should be no longer than 100 characters.

#### Return Values
None


# mesh remote commands

## command.scout
#### Description
``command.scout(scoutId, "command"[, arg1, "arg2", "`arg3`", ...])``

Run a command on another Scout.  The command can take a variable number of arguments, and those arguments are also passed to the command to build the full command string, before being sent to the other Scout.

```bash
> command.scout(1, "led.sethex", "`led.gethex`")
```

#### Parameters
- *scoutId* - The unique ID of the scout on which you want to run the command.
- *command* - The string of the command you want to run
- *arg1*, *arg2* - One or more arguments to pass to the *command* before remote evaluation. If the argument is not quoted, it will be added as an integer argument to the command.  If it is quoted, it will be added as a string argument to the command.  If it is quoted and backticked, it will be evaluated locally, and the result of that evaluation will be added as a string argument to the command.


#### Return Values
1 if the command is successfully sent, 0 otherwise

## command.scout.ack
#### Description
``command.scout.ack("callback", scoutId, "command"[, arg1, "arg2", "`arg3`", ...])``

This is the same as `command.scout`, except that once the command is run on the other scout, a local callback ScoutScript command, `callback` is evaluated if it is defined.  The callback command will be passed two arguments, *err* and *rssi*.  *err* will be non-zero if an error occurred when running the remote command.  *rssi* will contain the signal strength of the mesh radio between the two Scouts.

```bash
> command.scout.ack("callback", 1, "led.red")
```

#### Parameters
- *callback* - The callback ScoutScript command that is evaluated once the other Scout completes running its command and sends back an acknowledgement with the return value.
- *scoutId* - The unique ID of the scout on which you want to run the command.
- *command* - The string of the command you want to run
- *arg1*, *arg2* - One or more arguments to pass to the *command* before remote evaluation. If the argument is not quoted, it will be added as an integer argument to the command.  If it is quoted, it will be added as a string argument to the command.  If it is quoted and backticked, it will be evaluated locally, and the result of that evaluation will be added as a string argument to the command.


#### Return Values
1 if the command is successfully sent, 0 otherwise

## command.group
#### Description
``command.group(groupId, "command"[, arg1, "arg2", "`arg3`", ...])``

Run a command on Scouts in group `groupId`.  The command can take a variable number of arguments, and those arguments are also passed to the command to build the full command string, before being sent to the other Scouts.

```bash
> command.group(42, "led.sethex", "`led.gethex`")
```

#### Parameters
- *groupId* - The ID of the group of Scouts on which you want to run the command.
- *command* - The string of the command you want to run
- *arg1*, *arg2* - One or more arguments to pass to the *command* before remote evaluation. If the argument is not quoted, it will be added as an integer argument to the command.  If it is quoted, it will be added as a string argument to the command.  If it is quoted and backticked, it will be evaluated locally, and the result of that evaluation will be added as a string argument to the command.


#### Return Values
1 if the command is successfully sent, 0 otherwise

## command.all
#### Description
``command.all("command"[, arg1, "arg2", "`arg3`", ...])``

This will send a command to all Scouts in the troop, including the Scout this command is evaluated on.


```bash
> command.all("led.blue",1000);
```

#### Parameters
- *command* - The string of the command you want to run
- *arg1*, *arg2* - One or more arguments to pass to the *command* before remote evaluation. If the argument is not quoted, it will be added as an integer argument to the command.  If it is quoted, it will be added as a string argument to the command.  If it is quoted and backticked, it will be evaluated locally, and the result of that evaluation will be added as a string argument to the command.


#### Return Values
1 if the command is successfully sent, 0 otherwise


## command.others
#### Description
``command.others("command"[, arg1, "arg2", "`arg3`", ...])``

This will send a command to all Scouts in the troop, not including the Scout this command is evaluated on.

```bash
> command.others("led.red(500)")
```

#### Parameters
- *command* - The string of the command you want to run
- *arg1*, *arg2* - One or more arguments to pass to the *command* before remote evaluation. If the argument is not quoted, it will be added as an integer argument to the command.  If it is quoted, it will be added as a string argument to the command.  If it is quoted and backticked, it will be evaluated locally, and the result of that evaluation will be added as a string argument to the command.


#### Return Values
1 if the command is successfully sent, 0 otherwise


# uptime
## uptime.awake.micros
#### Description
`int uptime.awake.micros()`

Get the number of micros that have passed in the last second, so it will roll over to 0 every 1,000,000 microseconds.  Includes only time while awake.

```bash
> print uptime.awake.micros
```

#### Parameters
None

#### Return Values
The number of microseconds that have passed in the last second.

```bash
> 16543
```

## uptime.awake.seconds
#### Description
`int uptime.awake.seconds()`

Get the number of seconds that have passed since last reboot.  Includes only time while awake.

```bash
> print uptime.awake.seconds
```

#### Parameters
None

#### Return Values
The number of seconds that have passed since last reboot.

```bash
> 3
```

## uptime.sleeping.micros
#### Description
`int uptime.sleeping.micros()`

Get the number of micros that have passed in the last second, so it will roll over to 0 every 1,000,000 microseconds.  Includes only time while sleeping.

```bash
> print uptime.sleeping.micros
```

#### Parameters
None

#### Return Values
The number of microseconds that have passed in the last second while sleeping.

```bash
> 3052
```

## uptime.sleeping.seconds
#### Description
`int uptime.sleeping.seconds()`

Get the number of seconds that have passed since last reboot.  Includes only time while sleeping.

```bash
> print uptime.sleeping.seconds
```

#### Parameters
None

#### Return Values
The number of seconds that have passed since last reboot.

```bash
> 1
```

## uptime.micros
#### Description
`int uptime.micros()`

Get the number of micros that have passed in the last second, so it will roll over to 0 every 1,000,000 microseconds. Includes both sleep and awake time.

```bash
> print uptime.micros
```

#### Parameters
None

#### Return Values
The number of microseconds that have passed in the last second.

```bash
> 563992
```

## uptime.seconds
#### Description
`int uptime.seconds()`

Get the number of seconds that have passed since the last reset. Includes both sleep and awake time.

```bash
> print uptime.seconds
```

#### Parameters
None

#### Return Values
The number of milliseconds that have passed since the last reset.

```bash
> 34
```

## uptime.report
#### Description
`uptime.report()`

Prints a report of the uptime, total sleep duration, and last reset cause.

```bash
> uptime.report
```

#### Parameters
None

#### Return Values
A JSON representation of the current uptime stats.

```json
{
  "type":"uptime",
  "millis":420381,
  "sleep":1000,
  "random":3114,
  "reset":"External",
  "at":1008191
}
```

- *type* - The type of report returned.  In this case it will be the string **uptime**
- *millis* - The number of milliseconds that have passed since reset. Does not include time spent while sleeping.
- *sleep* - The number of milliseconds that have occurred while sleeping. Combine this with *millis* for a full uptime count.
- *random* - The current random number, seeded from the hardware random number generator.
- *reset* - The last reset cause. Can be values **Power-on**, **External**, **Brown-out**, **Watchdog**, **JTAG**, or **Unknown Cause Reset**
- *at* - The milliseconds since restart at which this report was run

## uptime.getlastreset
#### Description
`int uptime.getlastreset()`

Get the cause of the last reset value.  A key of the string is returned from this command, so be sure to use `key.print` if you want to see the actual result string.

```bash
> key.print(uptime.getlastreset)
```

#### Parameters
None

#### Return Values
The key of the reset type. Possible values are **Power-on**, **External**, **Brown-out**, **Watchdog**, **JTAG**, or **Unknown Cause Reset**

```bash
> "External"
```

## uptime.status
#### Description
`int uptime.status()`

Get a human-readable output of uptime, including asleep and awake amounts.

```bash
> uptime.status
```

#### Parameters
None

#### Return Values
None

```bash
> Total: 2 days, 20 hours, 2 minutes, 50.501264 seconds 
Awake: 2 days, 20 hours, 2 minutes, 50.505600 seconds 
Asleep: 0 days, 0 hours, 0 minutes, 0.000000 seconds
```


# led
## led.on
#### Description
`led.on()`

Turn on the LED.  This turns on the LED to the saved torch color.

```bash
> led.on
```

#### Parameters
None

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


## led.sethex
#### Description
`led.sethex("hexValue")`

Set the LED to the *hexValue* given. Similar to HTML, “RRGGBB”, but no hash at the beginning.

```bash
> led.sethex("FF0000")
```

#### Parameters
- *hexValue* - A hex value string of the color to set the LED. “RRGGBB” is the format of the string.

#### Return Values
None

## led.gethex
#### Description
`led.gethex()`

Get the *hexValue* of the LED. Similar to HTML, “RRGGBB”, but no hash at the beginning.  This will return the key of the string, so be sure to use something like `key.print` to actually print the value.

```bash
> key.print(led.gethex())
```

#### Parameters
None

#### Return Values
- The key of the hex value. To print the string, be sure to use `key.print`.


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

Save the torch color to values given by red, green, and blue.  The default color is green (0, 255, 0).

```bash
> led.savetorch(255, 0, 0)
```

#### Parameters
- *red* - The value of the red color for the LED.  Valid values are **0** to **255** with **0** being off and **255** being fully on.
- *green* - The value of the green color for the LED.  Valid values are **0** to **255** with **0** being off and **255** being fully on.
- *blue* - The value of the blue color for the LED.  Valid values are **0** to **255** with **0** being off and **255** being fully on.

#### Return Values
None

## led.isoff
#### Description
`int led.isoff()`

Determines if the LED is currently on or off.

```bash
> print led.isoff
```

#### Parameters
None

#### Return Values
The current state of the LED. Will return **0** if the LED is off, or **1** if it is on.


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

```json
{
  "type":"led",
  "led":[0,0,0],
  "torch":[255,0,0],
  "at":1009282
}
```

- *type* - The type of report returned.  In this case it will be the string **led**
- *led* - The current state of the LED with the values of red, green, and blue.
- *torch* - The torch color saved to this Scout with the values of red, green, and blue.
- *at* - The milliseconds since restart at which this report was run

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

## pin.makepwm
#### Description
`pin.makepwm("pinName")`

Make the given pin a PWM output.  The only pins that can be made PWM output are d2, d3, d4, and d5.

```bash
> pin.makepwm("d2")
```

#### Parameters
- *pinName* - A string value of the pin to make a PWM output. Valid values are **"d2"** through **"d5"**.

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


## pin.save
#### Description
`pin.save("pinName", pinMode, [pinValue])`

Sets the pin mode and optionally, pin value for a pin, so that it retains its settings between restarts. After running, a new ScoutScript command *startup.X* will be created, where X is the pin name. This function will be run upon every startup.  You can see this command by running `ls`.

```bash
> pin.save("d2", OUTPUT, HIGH)
```

#### Parameters
- *pinName* - A string value of the pin to write. Valid values are **"d2"** through **"d8"** and **"a0"** through **"a7"**.
- *pinMode* - The mode to set the pin to.  Possible values are **INPUT**, **OUTPUT**, or **INPUT_PULLUP**.
- *pinValue* - Optional. The value to set the pin to.  Possible values are **HIGH** or **LOW**.

#### Return Values
None.


## pin.status
#### Description
`pin.status()`

Output a human-readable status of all pins of the Scout.  Note, this will only work on the serial port, not via HQ--meaning only on a Scout connected to a USB port and being monitored via a serial console such as the Arduino IDE has.

```bash
> pin.status()
```

#### Parameters
None.

#### Return Values
None.

```
Note: pin.status currently only works on Serial
#   name    mode            value
---------------------------------
0   rx0     reserved        -       
1   tx0     reserved        -       
2   d2      unset           -       supports PWM, supports wakeup
3   d3      unset           -       supports PWM
4   d4      unset           -       supports PWM, supports wakeup
5   d5      unset           -       supports PWM, supports wakeup
6   d6      unset           -       
7   d7      unset           -       supports wakeup
8   d8      unset           -       
9   ss      unset           -       supports wakeup
10  mosi    unset           -       supports wakeup
11  miso    unset           -       supports wakeup
12  sck     unset           -       supports wakeup
13  rx1     unset           -       supports wakeup
14  tx1     unset           -       supports wakeup
15  scl     reserved        -       supports wakeup
16  sda     reserved        -       supports wakeup
17  vcc     reserved        -       
18  batt    reserved        -       supports wakeup
19  bkpk    reserved        -       
20  chg     reserved        -       
21  ledb    reserved        -       supports PWM
22  ledr    reserved        -       supports PWM
23  ledg    reserved        -       supports PWM
24  a0      unset           -       
25  a1      unset           -       
26  a2      unset           -       
27  a3      unset           -       
28  a4      unset           -       
29  a5      unset           -       
30  a6      unset           -       
31  a7      unset           -
```


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

```json
{
  "type":"digital",
  "mode":[-1,-1,-1,-1,-1,-1,-1],
  "state":[-1,-1,-1,-1,-1,-1,-1],
  "at":1008829
}
```

- *type* - The type of report returned.  In this case it will be the string **digital**
- *mode* - An array of pin modes for "d2" to "d8". **-1** is *DISABLED*, **0**, is *INPUT*, **1** is *OUTPUT*, and **2** is *INPUT_PULLUP*
- *state* - An array of pin values for "d2" to "d8". **-1** is *DISABLED*, **0**, is *LOW*, and **1** is *HIGH*.
- *at* - The milliseconds since restart at which this report was run

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

```json
{
  "type":"analog",
  "mode":[-1,-1,-1,-1,-1,-1,-1,-1],
  "state":[-1,-1,-1,-1,-1,-1,-1,-1],
  "at":1002298
}
```

- *type* - The type of report returned.  In this case it will be the string *analog*
- *mode* - An array of pin modes for "d2" to "d8". **-1** is *DISABLED*, **0**, is *INPUT*, **1** is *OUTPUT*, and **2** is *INPUT_PULLUP*
- *state* - An array of pin values for "a0" to "a7". **-1** is *DISABLED*, ranges **0** to **1023** are possible for analog inputs.
- *at* - The milliseconds since restart at which this report was run

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

```json
{
 "type":"scout",
 "lead":false,
 "version":1,
 "hardware":1,
 "family":1000,
 "serial":2000052,
 "build":20140130,
 "at":1009822
}
```

- *type* - The type of report returned.  In this case it will be the string **scout**
- *lead* - Will be **true** if this Scout is a Lead Scout, **false** otherwise.
- *version* - The version of this report. Later report versions may have more or different fields.
- *hardware* - The hardware version of this Scout.
- *family* - The family that this hardware belongs to. **1000** is the only valid value at this time.
- *serial* - A unique serial number of this Scout.
- *build* - The build number of the firmware on this Scout. Useful for auto-updating.
- *at* - The milliseconds since restart at which this report was run

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

## scout.delay
#### Description
`scout.delay(ms, "command")`

Delay the Scout for the given milliseconds, then run the *command*. Radio, shell, Wi-Fi, and other systems will continue to run, so it’s non-blocking.  The interactive shell will return a prompt immediately, but once the delay has expired the *command* will run in the background.

```bash
> scout.delay(1000, "led.red")
```

#### Parameters
- *ms* - The number of milliseconds to delay.
- *command* - The command to run after the delay passes.

#### Return Values
None.


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
> hq.settoken("af49e76320781a7b9722a137039b7f99")
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
> hq.gettoken
```

#### Parameters
None

#### Return Values
- *token* - The unique HQ token associated with this Scout.

```bash
> af49e76320781a7b9722a137039b7f99
```

## hq.print
#### Description
`hq.print("string")`

Print a value directly to the console on HQ. 

```bash
> hq.print("hi!")
```

#### Parameters
- *string* - The string or value to print on the HQ console.

#### Return Values
None

## hq.setaddress
#### Description
`hq.setaddress("host"[, port])`

Changing the HQ address through ScoutScript always disables TLS (and can only be re-enabled through a reboot). 

```bash
> hq.setaddress("myserver.com", 12345)
```

#### Parameters
- *host* - The host or IP address to connect to instead of the default Pinoccio HQ address.
- *port* - Optional. The host/IP port of the socket you want to use. Set to **22756** by default.

#### Return Values
None


## hq.report
#### Description
`hq.report("reportname", "value")`

Send any string as a custom report, and its value will be sent to the API, accessible in real-time there.  Value is either a quoted string, or an index to a key containing the string.  The combined length of the report name and
the value string must be less than or equal to 80 chars.

```bash
> a = key(uptime.minutes)
> hq.report("uptime", a)
> key.free(a)

> hq.report("MyRtp", "My custom report")
```

#### Parameters
- *reportname* - The name of the custom report
- *value* - The string or key index of the string to send within this report

#### Return Values
None

## hq.online
#### Description
`hq.online`

Returns 1 or 0 if HQ has been seen recently on the mesh.

```bash
> hq.online
```

#### Parameters
None

#### Return Values

```bash
1
```

- *value* - 1 if HQ has been seen, 0 if it hasn't.

# miscellaneous

## temperature.c

#### Description
`temperature.c()`

Return the value of the on-chip temperature sensor, in Celsius.

```bash
> print temperature.c
```

#### Parameters
None

#### Return Values
The value of the on-chip temperature in Celsius.

```js
> 21
```

## temperature.f

#### Description
`temperature.f()`

Return the value of the on-chip temperature sensor, in Fahrenheit.

```bash
> print temperature.f
```

#### Parameters
None

#### Return Values
The value of the on-chip temperature in Fahrenheit.

```js
> 70
```

## temperature.report

#### Description
`temperature.report()`

Get a report of the temperature values of the Scout.

```bash
> temperature.report
```

#### Parameters
None

#### Return Values
A JSON representation of the current temperature.

```json
{
  "type":"temp",
  "c":21,
  "f":70,
  "at":1008298
}
```

- *type* - The type of report returned.  In this case it will be the string **temp**
- *c* - The current temperature in Celsius
- *f* - The current temperature in Fahrenheit
- *at* - The milliseconds since restart at which this report was run


## temperature.setoffset

#### Description
`temperature.setoffset(offset)`

Save a calibration offset for the temperature sensor, in Celsius.  Whatever value is passed in here as an offset will be added to the current sensor reading, before being returned.  If you pass in a negative number, the temperature reading returned will be lower than the actual read temperature.

```bash
> print temperature.setoffset(-2)
```

#### Parameters
- *offset* - A positive or negative integer that will offset subsequent temperature sensor readings.

#### Return Values
None.

## temperature.calibrate

#### Description
`temperature.calibrate(currentTemp)`

If you know what the current temperature the Scout should be reading, this command will do the math offset for you. The temperature passed in should be in Celsius.

```bash
> print temperature.calibrate(26)
```

#### Parameters
- *currentTemp* - The current temperature, in Celsius, that the sensor should be offset to.

#### Return Values
None.


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

## memory.report

#### Description
`memory.report()`

Get a report of the memory statistics of the Scout.

```bash
> memory.report
```

#### Parameters
None

#### Return Values
A JSON representation of the current memory details.

```json
{
  "type":"memory",
  "used":559,
  "free":18314,
  "large":17719,
  "at":1006488
}
```

- *type* - The type of report returned.  In this case it will be the string **memory**
- *used* - The current amount of memory being used
- *free* - The total amount of free memory
- *large* - The largest chunk of non-fragmented free memory
- *at* - The milliseconds since restart at which this report was run


## serial.mute

#### Description
`serial.mute(1)`

Ensure that nothing is printed to Serial when any background commands are run.

Use just `serial.mute` or `serial.mute(1)` to put it in silent mode (it still prints to Serial when it receives commands from serial), and `serial.mute(0)` to disable.

```bash
> serial.mute(1)
```

#### Parameters
None

#### Return Values
None


# event handling

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


# event callbacks

## on.message.scout
#### Description
`on.message.scout(fromId, keys)`

This callback will be executed whenever the Scout receives a direct message via the mesh network. The data is saved in the key/value store, so be sure to use the `key` commands to get the original values.

```bash
> function on.message.scout { 
  print "message received from: "; 
  print arg(1); 
  print "Message: ";
  key.print(arg(2));
};
```

#### Parameters
- *fromId* - The ID of the scout that sent this message
- *keys* - The keys of the values that were sent in this message

#### Return Values
None

## on.message.group
#### Description
`on.message.group(groupId, fromId, keys)`

This callback will be executed whenever the Scout receives a message via the mesh network that was sent to a group. The data is saved in the key/value store, so be sure to use the `key` commands to get the original values.

```bash
> function on.message.group { 
  print "message received on group: "; 
  print arg(1);
  print "from Scout: "; 
  print arg(2); 
  print "Message: ";
  key.print(arg(3));
};
```

#### Parameters
- *groupId* - The ID of the group that this message was sent to
- *fromId* - The ID of the scout that sent this message
- *keys* - The keys of the values that were sent in this message

#### Return Values
None

## on.message.signal
#### Description
`on.message.signal(fromId, rssi)`

This callback will be executed on a scout that sends a message, whenever the message acknowledgement is received back from the recipient.

```bash
> function on.message.signal { 
  print "message acknowledged from: "; 
  print arg(1); 
  print "RSSI signal strength: ";
  key.print(arg(2));
};
```

#### Parameters
- *fromId* - The ID of the scout that received the original message
- *rssi* - The RSSI signal strength that the recipient measured when receiving the original message

#### Return Values
None


## on.d[2-8]
#### Description
`on.d[2-8](value, mode)`

This callback will be executed any time a digital pin changes its value or its mode.

```bash
> function on.d2 { 
  print "D2 has value: "; 
  print arg(1); 
  print "and mode: ";
  print arg(2);
};
```

#### Parameters
- *value* - The value of the pin after the change
- *mode* - The mode of the pin after the change

#### Return Values
None

## on.d[2-8].low
#### Description
`on.d[2-8].low()`

This callback will be executed any time a digital pin's value goes low. This works great for buttons connected between a digital pin and ground, when the pin's mode is set to *INPUT_PULLUP*.  

```bash
> function on.d2.low { 
  print "D2 went low!"; 
};
```

#### Parameters
None

#### Return Values
None

## on.d[2-8].high
#### Description
`on.d[2-8].high()`

This callback will be executed any time a digital pin's value goes high. 

```bash
> function on.d2.high { 
  print "D2 went high!"; 
};
```

#### Parameters
None

#### Return Values
None

## on.a[0-7]
#### Description
`on.a[0-7](value, mode)`

This callback will be executed any time an analog pin changes its value or its mode.

```bash
> function on.a0 { 
  print "A0 has value: "; 
  print arg(1); 
  print "and mode: ";
  print arg(2);
};
```

#### Parameters
- *value* - The value of the pin after the change
- *mode* - The mode of the pin after the change

#### Return Values
None


## on.battery.level
#### Description
`on.battery.level(value)`

This callback will be executed any time the battery charge percentage changes.

```bash
> function on.battery.level { 
  print "Battery percentage is: "; 
  print arg(1);
};
```

#### Parameters
- *value* - The value of the battery charge percentage after the change

#### Return Values
None

## on.battery.charging
#### Description
`on.battery.charging(value)`

This callback will be executed any time the battery begins or ends charging.

```bash
> function on.battery.charging { 
  if (arg(1) == 1) {
    print "Battery is charging"; 
  } else {
    print "Battery is not charging"; 
  }
};
```

#### Parameters
- *value* - The value of the battery charge status after the change

#### Return Values
None

## on.temperature
#### Description
`on.temperature(value)`

This callback will be executed any time the temperature value changes.

```bash
> function on.temperature { 
  print "The temperature is now: "; 
  print arg(1);
};
```

#### Parameters
- *value* - The value of the temperature after the change

#### Return Values
None

## on.hq.online
#### Description
`on.hq.online`

This callback will be executed on every Scout in the Troop whenever the Lead Scout connects to HQ.

```bash
> function on.hq.online { 
  led.red(500);
};
```

#### Parameters
None

#### Return Values
None

## on.wifi.associate
#### Description
`on.wifi.associate`

This callback will be executed when a WiFi backpack associates with a network.

```bash
> function on.wifi.associate {
  led.cyan(500);
};
```

#### Parameters
None

#### Return Values
None

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

```json
{
 "type":"wifi",
 "version":0,
 "connected":true,
 "hq":true,
 "at":100649
}
```

- *type* - The type of report returned.  In this case it will be the string *wifi*
- *connected* - Will be *true* if this Lead Scout is connected to a Wi-Fi access point, *false* otherwise.
- *hq* - Will be *true* if this Lead Scout is connected to HQ over a TCP connection, *false* otherwise.
- *at* - The milliseconds since restart at which this report was run

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

## wifi.stats
#### Description
`wifi.stats`

Print stats about the number of reconnections to WiFi and/or HQ.

```bash
> wifi.stats
```

#### Parameters
None

#### Return Values
Stats about reconnections.

```
Number of connections to AP since boot: 2
Number of connections to HQ since boot: 1
Seconds currently connected to HQ: 42
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
`wifi.config("wifiAPName" [, "wifiAPPassword"])`

Associate this Lead Scout with a new access point (AP.)  Note, this command only works on a Lead Scout.

Once you call this command, you have to run `wifi.reassociate` to actually connect to the new AP.  This command just saves the AP credentials to use on the next association.

```bash
> wifi.config("My Access Point", "password")
```

#### Parameters
- *wifiAPName* - The name of the access point. Be sure to enclose in double quotes, i.e. *"name"*.
- *wifiAPPassword* - Optional. The password of the access point.  Be sure to enclose in double quotes, i.e. *"name"*. 

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

## wifi.verbose
#### Description
`wifi.verbose(value)`

By default, only errors are logged. By running `wifi.verbose(1)`, all data sent to and received from the wifi module is logged.

Logging only happens to Serial, since it is a bad idea to log data to HQ (which goes through wifi, causing more log output, causing more traffic, etc.).

```bash
> wifi.verbose(1)
```

#### Parameters
- *value* - 1 to enable, 0 to disable

#### Return Values
None

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

# Keys (deprecated)

## key (deprecated)

#### Description 
`key(\"string\" | value)`

Create a string in memory and return an index to the key location.  A quoted string 
is saved as-is and an unsigned integer value is converted to a string and saved.  The string 
can retrieved by referencing the index.  See key.print.

Note that values other than unsigned integers are accepted but will be treated as unsigned ints,
leading to odd and unpredictable results.

```bash
> print key(temperature.f)
> print key("My key")
```

#### Parameters

 - *value* - A string or unsigned integer value to be saved as a string.

#### Return Values
The index of the created key entry

```js
> 54
> 55
```
## key.free (deprecated)

#### Description
`key.free(index)`

Remove the string referenced by the index from memory.

```bash
> key.free(54)
```

#### Parameters

 - *index* - The index of the key to remove.  The key index is returned when the key is created
with the key() command.

#### Return Values

None

## key.print (deprecated)

#### Description
`key.print(index)`

Print the string referenced by the index.

```bash
> k = key("My Key")
> print k                  # Prints the created key index - 55 in this example
> key.print(55)            # Prints the contents of key index 55
> key.print(k)             # Same thing
```

#### Parameters

 - *index* - The index of the key to print.  The key index is returned when the key is created
with the key() command.

#### Return Values

None

```js
> 55
> My Key
> My Key
```

## key.number (deprecated)

#### Description
`key.number(index)`

Converts the string referenced by the index to an integer value and returns it.

```bash
> a = key(temperature.f)  # Create a key with the current scout temp (in F)
> if(key.number(a) > 60) {print "Ahhhh";} else {print "Brrr!";} # Numeric comparison
> print key.number(a)
```

#### Parameters

 - *index* - The index of the key to return as an integer.  The key index is returned when the key is created
with the key() command.

#### Return Values

The value of the string as an integer value
```js
> Ahhhh
> 72
```
## key.save (deprecated)

#### Description
`key.save("n", index)`

Creates a Bitlash function in EEPROM called boot.n that can be used to retreive
the string currently at index after the scout has rebooted.  After rebooting
running the function boot.n will create a new key with the same string and set the 
variable named in the first argument to the value of the key index.  Note that
the first variable should only be one char long since Bitlash only supports using
a-z as variable names.

```bash
> a = key("Saved string")  # Create a key with the string "Saved string"
> key.save("s", a)         # Save the string at index "a" as "s"
> ls                       # Display the EEPROM function list
```
```js
function boot.s {s=key("Saved string");};
```
...reboot scout...
```bash
> print s                   # not set yet
```
```js
0
```
```bash
boot.s                      # running the function sets "s" to the index,
print s                     # 52 in this case, and sets the contents of 
key.print(s)                # the index to the original string
```
```js
52
Saved String
```

#### Parameters

- *n* - A one character name for the variable to hold the new index created when the function is run.
- *index* - The current index of the string to save

#### Return Values

None

#### Side Effects

A new function named boot.**n** is created in EEPROM
