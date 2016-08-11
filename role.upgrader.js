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
        let droppedEnergy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);  
                    if (droppedEnergy.length > 0) {
                        creep.pickup(droppedEnergy[0]);
                    }

        // if creep is supposed to transfer energy to the controller
        if (creep.memory.working == true) {
            // instead of upgraderController we could also use:
            // if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

            // try to upgrade the controller
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // if not in range, move towards the controller
                creep.moveTo(creep.room.controller);
            }
        }
        // if creep is supposed to harvest energy from source
                else {
            // find closest source
            var conta = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    // the second argument for findClosestByPath is an object which takes
                    // a property called filter which can be a function
                    // we use the arrow operator to define it
                    filter: (c) => (c.structureType == STRUCTURE_CONTAINER || c.structureType == STRUCTURE_STORAGE) && c.store[RESOURCE_ENERGY] > 50
        });
            // try to harvest energy, if the source is not in range
            if (creep.withdraw(conta, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(conta);
            }
}}};