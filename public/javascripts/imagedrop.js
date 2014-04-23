var Meckers = Meckers || {};

Meckers.ImageDrop = Class.extend({
    init: function(options) {
        this.container = options.container;
        this.pageId = options.pageId;
        this.ondone = options.ondone;
        this.clickable = options.clickable;
        if (this.container && this.pageId) {
            this.initDropZone();
        }
        else {
            console.error("Not enough options for ImageDrop!", options);
        }
    },
    initDropZone: function() {
        this.dropZone = new Dropzone(this.container, {
            url: "/upload",
            params: {pageId: this.pageId},
            clickable: this.clickable,
            success: $.proxy(this.success, this)
        });
    },
    success: function(data, response) {
        console.log("upload success", data, response);
        Events.trigger("IMAGE_UPLOADED", {
            file: data,
            imagePath: response.path
        });
        if (this.ondone) {
            this.ondone(response);
        }
    },
    remove: function() {
        this.container.remove();
    }
});