module.exports = {
    run: function () {
        if(Memory.rooms === undefined) {
            console.log('Memory.rooms doesnt exist')
            Memory.rooms = {};
        }

        for (let room in Game.rooms) {
            
            if(Memory.rooms[room] === undefined) {
                console.log('Memory.rooms[ ' + room + '] doesnt exist')
                Memory.rooms[room] = {};
            }
            Memory.rooms[room].isMine = false;
            if (Game.rooms[room].find(FIND_MY_STRUCTURES)) {
                Memory.rooms[room].isMine = true;
            }

            if (Memory.rooms[room].roomName === undefined) {
                Memory.rooms[room].roomName = room
            }
            Memory.rooms[room].hasThreats = false;
            if (Game.rooms[room].find(FIND_HOSTILE_STRUCTURES) || Game.rooms[room].find(FIND_HOSTILE_CREEPS)) {
                Memory.rooms[room].hasThreats = true;
            }

            if (_.isUndefined(Memory.rooms[room].sources)) {
                Memory.rooms[room].sources = {};
                var sourceList = Game.rooms[room].find(FIND_SOURCES);
                for (let i in sourceList) {
                    Memory.rooms[room].sources[sourceList[i].id] = sourceList[i].pos;
                    //Memory.rooms[room].sources[sourceList[i].roomName] = room;
                }
            }
if(_.isUndefined(Memory.sources))
        Memory.sources={};

    for(roomName in Game.rooms){
        var currRoom = Game.rooms[roomName];
        var sourceList = currRoom.find(FIND_SOURCES);
        for (let currSource of sourceList) {
            var id = currSource.id;
            if(_.isUndefined(Memory.sources[id]))
                Memory.sources[id] = {total: 0, names: []};
            Memory.sources[id].total=0;
            Memory.sources[id].names=[];

            if(_.isUndefined(Memory.sources[id].hasMiner)) {
                var creepList = currSource.pos.findInRange(FIND_MY_CREEPS, 3, {filter: (c) => c.memory.role=='eminer'});
                if(creepList && creepList.length > 0){
                    //for(creep of creepList)
                }
                    //Memory.sources[id].container = containerList[0].id;
            }
        }
    }
    for(creepName in Game.creeps){
        var currCreep = Game.creeps[creepName];
        if(_.isUndefined(currCreep.memory.source) || currCreep.memory.source=={}) continue;
        var id=currCreep.memory.source;
        Memory.sources[id].names.push(currCreep.name);
        Memory.sources[id].total++;
    }

        }
    }
};