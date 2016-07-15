// global variable creates a collection of Players (like a table)
PlayerList = new Mongo.Collection('players');

// code below will only run on the client
if (Meteor.isClient) {
    // This looks for a template tag named "leaderboard" in all html files and adds
    // all of the following items as helper functions
    Template.leaderboard.helpers({
        "player": function(){
            return PlayerList.find(
                       {},
                       { sort: {score: -1, name: 1}} // sort by score descending first, then by name
                   );
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
        "selectedPlayer": function(){
            var selectedPlayer = Session.get('selectedPlayer');
            // findOne is better for performance than find. It will stop at the first instance
            return PlayerList.findOne({ _id: selectedPlayer });
        }
    });

    // This adds event triggers to the different elements of the leaderboard template
    Template.leaderboard.events({
        // when a leaderboard template element with class of "player" gets clicked, this will run
        'click .player': function(){
            var playerId = this._id;
            // Create a session to allow control of elements in the template...
            Session.set('selectedPlayer', playerId);
        },
        'click .increment': function(){
            var playerId = Session.get('selectedPlayer');
            player = PlayerList.find({_id: playerId}).fetch();
            PlayerList.update(
                {_id: playerId},
                { $inc: {score: 5}}
            )
        },
        'click .decrement': function(){
            var playerId = Session.get('selectedPlayer');
            player = PlayerList.find({_id: playerId}).fetch();
            PlayerList.update(
                {_id: playerId},
                { $inc: {score: -5}}
            )
        }
    });

    Template.addPlayerForm.events({
        'submit form': function(event){
            event.preventDefault();
            var playerNameVar = event.target.playerName.value;
            PlayerList.insert({
                name: playerNameVar,
                score: 0
            });
            event.target.name.value = "";
        }
    });
}

if (Meteor.isServer) {
}

