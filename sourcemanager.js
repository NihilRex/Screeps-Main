    var sourcemanager = {
        getSpawn: function () {
            var name = undefined;
            var targetSpawn = undefined;
            for (s in Game.spawns) {
                var testSpawn = Game.spawns[s];
                if (testSpawn.spawning == null && testSpawn.room.energyAvailable / testSpawn.room.energyCapacityAvailable >= 0.5) {
                    return (testSpawn);
                }
            }
            return (-1);
        },



    run: function (thisroom) {

    let spawny = this.getspawn(thisroom);

    for (source of Memory.rooms[thisroom].energyDeposits)
        var thissource = source
    var energy = targetSpawn.room.energyAvailable
    if (thissource.assigned == undefined){
        if (thisroom.energyCapacity >=300) {
            //spawn a new creep with this source assigned to it
            name = Spawny.createMiner(energy, 'eminer', thissource)
            thissource.assigned = true
        } else if (name = Spawny.createCustomCreep(energy, 'harvester', thissource, thisroom)) {
            thissource.assigned = true}
        }
    if (name){console.log(name + ' spawned for source ' + thissource);}
        }
    };

    module.exports = {sourcemanager};