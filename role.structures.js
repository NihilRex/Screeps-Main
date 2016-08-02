var towers = _.filter(Game.structures, (str) => {return str.structureType === STRUCTURE_TOWER}
)
;
for (var tower of towers) {
    if (tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }
}
