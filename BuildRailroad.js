"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildRailroad = exports.COMPLETE = void 0;
const BuildingRailroad_1 = require("./Rules/BuildingRailroad");
const DelayedAction_1 = require("@civ-clone/core-unit/DelayedAction");
const Moved_1 = require("@civ-clone/core-unit/Rules/Moved");
const MovementCost_1 = require("@civ-clone/core-unit/Rules/MovementCost");
const Railroad_1 = require("@civ-clone/base-tile-improvement-railroad/Railroad");
const registerDelayedAction_1 = require("@civ-clone/core-unit/registerDelayedAction");
exports.COMPLETE = 'base-unit-action-build-railroad:complete';
class BuildRailroad extends DelayedAction_1.default {
    perform() {
        const [moveCost] = this.ruleRegistry()
            .process(MovementCost_1.default, this.unit(), this)
            .sort((a, b) => b - a);
        super.perform(moveCost || 0, exports.COMPLETE, BuildingRailroad_1.default);
        this.ruleRegistry().process(Moved_1.default, this.unit(), this);
    }
}
exports.BuildRailroad = BuildRailroad;
// Registered here rather than passed to `perform` as a closure: a closure
// cannot be written to a file, which is why a unit part-way through this could
// not be saved. The save records the identifier; the behaviour stays here.
(0, registerDelayedAction_1.default)({
    BusyRule: BuildingRailroad_1.default,
    handler: exports.COMPLETE,
    action: (unit) => new BuildRailroad(unit.tile(), unit.tile(), unit),
    complete: (unit) => {
        new Railroad_1.default(unit.tile());
    },
});
exports.default = BuildRailroad;
//# sourceMappingURL=BuildRailroad.js.map