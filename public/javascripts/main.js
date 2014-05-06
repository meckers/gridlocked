var Meckers = Meckers || {};

Meckers.gridLocked = null;
var Events = new Meckers.Events();

$(function() {
    if ($('#content').length == 1) {
        Meckers.gridLocked = new GridLocked();
    }
})