#!/bin/bash

GSD5_DIR=`pwd`
TIDDLYWIKI5_DIR=$GSD5_DIR/node_modules/tiddlywiki

export TIDDLYWIKI_PLUGIN_PATH=$GSD5_DIR/plugins
export TW_SERVE_EDITION_PATH=$GSD5_DIR/editions/gsd5-server
( cd $TIDDLYWIKI5_DIR && ./bin/serve.sh )
