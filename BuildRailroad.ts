import BuildingRailroad from './Rules/BuildingRailroad';
import DelayedAction from '@civ-clone/core-unit/DelayedAction';
import Moved from '@civ-clone/core-unit/Rules/Moved';
import MovementCost from '@civ-clone/core-unit/Rules/MovementCost';
import Railroad from '@civ-clone/base-tile-improvement-railroad/Railroad';
import Unit from '@civ-clone/core-unit/Unit';
import registerDelayedAction from '@civ-clone/core-unit/registerDelayedAction';

export const COMPLETE = 'base-unit-action-build-railroad:complete';

export class BuildRailroad extends DelayedAction {
  perform(): void {
    const [moveCost]: number[] = this.ruleRegistry()
      .process(MovementCost, this.unit(), this)
      .sort((a: number, b: number): number => b - a);

    super.perform(moveCost || 0, COMPLETE, BuildingRailroad);

    this.ruleRegistry().process(Moved, this.unit(), this);
  }
}

// Registered here rather than passed to `perform` as a closure: a closure
// cannot be written to a file, which is why a unit part-way through this could
// not be saved. The save records the identifier; the behaviour stays here.
registerDelayedAction({
  BusyRule: BuildingRailroad,
  handler: COMPLETE,
  action: (unit: Unit) => new BuildRailroad(unit.tile(), unit.tile(), unit),
  complete: (unit: Unit) => {
    new Railroad(unit.tile());
  },
});

export default BuildRailroad;
