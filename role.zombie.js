module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        var spawn= creep.pos.findClosestByRange(FIND_MY_SPAWNS)
        // try to harvest energy, if the source is not in range
        if (spawn.recycleCreep(creep) == ERR_NOT_IN_RANGE) {
            // move towards the source
            creep.moveTo(spawn);
        }
    }
};
