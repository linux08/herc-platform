#  This branch:
#  UI OverHaul!
## I've changed the loading screen to save time styling components. 

## `1.22.2019 - 1.31.2018`
###  UI Refactor
 (🎩 @stefanbemelmans)
  
🔨 Improvements

`herc-edge-login`

*  fix image map in Register Asset
*  fix image map in TX  

## `1.12.2019 - 1.21.2018`
### UI Refactor
 (🎩 @stefanbemelmans)
  
🔨 Improvements

`herc-edge-login`
* Established the 3 step Framing, Wiring, Polish process, but maybe should be Framing, Polish, Wiring as polishing will require a lot of   refreshes and having to login each time could be frustrating. 

*  Register Flow minus modals is ready for stage 2
*  Upgraded Navigation, in the process of separating the navigation stacks
*  Converted the SVG icon into a PNG icon
*  Majority of the Components and buttons are built

## `1.1.2019 - 1.11.2018`
### UI Refactor
 (🎩 @stefanbemelmans)
  
🔨 Improvements

`herc-edge-login` 

*  Begin standardizing UI and component styles
    *  Started with RegAsset Flow
        *  Password Input
        *  Text Input
        *  Base Body
        *  Base Content
        *  Header
        *  Modals
*  Evaluating react-native-transitions 

*  Begin refactor of the navigation. This requires a significant update of the current navigation library.

*  Resarched and discovered a solution to responsive UI components
<!-- # [H]ERC Decentralized Application with Identity Powered by Https://Edge.App

![HERC Wallet](https://i.imgur.com/h0nwznp.png)


The Full Edge Wallet is:
- simple
- secure
- private
- decentralized
- multi-currency
- cross-platform
- mobile first
- open source
and can be built form source [here](https://github.com/EdgeApp)

HERC is:
- Supply Chain Orientated
- Functional to specific params
- React Native based with web3 functionality for audit
- Helping Eradicate Rackateering and Colussion by providing transparency, data integrity, and chain of custody throughout a supplychain
- Found on Mainnet at : 0x6251583e7d997df3604bc73b9779196e94a090ce
------------


This repo contains a basic app created by following the readme instructions at https://github.com/Airbitz/edge-login-ui/tree/develop/packages/edge-login-ui-rn

##### Min Requirements
- Node: Version 8.9.1
- yarn 1.2.3
- JDK 8.0

Disclaimer: These documents were written on April 21, 2018 from a MacOS running High Sierra. These instructions were not tested on other OS.

- Check your JDK version by running "java -version" in the terminal.
- Find all your JDK versions by running "/usr/libexec/java_home -V". If you have an incompatible one, you must delete the folder shown here.
- Check which node version by running "node -v"
- Check which yarn version by running "yarn -v"


## Getting Started

### Install nodejs (v 8.4+) and npm (v 5.3+)

    https://nodejs.org/en/download/

### Install React Native CLI
```
    npm install -g react-native-cli
```
### Checkout to master branch and install node_modules
```
    cd herc-edge-login
    git checkout master
    yarn
```
### Android NDK Setup

(MacOS) If the NDK is already installed from Android Studio, it should be in `/Users/[user]/Library/Android/sdk/ndk-bundle`.
If not, download and unzip the NDK from https://developer.android.com/ndk/index.html

Set `ANDROID_NDK_HOME` environment variable to the path of the NDK. ie
```
    export ANDROID_NDK_HOME=/Users/bob/Library/Android/sdk/ndk-bundle
 ```

### Run the app in debug mode

`react-native run-ios` or `react-native run-android`

----
### Running the Demo without Android Studio
Alternatively, you may simply clone the repository and enter 'react-native run-android' at the root directory. Make sure a genymotion emulator is running in the background. And make sure the emulator fits minimum requirements.

### Running the Demo with Android Studio
Tools you'll need: android studio SDK and genymotion.
1. In terminal, run `adb`. If it works, then you've got androids SDK on the right path. Otherwise, you gotta follow expo docs to install genymotion.
2. in the terminal, run 'exp'. If it works, then you've got expo. Other wise, you gotta `npm install -g exp.`
3. In the terminal, at project root, run 'yarn install' to install dependencies.
4. Open up Android studio
5. Do not load the root directory! Load from `herc-edge-login/android/app`. If it's the first time you are loading it, it should take Android studio like 5 minutes to build it.
6. Here is where you might run into some potential errors. The error messages are only sometimes helpful. If none of the following advice helps you, please reach out to me and we will debug it together!
  - Do you have all the support files? Go to preferences -> appearnce & behavior -> system settings -> android sdk -> click the tab 'SDK tools' in the middle. Scroll down to the bottom and make sure you have both Android Support Repository and Google Repository checked off.
  - Are the support files in the right directory? I ran into a problem where my support files were all in the wrong directory so I had to move them to the right one. Run the command 'find / -name runtime-1.0.0.pom' runtime-1.0.0.pom is a file in the support repository. If you have this file somewhere on your system, your other support files are near it, probably cached. I manually moved them with the command (mv) to the correct directory so that android studio will be able to find them. I found mine in ~/.gradle/caches/
  - Do you have the right Android SDK path? Go to preferences -> appearnce & behavior -> system settings -> android sdk. Copy the path next to 'Android SDK location'. It should look something like '/Users/georgedanforth/Library/Android/sdk' You will paste that path into your .bash_profile. Run the command 'nano ~/.bash_profile'. Type in :
  export ANDROID_NDK_HOME=/Users/georgedanforth/Library/Android/sdk/ndk-bundle
  export ANDROID_HOME=/Users/georgedanforth/Library/Android/sdk
  export PATH=/Users/georgedanforth/Library/Android/sdk/platform-tools:$PATH
  - Is your android over 6.0? Go to preferences -> appearnce & behavior -> system settings -> android sdk. I have android 8.1(oreo)
  *If none of these work, you might have to fiddle with the gradle file located under app/build.gradle*
7. To see if it will build, go to Build. Under build, click 'Clean Project', then click 'Rebuild Project'. If nothing happens, try clicking 'Make Project'.
8. If your build is successful, chances are in your favor that it will run in an emulator. You can use either the emulator built into android studio or genymotion. I got it running in genymotion.
9. If you are using genymotion, make sure it is running in the background. Your device must have APK over 23. If you are using an android studio emulator, please make sure you have already created it. I created a 'Nexus 6 -  API 25 - 7.1.0'
10. At the top of android studio, click the triangular "play" button. It should load up a window showing you all the devices it detects are running right now.
11. Select genymotion.
12. Swap over to the genymotion window. If you see a big red screen that says, '' Don't be alarmed, this is a good sign.
13. Go to your terminal window. CD into the root directory. In this case, it is herc-edge-login/. Enter the command: `react-native start`
14. Swap back over to the genymotion window.
15. You should see the app!

## Did you add new dependencies? You have to sync your gradle
- In android studio, you can sync your gradle files by going to file -> "sync project with gradle files"
- Alternatively, you may also sync your gradle files from the terminal. To do so, you have to be in the directory where you ./gradlew file lives. Run the command `./gradlew build`(or `./gradlew clean` if you need to clear your gradle files)

## Debugging
The debugger I have been using is the React Native Debugger. https://github.com/jhen0409/react-native-debugger
This repo has excellent install instructions.
### MacOS
```
`brew update && brew cask install react-native-debugger`
```
##### iOS Simulator
```
    ⌘ + d (command + d)
    Select "Debug JS Remotely"
```
### Windows / Linux

https://github.com/jhen0409/react-native-debugger/releases

###### GenyMotion Android Emulator
```
    ⌘ + m (command + m)
    Select "Debug JS Remotely"
```

## Missing License Errors
APK files require license agreements. If you get an error telling you to accept their agreements first, in your terminal run "$ANDROID_HOME/tools/bin/sdkmanager --licenses". You must accept all their agreements. You will now see your license files under ~/Library/Android/sdk/licenses.

### Contributing	

HERC protocol is an open source and community based project to which the core development team highly encourages fellow developers to build improvements and scale the future of the platform.  
To report bugs within the HERC smart contracts or unit tests, please create an issue in this repository. 

## HIPS
Parlimentary or Significant changes to HERC protocol's smart contracts, architecture, message format or functionality should be proposed in the 
[HERC Improvement Proposals (HIPS)](https://github.com/hercone/hips) repository. Follow the contribution guidelines provided therein :) 

### Coding Conventions
As we have found from other projects such as 0x and other Ethereum based platforms we use a custom set of [TSLint](https://palantir.github.io/tslint/) rules to enforce our coding conventions. 

In order to see style violation erros, install a tsliner for your text editor. e.g Atom's [atom-typescript](https://atom.io/packages/atom-typescript) -->
