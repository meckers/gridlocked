var Meckers = Meckers || {};

Meckers.YoutubeSuggestions = {

    getSuggestions: function(width) {
        this.width = width;
        var $suggestionArea = $('<div></div>');
        $suggestionArea.addClass('suggestion-area');

        //TODO: search youtube via title and/or tags.

        for(var i=0; i<3; i++) {
            var $suggestionElm = this.createSuggestion();
            $suggestionArea.append($suggestionElm);
        }
        //return $suggestionArea;
        return $('<div></div>');    // Väntar med suggestions tills jag har gjort viktigare saker.
    },

    createSuggestion: function() {
        var $suggestion = $('<div></div>').addClass('suggestion');
        $suggestion.css({
            'width': (Math.floor(this.width/3)-2-2) + 'px'
        });
        $suggestion.html('suggestion');
        return $suggestion;
    }

}