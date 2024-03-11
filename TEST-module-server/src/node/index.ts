import Scales, { ScalesInterface } from './scales';
import Gate, { GateInterface } from './gates';
import Feed, { FeedInterface } from './feeds';
import Silos, { SilosInterface } from './silos';
import { Status } from '../types';
export interface NodeInterface {
  init(): void;
  getScales(): ScalesInterface | null;
  getSilos(): SilosInterface | null;
  getGates(): GateInterface | null;
  getFeeds(): FeedInterface | null;
  stop(): void;
  feed(node: number, grams: number): Promise<Status>;
}
export class Node {
  _gates: GateInterface | null = null;
  _scales: ScalesInterface;
  _feeds: FeedInterface | null = null;
  _silos: SilosInterface | null = null;
  constructor() {
    this._scales = new Scales();
    this._silos = new Silos();
    this._gates = new Gate();
    this._feeds = new Feed({ scales: this._scales, gates: this._gates });
  }
  init() {
    this._scales.init();
    this._silos?.init();
  }
  getScales() {
    return this._scales;
  }
  getSilos() {
    return this._silos;
  }
  getGates() {
    return this._gates;
  }
  getFeeds() {
    return this._feeds;
  }
  stop() {
    if (this._feeds) this._feeds.stopAll();
    if (this._gates) this._gates.closeAll();
  }
  async feed(node: number, grams: number): Promise<Status> {
    if (this._feeds && this._gates && this._scales) {
      await this._feeds.feed(node, grams);
      return {
        success: true,
        code: 200,
        message: `feed( node:${node}, grams:${grams} )`,
      };
    }
    return {
      success: false,
      code: 400,
      message: `this._feeds || this._gates || this._scales missing`,
    };
  }
}

export default Node;
