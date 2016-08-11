module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
            if (!creep.memory.assignedsource) { 
            var asource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            //var bsource = Game.getObjectById(asource)
            if (asource){creep.memory.assignedsource = asource.id;}
            }
            
            if (creep.memory.assignedsource) {
            var source = Game.getObjectById(creep.memory.assignedsource);}
                        
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
};
