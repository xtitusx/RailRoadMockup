/**
 * Created by benja_000 on 12/01/2017.
 */

// Socket stuff
var socket = io.connect('http://localhost:80');

socket.on('message', function(message) {
    if (!Array.isArray(message)) {
        console.log(message);
    } else {
        var objectType = message[0];
        switch(objectType) {
            case "scanner":
                var id = message[1];
                var name = message[2];
                var state = message[3];
                switch(state) {
                    case "on":
                        document.getElementById(id).style.display ="inline";
                        var pathElement = document.getElementById("path").firstElementChild;
                        var pathElementArray = pathElement.innerHTML.split(":");
                        var pathArray = pathElementArray[1].split('&nbsp;');
                        while(pathArray.length > 4) {
                            pathArray.pop();
                        }
                        var pathText = name;
                        if (name !== pathArray[0].trim()) {
                            for (var index = 0; index < pathArray.length; index++) {
                                pathText = pathText + '&nbsp;' + pathArray[index];
                            }
                            pathElement.innerHTML = pathElementArray[0] + " : " + pathText;
                        }
                        break;
                    case "off":
                        document.getElementById(id).style.display = "none";
                        break;
                }
                break;
            case "switch":
                // TODO (need arduino)
                break;
            case "trafficlight":
                document.getElementById(message[1]).setAttribute(message[2], message[3]);
                break;
        }
    }
})

// jQuery stuff
$(document).ready(function () {

    $(".btn-SW").hover(function () {
        var btnId = $(this).attr('id');
        var number = btnId.replace("btn-SW", "");
        var offId = "off-SW" + number;
        var offElement = document.getElementById(offId);
        if (offElement.style.display != "none") {
            $(this).css("fill", "#C0392B");
        } else {
            $(this).css("fill", "#2ECC71");
        }
    }, function () {
        var btnId = $(this).attr('id');
        var number = btnId.replace("btn-SW", "");
        var txtId = "txt-SW" + number;
        if ($("#" + txtId + ":hover").length == 0) {
            $(".btn-SW").css("fill", "#D35400");
        }
    });

    $(".txt-SW").hover(function () {
        var txtId = $(this).attr('id');
        var number = txtId.replace("txt-SW", "");
        var btnId = "btn-SW" + number;
        var btnElement = document.getElementById(btnId);
        var onId = "on-SW" + number;
        var onElement = document.getElementById(onId);
        if (onElement.style.display != "none") {
            btnElement.setAttribute("fill", "#2ECC71");
        } else {
            btnElement.setAttribute("fill", "#C0392B");
        }
    }, function () {
        var txtId = $(this).attr('id');
        var number = txtId.replace("txt-SW", "");
        var btnId = "btn-SW" + number;
        if ($("#" + btnId + ":hover").length == 0) {
            $(".btn-SW").css("fill", "#D35400");
        }
    });

    $(".btn-SW, .txt-SW").click(function() {
        var elementId = $(this).attr('id');
        var number = elementId.replace(/btn-SW|txt-SW/g, "");
        var onId = "on-SW" + number;
        var onElement = document.getElementById(onId);
        var offId = "off-SW" + number;
        var btnId = "btn-SW" + number;
        if (onElement.style.display != "none") {
            $("#" + onId).hide();
            $("#" + offId).show();
            $("#" + btnId).css("fill", "#C0392B");
        }
        else {
            $("#" + offId).hide();
            $("#" + onId).show();
            $("#" + btnId).css("fill", "#2ECC71");
        }
    });
});