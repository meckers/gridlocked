var Meckers = Meckers || {};

Meckers.Selection = Class.extend({
    menu: null,
    init: function(options) {
        if (options.dimensions !== null) {
            this.dimensions = options.dimensions;
        }
        this.source = options.source;
        this.addMenu();
    },

    addMenu: function() {
        this.menu = new Meckers.Menu({
            container: this.source
        });
    }
});