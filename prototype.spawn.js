module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName, source) {
            // create a balanced body as big as possible with the given energy
            var numberOfPartsC = Math.floor(energy / 200);
            var body = [];
            if (numberOfPartsC >= 17) {numberOfParts = 16} else {var numberOfParts = numberOfPartsC;}
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            // create creep with the created body and the given role
            return this.createCreep(body, undefined, { role: roleName, working: true, state: 'depositing', assignedsource: source });
        };
};