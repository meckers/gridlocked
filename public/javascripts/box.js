var Meckers = Meckers || {};

Meckers.Box = Class.extend({
    init: function(options) {
        if (options.dimensions) {
            console.log("options", options);
            this.create(options.dimensions);
        }
    },
    create: function(dimensions) {
        console.log(dimensions);
        this.elm = $('<div></div>');
        this.elm.css({
            'position': 'absolute',
            'background-color': '#efefef',
            'width': dimensions.width + 'px',
            'height': dimensions.height + 'px',
            'top': dimensions.top,
            'left': dimensions.left
        });
        $('body').append(this.elm);  //TODO: Let BoxHandler handle appending elements instead.
    }
});