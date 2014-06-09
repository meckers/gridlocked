var Meckers = Meckers || {};

Meckers.ImageBox = Meckers.Box.extend({

    inputTemplate: '<div id="image-inputs"><input type="text" id="url-input"/><input type="button" id="upload-image-button"/></div>',

    init: function(options) {
        this._super(options);
        this.initialize();
        this.listen();
    },
    initialize: function() {
        var me = this;
        this.imageElement = $('<img/>');
        this.imageElement.addClass('image-box');
        this.imageElement.on('load', function(d) {
            me.onResize();
        });
        this.elm.css({
            'text-align': 'center'
        })
        //this.elm.addClass('center-contain');
        if (this.data && this.data.length > 0) {
            this.setUrl(this.data);
        }
        else {
            this.askForUrl();
            this.addImageDrop();
        }
        this.elm.append(this.imageElement);
    },
    onResize: function(size) {
        var imgElm = this.imageElement;
        var parElm = this.elm;
        var css;
        var ratio=imgElm.width() / imgElm.height();
        var pratio=parElm.width() / parElm.height();
        if (ratio<pratio) css={width:'auto', height:'100%'};
        else {
            css={
                'width':'100%',
                'height':'auto'
            };
        }
        imgElm.css(css);
        if (size) {
            this._super(size);
        }
    },
    listen: function() {
        var me = this;
        if (!this.data) {
            Events.register("IMAGE_UPLOADED", this, function(data) {
                me.onImageUploaded(data);
            });
        }
        this._super();
    },
    askForUrl: function() {
        this.imageDialog = new Meckers.ImageDialog({
            width: this.width,
            height: this.height,
            box: this
        });
        this.$dialog = this.imageDialog.$elm;
        this.elm.append(this.$dialog);
        this.$dialog.css({
            'top': (this.height/2) + 'px',
            'margin-top': (-this.$dialog.height()/2) + 'px'
        });
        this.imageDialog.getInput().focus();
        /*
        var me = this;
        this.elm.append(this.inputTemplate);
        this.$inputElm = $('#image-inputs');
        this.$urlInput = $('#url-input');
        this.$uploadButton = $('#upload-image-button');
        this.$urlInput.keydown(function(e) {
            if (e.keyCode == 13) {
                var url = me.$urlInput.val();
                me.onUrlEntered(url);
                e.preventDefault();
                return false;
            }
        });
        this.$urlInput.focus();*/
    },
    addImageDrop: function() {
        var me = this;
        this.imageDrop = new Meckers.ImageDrop({
            container: this.elm[0],
            pageId: this.pageId,
            //clickable: this.$uploadButton[0],
            clickable: this.imageDialog.$uploadButton[0],
            ondone: function() {
                me.imageAddComplete();
            }
        });
    },
    onUrlEntered: function(url) {
        var me = this;
        if (url) {
            $.get('/addwebimage', {
                pageId: this.pageId,
                weburl: url
            }, function(data) {
                me.setUrl(data.url);
                me.imageAddComplete();
            });
        }
    },
    imageAddComplete: function() {
        //this.$inputElm.remove();
        this.imageDialog.remove();
    },
    setUrl: function(url) {
        if (!this.imageElement.attr('src')) {
            this.data = url;
            this.imageElement.attr('src', url);
        }
    },
    onImageUploaded: function(data) {
        if (data && this.imageElement) {
            this.setUrl(data.imagePath);
            /*
            this.imageElement.attr('src', data.imagePath);
            this.data = data.imagePath;
            */
        }
    }

});