var Meckers = Meckers || {};

Meckers.BoxHandler = Class.extend({
    boxes: [],

    map: {
        'text' : Meckers.TextBox,
        'youtube' : Meckers.YouTubeBox,
        'image': Meckers.ImageBox
    },

    boxFactory: null,
    init: function() {
        //this.boxFactory = new Meckers.BoxFactory();
        this.listen();
    },
    feed: function(data) {
        for(var i=0; i<data.boxes.length; i++) {
            console.log("making box", data.boxes[i]);
            this.makeBox(data.boxes[i]);
        }
    },
    listen: function() {
        var me = this;
        Events.register("MAKE_BOX", this, function(args) {
            console.log("MAKE_BOX event", args);
            var extValues = { type: args.type };
            $.extend(extValues, args.selection.dimensions);
            me.makeBox(extValues);
        })
    },
    makeBox: function(boxValues) {
        var box = new this.map[boxValues.type](boxValues);

        var movable = new Meckers.Movable(box.getElement(), { handle: true });
        var resizable = new Meckers.Resizable(box.getElement());

        resizable.setResizeHandler(function(size) {
            box.onResize(size);
        });

        movable.setMoveHandler(function(position) {
            box.onMove(position);
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