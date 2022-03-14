import { Moved, IMovedRegistry } from '@civ-clone/core-unit/Rules/Moved';
import {
  MovementCost,
  IMovementCostRegistry,
} from '@civ-clone/core-unit/Rules/MovementCost';
import DelayedAction from '@civ-clone/core-unit/DelayedAction';
import Railroad from '@civ-clone/base-tile-improvement-railroad/Railroad';

export class BuildRailroad extends DelayedAction {
  perform(): void {
    const [
      moveCost,
    ]: number[] = (this.ruleRegistry() as IMovementCostRegistry)
      .process(MovementCost, this.unit(), this)
      .sort((a: number, b: number): number => b - a);

    super.perform(moveCost || 0, (): void => {
      new Railroad(this.unit().tile());
    });

    (this.ruleRegistry() as IMovedRegistry).process(Moved, this.unit(), this);
  }
}

export default BuildRailroad;
