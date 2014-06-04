Meckers.YouTubeBox = Meckers.Box.extend({
    ifr: null,
    type: 'youtube',

    init: function(options) {
        this._super(options);
        this.createIFrame();
        //this.load();
        if (this.data) {
            this.setUrl(this.data);
        }
        else {
            this.askForUrl();
        }
        this.listen();
    },
    listen: function() {
        var me = this;
        Events.register("YOUTUBE_URL_ENTERED", this, function(data) {
            me.setUrl(data);
        });
        this._super();
    },
    createIFrame: function() {
        this.ifr = $('<iframe></iframe>');
        this.ifr.css({
            'width': this.width + 'px',
            'height': this.height + 'px',
            'display': 'none'   // hide until we have an URL.
        });
        this.ifr.attr('frameborder', '0');
        this.elm.append(this.ifr);
    },
    load: function() {
        this.ifr = $('<iframe></iframe>');
        this.ifr.css({
            'width': this.width + 'px',
            'height': this.height + 'px',
            'display': 'none'
        });
        if (this.data && this.data.length > 0) {
            this.setUrl(this.data);
        }
        //this.ifr.attr('src', this.url);
        this.ifr.attr('frameborder', '0');
        this.elm.append(this.ifr);
    },
    askForUrl: function() {
        this.youtubeDialog = new Meckers.YoutubeDialog({
            width: this.width,
            height: this.height
        });
        this.$dialog = this.youtubeDialog.$elm;
        this.elm.append(this.$dialog);
        this.$dialog.css({
            'top': (this.height/2) + 'px',
            'margin-top': (-this.$dialog.height()/2) + 'px'
        });
        this.youtubeDialog.getInput().focus();
    },
    onResize: function(size) {
        this.ifr.css({
            'width': size.width,
            'height': size.height
        });
        this._super(size);
    },
    setUrl: function(url) {
        this.ifr.attr('src', url);
        this.data = url;
        this.ifr.css('display', 'block');
    }
});