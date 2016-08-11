require('prototype.claimerspawn')();
require('prototype.spawn')();
require('prototype.soldatspawn')();
require('prototype.medicspawn')();
require('prototype.courierspawn')();
require('prototype.minerspawn')();
require('prototype.rangerspawn')();
require('prototype.Source')();
var intel = require('intel');

var sourceManager = require('sourcemanager');
var roleRanger = require('role.ranger');
var roleDismantler = require('role.dismantler');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleSoldat = require('role.soldat');
var roleHealer = require('role.healer');
var roleEminer = require('role.eminer');
var roleCourier = require('role.courier');
var roleCargo = require('role.cargo');
var roleClaimer = require('role.claimer');
var roleTraveler = require('role.traveler');
var roleZombie = require('role.zombie');
var roleRemote = require('role.remote');
var roleRemote2 = require('role.remote2');
module.exports.loop = function () {
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }
    var towers = _.filter(Game.structures, (str) => {return str.structureType === STRUCTURE_TOWER}
    )
    ;
    for (var tower of towers) {
        if (tower) {
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
         /*else var dmg = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => (structure.hits+1250) < structure.hitsMax && structure.structureType != STRUCTURE_WALL
        });
        tower.repair(dmg)
        */}
    }
    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
        // get the creep object
        var creep = Game.creeps[name];
        if (creep.memory.role != 'claimer' && creep.memory.role != 'soldat' && creep.memory.role != 'ranger' && creep.memory.role != 'dismantler') {
        if (creep.ticksToLive <= 200) {creep.memory.role = 'zombie';}}
            

        // if creep is harvester, call harvester script
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        // if creep is upgrader, call upgrader script
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        // if creep is builder, call builder script
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        // if creep is repairer, call repairer script
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        // if creep is wallRepairer, call wallRepairer script
        else if (creep.memory.role == 'wallRepairer') {
            roleWallRepairer.run(creep);
        }
        else if (creep.memory.role == 'soldat') {
            roleSoldat.run(creep);
        }
        else if (creep.memory.role == 'healer') {
            roleHealer.run(creep);
        }
        else if (creep.memory.role == 'eminer') {
            roleEminer.run(creep);
        }
        else if (creep.memory.role == 'courier') {
            roleCourier.run(creep);
        }
        else if (creep.memory.role == 'cargo') {
            roleCargo.run(creep);
        }
        else if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        else if (creep.memory.role == 'traveler') {
            roleTraveler.run(creep);
        }
        else if (creep.memory.role == 'zombie') {
            roleZombie.run(creep);
        }
        else if (creep.memory.role == 'remote') {
            roleRemote.run(creep);
        }
        else if (creep.memory.role == 'remote2') {
            roleRemote2.run(creep);
        }
        else if (creep.memory.role == 'dismantler') {
            roleDismantler.run(creep);
        }
        else if (creep.memory.role == 'ranger') {
            roleRanger.run(creep);
        }
    }


// setup some minimum numbers for different roles
    var minimumNumberOfHarvesters = 1;
    var minimumNumberOfUpgraders = 1;
    var minimumNumberOfBuilders = 1;
    var minimumNumberOfRepairers = 2;
    var minimumNumberOfWallRepairers = 0;
    var minimumNumberOfSoldats = 1;
    var minimumNumberOfHealers = 1;
    var minimumNumberOfDismantlers = 0;
    var minimumNumberOfRangers = 0;
    var minimumNumberOfCouriers = 3;
    var minimumNumberOfCargos = 1;
    var minimumNumberOfMiners = 2;
    var minimumNumberOfRemotes = 5;
    var minimumNumberOfRemotes2 = 7;
    var minimumNumberOfClaimers = 2;
    
    var numberOfRemotes = _.sum(Game.creeps, (c) => c.memory.role == 'remote');
    var numberOfRemotes2 = _.sum(Game.creeps, (c) => c.memory.role == 'remote2');
    var numberOfDismantlers = _.sum(Game.creeps, (c) => c.memory.role == 'dismantler');
    var numberOfClaimers = _.sum(Game.creeps, (c) => c.memory.role == 'claimer');
var claimflag = Game.flags['Reserve'].pos.roomName;
 for (roomName in Game.rooms){
     /*if (Game.flags['AddRemoteMine'])
     {
         if(roomName == Game.flags['AddRemoteMine'].pos.roomName)
         {
             var sources = Game.rooms[roomName].find(FIND_SOURCES);
             for (s in sources) {
                 Memory.minelist.push(s.id);
             }
             //Game.flags['AddRemoteMine'].remove();
             console.log ('Room added to remote mining list: ' + roomName )
         }
     }*/
     var thisroom = Game.rooms[roomName]
     if (thisroom.controller){
     if (thisroom.controller.my == true) {
    // count the number of creeps alive for each role
    // _.sum will count the number of properties in Game.creeps filtered by the
    //  arrow function, which checks for the creep being a harvester
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.pos.roomName == roomName
    )
    ;
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.pos.roomName == roomName
    )
    ;
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.pos.roomName == roomName
    )
    ;
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.pos.roomName == roomName
    )
    ;
    var numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer' && c.pos.roomName == roomName
    )
    ;
    var numberOfSoldats = _.sum(Game.creeps, (c) => c.memory.role == 'soldat' && c.pos.roomName == roomName
    )
    ;
    var numberOfHealers = _.sum(Game.creeps, (c) => c.memory.role == 'healer' && c.pos.roomName == roomName
    )
    ;
    var numberOfMiners = _.sum(Game.creeps, (c) => c.memory.role == 'eminer' && c.pos.roomName == roomName
    )
    ;
    var numberOfCargo = _.sum(Game.creeps, (c) => c.memory.role == 'cargo' && c.pos.roomName == roomName
    )
    ;
    var numberOfCouriers = _.sum(Game.creeps, (c) => c.memory.role == 'courier' && c.pos.roomName == roomName
    )
    ;
    var numberOfRangers = _.sum(Game.creeps, (c) => c.memory.role == 'ranger' && c.pos.roomName == roomName
    )
    ;
    var SpawnS = Game.rooms[roomName].find(FIND_MY_SPAWNS)
    for (i in SpawnS){
        var SpawnT = SpawnS[i]
    if (SpawnT) {
    var energy = thisroom.energyCapacityAvailable;
    var name = undefined;

    // if not enough harvesters
    if (numberOfHarvesters < minimumNumberOfHarvesters) {
        // try to spawn one
        name = SpawnT.createCustomCreep(energy, 'harvester');

        // if spawning failed and we have no harvesters left
        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
            // spawn one with what is available
            name = SpawnT.createCustomCreep(
                thisroom.energyAvailable, 'harvester');
        }
    }
    // if not enough upgraders
    else if (numberOfUpgraders < minimumNumberOfUpgraders) {
        // try to spawn one
        name = SpawnT.createCustomCreep(energy, 'upgrader');
    }
    else if (numberOfMiners < minimumNumberOfMiners) {
        // try to spawn one
        name = SpawnT.createMiner(energy, 'eminer');
    }
    else if (numberOfCargo < minimumNumberOfCargos) {
        // try to spawn one
        name = SpawnT.createCourier(energy, 'cargo');
    }
    else if (numberOfCouriers < minimumNumberOfCouriers) {
        // try to spawn one
        name = SpawnT.createCourier(energy, 'courier');
    }
    // if not enough repairers
    else if (numberOfRepairers < minimumNumberOfRepairers) {
        // try to spawn one
        name = SpawnT.createCustomCreep(energy, 'repairer');
    }
    // if not enough builders
    else if (numberOfBuilders < minimumNumberOfBuilders) {
        // try to spawn one
        name = SpawnT.createCustomCreep(energy, 'builder');
    }
    // if not enough wallRepairers
    else if (numberOfWallRepairers < minimumNumberOfWallRepairers) {
        // try to spawn one
        name = SpawnT.createCustomCreep(energy, 'wallRepairer');
    }
    else if (numberOfSoldats < minimumNumberOfSoldats) {
        // try to spawn one
        name = SpawnT.createCustomAttackCreep(energy, 'soldat');
    }
    
    else if (numberOfHealers < minimumNumberOfHealers) {
        // try to spawn one
        name = SpawnT.createCustomMedicCreep(energy, 'healer');
    }
    else if (numberOfRemotes < minimumNumberOfRemotes) {
        // try to spawn one
        name = SpawnT.createCustomCreep(energy, 'remote');
    }
    else if (numberOfRemotes2 < minimumNumberOfRemotes2) {
        // try to spawn one
        name = SpawnT.createCustomCreep(energy, 'remote2');
    }
    else if (numberOfDismantlers < minimumNumberOfDismantlers) {
        // try to spawn one
        name = SpawnT.createMiner(energy, 'dismantler');
    }
    else if (numberOfRangers < minimumNumberOfRangers) {
        // try to spawn one
        name = SpawnT.createRanger(energy, 'ranger');
    }
    else if (Game.rooms[claimflag]) {
        if (numberOfClaimers < minimumNumberOfClaimers) {
        if (Game.rooms[claimflag].controller.my == false) {
            name = SpawnT.createclaimer(energy, 'claimer')
        }
        else if (Game.rooms[claimflag].controller.my == true) {
            if (Game.rooms[claimflag].controller.level <= 2) {
                name = SpawnT.createCustomCreep(energy, 'traveler')
                }
            }
        }
    }
    var closeCreep = SpawnT.pos.findInRange(FIND_MY_CREEPS,1);
    for (i in closeCreep) {SpawnT.renewCreep(closeCreep[i]);}
}}
}

    }}
    if (Game.time % 450 == 12) {intel.run()};
    /*for(var name in Game.rooms) {
        
        var roomResourceCount = Game.rooms[name].energyAvailable;
        
        console.log(name + 'has energy in the amount of: ' + roomResourceCount)}*/
};