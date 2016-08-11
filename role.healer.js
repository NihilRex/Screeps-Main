module.exports = {
    run: function(creep) {
        if (Game.flags['Attack']) {
        var flag = Game.flags['Attack'].pos;}
        var targ = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
                filter: (creep) =>creep.hits<creep.hitsMax
    }
    )
        if (targ) {
            if (creep.heal(targ) == ERR_NOT_IN_RANGE) {
                creep.rangedHeal(targ) 
                creep.moveTo(targ);
                }
            }
        
        else if (Game.flags['Attack']) {creep.moveTo(flag);}

    }
};