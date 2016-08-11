module.exports = {
    run: function(creep) {
        if (Game.flags['Attack']){
        var invadeRoom = Game.flags['Attack'].pos.roomName;
        var flag = Game.flags['Attack'].pos;}
        if (creep.room.controller){if (!creep.room.controller.my) {var targ2 = creep.pos.findClosestByRange(FIND_STRUCTURES, 
	{filter: (s) => s.structureType != STRUCTURE_ROAD && s.structureType != STRUCTURE_KEEPER_LAIR && s.structureType != STRUCTURE_CONTROLLER && s.structureType != STRUCTURE_CONTAINER});}}
        var targ = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: (s) => s.structureType != STRUCTURE_KEEPER_LAIR && s.structureType != STRUCTURE_CONTROLLER});

        if (targ2){
            if (creep.dismantle(targ2) == ERR_NOT_IN_RANGE) {
                if(creep.moveTo(targ2, {ignoreDestructibleStructures:true }) == ERR_NO_PATH)
					creep.moveTo(targ2, {ignoreDestructibleStructures:true })
            }
        }
        else if(targ){
            if (creep.dismantle(targ) == ERR_NOT_IN_RANGE) {
                if(creep.moveTo(targ) == ERR_NO_PATH)
					creep.moveTo(targ);
            }
        }
        else if (invadeRoom != 'undefined') {
            creep.moveTo(flag); //new
        	/*if(creep.pos.roomName != invadeRoom) 
			{
				var exitDir = Game.map.findExit(creep.room.name, invadeRoom);
				var Exit = creep.pos.findClosestByRange(exitDir);
				creep.moveTo(Exit), [{reusePath: 3}];
			}*/
        }
		//else creep.moveTo(flag);
			
    
    }
};