module.exports = {
    // a function to run the logic for this role
    run: function(creep) {

        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }

        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // find energy to pick up
        if (creep.memory.working == false) {

            var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if(target) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
        else {
            // find closest container
            var struct = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity
        });
            if (struct){
                // try to deposit energy, in containers
                if (creep.transfer(struct, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(struct);
                }
            }
        }
    }};
