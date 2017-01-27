/**
 * Created by benja_000 on 12/01/2017.
 */
function Scanner(paper, id, name, posX, posY, angle) {
    const OBJECT_TYPE = "scanner";
    const RECT_HEX_COLOR = "#1762A1";
    const TEXT_HEX_COLOR = "#FFFFFF";
    const RECT_SIZE = 19;
    const RECT_STROKE_WIDTH = 0;
    const RECT_RADIUS = 0;
    const CIRCLE_HEX_COLOR = "#F39C12";
    const CIRCLE_RADIUS = 17;
    const TEXT_OFFSET = 13;
    this.paper = paper;
    this.id = id;
    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.angle = angle;
    this.clientMessage = [];

    this.build = function() {
        this.rect = this.paper.rect(this.posX, this.posY, RECT_SIZE, RECT_SIZE, RECT_RADIUS);
        this.rect.rotate(angle);
        this.rect.attr("fill", RECT_HEX_COLOR);
        this.rect.attr("stroke-width", RECT_STROKE_WIDTH);
        this.rect.attr("stroke", RECT_HEX_COLOR);
        this.text = this.paper.text(this.posX + RECT_SIZE / 2, this.posY + TEXT_OFFSET, this.name).attr({"fill": TEXT_HEX_COLOR});
        this.circle = this.paper.circle(this.posX + 9, this.posY + 9, CIRCLE_RADIUS);
        this.circle.node.id = this.id;
        this.circle.attr("fill", CIRCLE_HEX_COLOR);
        this.circle.attr("stroke", CIRCLE_HEX_COLOR);
        this.circle.toBack();
        this.off();
    }
    // Purpose : Server side
    this.off = function() {
        this.circle.hide();
    }
    // Purpose : Client side
    this.buildOffMessage = function() {
        this.clientMessage.length = 0;
        this.clientMessage.push(OBJECT_TYPE, this.id, this.name, "off");
        return this.clientMessage;
    }

    this.buildOnMessage = function() {
        this.clientMessage.length = 0;
        this.clientMessage.push(OBJECT_TYPE, this.id, this.name, "on");
        return this.clientMessage;
    }
}