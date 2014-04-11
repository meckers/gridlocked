var Meckers = Meckers || {};

Meckers.ImageBox = Meckers.Box.extend({
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
            this.setSource(this.data);
        }
        this.elm.append(this.imageElement);
        console.log("image box appended");
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
        Events.register("IMAGE_UPLOADED", this, function(data) {
            me.onImageUploaded(data);
        });
        this._super();
    },
    setSource: function(url) {
        this.imageElement.attr('src', url);
    },
    onImageUploaded: function(data) {
        console.log("image updated handler in image box", data.imagePath, this.imageElement);
        if (data && this.imageElement) {
            this.imageElement.attr('src', data.imagePath);
            this.data = data.imagePath;
        }
    }

});