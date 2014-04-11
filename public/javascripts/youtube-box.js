Meckers.YouTubeBox = Meckers.Box.extend({
    ifr: null,
    type: 'youtube',
    init: function(options) {
        this._super(options);
        this.url = '//www.youtube.com/embed/NO2cHJmDkBg';
        this.load();
        this.listen();
    },
    listen: function() {
    },
    load: function() {
        this.ifr = $('<iframe></iframe>');
        this.ifr.css({
            'width': this.width + 'px',
            'height': this.height + 'px'
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
        this._super(size);
    },
    getData: function() {
        return this.url;
    }
});