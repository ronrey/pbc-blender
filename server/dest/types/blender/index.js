"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
var State;
(function (State) {
    State["IDLE"] = "IDLE";
    State["RUNNING"] = "RUNNING";
    State["PAUSED"] = "PAUSED";
    State["STOPPED"] = "STOPPED";
    State["ERROR"] = "ERROR";
    State["CALIBRATING"] = "CALIBRATING";
    State["MAINTENANCE"] = "MAINTENANCE";
    State["ONLINE"] = "ONLINE";
    State["OFFLINE"] = "OFFLINE";
})(State || (exports.State = State = {}));
