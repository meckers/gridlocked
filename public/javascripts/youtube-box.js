Meckers.YouTubeBox = Meckers.Box.extend({
    init: function(options) {
        this._super(options);
        this.load(options.dimensions);
    },
    load: function(dimensions) {
        var ifr = $('<iframe></iframe>');
        ifr.css({
            'width': dimensions.width + 'px',
            'height': dimensions.height + 'px'
        });
        ifr.attr('src', '//www.youtube.com/embed/98LoiMZ59Jw');
        ifr.attr('frameborder', '0');
        this.elm.append(ifr);
    }
});