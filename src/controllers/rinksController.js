import firebase from "firebase";

export const rinksController = {
    getAllRinks: async (req, res) => {
        var database = firebase.database();
        database = database.ref('rinks');

        database.once('value').then(function(snapshot) {
            var rinks = snapshot.val() || 'No parking lot detected';
            res.json({ status: 'SUCCESS', data: rinks });
            // database.close();
        });
    },
    getRinkInfo: async (req, res) => {
        // Get a reference to the database service
        const { rink } = req.params;
        console.log(rink);
        var database = firebase.database();
        database = database.ref('rinks/' + rink);

        database.once('value').then(function(snapshot) {
            var rink = {
                name: 'lol',
                // lastUpdated: (snapshot.val() && snapshot.val().name) || 'No Record Found',
                // numPeople: 
            };
            res.json({ status: 'SUCCESS', data: rink });
            // database.close();
        });
    },
}