# Homebridge Lightmanager plugin

This is a plugin for [Homebridge](https://github.com/nfarina/homebridge) to allow controlling your devices with your JB Media Lightmanager. 

It is a fork of [robertklep/homebridge-klikaanklikuit](https://github.com/robertklep/homebridge-klikaanklikuit). So all credit goes out to him for making the original plugin. I merely adapted it for use with the Light Manager Mini, using http commands accepted by the Light Manager.

This plugin is meant to run on Raspberry Pi's (or boards with a similar setup), using a Light Manager (only Mini was is tested, other might work, don't know) from [JbMedia](http://cms.jbmedia.de/index.php?option=com_content&task=view&id=114&Itemid=74) and running a Daemon webserver with [Lightmanager C Ext by curzon01](https://github.com/curzon01/light-manager-c-ext/wiki).


**DISCLAIMER**: this plugin is not in any way endorsed by, or related to, COCO International B.V. or Trust International B.V. or Jb Media

## Installation

```
$ npm i kevinriemens/homebridge-lightmanager -g
```

Homebridge plugins need to be installed globally, so the `-g` is mandatory. You may need to use `sudo` as well.

## Configuration

First, you need a working Homebridge installation.

Once you have that working, edit `~/.homebridge/config.json` and add a new platform containing accessories:

```
"platforms" : [{
  "platform" : "KlikAanKlikUit",
  "driver"   : {
    "type" : "rpi",
    "pin"  : 8
  },
  "accessories" : [
    {
      "name"     : "Light Kitchen",
      "type"     : "Lightbulb",
      "dimmable" : true,
      "address"  : "C",
      "device"   : "2"
    },
    {
      "name"     : "Outlet Garage",
      "type"     : "Outlet",
      "address"  : "A",
      "device"   : "1"
    },
    {
      "name"     : "LED lamp",
      "type"     : "Lightbulb",
      "dimmable" : true,
      "address"  : 1337,
      "device"   : 0
    }
  ]
}, ...]
```

There is only one supported driver, `rpi`. The `pin` property reflects the physical GPIO pin that the 433Mhz transmitter is connected to.

The plugin supports both old-style (configurable through a rotary switch) and new-style (self-learning) KlikAanKlikUit devices. Old-style devices are addressed using a string (`A`, `B`, ...) and a device number. New-style devices are addressed using a number, which is either the unique code of your remote, or a code that you can pick yourself. In case of the latter, you need your device to learn the new code (put it in learning mode and send the _"On"_ command from the Home app).

Dimming is only supported for new-style devices.

Only supports Homebridge services that respond to the _"On"_ characteristic (which are _"Outlet"_, _"Lightbulb"_ and _"Switch"_). The service for each device it set through the `type` property.
