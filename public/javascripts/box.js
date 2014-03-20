var Meckers = Meckers || {};

Meckers.Box = Class.extend({
    data: '',
    type: '',
    init: function(boxValues) {
        /*
        if (options.dimensions) {
            this.width = options.dimensions.width;
            this.height = options.dimensions.height;
            this.top = options.dimensions.top;
            this.left = options.dimensions.left;

        } */

        $.extend(this, boxValues);

        this.create();

        this.elm.on('mousedown', function(e) {
            e.stopPropagation();    // Prevent other stuff on mouse down, i.e. start new mouse selection
        })
    },
    create: function() {
        this.elm = $('<div></div>');
        console.log('create', this.top, this.left);
        this.elm.css({
            'position': 'absolute',
            'background-color': '#efefef',
            'width': this.width + 'px',
            'height': this.height + 'px',
            'top': this.top + 'px',
            'left': this.left + 'px'
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
        this.width = size.width;
        this.height = size.height;
    },
    onMove: function(position) {
        this.top = position.top;
        this.left = position.left;
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