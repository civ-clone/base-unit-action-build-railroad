"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildRailroad = void 0;
const Moved_1 = require("@civ-clone/core-unit/Rules/Moved");
const MovementCost_1 = require("@civ-clone/core-unit/Rules/MovementCost");
const BuildingRailroad_1 = require("./Rules/BuildingRailroad");
const DelayedAction_1 = require("@civ-clone/core-unit/DelayedAction");
const Railroad_1 = require("@civ-clone/base-tile-improvement-railroad/Railroad");
class BuildRailroad extends DelayedAction_1.default {
    perform() {
        const [moveCost] = this.ruleRegistry()
            .process(MovementCost_1.MovementCost, this.unit(), this)
            .sort((a, b) => b - a);
        super.perform(moveCost || 0, () => {
            new Railroad_1.default(this.unit().tile());
        }, BuildingRailroad_1.default);
        this.ruleRegistry().process(Moved_1.Moved, this.unit(), this);
    }
}
exports.BuildRailroad = BuildRailroad;
exports.default = BuildRailroad;
//# sourceMappingURL=BuildRailroad.js.map