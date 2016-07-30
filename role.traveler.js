module.exports = {
    run: function(creep) {
        var otw = Game.flags['Reserve'].pos
        var dest = Game.flags['Reserve'].pos.roomName
        if (creep.pos.roomName == dest){
        if (creep.pos.isEqualTo(Game.flags['Reserve'].pos)){creep.memory.working = true; creep.memory.role = 'builder'}
        if (creep.pos == otw){creep.memory.working = true; creep.memory.role = 'builder'}
        }

        if (creep.memory.working == false) {
            if (creep.roomName != dest) {
                var exitDir = Game.map.findExit(otw);
              
                var Exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(otw);
            }
        else creep.moveTo(otw);
        if (creep.memory.working == true){
        creep.memory.role = 'builder';
        }
    }
    }
};