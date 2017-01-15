/**
 * Created by benja_000 on 13/01/2017.
 */

Collection = function() {
    this.array = {};

    this.add = function(obj) {
        this.array[obj.id] = obj;
    }

    this.getObjectById = function(id) {
        return this.array[id];
    }
}