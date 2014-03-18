var Meckers = Meckers || {};

Meckers.Box = Class.extend({
    init: function(options) {
        if (options.dimensions) {
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
    }
});