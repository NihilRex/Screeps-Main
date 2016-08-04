var roleUpgrader = require('role.upgrader');

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }
        

        // if creep is supposed to complete a constructionSite
        if (creep.memory.working == true) {
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {filter: (s) => s.my == true});
            if (constructionSite != undefined) {
                
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    // move towards the constructionSite
                    creep.moveTo(constructionSite);
                }
            }
            // if no constructionSite is found
            else {
                // go upgrading the controller
                roleUpgrader.run(creep);
            }
        }
        // if creep is supposed to harvest energy from source
        else if(creep.memory.working == false){
            // find closest source
            var conta = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    // the second argument for findClosestByPath is an object which takes
                    // a property called filter which can be a function
                    // we use the arrow operator to define it
                    filter: (c) => c.structureType == STRUCTURE_CONTAINER && c.store[RESOURCE_ENERGY] > 0
        });
            // try to harvest energy, if the source is not in range
            if (creep.withdraw(conta, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(conta); 
            }
            else
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
        let droppedEnergy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);  
                    if (droppedEnergy.length > 0) {
                        creep.pickup(droppedEnergy[0]);
                    }
    }
};