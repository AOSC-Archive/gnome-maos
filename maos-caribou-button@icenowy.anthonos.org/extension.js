
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const Lang = imports.lang;

const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Panel = imports.ui.panel;

const Clutter = imports.gi.Clutter;

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

        let label = new St.Label({ text: "Caribou",
                                   y_expand: true,
                                   y_align: Clutter.ActorAlign.CENTER });
        this.actor.add_actor(label);
        this.actor.label_actor = label;

	
    },

    _onEvent: function(actor, event) {
        this.parent(actor, event);

        if (event.type() == Clutter.EventType.TOUCH_END ||
            event.type() == Clutter.EventType.BUTTON_RELEASE)
            _showHello();

        return Clutter.EVENT_PROPAGATE;
    },

    destroy: function() {

        this.parent();
    },

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
    Main.panel.addToStatusArea('caribou-toggle',button,1,'left');
}

function disable() {
//    Main.panel._rightBox.remove_child(button);
    button.destory();
}
