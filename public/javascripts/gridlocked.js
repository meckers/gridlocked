GridLocked = Class.extend({
    currentSelection : null,
    pageId : null,
    init: function() {
        this.mouseSelection = new Meckers.MouseSelection({gridSize: 10});
        this.boxHandler = new Meckers.BoxHandler();
        this.pageId = $("#page-id").val();
        console.log(this.pageId);
        this.load();
        this.listen();
    },
    load: function() {
        console.log('loading', this.pageId);
        $.get('/load/' + this.pageId, function(data) {
            console.log("loaded", data);
        });
    },
    listen: function() {
        var me = this;
        Events.register("BOX_DRAW_END", this, function(mouseSelection) {
            me.onSelection(mouseSelection);
        });
        Events.register("MENU_OPTION_CLICK", this, function(option) {
            Events.trigger("MAKE_BOX", {
                type: option,
                selection: me.selection
            });
            this.mouseSelection.remove();
            this.mouseSelection = new Meckers.MouseSelection({ gridSize: 10});
        });
        $('#save-page-button').click(function() {
            me.savePage();
        });
    },
    onSelection: function(mouseSelection) {
        this.currentSelection = mouseSelection;
        this.selection = new Meckers.Selection({
            dimensions: mouseSelection.getValues(),
            source: mouseSelection.getBox()
        });
        console.log('selection', this.selection);
        //create + append add indicator
        //arm drag & dropping
    },

    savePage: function() {
        console.log("saving...");
        var tags = ["testar", "taggar", "och", "sånt"];
        /*
        var data = {
            'page._id': '1234',
            'page.title': 'En sida',
            'page.boxes[0].type': 'youtube',
            'page.boxes[0].data': 'hej',
            'page.boxes[0].width': '320',
            'page.boxes[1].type': 'text',
            'page.boxes[1].data': 'du',
            'page.boxes[1].width': '640'
        };*/
        var data = {
            'page._id' : this.pageId,
            'page.title' : $('#page-title').val()
        }
        $.extend(data, this.boxHandler.getData());
        console.log(data);

        $.post('/edit/createajax', data, function(data) {
            console.log("save complete", data);
        });
    }

});