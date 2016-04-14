//--------------------------------------------
// INICIAR DISPOSITIVO
//--------------------------------------------
function start() {

//alert("start");

    sessionStorage.debug = 1;
    //--------------------------------------------
    // PADRÕES
    //--------------------------------------------
    var version = '1.0.0';
    // App config
    localStorage.server = "http://10.0.0.8/quickie/server/";
    //localStorage.server = "http://www.nickford.com.br/quickie/";
    localStorage.userid = 2;
    localStorage.username = "jwillbala@hotmail.com";
    localStorage.userpass = "bala123";
    localStorage.userlang = "en";
    //
    sessionStorage.activePage = "";
    sessionStorage.lastchat = 0; // last msg id (#index-3)
    sessionStorage.lastchat_inner = 0; // (#messages)
    sessionStorage.session_startdate = "2016-04-11 12:00";
    sessionStorage.session_id = 1;
    //
    if (typeof device === "undefined") {
        device = {};
        device.uuid = "lab";
        device.platform = "Android";
        device.version = "---";
        device.name = "---";
        device.phonegap = "---";
    }

//
    //if (localStorage.version !== version) {
    localStorage.lang = "en";
    localStorage.version = version;
    localStorage.os = device.platform;
    // db
    localStorage.dbShort = 'Jowi';
    localStorage.dbVersion = '1.0';
    localStorage.dbName = 'Jowi';
    localStorage.dbMaxSize = 65536;
    //alert("new version");
    //}

//--------------------------------------------
// WEB SQL INICIO
//--------------------------------------------
//dbCreate();
}

var app = {
// Application Constructor
    initialize: function () {

        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {

        if (sessionStorage.deviceReady === undefined) {

            sessionStorage.deviceReady = 1;
            start();
            var test = 'Device Name: ' + device.name + '\r\n' +
                    'Device PhoneGap: ' + device.phonegap + '\r\n' +
                    'Device Platform: ' + device.platform + '\r\n' +
                    'Device UUID: ' + device.uuid + '\r\n' +
                    'Device Version: ' + device.version + '\r\n';
            /*
             var onSuccess = function (position) {
             alert('Latitude: ' + position.coords.latitude + '\n' +
             'Longitude: ' + position.coords.longitude + '\n' +
             'Altitude: ' + position.coords.altitude + '\n' +
             'Accuracy: ' + position.coords.accuracy + '\n' +
             'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
             'Heading: ' + position.coords.heading + '\n' +
             'Speed: ' + position.coords.speed + '\n' +
             'Timestamp: ' + position.timestamp + '\n');
             };
             function onError(error) {
             alert('code: ' + error.code + '\n' +
             'message: ' + error.message + '\n');
             }
             navigator.geolocation.getCurrentPosition(onSuccess, onError);
             */

            function onSuccess(position) {
                $('#coord').html(position.coords.latitude + " x " + position.coords.longitude);
            }
            function onError(error) {
                alert('code: ' + error.code + '\n' +
                        'message: ' + error.message + '\n');
            }
            var watchID = navigator.geolocation.watchPosition(onSuccess, onError, {timeout: 30000});


            //====================
            // Redirect
            //====================
            var fn = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
            if (fn === "index.html") {
                $('#logo').delay(2000).fadeOut("fast", function () {
                    window.location.href = "quickie.html";
                });
            }
            else if (fn !== "quickie.html") {
                window.location.href = "quickie.html";
            }
            app.receivedEvent('deviceready');
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    }
};
