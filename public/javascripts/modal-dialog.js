var Meckers = Meckers || {}

Meckers.ModalDialog = Class.extend({
    init: function(options) {
        this.$container = options.container || $('body');
    },
    show: function() {
        if (!this.$elm) {
            this.$elm = this.create();
        }
        this.$container.append(this.$elm);
        this.positionAndSize();
        this.$elm.addClass('visible');
    },
    create: function() {
        var $shroud = $('<div></div>');
        $shroud.addClass('modal shroud');
        $('body').append($shroud);
        var $dialogArea = $('<div></div>');
        $dialogArea.addClass('dialog-area');
        $shroud.appendChild($dialogArea);
        return $shroud;
    },
    positionAndSize: function() {
        /*
        this.elm.css({
            'width': this.$container.width() * 0.7
        })*/
        this.elm.css({
            'margin-left': -($('.modal .dialog-area').width() / 2) + 'px',
            'margin-top': -($('.modal .dialog-area').height() / 2) + 'px'
        });

    }
});