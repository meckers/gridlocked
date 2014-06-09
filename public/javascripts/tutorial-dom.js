var Meckers = Meckers || {};
Meckers.DOM = Meckers.DOM || {};

Meckers.DOM.Tutorial = {
    elm: "<div class='tutorial hidden'>" +
            "<div class='tutorial-header'></div>" +
            "<div class='tutorial-text'></div>" +
            "<div class='tutorial-controls'>" +
                "<div class='ok button positive'>OK, I've got it!</div>" +
                "<div class='off button negative'>No more of these texts!</div>" +
            "</div>" +
        "</div>",

    getElm: function(header, text) {
        if (!this.$elm) {
            this.$elm = $(this.elm);
        }
        this.$elm.find('.tutorial-header').html(header);
        this.$elm.find('.tutorial-text').html(text);
        return this.$elm;
    }
}