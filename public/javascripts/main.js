var app = null;
var Events = new Meckers.Events();

$(function() {
    if ($('#content').length == 1) {
        app = new GridLocked();
    }
})