# Mesh Networking Basics
Every Pinoccio Scout has a built-in mesh network radio.  This means every Scout is no longer a stand-alone device, but is a part of a larger group called a troop.  And this troop can become quite robust and effective by being able to communicate amongst themselves as well as with the web.

Mesh networking is interesting, because it has some unique characteristics that makes it really useful for many situations where other network types aren’t as well suited.  For one, it does not require any central hub or access point in order to communicate.  It is also self-healing, meaning Scouts in a mesh network can join and leave at will, and the network will automatically accept them and make them a participant in the network.

There are a few other aspects that are intriguing, outlined below.

|   *Features*    |  Mesh Networking | Wi-Fi | Bluetooth 4/LE | CDMA/GSM Cellular |
------------------------------------------------------------------------------------------
|  *Power requirements* | Low | High | Low | Medium |
|  *Radio range* | Medium/High | Medium | Low | High |
|  *Data transfer speed* | Low | High | Medium | High |
|  *Built-in routing* | Yes | No | No | No |
| *Require access point* | No | Yes* | No | Yes |

Let’s visit each of these points.

# Power Requirements
Mesh radio has some of the lowest power requirements of any radio technology.  The only one that is comparable is Bluetooth 4/LE.  Wi-Fi requires around ten times the power of mesh radio to transmit the same distance.  This obviously matters a lot if you want to have standalone devices talking wirelessly with other devices for extended periods of time.

# Radio Range
Mesh radio has about the same range as you’d experience with Wi-Fi.  It’s supports a bit further range then Bluetooth 4/LE, but not as good as CDMA/GSM.  However, Scouts support a long-range, 900MHz radio that can get up to 1-2km range, which can make for some really interesting large-scale mesh networks!

# Data Transfer Speed
Mesh gets its really low power by limiting the amount of bandwidth it has available for sending data.  Pinoccio Scouts send data at speeds between 250kb/sec to 2Mb/sec.  The higher the speed, generally the less range you can get out of the Scouts.  But if you have two Scouts close by, and you want to crank up the speed, it’s possible by simply calling `mesh.setdatarate()`.

# Built-in Routing
One of the coolest aspects of mesh networking is that it can support routing within its network.  For example, if you had a Scout A that was within range of Scout B, and Scout B was within range of Scout C, but Scout A and Scout C were too far from each other to communicate, then Scout B will route messages between Scout A and C.  This lets mesh networks become very resilient to unusual physical environments or interference.  Each Scout has a routing table in RAM that tracks in real-time the fastest route between any two devices in the network.  And if one particular Scout’s battery dies or is turned off, the mesh will self-heal and update its routing tables to find a new route between a sender and receiver.  Cool!

# Requires Access Point
Another really interesting aspect of mesh networking is that it requires no access point, like you typically have with Wi-Fi.  Bluetooth 4/LE can connect directly to a device, but cellular devices such as smart phones always have to connect to a cellular tower in order to communicate.  Mesh networks can be brought up in the middle of the desert, jungle, or tundra, and will work as soon as you turn it on.  No access points needed.

> The reason we added an asterisk to the Wi-Fi entry in the table above is that there’s an emerging standard called Wi-Fi Direct, which can let two Wi-Fi devices communicate directly with each other.  But it doesn’t support routing or self-discovery.*

Of course, mesh isn’t the right choice for everything.  It’d be difficult to stream a Youtube video over a mesh network, as it wasn’t designed for such things.  But having a very low-power, self-healing network that has the option—but not requirement—of being connected to the web, is a very powerful thing indeed.

