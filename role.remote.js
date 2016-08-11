module.exports = {
    run: function(creep) {
        if (Game.flags['RemoteMine']){
			var mineroom = Game.flags['RemoteMine'].pos.roomName;
			var flag = Game.flags['RemoteMine'].pos;
		}
		        if (Game.flags['Deposit']){
			var depositroom = Game.flags['Deposit'].pos.roomName;
			var dflag = Game.flags['Deposit'].pos;
		}
		        let droppedEnergy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);  
                    if (droppedEnergy.length > 0) {
                        creep.pickup(droppedEnergy[0]);
                    }
 switch(creep.carry.energy)
        {   case 0:                    creep.memory.working = false;  break;
            case creep.carryCapacity:  creep.memory.working = true;   break;
        }
		if (creep.pos.roomName == mineroom){
		if (creep.memory.working == false) {
			var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source), [{reusePath:8}];
            }
		}	else if (creep.memory.working == true) {
            creep.moveTo(dflag); //new
        }
	} 
	if (creep.pos.roomName != mineroom){
			if (creep.memory.working == true) {
			var struct = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] < s.storeCapacity
        });
            if (struct){
                // try to deposit energy, in containers
                if (creep.transfer(struct, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(struct);
                }
            } else {creep.moveTo(dflag);}
		}	else if (creep.memory.working == false) {
            creep.moveTo(flag); //new
			}
		}
	}
};