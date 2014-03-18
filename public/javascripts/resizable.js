var Meckers = Meckers || {};

Meckers.Resizable = Class.extend({
    gridSize: 10,
    init: function(elm, options) {
        this.elm = elm;
        this.listen();
        this.create();
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
    create: function() {
        if (!this.elm.hasClass('meckers-resizable')) {
            this.elm.addClass('meckers-resizable');
        }
        this.createHandle();
    },
    createHandle: function() {
        this.handle = $('<div></div>');
        this.handle.addClass('resize-handle');
        this.elm.append(this.handle);
        this.handle.bind('mousedown', this.omd);
    },
    showHandle: function() {
        this.handle.css('display', 'block');
    },
    hideHandle: function() {
        this.handle.css('display', 'none');
    },
    onMouseDown: function(e) {
        console.log("mouse down");
        this.curX = e.pageX;
        this.curY = e.pageY;
        $(window).bind('mousemove', this.omm);
        $(window).bind('mouseup', this.omu);
    },
    snap: function(val) {
        return Math.ceil(val / this.gridSize) * this.gridSize;
    },
    onMove: function(e) {
        console.log("move");
        var deltaTop = e.pageY - this.curY;
        var deltaLeft = e.pageX - this.curX;
        this.curY = e.pageY;
        this.curX = e.pageX;

        var width = this.elm.width() + deltaLeft;
        var height = this.elm.height() + deltaTop;

        console.log(width, height);

        this.elm.css('width', width);
        this.elm.css('height', height);

        e.stopPropagation();
        e.preventDefault();
    },
    onMouseUp: function() {
        $(window).unbind('mousemove', this.omm);
        $(window).unbind('mouseup', this.omu);
        var origWidth = this.elm.width();
        var origHeight = this.elm.height();
        this.elm.css('width', this.snap(origWidth));        // TODO: Skulle föredra att snappa medan man flyttar...
        this.elm.css('height', this.snap(origHeight));
    }
});