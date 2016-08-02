module.exports = {
    run: function(creep) {
        var invadeRoom = Game.flags['Attack'].pos.roomName
        var flag = Game.flags['Attack'].pos
        var targ2 = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var targ = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);

        if (targ2){
            if (creep.attack(targ2) == ERR_NOT_IN_RANGE) {
                if(creep.moveTo(targ2) == ERR_NO_PATH)
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
        	if(creep.pos.roomName != invadeRoom) // edited to include .pos
			{
				var exitDir = Game.map.findExit(creep.room.name, invadeRoom);
				var Exit = creep.pos.findClosestByRange(exitDir);
				creep.moveTo(Exit), [{reusePath: 3}];
			}
        }
		else 
			creep.moveTo(flag);
    
    }
};