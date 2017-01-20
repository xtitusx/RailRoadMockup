/**
 * Created by benja_000 on 12/01/2017.
 */
function Factory(paper, fs) {
    this.json = JSON.parse(fs.readFileSync('data/mockup.json', 'utf8'));

    this.create = function(type, collection) {
        switch(type) {
            case "Scanner":
                for (var index = 0; index < this.json.scanner.length; index++) {
                    var id = this.json.scanner[index].id;
                    var name = this.json.scanner[index].name;
                    var posX = this.json.scanner[index].x;
                    var posY = this.json.scanner[index].y;
                    var angle = this.json.scanner[index].angle;
                    var textOffset = this.json.scanner[index].textOffset;
                    var obj = new Scanner(paper,id, name, posX, posY, angle);
                    obj.build();
                    collection.add(obj);
                }
                break;
                break;
            case "Switch":
                // TODO
                break;
            case "TrafficLight":
                for (var index = 0; index < this.json.trafficlight.length; index++) {
                    var id = this.json.trafficlight[index].id;
                    var name = this.json.trafficlight[index].name;
                    var posX = this.json.trafficlight[index].x;
                    var posY = this.json.trafficlight[index].y;
                    var obj = new TrafficLight(paper,id, name, posX, posY);
                    obj.build();
                    collection.add(obj);
                }
                break;
        }
    }
}