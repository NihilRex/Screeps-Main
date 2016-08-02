
module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        var mysource = creep.memory.assignedsource
        switch(creep.carry.energy)
        {

            case 0:
                creep.memory.state = 'working';
                break;
            case creep.carryCapacity:
                creep.memory.working = 'depositing';
                break;

        }

        let droppedEnergy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);
        if (droppedEnergy.length > 0) {
            creep.pickup(droppedEnergy[0]);
        }

        // if creep is supposed to transfer energy to the spawn or an extension
        if (creep.memory.state == 'depositing') {
            if (creep.room.name != creep.memory.depositroom) {
                var exitDir = Game.map.findExit(creep.room.name, creep.memory.depositroom);
                var Exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(Exit), [{reusePath: 12}];
            } else {
                var structure = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                            filter: (s) = > s.energy < s.energyCapacity || s.store[RESOURCE_ENERGY] < s.storeCapacity
            }
            );
                // if we found one
                if (structure != undefined) {
                    // try to transfer energy, if it is not in range
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.moveTo(structure), [{reusePath: 12}];
                    }
                }
            }
        }
        // if creep is supposed to harvest energy from source
        else if (creep.room.name != creep.memory.assignedsource.roomName) {
            var exitDir = Game.map.findExit(creep.room.name, creep.memory.assignedsource.roomName);
            var Exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(Exit), [{reusePath: 12}];
        }
         else if(mysource){if (creep.harvest(mysource) == ERR_NOT_IN_RANGE) {

            creep.moveTo(mysource), [{reusePath:12}];
        }} else
            {
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