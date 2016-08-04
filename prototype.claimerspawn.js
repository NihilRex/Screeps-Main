module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createclaimer =
        function(energy, roleName) {
            // create a balanced body as big as possible with the given energy
            var numberOfPartsC = Math.floor(energy / 650);
            var body = [];
            if (numberOfPartsC >= 11) {numberOfParts = 10} else {var numberOfParts = numberOfPartsC;}
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CLAIM);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            // create creep with the created body and the given role
            return this.createCreep(body, undefined, { role: roleName, working: false, state: 'exit' });
        };
};
