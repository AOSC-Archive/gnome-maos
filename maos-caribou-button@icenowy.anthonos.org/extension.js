
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Panel = imports.ui.panel;


let text, button;

function _hideHello() {
    Main.uiGroup.remove_actor(text);
    text = null;
}

function _showHello() {
    if (!text) {
        text = new St.Label({ style_class: 'helloworld-label', text: "Hello, world!" });
        Main.uiGroup.add_actor(text);
    }

    text.opacity = 255;

    let monitor = Main.layoutManager.primaryMonitor;

    text.set_position(monitor.x + Math.floor(monitor.width / 2 - text.width / 2),
                      monitor.y + Math.floor(monitor.height / 2 - text.height / 2));

    Tweener.addTween(text,
                     { opacity: 0,
                       time: 2,
                       transition: 'easeOutQuad',
                       onComplete: _hideHello });
}

const CaribouButton = new Lang.Class({
    Name: 'CaribouButton.CaribouButton',
    Extends: PanelMenu.Button,

    _init: function() {
        this.parent(0.0, "Caribou");

        let hbox = new St.BoxLayout({ style_class: 'panel-status-menu-box' });
        let label = new St.Label({ text: "Caribou",
                                   y_expand: true,
                                   y_align: Clutter.ActorAlign.CENTER });
        hbox.add_child(label);
        this.actor.add_actor(hbox);

	    this._create(id);
	}
    },

    destroy: function() {

        this.parent();
    },

    _redisplay: function(id) {
	this._sections[id].removeAll();
        this._create(id);
    },

    _create: function(id) {
    }
});

function init() {
}

function enable() {
/*
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let icon = new St.Icon({ icon_name: 'system-run-symbolic',
                             style_class: 'system-status-icon' });

    button.set_child(icon);
    button.connect('button-press-event', _showHello);
*/
    button = new CaribouButton;
   
//    Main.panel._rightBox.insert_child_at_index(button, 0);
    Main.panel.addToStatusArea('caribou-toggle',button,1,left);
}

function disable() {
//    Main.panel._rightBox.remove_child(button);
    button.destory();
}
