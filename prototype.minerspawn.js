require('prototype.Source')();

module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createMiner =
        function(energy, roleName) {
            // create a balanced body as big as possible with the given energy
            var numberOfPartsC = Math.floor(energy / 250);
            var body = [];
            if (numberOfPartsC >= 5) {var numberOfParts = 4;} else {var numberOfParts = numberOfPartsC;}
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
        var sourceId    = undefined;
        var sourceCount = 50;
        var sourceList  = this.room.find(FIND_SOURCES);

        for(source of sourceList){
            if(!_.isUndefined(Memory.sources[source.id]) && source.memory.total < sourceCount){
                sourceId = source.id;
                sourceCount = source.memory.total;
            }
        }
        var memory = { role: roleName, working: false }
        memory = _.merge(memory, {assignedsource: sourceId});
            // create creep with the created body and the given role
            return this.createCreep(body, undefined, memory);
        };
};