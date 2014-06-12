var Meckers = Meckers || {};

Meckers.PageExpander = Class.extend({
    init: function() {
        this.$elm = this.create();
        this.listen();
    },
    listen: function() {
        var me = this;
        this.$elm.click(function() {
            me.expand();
        });
    },
    create: function() {
        var elm = $('<div></div>');
        elm.addClass('page-expander lower');
        var inner = $('<div></div>');
        inner.addClass('page-expander-inner');
        inner.html('click here to add more vertical space');
        elm.append(inner);
        return elm;
    },
    expand: function() {
        Events.trigger('EXPAND_VERTICAL');
    },
    getElement: function() {
        return this.$elm;
    }

})