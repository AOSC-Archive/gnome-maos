
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

const IBusManager = imports.misc.ibusManager;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const IBusCandidatePopup = Me.imports.ibusCandidatePopup;

let _ibusManager;

let _oldCandidatePopup,_myCandidatePopup;

function init() {
    _ibusManager = IBusManager.getIBusManager();
}

function enable() {
    _oldCandidatePopup = _ibusManager._candidatePopup;
    _myCandidatePopup = new IBusCandidatePopup.CandidatePopup();
    _ibusManager._candidatePopup = _myCandidatePopup;
    _ibusManager._clear();
    _ibusManager._onConnected();
}

function disable() {
    _ibusManager._candidatePopup = _oldCandidatePopup;
    _ibusManager._clear();
    _ibusManager._onConnected();
    delete _myCandidatePopup;
}
