var Meckers = Meckers || {}

Meckers.ModalDialog = Class.extend({
    init: function(options) {
        this.$container = options.container || $('body');
        this.contentHtml = _.tmpl(options.contentTemplate);
    },
    render: function() {
        this.createOwnElement();
        this.show();
        this.addContent();
        this.positionAndSize();
        this.listen();
    },
    listen: function() {
        var me = this;
        //not working
        $("#modal-dialog-shroud").click(function() {
            console.log("click on shroud");
            me.remove();
        });
    },
    createOwnElement: function() {
        this.html = _.tmpl("#modal-dialog");
    },

    show: function() {
        this.$container.append(this.html);
    },

    addContent: function() {
        $('#modal-dialog-content').append(this.contentHtml);
    },

    positionAndSize: function() {
        $('#modal-dialog-content').css({
            'margin-left': -($('#modal-dialog-content').width() / 2) + 'px',
            'margin-top': -($('#modal-dialog-content').height() / 2) + 'px'
        });
    },

    remove: function() {
        $("#modal-dialog-container").remove();
    },
    getInfo: function() {
        return {};
    },
    publishData: function() {
        Events.trigger('MODAL_DATA_REPORT', this.getInfo());
    }
});