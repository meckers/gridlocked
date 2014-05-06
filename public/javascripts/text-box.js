Meckers.TextBox = Meckers.Box.extend({
    type: 'text',
    init: function(options, isUserAdded) {
        this.isUserAdded = isUserAdded || false;
        this._super(options);
        this.initialize(isUserAdded);
        console.log("---", this.textElement);
        //this.listen();
    },
    initialize: function() {
        this.textElement = this.createTextElement();
        if (this.data && this.data.length > 0) {
            this.setText(this.data);
        }
        // "input" event is HTML5 only, no IE support.
        this.textElement.bind('input', function() {
            console.log("input event");
            Events.trigger('SOMETHING_CHANGED');
        });
        this.textElement.bind('blur', function() {
        });
        this.elm.append(this.textElement);
        if (this.isUserAdded) {
            this.textElement.focus();
        }
    },
    createTextElement: function() {
        var textElement = $('<div></div>');
        textElement.addClass('textbox');
        textElement.attr('contenteditable', 'true');
        return textElement;
    },
    setText: function(text) {
        this.textElement.html(text);
    },
    getData: function() {
        return this.textElement.html();
    }
});