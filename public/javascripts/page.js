var Meckers = Meckers || {};

Meckers.Page = Class.extend({
    boxHandler: null,
    rev: '',
    title: '',
    tags: [],
    init: function(id) {
        this.id = id;
        this.boxHandler = new Meckers.BoxHandler();
        this.listen();
        this.load(id);
        this.sizeContent();
    },
    listen: function() {
        var me = this;
        // Prevent mouse selection on meta strip
        $('#meta-strip').bind('mousedown', function(e) {
            e.stopPropagation();
        });

        $(window).bind('resize', function(e) {
            me.sizeContent();
        });
    },
    sizeContent: function() {
        console.log("resizing");
        var height = $(window).height() - $('#meta-strip').height() + 'px';
        console.log(height);
        $("#content").css({
            'height': height
        });
    },
    load: function(id) {
        var me = this;
        $.get('/load/' + id, $.proxy(this.apply, this));
    },
    apply: function(data) {
        this._rev = data._rev;
        if (data.title) {
            $('#page-title').val(data.title);
        }
        if (data.boxes && data.boxes.length > 0) {
            this.boxHandler.feed(data);
        }
        console.log("loaded", data);
    },
    save: function() {
        //var tags = ["testar", "taggar", "och", "sånt"];
        var data = {
            'page._id' : this.id,
            'page._rev' : this._rev,
            'page.title' : $('#page-title').val()
        };
        $.extend(data, this.boxHandler.getData());
        console.log('saving', data);
        $.post('/edit/createajax', data, function(data) {
            console.log("save complete", data);
        });
    }
});