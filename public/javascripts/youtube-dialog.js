var Meckers = Meckers || {};


Meckers.YoutubeDialog = Class.extend({
    $elm: null,
    init: function(options) {
        this.width = options.width || 300;
        this.height = options.height || 200;
        this.$elm = this.createDialog();
    },
    createDialog: function() {
        var dialogWidth = Math.ceil(this.width/* * 0.66*/);
        var inputWidth = dialogWidth;

        //var $outer = $('<div></div>').addClass('dialog-outer');
        var $dialog = $('<div></div>');
        $dialog.addClass('dialog');
        $dialog.css({
            'width': dialogWidth
        });
        this.$urlInput = this.createInput();
        this.$addButton = this.createButton();
        $dialog.append(this.$urlInput);
        $dialog.append(this.$addButton);
        var $suggestions = Meckers.YoutubeSuggestions.getSuggestions(dialogWidth);
        //$dialog.append($suggestions);
        //$outer.append($dialog);
        return $dialog;
    },
    createInput: function() {
        var me = this;
        var $urlInput = $('<input/>');
        $urlInput.addClass('url-input');
        $urlInput.css({

        });
        $urlInput.attr('type', 'text');
        if ('placeholder' in $urlInput[0]) {
            $urlInput.attr('placeholder', 'Enter YouTube URL');
        }
        $urlInput.keydown(function(e) {
            if (e.keyCode == 13) {
                me.onUrlEntered($(e.target).val());
                e.preventDefault();
                return false;
            }
        });
        return $urlInput;
    },
    createButton: function() {
        var me = this;
        var $button = $('<input type="button"/>');
        $button.val('ADD');
        $button.addClass('button positive');
        $button.click(function() {
            me.onUrlEntered(me.$urlInput.val());
        });
        return $button;
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
    onUrlEntered: function(url) {
        var me = this;
        if (url/* && this.ifr*/) {
            var embedUrl = me.getEmbedUrl(url);
            //this.setUrl(embedUrl); fire event instead to be registered in youtube-box.
            Events.trigger('YOUTUBE_URL_ENTERED', embedUrl);
            this.$urlInput.remove();
            this.$addButton.remove();
        }
    },
    getInput: function() {
        return this.$urlInput;
    }
})