var Meckers = Meckers || {};

Meckers.Movable = Class.extend({
    gridSize: 10,
    init: function(elm, options) {
        this.elm = elm;
        this.listen();
        this.create(this.elm, options);
    },
    listen: function() {
        var me = this;
        this.omd = $.proxy(this.onMouseDown, this);
        this.omu = $.proxy(this.onMouseUp, this);
        this.omm = $.proxy(this.onMove, this);
        $(this.elm).bind('mouseover', function() {
            me.showHandle();
        });
        $(this.elm).bind('mouseleave', function() {
            me.hideHandle();
        });
    },
    create: function(elm, options) {
        if (!elm.hasClass('meckers-movable')) {
            elm.addClass('meckers-movable')
        }
        if (options.handle) {
            this.handle = this.createHandle();
            this.handle.bind('mousedown', this.omd);
        }
    },
    createHandle: function() {
        var handle = $('<div></div>');
        handle.addClass('handle');
        this.elm.append(handle);
        return handle;
    },
    showHandle: function() {
        this.handle.css('display', 'block');
    },
    hideHandle: function() {
        this.handle.css('display', 'none');
    },
    onMouseDown: function(e) {
        this.curX = e.pageX;
        this.curY = e.pageY;
        $(window).bind('mousemove', this.omm);
        $(window).bind('mouseup', this.omu);
    },
    snap: function(val) {
        return Math.round(val / this.gridSize) * this.gridSize;
    },
    onMove: function(e) {
        var deltaTop = e.pageY - this.curY;
        var deltaLeft = e.pageX - this.curX;
        this.curY = e.pageY;
        this.curX = e.pageX;

        var top = this.elm.offset().top + deltaTop;
        var left = this.elm.offset().left + deltaLeft;

        this.elm.css('top', top);
        this.elm.css('left', left);
        e.stopPropagation();
        e.preventDefault();
    },
    onMouseUp: function() {
        $(window).unbind('mousemove', this.omm);
        $(window).unbind('mouseup', this.omu);
        var top = this.snap(this.elm.offset().top);
        var left = this.snap(this.elm.offset().left);
        this.elm.css('top', top);        // TODO: Skulle föredra att snappa medan man flyttar...
        this.elm.css('left', left);
        if (this.moveHandler) {
            this.moveHandler({
                top: top,
                left: left
            })
        }
    },
    setMoveHandler: function(handler) {
        this.moveHandler = handler;
    }
});