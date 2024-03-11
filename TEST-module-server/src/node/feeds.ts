//import { Gpio } from 'onoff';
import logger from '../winston';
import { feedPins } from '../constants/pins';
import { ScalesInterface } from './scales';
import { GateInterface } from './gates';
import { Status } from '../types';
import { sleep } from '../utils';
const LOOP_DELAY = 500;
export interface FeedInterface {
  feed(node: number, grams: number): Promise<Status>;
  stop(node: number): Promise<Status>;
  start(node: number): Promise<Status>;
  stopAll(): Promise<Status>;
}
interface props {
  scales: ScalesInterface;
  gates: GateInterface;
}
export class Feeds {
  // private _feeds: Gpio[] = [];
  private _scales: ScalesInterface;
  private _gates: GateInterface;
  private _stopFeed: boolean[] = [false, false, false];
  constructor(props: props) {
    this._scales = props.scales;
    this._gates = props.gates;
    //   this._feeds = feedPins.map((pinNumber) => new Gpio(pinNumber, 'out'));
    feedPins.forEach((pin, i) => {
      //    this._feeds.push(new Gpio(pin, 'out'));
    });
    logger.info(`Feeds.constructor(), server: ${process.env.SERVER_NAME}`);
  }
  public async stop(node: number): Promise<Status> {
    logger.info(`Feeds.stop(${node}), server: ${process.env.SERVER_NAME}`);
    this._stopFeed[node] = true;
    //   await this._feeds[node].write(0);
    return {
      success: true,
      code: 200,
      message: `stopped`,
    };
  }
  public async stopAll(): Promise<Status> {
    //  this._feeds.forEach(async (feed, i) => await this.stop(i));
    return {
      success: true,
      code: 200,
      message: `stopped, server: ${process.env.SERVER_NAME}`,
    };
  }
  public async start(node: number): Promise<Status> {
    logger.info(`Feeds.start(${node}), server: ${process.env.SERVER_NAME}`);
    //  logger.info(`Feeds.start(${node}), node:${this._feeds[node]}`);
    this._stopFeed[node] = false;
    //   await this._feeds[node].write(1);
    logger.info(`Feeds.start(${node}), server: ${process.env.SERVER_NAME}`);
    return {
      success: true,
      code: 200,
      message: `stopped`,
    };
  }

  public async feed(node: number, grams: number): Promise<Status> {
    try {
      debugger;
      logger.info(
        `Feeds.feed(${node}, ${grams}), server: ${process.env.SERVER_NAME}`
      );
      this._stopFeed[node] = true;
      let full = false;
      let isFull = false;
      await this.start(node);
      while (!this._stopFeed[node] && !full) {
        const currentWeight = await this._scales?.grams(node);
        const baseline = await this._scales?.baseline(node);
        logger.debug(
          `Current weight for nodeId ${node}: ${currentWeight} grams, server: ${process.env.SERVER_NAME}`
        );
        isFull = currentWeight ? currentWeight >= grams : false;
        if (isFull) {
          logger.info(
            `Target weight reached for nodeId ${node}. Initiating stop operation.`
          );
          logger.info(
            `baseline: ${baseline}, grams: ${currentWeight}, target: ${grams} , server: ${process.env.SERVER_NAME}`
          );
          await this.stop(node);
          await this._gates.cycleGate(node);
          return {
            success: true,
            code: 200,
            message: `feed( gms:${currentWeight} ), server: ${process.env.SERVER_NAME}`,
          };
        }
        await sleep(LOOP_DELAY); // Introducing a delay of LOOP_DELAY milliseconds
      }
      return {
        success: false,
        code: 400,
        message: `stop was called.`,
      };
    } catch (error: any) {
      // Log the error and return a failure status
      this.stop(node);
      logger.error(
        `Error during feed operation for nodeId ${node}: ${error.message}`
      );
      return {
        code: 400,
        success: false,
        message: `Feeding operation failed: ${error.message}`,
      };
    }
  }
}
export default Feeds;
