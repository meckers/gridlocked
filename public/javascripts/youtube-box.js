Meckers.YouTubeBox = Meckers.Box.extend({
    ifr: null,
    type: 'youtube',

    init: function(options) {
        this._super(options);
        this.createIFrame();
        //this.load();
        console.log("youtube box init", this.data);
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
            me.onUrlEntered(data);
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
    getEmbedUrl: function(watchUrl) {
        if (watchUrl.indexOf('v=') !== -1) {
            var idPart = watchUrl.split('v=')[1];
            var id = idPart;
            var ampPos = idPart.indexOf('&');
            if (ampPos !== -1) {
                id = idPart.substr(0, ampPos);
            }
            return "//www.youtube.com/embed/" + id;
        }
        else if (watchUrl.indexOf('/embed/') !== -1) {
            return watchUrl;
        }
    },
    askForUrl: function() {
        var me = this;
        this.$urlInput = $('<input/>');
        this.$urlInput.addClass('youtube-url-input');
        this.$urlInput.attr('type', 'text');
        this.$urlInput.keydown(function(e) {
            if (e.keyCode == 13) {
                var embedUrl = me.getEmbedUrl(me.$urlInput.val());
                me.onUrlEntered(embedUrl);
                e.preventDefault();
                return false;
            }
        });
        this.elm.append(this.$urlInput);
        this.$urlInput.focus();
    },
    onResize: function(size) {
        this.ifr.css({
            'width': size.width,
            'height': size.height
        });
        this._super(size);
    },
    onUrlEntered: function(url) {
        console.log("url entered handler in image box", url);
        if (url && this.ifr) {
            this.setUrl(url);
            this.$urlInput.remove();
        }
    },
    setUrl: function(url) {
        this.ifr.attr('src', url);
        this.data = url;
        this.ifr.css('display', 'block');
    }
});