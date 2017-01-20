/**
 * Created by benja_000 on 12/01/2017.
 */
function Scanner(paper, id, name, posX, posY, angle) {
    const OBJECT_TYPE = "scanner";
    const OFF_HEX_COLOR = "#ffdb99";
    const GREEN_HEX_COLOR = "#00FF00";
    const RECT_WIDTH = 19;
    const RECT_HEIGHT = RECT_WIDTH;
    const RADIUS = 0;
    const STROKE_WIDTH = 4;
    const TEXT_OFFSET = 14;
    this.paper = paper;
    this.id = id;
    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.angle = angle;
    this.clientMessage = [];

    this.build = function() {
        this.rect = this.paper.rect(this.posX, this.posY, RECT_WIDTH, RECT_HEIGHT, RADIUS);
        this.rect.rotate(angle);
        this.rect.node.id = this.id;
        this.off();
        this.text = this.paper.text(this.posX - 1 + RECT_WIDTH / 2, this.posY + TEXT_OFFSET, this.name);
    }
    // Purpose : Server side
    this.off = function() {
        this.rect.attr("fill", OFF_HEX_COLOR);
        this.rect.attr("stroke", OFF_HEX_COLOR);
        this.rect.attr("stroke-width", STROKE_WIDTH);
    }
    // Purpose : Client side
    this.buildOffEmitMessage = function() {
        this.clientMessage.length = 0;
        this.clientMessage.push(OBJECT_TYPE, this.id, "stroke", OFF_HEX_COLOR);
        return this.clientMessage;
    }

    this.buildGreenEmitMessage = function() {
        this.clientMessage.length = 0;
        this.clientMessage.push(OBJECT_TYPE, this.id, "stroke", GREEN_HEX_COLOR);
        return this.clientMessage;
    }
}