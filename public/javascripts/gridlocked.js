GridLocked = Class.extend({
    currentSelection : null,
    page: null,
    init: function() {
        this.drawableArea = $('#content');
        this.mouseSelection = new Meckers.MouseSelection({gridSize: 10});
        this.page = new Meckers.Page($("#page-id").val());
        this.listen();
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
            me.page.save();
        });
    },
    onSelection: function(mouseSelection) {
        this.currentSelection = mouseSelection;
        this.selection = new Meckers.Selection({
            dimensions: mouseSelection.getValues(),
            source: mouseSelection.getBox()
        });
        //create + append add indicator
        //arm drag & dropping
    }
});