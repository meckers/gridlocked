var Meckers = Meckers || {};

Meckers.MetaStrip = Class.extend({
    init: function() {
        this.elm = $('#meta-strip');
        this.saveButton = $('#save-page-button');
        this.listen();
    },
    listen: function() {
        // Prevent mouse selection on meta strip
        this.elm.bind('mousedown', function(e) {
            e.stopPropagation();
        });
        this.saveButton.click(function() {
            Events.trigger('SAVE_BUTTON_CLICK', this);
        });
        Events.register('SAVE_START', this, $.proxy(this.onSave, this));
        Events.register('SAVE_END', this, $.proxy(this.afterSave, this));
    },
    onSave: function() {
        this.saveButton.addClass('saving');
    },
    afterSave: function() {
        this.saveButton.removeClass('saving');
    }
})