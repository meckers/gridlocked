Meckers.YouTubeBox = Meckers.Box.extend({
    ifr: null,
    type: 'youtube',
    init: function(options) {
        this._super(options);
        this.url = '//www.youtube.com/embed/98LoiMZ59Jw';
        this.load(options.dimensions);
        this.listen();
    },
    listen: function() {
    },
    load: function(dimensions) {
        this.ifr = $('<iframe></iframe>');
        this.ifr.css({
            'width': dimensions.width + 'px',
            'height': dimensions.height + 'px'
        });
        this.ifr.attr('src', this.url);
        this.ifr.attr('frameborder', '0');
        this.elm.append(this.ifr);
    },
    onResize: function(size) {
        this.ifr.css({
            'width': size.width,
            'height': size.height
        });
    },
    getData: function() {
        return this.url;
    }
});