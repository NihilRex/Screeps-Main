var roleBuilder = require('role.builder');

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is trying to repair something but has no energy left
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
        // if creep is supposed to repair something
        if (creep.memory.working == true) {
            // find all walls in the room
            var walls = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_WALL
            });

            var target = undefined;
            var targetPercent = 1;

            // Loop through all walls/ramparts searching for
            //   the lowwest percentage compared to max hits
            // Does not take into account how close it is
            for(let potentialTarget in walls) {
                if((potentialTarget.hits / potentialTarget.hitsMax) < targetPercent) {
                    targetPercent = (potentialTarget.hits / potentialTarget.hitsMax);
                    target = potentialTarget;
                }
            }

            // if we find a wall that has to be repaired
            if (target) {
                // try to repair it, if not in range
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(target);
                }
            }
            // if we can't fine one
            else {
                // look for construction sites
                roleBuilder.run(creep);
            }
        }
        // if creep is supposed to harvest energy from source
        if (creep.memory.working == false){
            // find closest source
            var conta = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    // the second argument for findClosestByPath is an object which takes
                    // a property called filter which can be a function
                    // we use the arrow operator to define it
                    filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >=1
        });
            // try to harvest energy, if the source is not in range
            if (creep.withdraw(conta, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(conta), [{reusePath}];
            }

}}};