var Meckers = Meckers || {};


Meckers.ImageDialog = Class.extend({
    $elm: null,
    init: function(options) {
        this.width = options.width || 300;
        this.height = options.height || 200;
        this.box = options.box;
        this.$elm = this.createDialog();
    },
    createDialog: function() {
        var dialogWidth = Math.ceil(this.width/* * 0.66*/);
        var inputWidth = dialogWidth;

        //var $outer = $('<div></div>').addClass('dialog-outer');
        var $dialog = $('<div></div>');
        $dialog.addClass('image dialog');
        $dialog.css({
            'width': dialogWidth
        });
        this.$urlInput = this.createInput();
        this.$addButton = this.createOKButton();
        this.$uploadButton = this.createUploadButton();
        var $or = $('<div class="image-upload-or">- or -</div>');
        $dialog.append(this.$uploadButton);
        $dialog.append($or);
        $dialog.append(this.$urlInput);
        $dialog.append(this.$addButton);
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
            $urlInput.attr('placeholder', 'Enter image URL');
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
    createOKButton: function() {
        var me = this;
        var $button = $('<input type="button"/>');
        $button.val('GET');
        $button.addClass('ok button positive');
        $button.click(function() {
            me.onUrlEntered(me.$urlInput.val());
        });
        return $button;
    },
    createUploadButton: function() {
        var me = this;
        var $button = $('<input type="button"/>');
        $button.val('UPLOAD');
        $button.addClass('button positive');
        return $button;
    },
    onUrlEntered: function(url) {
        var me = this;
        if (url/* && this.ifr*/) {
            this.box.onUrlEntered(url);
            this.$urlInput.remove();
            this.$addButton.remove();
        }
    },
    getInput: function() {
        return this.$urlInput;
    },
    remove: function() {
        this.$elm.remove();
    }
})