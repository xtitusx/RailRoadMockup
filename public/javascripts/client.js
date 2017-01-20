/**
 * Created by benja_000 on 12/01/2017.
 */
var socket = io.connect('http://localhost:80');

socket.on('message', function(message) {

    if (!Array.isArray(message)) {
        console.log(message);
    } else {
        var objectType = message[0];
        switch(objectType) {
            case "scanner":
                document.getElementById(message[1]).setAttribute(message[2], message[3]);
                break;
            case "switch":
                break;
            case "trafficlight":
                document.getElementById(message[1]).setAttribute(message[2], message[3]);
                break;
        }
    }
})