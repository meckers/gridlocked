var Meckers = Meckers || {};

Meckers.BoxHandler = Class.extend({
    boxes: [],

    map: {
        'text' : Meckers.TextBox,
        'youtube' : Meckers.YouTubeBox
    },

    boxFactory: null,
    init: function() {
        //this.boxFactory = new Meckers.BoxFactory();
        this.listen();
    },
    listen: function() {
        var me = this;
        Events.register("MAKE_BOX", this, function(args) {
            me.makeBox(args.type, args.selection);
        })
    },
    makeBox: function(type, selection) {
        console.log("make box of type", type, this.map);
        var box = new this.map[type]({
            dimensions : selection.dimensions
        });
        this.addBox(box);
    },
    addBox: function(box) {
        this.boxes.push(box);
    }
});