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

        var movable = new Meckers.Movable(box.getElement(), { handle: true });
        var resizable = new Meckers.Resizable(box.getElement());

        resizable.onResize(function(size) {
            box.onResize(size);
        });

        this.addBox(box);
    },
    addBox: function(box) {
        this.boxes.push(box);
    },
    getData: function() {
        var data = {};
        // TODO: Gör en class som ärver Class men som kan ärvas av alla som tar hand om att platta ut data:
        for (var i=0; i<this.boxes.length; i++) {
            var prop = 'page.boxes[' + i + ']';
            data[prop + '.type'] = this.boxes[i].type;
            data[prop + '.data'] = this.boxes[i].getData();
            data[prop + '.width'] = this.boxes[i].width;
            data[prop + '.height'] = this.boxes[i].height;
            data[prop + '.top'] = this.boxes[i].top;
            data[prop + '.left'] = this.boxes[i].left;
        }
        return data;
    }
});