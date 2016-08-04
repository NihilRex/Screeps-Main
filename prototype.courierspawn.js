module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createCourier =
        function(energy, roleName) {
            // create a balanced body as big as possible with the given energy
            var numberOfPartsC = Math.floor(energy / 100);
            var body = [];
            if (numberOfPartsC >= 7) {numberOfParts = 6} else {var numberOfParts = numberOfPartsC;}
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            // create creep with the created body and the given role
            return this.createCreep(body, undefined, { role: roleName, working: false });
        };
};