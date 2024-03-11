//import { Gpio } from 'onoff';
import { gatePins } from '../constants/pins';
import { pause, sleep } from '../utils';
import logger from '../winston';
export interface GateInterface {
  cycleGate(index: number): Promise<void>;
  openGate(index: number): Promise<void>;
  closeGate(index: number): Promise<void>;
  closeAll(): Promise<void>;
}
export class Gates {
  // private _gates: Gpio[] = [];
  constructor() {
    //  this._gates = gatePins.map((pinNumber) => new Gpio(pinNumber, 'out'));
    gatePins.forEach((pin, i) => {
      //    this._gates.push(new Gpio(pin, 'out'));
    });
    logger.info(`Gates.constructor()`);
  }
  public async cycleGate(index: number) {
    debugger;
    //  await this._gates[index].write(1);
    await sleep(500);
    //   await this._gates[index].write(0);
    logger.info(
      `Gates.cycleGate(${index}), server: ${process.env.SERVER_NAME}`
    );
  }
  public async openGate(index: number) {
    logger.info(`Gates.openGate(${index})`);
    //   await this._gates[index].write(1);
  }
  public async closeGate(index: number) {
    logger.info(`Gates.closeGate(${index})`);
    //   await this._gates[index].write(0);
  }
  public async closeAll() {
    //  this._gates.forEach(async (gate, i) => await this.closeGate(i));
  }
}
export default Gates;
