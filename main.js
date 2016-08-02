require('prototype.claimerspawn')();
require('prototype.spawn')();
require('prototype.soldatspawn')();
require('prototype.medicspawn')();
require('prototype.courierspawn')();
require('prototype.minerspawn')();
var Spawner = require('spawner')
var Intel = require('intel');
var sourceManager = require('sourcemanager');
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
var structureTower = require('structure.tower');
module.exports.loop = function () {
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let creep in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[creep] == undefined) {
            if (creep.memory.assignedsource != undefined) {
                var assignedsourceroom = creep.memory.assignedsource.roomName
                Memory.rooms[assignedsourceroom].sources[creep.memory.sourceId].assigned = false;
            }
            delete Memory.creeps[creep];
        }
    }
    ;

    for(let room in Game.rooms) {
        spawner.run(room)
        //Run for each tower in my room, run the structure.tower module
        var towers = Game.rooms[room].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        for (let i in towers) {
            if (towers[i].my) {
                structureTower.run(towers[i])
            }
            ;
        }
        sourceManager.run(room)
    }



        for (let name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.ticksToLive <= 201 && creep.memory.role !='eminer') {creep.memory.role = 'zombie'}
            if (creep.memory.state == 'depositing' && creep.memory.depositroom != room) {
                if (room.my) {
                    creep.memory.depositroom = room
                }
            }
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

            }


    if (Game.time % 250) {Intel.run};


    };
