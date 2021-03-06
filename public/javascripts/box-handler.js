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
            this.makeBox(data.boxes[i], false);
        }
    },
    listen: function() {
        var me = this;
        Events.register("MAKE_BOX", this, function(args) {
            var extValues = { pageId: args.pageId, type: args.type };
            $.extend(extValues, args.selection.dimensions);
            me.makeBox(extValues, true);
            Events.trigger('SOMETHING_CHANGED');
        });
        Events.register('BOX_REMOVED', this, $.proxy(this.removeBox, this));
    },
    makeBox: function(boxValues, isUserAdded) {
        var box = new this.map[boxValues.type](boxValues, isUserAdded);
        this.addBox(box);
    },
    addBox: function(box) {
        this.boxes.push(box);
    },
    removeBox: function(box) {
        var idx = this.boxes.indexOf(box);
        if (idx !== -1) {
            this.boxes.splice(idx, 1);
        }
        Events.trigger('SOMETHING_CHANGED');
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