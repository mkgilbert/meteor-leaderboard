// global variable creates a collection of Players (like a table)
PlayerList = new Mongo.Collection('players');

// code below will only run on the client
if (Meteor.isClient) {
    // This looks for a template tag named "leaderboard" in all html files and adds
    // all of the following items as helper functions
    Template.leaderboard.helpers({
        "player": function(){
            console.log("testing...");
            return PlayerList.find();
        },
        "totalPlayers": function(){
            console.log("getting total players...");
            return PlayerList.find().count();
        },
        // This is what actually changes the background of the element that is clicked
        // by assigning that element the "selected" class, which has a yellow background
        "selectedClass": function(){
            var playerId = this._id;
            var selectedPlayer = Session.get('selectedPlayer');
            if (playerId === selectedPlayer) {
                return "selected";
            }
        },
    });

    // This adds event triggers to the different elements of the leaderboard template
    Template.leaderboard.events({
        // when a leaderboard template element with class of "player" gets clicked, this will run
        'click .player': function(){
            var playerId = this._id;
            // Create a session to allow control of elements in the template...
            Session.set('selectedPlayer', playerId);
        },
    });
}

if (Meteor.isServer) {
}

