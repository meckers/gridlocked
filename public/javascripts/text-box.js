Meckers.TextBox = Meckers.Box.extend({
    type: 'text',
    init: function(options, isUserAdded) {
        this.isUserAdded = isUserAdded || false;
        this._super(options);
        this.initialize(isUserAdded);
        //this.listen();
    },
    initialize: function() {
        var me = this;
        this.textElement = this.createTextElement();
        this.inputElement = this.createInputElement();
        if (this.data && this.data.length > 0) {
            this.setText(this.data);
        }
        // "input" event is HTML5 only, no IE support.
        this.inputElement.bind('input', function() {
            Events.trigger('SOMETHING_CHANGED');
        });
        this.textElement.bind('click', function() {
            me.edit();
        });
        this.inputElement.bind('blur', function() {
            //$(this).html(markdown.toHTML($(this).html()));
            me.preview();
        });
        this.elm.append(this.textElement);
        this.elm.append(this.inputElement);
        if (this.isUserAdded) {
            //this.textElement.focus();
            this.edit();
            Events.trigger('TUTORIAL', {
                'id': 'entering-text',
                'header': 'Entering text',
                'text': 'Text input uses <a href="http://daringfireball.net/projects/markdown/" target="_blank">markdown</a> for easy formatting. For instance, try **text** to make bold text, or *text* to make it italic. Click outside your text box to view the result.',
                okCallback: function() {
                    me.edit();
                }
            });
        }
        else {
            this.preview();
        }
    },
    createInputElement: function() {
        var inputElement = $('<textarea></textarea>');
        inputElement.addClass('input-element');
        return inputElement;
    },
    createTextElement: function() {
        var textElement = $('<div></div>');
        textElement.addClass('textbox');
        //textElement.attr('contenteditable', 'true');
        return textElement;
    },
    edit: function() {
        this.textElement.addClass('hidden');
        this.inputElement.removeClass('hidden');
        this.inputElement.focus();
    },
    preview: function() {
        this.textElement.html(markdown.toHTML(this.inputElement.val()));
        this.textElement.removeClass('hidden');
        this.inputElement.addClass('hidden');
    },
    setText: function(text) {
        //this.textElement.html(text);
        this.inputElement.val(text);
    },
    getData: function() {
        //return this.textElement.html();
        return this.inputElement.val();
    }
});