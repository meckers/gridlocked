var Meckers = Meckers || {};

Meckers.Box = Class.extend({
    data: '',
    type: '',
    init: function(boxValues) {
        $.extend(this, boxValues);
        this.create();
        this.listen();
    },
    listen: function() {
        var me = this;
        this.elm.on('mousedown', function(e) {
            e.stopPropagation();    // Prevent other stuff on mouse down, i.e. start new mouse selection
        });
    },
    create: function() {
        this.elm = $('<div></div>');
        this.elm.addClass('box');
        this.elm.css({
            'width': this.width + 'px',
            'height': this.height + 'px',
            'top': this.top + 'px',
            'left': this.left + 'px'
        });

        $('body').append(this.elm);  //TODO: Let BoxHandler handle appending elements instead.
    },
    append: function(container) {
        $(container).append(this.elm);
    },
    getElement: function() {
        return this.elm;
    },
    onResize: function(size) {
        // overload me!
        if (size) {
            this.width = size.width;
            this.height = size.height;
        }
    },
    onMove: function(position) {
        console.log("moved to", position);
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