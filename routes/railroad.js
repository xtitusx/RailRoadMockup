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
                res.writeHead(200, {"Content-Type": "text/html;image/svg+xml"});
                res.write(page);
                res.end();
            }
        }
    );
});

module.exports = router;

function BuildPage(svg) {
    var page = '<html>' + svg + '</html>';
    page = page.replace('<head>', '<head><meta charset=utf-8 /><script src="/socket.io/socket.io.js"></script><script src="jquery/dist/jquery.slim.js"></script><script src="javascripts/client.js"></script><link href="stylesheets/client.css" rel="stylesheet" media="all">');
    page = page.replace('<body', '<body bgcolor="#95A5A6">');
    return page;
}

function Draw(win) {
    var raphael = require('raphael');
    raphael.setWindow(win);
    // Start drawing some stuff with raphael, which will write to the virtual "window"
    var paper = raphael(0, 0, 1810, 1056);
    paper.canvas.style.backgroundColor = "#95A5A6";
    var title = paper.text(965, 150, "RailRoad Mockup");
    title.attr({ "font-size": 25});
    var scannerPath = paper.text(450, 550, "Scanner Path :").attr({"text-anchor": "start"}).attr({"fill": "#1762A1"});
    scannerPath.node.id = "path";
    scannerPath.attr({ "font-size": 20});
    railRoadState = InitBusinessObjects(paper); // Change Business Objects initialization state
    var image = paper.image("images/railroad.svg", 120, 0, 1690, 1056);
    image.toBack();
    var svg = win.document.documentElement.innerHTML;
    return(svg);
}

function InitBusinessObjects(paper) {
    factory = new Factory(paper ,fs);
    factory.create("Scanner", scannerCollection);
    factory.create("Switch", switchCollection);
    factory.create("TrafficLight", trafficlightCollection);
    return true;
}