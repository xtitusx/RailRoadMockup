/**
 * Created by benja_000 on 12/01/2017.
 */
function Switch(paper, id, name, posX, posY, offX, offY, onX, onY, buttonX, buttonY, buttonWidth, buttonHeight) {
    const OBJECT_TYPE = "trafficlight";
    const FILL_HEX_COLOR = "#D35400";
    const OFF_HEX_COLOR = "#C0392B";
    const ON_HEX_COLOR = "#2ECC71";
    const TEXT_HEX_COLOR = "#FFFFFF";
    const RADIUS = 15;
    const NEEDLE_STROKE_WIDTH = 2;
    const TEXT_OFFSET = 4;
    this.paper = paper;
    this.id = id;
    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.offX = offX;
    this.offY = offY;
    this.onX = onX;
    this.onY = onY;
    this.buttonX = buttonX;
    this.buttonY = buttonY;
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.clientMessage = [];

    this.build = function() {
        this.circle = this.paper.circle(this.posX, this.posY, RADIUS);
        this.circle.node.id = this.id;
        this.circle.attr("fill", FILL_HEX_COLOR);
        this.circle.attr("stroke", FILL_HEX_COLOR);
        this.circle.attr("class", "hvr-back-pulse");
        this.circleText = this.paper.text(this.posX, this.posY + TEXT_OFFSET, this.name).attr({"fill": TEXT_HEX_COLOR});
        this.needleOff = this.drawNeedle("off", this.offX, this.offY);
        this.needleOn = this.drawNeedle("on", this.onX, this.onY);
        this.drawSwitchButton();
        this.circleText.toFront();
        this.off();
        //this.on();
    }

    this.drawNeedle = function(type, relativeX, relativeY) {
        switch(type) {
            case "off":
                var color = OFF_HEX_COLOR;
                break;
            case "on":
                var color = ON_HEX_COLOR;
                break;
        }
        var x1 = this.posX;
        var y1 = this.posY;
        var x2 = this.posX + relativeX;
        var y2 = this.posY + relativeY;
        var coeffDirecteurD1 = (y2 - y1) / (x2 - x1);
        //var kD1 = y1 + (coeffDirecteurD1 * x1);
        var coeffDirecteurD2 = -1 / coeffDirecteurD1;
        var kD2 = y1 + (coeffDirecteurD2 * x1);
        var distance = parseFloat((RADIUS / 2).toFixed(1));
        var distanceCalculee = 0;
        var xDistant = x1;
        if (coeffDirecteurD1 !== 0) {
            while ((distance !== distanceCalculee) && ((xDistant - x1) <= distance)) {
                xDistant = xDistant + 0.03;
                var yDistant = -(coeffDirecteurD2 * xDistant - kD2);
                distanceCalculee = parseFloat((Math.sqrt(Math.pow(xDistant - x1, 2) + Math.pow(yDistant - y1, 2))).toFixed(1));
            }
            var xOppose = x1 - Math.abs(xDistant - x1);
            if (yDistant >= y1) {
                var yOppose = y1 - Math.abs(yDistant - y1);
            } else {
                var yOppose = y1 + Math.abs(yDistant - y1);
            }
        }
        else {
            var xOppose = x1;
            var yDistant = y1 - distance;
            var yOppose = y1 + distance;

        }
        xDistant = parseInt(xDistant);
        xOppose = parseInt(xOppose);
        var yTemp = parseInt(yDistant);
        yDistant = parseInt(yOppose);
        yOppose = yTemp;
        var path = "M" + x2 + "," + y2 + "L" + xDistant + "," + yDistant + "L" + xOppose + ","  + yOppose + "L" + x2 + "," + y2;
        var needle = this.paper.path(path).attr({"stroke": color}).attr("stroke-width", NEEDLE_STROKE_WIDTH);
        needle.node.id = type + "-" + this.id;
        needle.attr("fill", color);
        needle.attr("stroke", FILL_HEX_COLOR);
        needle.toBack();
        return needle;
    }

    this.drawSwitchButton = function() {
        this.rect = this.paper.rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight, 5);
        this.rect.node.id = "btn-" + this.id ;
        this.rect.attr("class", "btn-SW");
        this.rect.attr("fill", FILL_HEX_COLOR);
        this.rect.attr("stroke-width", 0);
        this.rect.attr("stroke", FILL_HEX_COLOR);
        this.buttonText = this.paper.text(this.buttonX + this.buttonWidth / 2, this.buttonY + 5 + this.buttonHeight / 2, this.name).attr({"fill": TEXT_HEX_COLOR});
        this.buttonText.attr({ "font-size": 15});
        this.buttonText.node.id = "txt-" + this.id;
        this.buttonText.attr("class", "txt-SW");
    }

    // Purpose : Server side
    this.off = function() {
        this.needleOn.hide();
        this.needleOff.show();
    }

    this.on = function() {
        this.needleOff.hide();
        this.needleOn.show();
    }
    // Purpose : Client side
    this.buildOffMessage = function() {
        this.clientMessage.length = 0;
        // TODO (need arduino)
        return this.clientMessage;
    }

    this.buildOnMessage = function() {
        this.clientMessage.length = 0;
        // TODO (need arduino)
        return this.clientMessage;
    }
}