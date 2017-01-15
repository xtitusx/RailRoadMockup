/**
 * Created by benja_000 on 12/01/2017.
 */
function Factory(paper, fs) {
    this.json = JSON.parse(fs.readFileSync('data/mockup.json', 'utf8'));

    this.create = function(type, collection) {
        switch(type) {
            case "Scanner":
                // TODO
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