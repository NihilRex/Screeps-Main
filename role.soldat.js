module.exports = {
    run: function(creep) {
        if (Game.flags['Attack']){
        var invadeRoom = Game.flags['Attack'].pos.roomName;
        var flag = Game.flags['Attack'].pos;}
        var targ2 = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (s) => s.owner.username != 'Source Keeper'});
        if (creep.room.controller){if (!creep.room.controller.my)
        {var targ = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => s.structureType != STRUCTURE_KEEPER_LAIR && s.structureType != STRUCTURE_CONTROLLER && s.structureType != STRUCTURE_ROAD});}}

        if (targ2){
            if (creep.attack(targ2) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targ2, {ignoreDestructibleStructures: true})
            }
        }
        else if(targ){
            if (creep.attack(targ) == ERR_NOT_IN_RANGE) {
                if(creep.moveTo(targ) == ERR_NO_PATH)
					creep.moveTo(targ, {ignoreDestructibleStructures: true})
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