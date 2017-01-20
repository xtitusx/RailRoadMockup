/**
 * Created by benja_000 on 13/01/2017.
 */

Collection = function() {
    this.array = {};

    this.getSize = function() {
        var size = 0;
        for (var key in this.array) {
            if (this.array.hasOwnProperty(key)) {
                size++;
            }
        }
        return size;
    }

    this.add = function(obj) {
        this.array[obj.id] = obj;
    }

    this.getObjectById = function(id) {
        return this.array[id];
    }
}