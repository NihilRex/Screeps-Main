module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is bringing energy to the controller but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to the controller
        if (creep.memory.working == true) {
            var Mcontroller = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    // the second argument for findClosestByPath is an object which takes
                    // a property called filter which can be a function
                    // we use the arrow operator to define it
                    filter: (s) => s.structureType = STRUCTURE_CONTROLLER
        });


            // try to upgrade the controller
            if (creep.upgradeController(Mcontroller) == ERR_NOT_IN_RANGE) {
                // if not in range, move towards the controller
                creep.moveTo(Mcontroller);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
    }
};
filter: (s) => s.my == true

