# GSebD (Getting-Seb-Doing)

[![Build Status](https://travis-ci.org/sebastianovide/GettingSebDoing.svg?branch=master)](https://travis-ci.org/sebastianovide/GettingSebDoing)

A Purpose driven Getting-Things-Done tool

GSEBD, or Getting-Seb-Doing, is a fork of [GSD5](https://github.com/roma0104/gsd5). It is a plugin for [TiddlyWiki5](http://tiddlywiki.com) *[(github)](https://github.com/Jermolene/TiddlyWiki5/)* that attempts to combine the workflow and philosophy of David Allen's **[Getting Things Done](http://www.amazon.com/Getting-Things-Done-Stress-Free-Productivity/dp/0142000280/)** with your other personal development tools.

#### Disclaimer
GTD® and Getting Things Done® are registered trademarks of the [David Allen Company](http://www.davidco.com). GSEBD is not affiliated with or endorsed by the David Allen Company.

# Obtaining

It is not just to be more productive... but to reach your inner purpose.

### Beta: for ever

GSEBD is most definitely a work-in-progress project and beta quality. There might be changes that might break from past versions in ways that make forward compatibility of user-created content non-trival to correct.

* https://sebastianovide.github.io/GettingSebDoing/
* https://github.com/sebastianovide/GettingSebDoing/releases/latest

### Building

If you wish to build GSEBD as a standalone file just run `npm test`.

### Serving

To serve GSEBD using node.js run `npm run serve`, then visit <http://localhost:8080> with your browser.

Note there are currently no .cmd equivalents of the serve.sh and build.sh scripts for windows users (but perhaps you can write them based on the bash versions).

*This method will build against the latest commits from both TiddlyWiki5 and GSEBD, things may be broken or act oddly.  Checkout to latest releases for both if you want a more stable build.  I usually test with Chromium.*
