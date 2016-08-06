module.exports = {
    run: function(creep) {
        var flag = Game.flags['Attack'].pos;
        var targ = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
                filter: (creep) =>creep.hits<creep.hitsMax
    }
    )
        if (targ) {
            if (creep.heal(targ) == ERR_NOT_IN_RANGE) {
                if (creep.rangedHeal(targ) == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(targ);
                }
            }
        }
        else creep.moveTo(flag);

    }
};