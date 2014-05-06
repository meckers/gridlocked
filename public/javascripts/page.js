var Meckers = Meckers || {};

Meckers.Page = Class.extend({
    boxHandler: null,
    _rev: '',
    title: '',
    tags: [],
    init: function(id) {
        this.id = id;
        this.boxHandler = new Meckers.BoxHandler();
        this.listen();
        this.load(id);
        this.sizeContent();
        this.metaStrip = new Meckers.MetaStrip({
            pageId : this.id
        });
    },
    listen: function() {
        var me = this;
        $(window).bind('resize', function(e) {
            me.sizeContent();
        });
        Events.register('SAVE_BUTTON_CLICK', this, function() {
            me.save();
        })
    },
    sizeContent: function() {
        var height = $(window).height() - $('#meta-strip').height() + 'px';
        console.log("resizing", height);
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
            $('title').html(Meckers.gridLocked.titlePrefix + data.title);
            this.title = data.title;
        }
        if (data.boxes && data.boxes.length > 0) {
            this.boxHandler.feed(data);
        }
        /*  Todo: implement whenever.
        if (this.title) {
            this.updateUrl();
        } */
    },
    updateUrl: function() {
        var stateObj = {foo:"bar"};
        history.pushState(stateObj, "title", this.id + '/' + this.title);
    },
    save: function() {
        //var tags = ["testar", "taggar", "och", "sånt"];
        var me = this;
        var data = {
            'page._id' : this.id,
            'page._rev' : this._rev,
            'page.title' : $('#page-title').val()
        };
        $.extend(data, this.boxHandler.getData());
        console.log('saving', data);

        $.post('/edit/createajax', data, function(result) {
            console.log("save complete", result);
            me.apply({ _rev: result.revision });
            Events.trigger("SAVE_END");
        });
    }
});