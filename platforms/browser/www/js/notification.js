

//store workers away from parent objects
var workers = [];

var nTitle = 'Test Title';
var nBody = 'Test Body';


var notification = {
    check: function() {

        //Check if workers are less than expected
        if (workers.length < 3) {
            nTitle = 'RIG OFFLINE';
            nBody = JSON.stringify(workers);
            notification.create();
        };


        //for each worker
        for (var i = 0; i < workers.length; i++) {
            var worker = workers[i];

            //nvidia rig
            if (worker.name == "GeZJbMsrfzcMoBmnG44cmkTaB1XRQf15ss.NvidiaRig1") {

                if (worker.hashrate < 500000000){
                    nTitle = 'Hashrate low';
                    nBody = 'Your NvidiaRig1 rig\'s hashrate is below optimum requirements! Hashrate: '+ worker.hashrate;
                    notification.create();
                }

                if (worker.shares < 100) {
                    nTitle = 'New block';
                    nBody = 'Your NvidiaRig1 rig is on a new block! Current shares: '+ worker.shares;
                    notification.create();
                }
            }

            //amd rig (across 2 pools)
            if (worker.name == "GeZJbMsrfzcMoBmnG44cmkTaB1XRQf15ss.Rig1amd" || worker.name == "GeZJbMsrfzcMoBmnG44cmkTaB1XRQf15ss.PCamd") {

                if (worker.hashrate < 50000000){
                    nTitle = 'Hashrate low';
                    nBody = 'Your '+worker.name+' rig\'s hashrate is below optimum requirements! Hashrate: '+ worker.hashrate;
                    notification.create();
                }

                if (worker.shares < 5) {
                    nTitle = 'New block';
                    nBody = 'Your '+worker.name+' rig is on a new block! Current shares: '+ worker.shares;
                    notification.create();
                }                      
            }


        }
    },
    create: function() {

        //create a notification
        //log in in the index view
        $('#log').prepend('<h2>' +nTitle + '</h2><p>' + nBody + '</p><p>Timestamp: ' + new Date() + '</p><hr>');

        //send actual notification
        cordova.plugins.notification.local.schedule({
            title: nTitle,
            text: nBody,
        });
    },

}