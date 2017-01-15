/**
 * Created by benja_000 on 12/01/2017.
 */
var socket = io.connect('http://localhost:80');

socket.on('message', function(message) {

    if (!Array.isArray(message)) {
        console.log(message);
    } else {
        document.getElementById(message[0]).setAttribute('fill', message[1]);
    }
})