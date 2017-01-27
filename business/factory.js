/**
 * Created by benja_000 on 12/01/2017.
 */
function Factory(paper, fs) {
    this.json = JSON.parse(fs.readFileSync('data/mockup.json', 'utf8'));

    this.create = function(type, collection) {
        switch(type) {
            case "Scanner":
                this.json.scanner = this.json.scanner || [];
                if (this.json.scanner.length) {
                    for (var index = 0; index < this.json.scanner.length; index++) {
                        var id = this.json.scanner[index].id;
                        var name = this.json.scanner[index].name;
                        var posX = this.json.scanner[index].x;
                        var posY = this.json.scanner[index].y;
                        var angle = this.json.scanner[index].angle;
                        var obj = new Scanner(paper, id, name, posX, posY, angle);
                        obj.build();
                        collection.add(obj);
                    }
                }
                break;
            case "Switch":
                this.json.switch = this.json.switch || [];
                if (this.json.switch.length) {
                    const HEX_COLOR = "#D35400";
                    var nextButtonY = 60;
                    var buttonWidthPercentPanel = 70;
                    var panelX = 50;
                    var panelY = 150;
                    var panelWidth = 200;
                    var panelHeight = nextButtonY * (this.json.switch.length + 1);
                    var buttonX = panelX + (panelWidth /100 * (100 - buttonWidthPercentPanel) / 2);
                    var buttonY = panelY;
                    var buttonWidth = panelWidth / 100 * buttonWidthPercentPanel;
                    var buttonHeight = 50;
                    paper.rect(panelX, panelY, panelWidth, panelHeight, 5).attr({"stroke": HEX_COLOR}).attr("stroke-width", 3);
                    paper.text(panelX + (panelWidth / 2), panelY + (nextButtonY / 2), "Switch Panel").attr({"fill": HEX_COLOR}).attr({'font-size': 20});
                    for (var index = 0; index < this.json.switch.length; index++) {
                        var id = this.json.switch[index].id;
                        var name = this.json.switch[index].name;
                        var posX = this.json.switch[index].x;
                        var posY = this.json.switch[index].y;
                        var offX = this.json.switch[index].offx;
                        var offY = this.json.switch[index].offy;
                        var onX = this.json.switch[index].onx;
                        var onY = this.json.switch[index].ony;
                        buttonY = buttonY + nextButtonY;
                        var obj = new Switch(paper, id, name, posX, posY, offX, offY, onX, onY, buttonX, buttonY, buttonWidth, buttonHeight);
                        obj.build();
                        collection.add(obj);
                    }
                }
                break;
            case "TrafficLight":
                this.json.trafficlight = this.json.trafficlight || [];
                if (this.json.trafficlight.length) {
                    for (var index = 0; index < this.json.trafficlight.length; index++) {
                        var id = this.json.trafficlight[index].id;
                        var name = this.json.trafficlight[index].name;
                        var posX = this.json.trafficlight[index].x;
                        var posY = this.json.trafficlight[index].y;
                        var obj = new TrafficLight(paper, id, name, posX, posY);
                        obj.build();
                        collection.add(obj);
                    }
                }
                break;
        }
    }
}