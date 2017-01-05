# Homebridge Lightmanager plugin

This is a plugin for [Homebridge](https://github.com/nfarina/homebridge) to allow controlling your devices with your JB Media Lightmanager (Pro or Mini). 

It's a fork of [robertklep/homebridge-klikaanklikuit](https://github.com/robertklep/homebridge-klikaanklikuit). So all credit goes out to him for making the original plugin. I merely adapted it for use with the Light Manager Mini, using http commands accepted by the Light Manager.

This plugin is meant to run on Raspberry Pi's (or boards with a similar setup), using a Light Manager (only Mini was is tested, other might work, don't know) from [JbMedia](http://cms.jbmedia.de/index.php?option=com_content&task=view&id=114&Itemid=74) and running a Daemon webserver with [Lightmanager C Ext by curzon01](https://github.com/curzon01/light-manager-c-ext/wiki).


**DISCLAIMER**: this plugin is not in any way endorsed by, or related to, COCO International B.V. or Trust International B.V. or Jb Media

## Installation

```
$ npm i kevinriemens/homebridge-lightmanager -g
```

Homebridge plugins need to be installed globally, so the `-g` is mandatory. You may need to use `sudo` as well.

## Configuration

First, you need a working Homebridge installation.
You must have Lightmanager C running as a daemon, and configured in the homebridge config.json
 
See `sample-config.json` for a homebridge sample configuration.

Dimming is only supported for new-style devices.
Only supports Homebridge services that respond to the _"On"_ characteristic (which are _"Outlet"_, _"Lightbulb"_ and _"Switch"_). The service for each device it set through the `type` property.
