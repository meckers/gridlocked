var Meckers = Meckers || {};

Meckers.Tutorial = Class.extend({

    messages: [],

    init: function() {
        this.listen();
    },
    listen: function() {
        Events.register('TUTORIAL', this, function(message) {
            this.showTutorial(message);
        });
    },
    showTutorial: function(message) {
        console.log("showing tutorial", message, (getCookie('mixpintut') !== 'noshow'), getCookie('mixpintut_'+message.id) !== 'noshow', this.messages);
        if (/*!this.findMessage(message.id) &&*/getCookie('mixpintut') !== 'noshow' && getCookie('mixpintut_'+message.id) !== 'noshow') {
            //this.messages.push(message);
            console.log("showing");
            this.showMessage(message);
        }
    },
    showMessage: function(message) {
        var me = this;
        //if (this.$elm === undefined) {
            this.$elm = this.createElement(message);
            $('body').append(this.$elm);
            this.$elm.find('.button.ok').click(function() {
                setCookie("mixpintut_" + message.id, "noshow", 1);
                me.hide();
            });
            this.$elm.find('.button.off').click(function() {
                setCookie("mixpintut", "noshow", 1);
                me.hide();
            });
        //}
        this.$elm.css('margin-top', -Math.ceil(this.$elm.height()/2) + 'px');
        this.$elm.removeClass('hidden');
    },
    hide: function() {
        //this.$elm.addClass('hidden');
        this.$elm.remove();
    },
    createElement: function(message) {
        var elm = Meckers.DOM.Tutorial.getElm(message.header, message.text);
        return elm;
    }/*,
    findMessage: function(id) {
        console.log("finding", id);
        for (var i=0; i<this.messages.length; i++) {
            if (this.messages[i].id = id) {
                console.log("found", id);
                return true;
            }
        }
        console.log("didn't find", id);
        return false;
    }  */
})