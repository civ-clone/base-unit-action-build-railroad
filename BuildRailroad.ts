import BuildingRailroad from './Rules/BuildingRailroad';
import DelayedAction from '@civ-clone/core-unit/DelayedAction';
import Moved from '@civ-clone/core-unit/Rules/Moved';
import MovementCost from '@civ-clone/core-unit/Rules/MovementCost';
import Railroad from '@civ-clone/base-tile-improvement-railroad/Railroad';

export class BuildRailroad extends DelayedAction {
  perform(): void {
    const [moveCost]: number[] = this.ruleRegistry()
      .process(MovementCost, this.unit(), this)
      .sort((a: number, b: number): number => b - a);

    super.perform(
      moveCost || 0,
      (): void => {
        new Railroad(this.unit().tile());
      },
      BuildingRailroad
    );

    this.ruleRegistry().process(Moved, this.unit(), this);
  }
}

export default BuildRailroad;
