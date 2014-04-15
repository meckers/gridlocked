Meckers.Menu = Class.extend({
    width: 100,
    height: 20,
    pageId: null,
    init: function(options) {
        this.container = options.container;
        this.pageId = options.pageId;
        this.create(this.container);
        this.addOptions();
        this.armDropZone();
        this.listen();
    },
    create: function(container) {
        this.elm = $("<div></div>");
        this.elm.css({
            'top': Math.ceil(container.height()/2) - (this.height + 20)/2,
            'left': Math.ceil(container.width()/2) - (this.width + 20)/2
        });
        this.elm.addClass('menu');
        $(container).append(this.elm);
    },
    addOptions: function() {
        this.addOption('Text', 'text');
        this.addOption('YouTube', 'youtube');
        this.addOption('Image', 'image');
    },
    addOption: function(text, name) {
        var me = this;
        var oelm = $("<a></a>");
        oelm.addClass('menu-option');
        oelm.addClass(name);
        oelm.html(text);
        oelm.click(function() {
            Events.trigger('MENU_OPTION_CLICK', name);
            me.remove();
        });
        this.elm.append(oelm);
    },
    armDropZone: function() {
        var filename = Meckers.Utils.createUUID().substr(0,5);
        console.log(filename);
        this.dropZone = new Dropzone(this.container[0], {
            url: "/upload",
            params: {pageId: this.pageId},
            //clickable: '.menu-option.image',
            success: function(data, response) {
                console.log("upload success", data, response);
                Events.trigger("IMAGE_UPLOADED", {
                    file: data,
                    imagePath: response.path
                });
            }
        });
    },
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