#!/bin/bash

cp -r leaderboard /tmp
meteor create leaderboard

rm -rf leaderboard/client leaderboard/server
cp -r /tmp/leaderboard/* leaderboard/

meteor add session

# to run, go to leaderboard/ directory and do `meteor run`
echo Done
exit 0
