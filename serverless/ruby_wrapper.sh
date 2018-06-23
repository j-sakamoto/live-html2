#!/bin/sh
set -e

# Figure out where this script is located.
SELFDIR="`dirname \"$0\"`"
SELFDIR="`cd \"$SELFDIR\" && pwd`"

if [ `uname` = 'Darwin' ]; then
  RUBY_PATH=`which ruby`
  APP_ROOT="$SELFDIR/ruby"
  export BUNDLE_GEMFILE="$APP_ROOT/Gemfile"
else
  RUBY_PATH=$SELFDIR/lib/ruby/bin/ruby
  APP_ROOT="$SELFDIR/lib"
  export BUNDLE_GEMFILE="$APP_ROOT/vendor/Gemfile"
fi

# Tell Bundler where the Gemfile and gems are.
unset BUNDLE_IGNORE_CONFIG

# # Run the actual app using the bundled Ruby interpreter, with Bundler activated.
exec $RUBY_PATH -rbundler/setup "$APP_ROOT/app.rb" "$@"
