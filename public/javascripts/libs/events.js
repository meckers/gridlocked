var Meckers = Meckers || {};

Meckers.Events = Class.extend({

    listeners: [],

    register: function(name, context, callback) {
        var listener = new Meckers.Listener(name, context, callback);
        this.listeners.push(listener);
    },

    trigger: function(name, data) {
        //console.log("### EVENTS - trigger ", name, data);
        $(this.listeners).each(function(i,e) {
            if (e.name === name) {
                e.callback.apply(e.context, [data]);
            }
        });
    }
});

Meckers.Listener = Class.extend({

    name: null,
    callback: null,
    context: null,

    init: function(name, context, callback) {
        this.name = name;
        this.callback = callback;
        this.context = context;
    }
});