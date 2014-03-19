var Meckers = Meckers || {};

Meckers.Box = Class.extend({
    data: '',
    type: '',
    init: function(options) {
        if (options.dimensions) {
            this.width = options.dimensions.width;
            this.height = options.dimensions.height;
            this.top = options.dimensions.top;
            this.left = options.dimensions.left;
            this.create(options.dimensions);
        }
        this.elm.on('mousedown', function(e) {
            e.stopPropagation();    // Prevent other stuff on mouse down, i.e. start new mouse selection
        })
    },
    create: function(dimensions) {
        this.elm = $('<div></div>');
        this.elm.css({
            'position': 'absolute',
            'background-color': '#efefef',
            'width': dimensions.width + 'px',
            'height': dimensions.height + 'px',
            'top': dimensions.top,
            'left': dimensions.left
        });
        //this.elm.addClass('meckers-movable');
        //Meckers.Movable.make(this.elm, { handle: true });

        $('body').append(this.elm);  //TODO: Let BoxHandler handle appending elements instead.
    },
    getElement: function() {
        return this.elm;
    },
    onResize: function(size) {
        // overload me!
    },
    getData: function() {
        return this.data;
    },
    values: function() {
        return {
            'box.type': this.type,
            'box.data': this.getData(),
            'box.width': this.width,
            'box.height': this.height,
            'box.top': this.top,
            'box.left': this.left
        }
    }
});