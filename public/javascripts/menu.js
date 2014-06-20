Meckers.Menu = Class.extend({
    width: 100,
    height: 20,
    pageId: null,
    init: function(options) {
        this.container = options.container;
        this.pageId = options.pageId;
        this.create(this.container);
        this.addOptions();
        //this.armDropZone();
        this.listen();
    },
    create: function(container) {
        var me = this;
        this.elm = $("<div></div>");
        console.log('create', this.height, this.width);
        this.elm.css({
            'top': Math.ceil(container.height()/2),
            'left': Math.ceil(container.width()/2)
        });
        this.elm.addClass('menu');

        $(container).append(this.elm);

        setTimeout(function() { me.fixPosition(); }, 10);

    },
    fixPosition: function() {
        $('.menu').css({
            'margin-top' : -Math.ceil(this.elm.height()/2),
            'margin-left' : -Math.ceil(this.elm.width()/2),
            'opacity' : '1'
        });
    },
    addOptions: function() {
        this.addOption('Text', 'text');
        this.addOption('YouTube', 'youtube');
        this.addOption('Image', 'image');
        this.addOption('Cancel', 'cancel', true);
    },
    addOption: function(text, name, isNegative) {
        var me = this;
        var oelm = $("<a></a>");
        oelm.addClass('menu-option button');
        if (isNegative) {
            oelm.addClass('negative');
        }
        else {
            oelm.addClass('positive');
        }
        oelm.addClass(name);
        oelm.html(text);
        oelm.click(function() {
            if (name !== 'cancel') {
                Events.trigger('MENU_OPTION_CLICK', name);
            }
            console.log("!");
            me.remove();
        });
        this.elm.append(oelm);
    },
    /*
    armDropZone: function() {
        //var filename = Meckers.Utils.createUUID().substr(0,5);
        //console.log(filename);
        this.dropZone = new Dropzone(this.container[0], {
            url: "/upload",
            params: {pageId: this.pageId},
            //clickable: '.menu-option.image',
            //clickable: '.upload-image-button',
            clickable: false,
            success: function(data, response) {
                console.log("upload success", data, response);
                Events.trigger("IMAGE_UPLOADED", {
                    file: data,
                    imagePath: response.path
                });
            }
        });
    },*/
    remove: function() {
        this.elm.remove();
        this.stopListen();
    },
    listen: function() {
        var me = this;
        $(window).bind('keydown', function(e) {
            if (e.which !== 91) {  // TODO: Except all non-character keys, not just cmd (91)
                Events.trigger("MENU_OPTION_CLICK", 'text');
                me.remove();
            }
        })
    },
    stopListen: function() {
        $(window).unbind('keydown');
    }
});