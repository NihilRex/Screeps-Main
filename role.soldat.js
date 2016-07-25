/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.soldat');
 * mod.thing == 'a thing'; // true
 */
var flagpt = 'E48N13'
module.exports = {
    run: function(creep) {
var targ = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            // try to harvest energy, if the source is not in range
            if (creep.attack(targ) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(targ);
            }
            else if (flagpt) {creep.moveTo(flagpt);}
    }
};