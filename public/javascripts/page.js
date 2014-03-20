var Meckers = Meckers || {};

Meckers.Page = Class.extend({
    boxHandler: null,
    title: '',
    tags: [],
    init: function(id) {
        this.id = id;
        this.boxHandler = new Meckers.BoxHandler();
        this.load(id);
    },
    load: function(id) {
        var me = this;
        console.log('loading', id);
        $.get('/load/' + id, $.proxy(this.apply, this));
    },
    apply: function(data) {
        console.log("loaded", data);
        if (data.boxes && data.boxes.length > 0) {
            this.boxHandler.feed(data);
        }
    },
    save: function() {
        //var tags = ["testar", "taggar", "och", "sånt"];
        var data = {
            'page._id' : this.id,
            'page.title' : $('#page-title').val()
        };
        console.log('save', this.id, data);
        $.extend(data, this.boxHandler.getData());
        console.log('saving', data);
        $.post('/edit/createajax', data, function(data) {
            console.log("save complete", data);
        });
    }
});