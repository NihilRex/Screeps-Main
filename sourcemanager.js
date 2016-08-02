var sourcemanager={
    getSpawn: function () {
        var name = undefined;
        var targetSpawn = undefined;
        for (s in Game.spawns) {
            var testSpawn = Game.spawns[s];
            if (testSpawn.spawning == null && testSpawn.room.energyAvailable / testSpawn.room.energyCapacityAvailable >= 0.05) {
                return (testSpawn);
            }
        }
        return (-1);
    },



    run: function (thisroom) {

        var spawny = this.getSpawn();
        
        for (source in Memory.rooms[thisroom].sources)
            var thissource = source
        if (spawny != -1){
        var energy = spawny.room.energyAvailable
        if (thissource.assigned == undefined){
            if (thisroom.energyCapacityAvailable >=300) {
                //spawn a new creep with this source assigned to it
                name = spawny.createMiner(energy, 'eminer', thissource);
                thissource.assigned = true
            }else if (name = spawny.createCustomCreep(energy, 'harvester', thissource)){
             thissource.assigned = true}
        }
        if (name){console.log(name + ' spawned for source ' + thissource); return;}
    }
    }

};

module.exports = sourcemanager;
