//Manage api information here
var apiData = [];

var apiURL = '';

//How many items do we want at once?
var apiChunkSize = 10;

//offset so we are not getting same data multiple times
var apiOffset = 0;

//Track if our recent API connection attempt was a success
var dataSuccess = false;
var refreshListState = true;

//When was our data last pulled from the API successfully?
var lastUpdated;  //datetime
var outOfDate;    //bool
var updatePeriod = 5 *60*1000; //int value (5mins)

var apiTimer;

var api = {
    init: function() {
        
        nibiruPoolURL = 'http://btg.nibirupool.com/api/worker_stats?GeZJbMsrfzcMoBmnG44cmkTaB1XRQf15ss';
        btgPoolURL = 'http://btgpool.pro/api/worker_stats?GeZJbMsrfzcMoBmnG44cmkTaB1XRQf15ss';

        api.get();
        apiTimer = setInterval(function() {
                    console.log("Starting API loop");
                    api.get();
                }, updatePeriod);

    },
    get: function() {

        $.getJSON(nibiruPoolURL, function(data){

            apiData['nibiru'] = data;

        }).fail(function() {
            //if we can't get the data
            dataSuccess = false;
            api.fail();

        }).done(function() {
            dataSuccess = true;
            //successfully retrieved data
            console.log('Successfully got data Nibiru!')
            console.log(apiData['nibiru']);

            apiData['nibiru'].workers = $.map(apiData['nibiru'].workers, function(el) { 
                return el 
            });

            for (var i = 0; i < apiData['nibiru'].workers.length; i++) {
                var worker = apiData['nibiru'].workers[i];

                workers.push(worker);
            }

            notification.check();

        }).always(function() {
            //always run this, regardless of API result

        });


        $.getJSON(btgPoolURL, function(data){

            apiData['btg'] = data;

        }).fail(function() {
            //if we can't get the data
            dataSuccess = false;

        }).done(function() {
            dataSuccess = true;
            //successfully retrieved data
            console.log('Successfully got data from BTG!')
            console.log(apiData['btg']);

            apiData['btg'].workers = $.map(apiData['btg'].workers, function(el) { 
                return el 
            });

            for (var i = 0; i < apiData['btg'].workers.length; i++) {
                var worker = apiData['btg'].workers[i];

                workers.push(worker);
            }
            notification.check();
            
        }).always(function() {
            //always run this, regardless of API result

        });        
    },
    fail: function() {
        if(connectionStatus == 'online' && dataSuccess === false) {
            alert('I can\'t fucking connect, Shai!');
        };
    },
    stop: function() {
        console.log("Stopping API updates");
        clearInterval(apiTimer);
    }

}

//Find our event in the dataset
function find(dataset, key, value){
    data = dataset;
    k = key;
    v = value;

    var item = data.findIndex(function(event) {
        return event[k] == v;
    });

    console.log(data[item]);
}

//Remove any duplicates
function remove_duplicates(objectsArray) {
    var usedObjects = {};

    for (var i=objectsArray.length - 1;i>=0;i--) {
        var so = JSON.stringify(objectsArray[i]);

        if (usedObjects[so]) {
            objectsArray.splice(i, 1);

        } else {
            usedObjects[so] = true;          
        }
    }

    return objectsArray;

}