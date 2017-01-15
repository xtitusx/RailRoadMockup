/**
 * Created by benja_000 on 10/01/2017.
 */
var express = require('express');
var router = express.Router();
var jsdom = require('jsdom');
var fs = require('fs');
var vm = require('vm');

var includeInThisContext = function(path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code, path);
}.bind(this);
includeInThisContext("business/collection.js");
includeInThisContext("business/factory.js");
includeInThisContext("business/scanner.js");
includeInThisContext("business/switch.js");
includeInThisContext("business/trafficlight.js");

router.get('/', function(req, res, next) {
    jsdom.env(
        "<html></html>",
        [], // Optional scripts
        function (errors, win) {
            if (errors) {
                throw errors;
            } else {
                // Create / override the global window object, as raphael will access it globally
                global.window = win;
                global.document = win.document;
                global.navigator = win.navigator;
                var page = BuildPage(Draw(win));
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(page);
                res.end();
            }
        }
    );
});

module.exports = router;

function BuildPage(svg) {
    var page = '<html>' + svg + '</html>';
    page = page.replace('<head>', '<head><script src="/socket.io/socket.io.js"></script><script src="javascripts/client.js"></script>');
    return page;
}

function Draw(win){
    var raphael = require('raphael');
    raphael.setWindow(win);
    // Start drawing some stuff with raphael, which will write to the virtual "window"
    var paper = raphael(0, 0, "100%", "100%");
    var text = paper.text(965, 30, "RailRoad Mockup");
    text.attr({ "font-size": 20});
    railRoadState = InitBusinessObjects(paper); // Change Business Objects initialization state
    var image = paper.image("images/railroad.png", 120, 0, 1690, 1056);
    image.toBack();
    var svg = win.document.documentElement.innerHTML;
    return(svg);
}

function InitBusinessObjects(paper) {
    factory = new Factory(paper ,fs);
    factory.create("TrafficLight", trafficlightCollection);
    return true;
}