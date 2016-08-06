module.exports = function() {

    //rewrites the moveTo function that doesn't include options to include a set of options you choose
    //  NOTE: this function will automatically replace any existing usage you have in your code.
    // simply add require('prototype.Creep')(); to the beginning the module you want to use this in
    Creep.prototype.MoveTo = function(target) {
        return this.moveTo(target, {reusePath: 5});
    }
};