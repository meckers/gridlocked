Meckers.Menu = Class.extend({
    width: 100,
    height: 20,
    init: function(options) {
        this.create(options.container);
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
    addOption: function(name, callback) {
        var oelm = $("<a></a>");
        oelm.html(name);
        oelm.click(callback);
        this.elm.append(oelm);
    }
});