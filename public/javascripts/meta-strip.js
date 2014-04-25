var Meckers = Meckers || {};

Meckers.MetaStrip = Class.extend({
    init: function() {
        this.elm = $('#meta-strip');
        this.saveButton = $('#save-page-button');
        this.pageTitle = $('#page-title');
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
        Events.register('SOMETHING_CHANGED', this, $.proxy(this.onPageChange, this));
        this.pageTitle.bind('input', function() {
            Events.trigger('SOMETHING_CHANGED');
        })
    },
    onSave: function() {
        //this.saveButton.addClass('');
    },
    afterSave: function() {
        console.log("save end");
        this.saveButton.removeClass('dirty');
        this.saveButton.attr('disabled', 'true');
    },
    onPageChange: function() {
        this.saveButton.addClass('dirty');
        this.saveButton.removeAttr('disabled');
    }


})