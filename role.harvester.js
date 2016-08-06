module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        

        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }
        let droppedEnergy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);  
                    if (droppedEnergy.length > 0) {
                        creep.pickup(droppedEnergy[0]);
                    }

        // if creep is supposed to transfer energy to the spawn or an extension
        if (creep.memory.working == true) {
            // find closest spawn or extension which is not full
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => (s.energy < s.energyCapacity) //|| (s.store[RESOURCE_ENERGY] < s.storeCapacity[RESOURCE_ENERGY] && s.structureType == STRUCTURE_CONTAINER)
            });

            // if we found one
            if (structure != undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure), [{reusePath:12}];
                }
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source
            var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source), [{reusePath:12}];
            }
        }
    }
};