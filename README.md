Magic Numbers
=====

A simple Angular "Magic Numbers" game.

#### Notes

As a starting point for the project I was looking at [Kickstarting Angular With Gulp and Browserify](http://mherman.org/blog/2014/08/14/kickstarting-angular-with-gulp/#.VL5mJL4kK5Y).

Although was a good starting of point rather than using Browsify to import Node Modules, I'll stick to the system in the **Schedule App** where I was only minifying when I created the deployment version of the app. For this I'll use the **[gulp-usemin](https://www.npmjs.com/package/gulp-usemin)** task.

#### Project

**Design Brief**

The purpose of this project is provide a working Angular application for my portfolio. It should be small enough to fit on my website [factornine](www.factornine.co.uk).

I'm attempting to code the app using good Angular which includes using "flat-controllers", using the "as Controller" style and attempting to create a code-base which is semantic.

I'll be using [Gulp](www.gulpjs.com) as the build tool as choice.

Eventually, it would be nice to use [Cordova](http://cordova.apache.org) and or [Ionic](http://ionicframework.com) to make an IOS or Android app.


**Screenshot**

![Magic Numbers](/design/magic_square_140128.png?raw=true "Magic Square 140128")



**Drag and Drop**
I'm using the Drag and Drop from [angular-dragdrop](https://github.com/codef0rmer/angular-dragdrop)


```
$ bower install --save-dev angular-dragdrop
```

This works really well, you just have to remember to install the required dependencies - [jquery-ui.css], and [jquery-ui.js]. (Will need to check that was all.)

**Coding Standards**

I'm using both [jscs](http://jscs.info) and lint/jshint(https://github.com/jshint/jshint). These I'm running within Webstorm (my editor of choice) and as Gulp tasks.

#### CLI Commands

`npm install` - install dependencies

`bower update` - install bower modules

`gulp` - the default task ( will set up a `watch` task ).

`gulp build` - build and distribute the app to the `dist` folder
