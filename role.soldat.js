module.exports = {
    run: function(creep) {
        var invadeRoom = Game.flags['Attack'].pos.roomName
        var targ2 = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var targ = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
/*        var rampart = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_RAMPART
    });
        var closestrampart = creep.pos.findClosestByPath(rampart);*/

        if (targ2){
            if (creep.attack(targ2) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targ2, {ignoreDestructibleStructures: true});
            }
        }
        else if (targ){
            if (creep.attack(targ) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targ, {ignoreDestructibleStructures: true});
            }
        }
        else if (invadeRoom != 'undefined') {
        if(creep.roomName != invadeRoom)
{
var exitDir = Game.map.findExit(creep.room.name, invadeRoom);
var Exit = creep.pos.findClosestByRange(exitDir);
creep.moveTo(Exit), [{reusePath: 12}];
}
else creep.moveTo(Game.flags.Attack)            
        }

/*        else if (rampart.length > 0) {
            creep.moveTo(closestrampart);}*/

    }

};