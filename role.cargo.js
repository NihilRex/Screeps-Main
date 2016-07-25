module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is bringing energy to the spawn or an extension but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // find energy to pick up
        if (creep.memory.working == false) {
            // find closest spawn or extension which is not full
            var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if(target) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }

        else {
            // find closest container
            var source = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {

                filter: (s) => s.energy < s.energyCapacity && s.structureType == STRUCTURE_CONTAINER
        });
            // try to deposit energy, in containers
            if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                // move towards it
                creep.moveTo(structure), [{reusePath}];
            }
        }
    }
};
