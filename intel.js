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

        }
    }
};