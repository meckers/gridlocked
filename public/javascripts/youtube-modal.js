var Meckers = Meckers || {};

Meckers.YouTubeModal = Meckers.ModalDialog.extend({
    listen: function() {
        var me = this;
        $("#youtube-submit").click(function() {
            me.publishData();
            me.remove();
        });
    },
    getInfo: function() {
        return {
            url: $("#youtube-url").val()
        }
    },
    publishData: function() {
        Events.trigger('YOUTUBE_DATA_REPORT', this.getInfo());
    }
});