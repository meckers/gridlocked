Meckers.TextBox = Meckers.Box.extend({
    type: 'text',
    init: function(options) {
        this._super(options);
        this.initialize();
    },
    initialize: function() {
        this.textElement = $('<div></div>');
        this.textElement.addClass('textbox');
        this.textElement.attr('contenteditable', 'true');
        this.elm.append(this.textElement);
        this.textElement.focus();
    },
    setText: function(text) {
        this.textElement.html(text);
    },
    getData: function() {
        return this.textElement.html();
    }
});