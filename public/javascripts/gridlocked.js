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
        Events.register("MOUSE_SELECTION_COMPLETE", this, function(selection) {
            me.onSelection(selection);
        })
    },
    onSelection: function(selection) {
        this.currentSelection = selection;
        //create + append add indicator
        //prepare menu
        this.addMenu();
        //arm drag & dropping
        //listen for a keystroke (ordinary char / ctrl-v)
        this.listenForKeystroke();
    },
    // TODO: this listener should not be handled by GridLocked, but rather some class like "Selection".
    listenForKeystroke: function() {
        var me = this;
        $(window).bind('keydown', function() {
            me.makeTextBox();
        })
    },
    // TODO: menu should not be owned by GridLocked, but rather some class like "Selection".
    addMenu: function() {
        var me = this;
        this.menu = new Meckers.Menu({
            container: this.mouseSelection.getBox()
        });
        this.menu.addOption('YouTube', function() {
            console.log("youtube clicked");
            me.makeYouTubeBox();
        })
    },
    makeTextBox: function() {
        var options = {
            dimensions: this.currentSelection.getValues()
        };
        var textBox = new Meckers.TextBox(options);
        this.boxHandler.addBox(textBox);
        $(window).unbind('keydown');
        this.mouseSelection.getBox().remove();
    },
    makeYouTubeBox: function() {
        var options = {
            dimensions: this.currentSelection.getValues()
        };
        var ytBox = new Meckers.YouTubeBox(options);
        this.boxHandler.addBox(ytBox);
        this.mouseSelection.getBox().remove();
    }
});