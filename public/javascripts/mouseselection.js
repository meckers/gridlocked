var Meckers = Meckers || {};

Meckers.MouseSelection = Class.extend({

    id: null,
    mouseDownHandler: null,
    mouseUpHandler: null,
    mouseMoveHandler: null,
    shroud: null,
    border: '1px dashed black',
    handlers: [],
    gridSize: 1,
    area: null,

    init: function(options) {
        this.id = Math.ceil(Math.random()*1000);
        this.gridSize = options.gridSize || this.gridSize;
        console.log("mouseselection options", options);
        this.$container = $(options.container) || $('body');
        this.area = options.area;
        if (options.shroud) {
            this.shroud = new MacroMaker.Shroud('body', 3);
        }
        this.activate();
        this.listen();
    },

    activate: function() {
        this.active = true;
    },

    listen: function() {
        var me = this;

        this.hmd = $.proxy(this.handleMouseDown, this);
        this.hmu = $.proxy(this.handleMouseUp, this);
        this.hmm = $.proxy(this.handleMouseMove, this);

        console.log("listen on", this.$container);

        this.$container.bind('mousedown', this.hmd);
        //this.$container.bind('mouseup', this.hmu);
        this.$container.bind('mousemove', this.hmm);
    },


    handleMouseDown: function(e) {
        if (this.active && !this.done && e.which == 1) {
            this.startBoxDraw(e.pageX, e.pageY);
            e.stopPropagation();
        }
    },

    handleMouseUp: function(e) {
        if (this.active) {
            // if selecting:
            if (this.drawing) {
                this.endBoxDraw(e.pageX, e.pageY);
                e.stopPropagation();
                e.preventDefault();
                Events.trigger("MOUSE_SELECTION_COMPLETE", this);
                //this.shroud.remove();
            }
        }
    },

    handleMouseMove: function(e) {

        console.log("handle mouse move");

        if (this.active) {
            if (this.drawing) {
                var mouseX = parseInt(e.pageX);
                var mouseY = parseInt(e.pageY);
                var boxWidth = mouseX - this.startX;
                var boxHeight = mouseY - this.startY;

                if (!this.box) {
                    this.box = this.createBox();
                    $('body').append(this.box);
                }

                var gz = this.gridSize;
                var w = Math.ceil(boxWidth / gz)*gz;
                var h = Math.ceil(boxHeight / gz)*gz;

                this.box.css('width', w);
                this.box.css('height', h);

                Events.trigger("BOX_DRAW", {x: mouseX, y: mouseY});

                e.stopPropagation();
                e.preventDefault();
            }
        }
    },

    createBox: function() {
        var el = jQuery('<div></div>');
        el.addClass('mouse-selection');
        el.css('top', this.startY);
        el.css('left', this.startX);
        el.css('border', this.border);
        el.bind('mouseup', this.hmu);       // Extra handlers for when mouse interacts with box instead of content
        el.bind('mousemove', this.hmm);
        return el;
    },

    getBox: function() {
        return this.box;
    },

    startBoxDraw: function(x, y) {
        this.drawing = true;
        var gz = this.gridSize;
        this.startX = Math.floor(x / gz) * gz;
        this.startY = Math.floor(y / gz) * gz;
        Events.trigger("BOX_DRAW_START", { x: x, y: y });
    },

    endBoxDraw: function(x, y) {
        this.drawing = false;
        if (!this.isTooSmall()) {
            if (this.callback) {
                this.callback(this.element);
            }
            this.done = true;
            Events.trigger("BOX_DRAW_END", this);
            //this.shroud.remove();
        }
        else {
            // TODO: Hantera för liten ruta
            this.reset();
        }
    },

    isTooSmall: function() {
        return this.box === undefined || this.box === null || this.box.width() < 50 || this.box.height() < 50;
    },

    getValues: function() {
        return {
            top: this.box.offset().top - $(window).scrollTop(),
            left: this.box.offset().left,
            width: this.box.width(),
            height: this.box.height()
        }
    },

    borderWidth: function() {
        return this.box.css('border-width').replace('px', '');
    },

    remove: function() {
        this.destroy();
    },

    reset: function() {
        this.clearGUI();
    },

    clearGUI: function() {
        if (this.box) {
            this.box.remove();
            this.box = null;
        }
        if (this.shroud) {
            this.shroud.destroy();
            this.shroud = null;
        }
    },

    destroy: function() {
        this.clearGUI();
        this.$container.unbind('mousedown', this.hmd);
        this.$container.unbind('mouseup', this.hmu);
        this.$container.unbind('mousemove', this.hmm);
        this.box.unbind('mouseup', this.hmu);
        this.box.unbind('mousemove', this.hmm);
    },

    appendElement: function(element) {
        this.box.append(element);
    }

});