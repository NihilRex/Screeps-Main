module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createRanger =
        function(energy, roleName) {
            // create a balanced body as big as possible with the given energy
            var numberOfPartsC = Math.floor(energy / 250);
            var body = [];
            if (numberOfPartsC >= 5) {var numberOfParts = 4;} else {var numberOfParts = numberOfPartsC;}
            /*for (let i = 0; i < numberOfParts; i++) {
                body.push(TOUGH);
            }*/
            for (let i = 0; i < numberOfParts; i++) {
                body.push(TOUGH);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(RANGED_ATTACK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            // create creep with the created body and the given role
            return this.createCreep(body, undefined, { role: roleName, working: false });
        };
};