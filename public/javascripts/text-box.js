Meckers.TextBox = Meckers.Box.extend({
    init: function(options) {
        this._super(options);
        this.initialize();
    },
    initialize: function() {
        this.elm.addClass('textbox');
        this.elm.attr('contenteditable', 'true');
        this.elm.focus();
    }
});