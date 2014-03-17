GridLocked = Class.extend({
    currentSelection : null,
    boxes: [],
    init: function() {
        this.mouseSelection = new Meckers.MouseSelection({ gridSize: 10});
        this.boxHandler = new Meckers.BoxHandler();
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
        })
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