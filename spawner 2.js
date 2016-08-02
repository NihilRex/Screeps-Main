require('prototype.claimerspawn')();
require('prototype.spawn')();
require('prototype.soldatspawn')();
require('prototype.medicspawn')();
require('prototype.courierspawn')();
require('prototype.minerspawn')();
module.exports = {
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


    run: function () {
        var minimumNumberOfUpgraders = 1;
        var minimumNumberOfBuilders = 1;
        var minimumNumberOfRepairers = 1;
        var minimumNumberOfWallRepairers = 1;
        var minimumNumberOfCouriers = 2;
        var minimumNumberOfCargos = 3;

        for (var roomName in Game.rooms
            ) {
            var thisroom = Game.rooms[roomName]

            if (thisroom.controller.my == true) {
                var minimumNumberOfUpgraders = 1;
                var minimumNumberOfBuilders = 1;
                var minimumNumberOfRepairers = 1;
                var minimumNumberOfWallRepairers = 1;
                var minimumNumberOfCouriers = 2;
                var minimumNumberOfCargos = 3;
                if (thisroom.hasThreat == true) {
                    var minimumNumberOfSoldats = 5;
                    var minimumNumberOfHealers = 2;
                }
                else {
                    var minimumNumberOfSoldats = 1;
                    var minimumNumberOfHealers = 0;
                }


                // count the number of creeps alive for each role
                // _.sum will count the number of properties in Game.creeps filtered by the
                //  arrow function, which checks for the creep being a harvester
                var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.memory.depositroom == thisroom
            )        ;
                var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.depositroom == thisroom)
                ;
                var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.memory.depositroom == thisroom)
                ;
                var numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer' && c.memory.depositroom == thisroom
            )
                ;
                var numberOfSoldats = _.sum(Game.creeps, (c) => c.memory.role == 'soldat' && c.pos.roomName == thisroom
            )
                ;
                var numberOfHealers = _.sum(Game.creeps, (c) => c.memory.role == 'healer' && c.pos.roomName == thisroom
            )
                ;
                var numberOfCargo = _.sum(Game.creeps, (c) => c.memory.role == 'cargo' && c.memory.depositroom == thisroom
            )
                ;
                var numberOfCouriers = _.sum(Game.creeps, (c) => c.memory.role == 'courier' && c.memory.depositroom == thisroom
            )
                ;

                var SpawnT = Game.rooms[roomName].controller.pos.findClosestByRange(FIND_MY_SPAWNS)
                for (var SpawnY in SpawnT) {
//                    var SpawnY = Game.spawns.Spawnx
                    var energy = thisroom.energyCapacityAvailable;
                    var name = undefined;

                    if (numberOfUpgraders < minimumNumberOfUpgraders) {
                        // try to spawn one
                        name = Game.spawns.[SpawnY].createCustomCreep(energy, 'upgrader');
                    }
                    else if (numberOfMiners < minimumNumberOfMiners) {
                        // try to spawn one
                        name = Game.spawns.SpawnY.createMiner(energy, 'eminer');
                    }
                    else if (numberOfCargo < minimumNumberOfCargos) {
                        // try to spawn one
                        name = Game.spawns.SpawnY.createCourier(energy, 'cargo');
                    }
                    else if (numberOfCouriers < minimumNumberOfCouriers) {

                        name = Game.spawns.SpawnY.createCourier(energy, 'courier');
                    }
                    // if not enough repairers
                    else if (numberOfRepairers < minimumNumberOfRepairers) {
                        // try to spawn one
                        name = Game.spawns.SpawnY.createCustomCreep(energy, 'repairer');
                    }
                    // if not enough builders
                    else if (numberOfBuilders < minimumNumberOfBuilders) {
                        // try to spawn one
                        name = Game.spawns.SpawnY.createCustomCreep(energy, 'builder');
                    }
                    // if not enough wallRepairers
                    else if (numberOfWallRepairers < minimumNumberOfWallRepairers) {
                        // try to spawn one
                        name =Game.spawns.SpawnY.createCustomCreep(energy, 'wallRepairer');
                    }
                    else if (numberOfSoldats < minimumNumberOfSoldats) {
                        // try to spawn one
                        name = Game.spawns.SpawnY.createCustomAttackCreep(energy, 'soldat');
                    }
                }
            }
        }
    }
};
