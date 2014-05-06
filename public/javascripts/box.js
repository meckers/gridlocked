var Meckers = Meckers || {};

Meckers.Box = Class.extend({
    data: '',
    type: '',
    init: function(boxValues) {
        $.extend(this, boxValues);
        this.create();
        this.movable = new Meckers.Movable(this.getElement(), { handle: true, onDone: $.proxy(this.onMoveEnd, this) });
        this.resizable = new Meckers.Resizable(this.getElement(), {onDone: $.proxy(this.onResizeEnd, this)});
        this.listen();
    },
    listen: function() {
        var me = this;
        this.elm.on('mousedown', function(e) {
            e.stopPropagation();    // Prevent other stuff on mouse down, i.e. start new mouse selection
        });
        this.elm.on('mouseover', function(e) {
            me.deleteButton.css('display', 'block');
        });
        this.elm.on('mouseleave', function(e) {
            me.deleteButton.css('display', 'none');
        });
        this.deleteButton.click(function(e) {
            me.remove();
        });
        this.resizable.setResizeHandler(function(size) {
            me.onResize(size);
        });
        this.movable.setMoveHandler(function(position) {
            me.onMove(position);
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

        this.deleteButton = $('<div></div>');
        this.deleteButton.addClass('delete-button');
        this.deleteButton.html('X');
        this.elm.append(this.deleteButton);

        $('#content').append(this.elm);  //TODO: Let BoxHandler handle appending elements instead.
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
    onResizeEnd: function() {
        Events.trigger('SOMETHING_CHANGED');
    },
    onMove: function(position) {
        this.top = position.top;
        this.left = position.left;
    },
    onMoveEnd: function() {
        Events.trigger('SOMETHING_CHANGED');
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
    },
    remove: function() {
        this.elm.remove();
        Events.trigger('BOX_REMOVED', this);
    }
});