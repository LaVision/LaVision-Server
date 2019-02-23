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
        const { rink } = req.params;
        var database = firebase.database();
        database = database.ref('rinks/' + rink);

        database.once('value').then(function(snapshot) {
            var rink = {
                name: rink,
                lastUpdated: (snapshot.val() && snapshot.val().lastUpdated) || 'No Record Found',
                numPeople: (snapshot.val() && snapshot.val().numPeople) || '0',
                history: (snapshot.val() && snapshot.val().history) || 'No Record Found',
            };
            res.json({ status: 'SUCCESS', data: rink });
            // database.close();
        });
    },

    // hardware not ready yet, but time stamp format might change
    postRinkInfo: async (req, res) => {
        const { rink } = req.params;
        const { time, num } = req.body;

        // integer type for consistency
        var people = ((typeof num) === 'string') ? parseInt(num) : num;
        var database = firebase.database();
        database = database.ref('rinks/' + rink);
        database.update({
            lastUpdated: time,
            numPeople: people,
        });

        var database_history = firebase.database();
        database_history = database_history.ref('rinks/' + rink + '/history/');
        database_history.child(time).set(num);

        res.json({ status: 'SUCCESS' });
    },
}