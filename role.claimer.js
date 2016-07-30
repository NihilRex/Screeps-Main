module.exports = {
    run: function(creep) {
        var otw = Game.flags['Reserve'].pos
        var dest = Game.flags['Reserve'].pos.roomName
        if (creep.pos == Game.flags['Reserve'].pos){
            creep.memory.state = 'claim';}
        if (creep.memory.state == 'exit') {
            creep.moveTo(otw);}
        if (creep.pos.isEqualTo(Game.flags['Reserve'].pos)){creep.memory.state = 'claim';}

        if (creep.memory.state == 'claim') {
            if (creep.room.name != dest) {
                var exitDir = Game.map.findExit(dest);
                console.log(exitDir);
                var Exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(Exit), [{reusePath: 12}];
            }
            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // if not in range, move towards the controller
                creep.moveTo(creep.room.controller);
            }
                if (creep.claimController(creep.room.controller) == ERR_GCL_NOT_ENOUGH) {
                    creep.memory.state = 'reserve'
            }
        }
        if (creep.memory.state == 'reserve'){
        if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE){
            creep.moveTo(creep.room.controller);
        }

        } else creep.attackController(creep.room.controller)
    }
};
//{var test = Game.flags['Reserve'].pos.roomName;console.log(Game.rooms[test].controller.my);}