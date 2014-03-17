Meckers.Menu = Class.extend({
    width: 100,
    height: 20,
    init: function(options) {
        this.create(options.container);
        this.addOptions();
        this.listen();
    },
    create: function(container) {
        this.elm = $("<div></div>");
        this.elm.css({
            'background-color': 'yellow',
            'border': '1px solid black',
            'position': 'absolute',
            'top': Math.ceil(container.height()/2) - this.height/2,
            'left': Math.ceil(container.width()/2) - this.width/2,
            'width': '100px',
            'text-align': 'center'
        });
        $(container).append(this.elm);
    },
    addOptions: function() {
        this.addOption('YouTube', 'youtube')
    },
    addOption: function(text, name) {
        var me = this;
        var oelm = $("<a></a>");
        oelm.html(text);
        oelm.click(function() {
            Events.trigger('MENU_OPTION_CLICK', name);
            me.remove();
        });
        this.elm.append(oelm);
    },
    remove: function() {
        this.elm.remove();
        this.stopListen();
    },
    listen: function() {
        var me = this;
        $(window).bind('keydown', function(e) {
            Events.trigger("MENU_OPTION_CLICK", 'text');
            me.remove();
        })
    },
    stopListen: function() {
        $(window).unbind('keydown');
    }
});