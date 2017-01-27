/**
 * Created by benja_000 on 12/01/2017.
 */
function TrafficLight(paper, id, name, posX, posY) {
    const OBJECT_TYPE = "trafficlight";
    const OFF_HEX_COLOR = "#BDC3C7";
    const GREEN_HEX_COLOR = "#2ECC71";
    const RED_HEX_COLOR = "#C0392B";
    const RADIUS = 20;
    const TEXT_OFFSET = 30;
    this.paper = paper;
    this.id = id;
    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.clientMessage = [];

    this.build = function() {
        this.circle = this.paper.circle(this.posX, this.posY, RADIUS);
        this.circle.node.id = this.id;
        this.text = this.paper.text(this.posX, this.posY + TEXT_OFFSET, this.name);
        this.off();
    }
    // Purpose : Server side
    this.off = function() {
        this.circle.attr("fill", OFF_HEX_COLOR);
    }
    // Purpose : Client side
    this.buildOffMessage = function() {
        this.clientMessage.length = 0;
        this.clientMessage.push(OBJECT_TYPE, this.id, "fill", OFF_HEX_COLOR);
        return this.clientMessage;
    }

    this.buildGreenMessage = function() {
        this.clientMessage.length = 0;
        this.clientMessage.push(OBJECT_TYPE, this.id, "fill", GREEN_HEX_COLOR);
        return this.clientMessage;
    }

    this.buildRedMessage = function() {
        this.clientMessage.length = 0;
        this.clientMessage.push(OBJECT_TYPE, this.id, "fill", RED_HEX_COLOR);
        return this.clientMessage;
    }
}