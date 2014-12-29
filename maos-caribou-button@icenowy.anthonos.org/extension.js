
const St = imports.gi.St;
const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const Lang = imports.lang;

const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Panel = imports.ui.panel;

const Clutter = imports.gi.Clutter;

let text, button;

const CaribouIface = '<node> \
  <interface name="org.gnome.Caribou.Keyboard"> \
    <method name="Show"> \
      <arg type="u" name="arg_0" direction="in"> </arg> \
    </method> \
    <method name="Hide"> \
      <arg type="u" name="arg_0" direction="in"> </arg> \
    </method> \
  </interface> \
</node>';

const CaribouInfo  = Gio.DBusInterfaceInfo.new_for_xml(CaribouIface);

function Caribou() {
    return new Gio.DBusProxy({ g_connection: Gio.DBus.session,
                               g_interface_name: CaribouInfo.name,
                               g_interface_info: CaribouInfo,
                               g_name: 'org.gnome.Caribou.Keyboard',
                               g_object_path: '/org/gnome/Caribou/Keyboard' });
}

let _caribou;

function _toggleCaribou() {
    _caribou.ShowRemote(0);
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
            _toggleCaribou();

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
    _caribou = new Caribou();
    _caribou.init_async(GLib.PRIORITY_DEFAULT, null, Lang.bind(this, function(object, result) {
            try {
                this._dbusProxy.init_finish(result);
            } catch(e) {
                log('Error loading calendars: ' + e.message);
                return;
            }
    }));
}

function disable() {
//    Main.panel._rightBox.remove_child(button);
    button.destory();
}
