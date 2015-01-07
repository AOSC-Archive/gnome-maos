
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

function init() {
    Main.layoutManager.connect('startup-complete',function(){
        Main.overview.toggle();
    });
}

function enable() {
}

function disable() {
}
