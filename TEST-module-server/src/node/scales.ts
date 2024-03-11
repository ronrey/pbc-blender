import { request, gql } from 'graphql-request';
import logger from '../winston';
import SERVER_URL from '../constants/apollo';
import { Status } from '../types';
import { GRAM_CONVERSIONS } from '../constants';
import { get } from 'lodash';
type ResponseType = {
  readAll: number[];
};
const endpoint = SERVER_URL.URI_SCALES;

export interface ScalesInterface {
  readAll(): number[];
  read(nodeId: number): number;
  gramsAll(): number[];
  grams(nodeId: number): number;
  baseline(nodeId: number): number;
  tareAll(): Promise<Status>;
  tare(nodeId: number): Promise<Status>;
  init(): void;
  getGramConversion(nodeId: number): number;
  setGramConversion(gramConversion: number, nodeId: number): void;
}
const READ_ALL = gql`
  query readAll {
    readAll
  }
`;
export class Scales {
  private readings = [0, 0, 0];
  private baselineConversion = [0, 0, 0];
  private baselineGramsConversion = [
    // @ts-ignore
    parseFloat(process.env.SCALE_BASELINE_GRAMS_1),
    // @ts-ignore
    parseFloat(process.env.SCALE_BASELINE_GRAMS_2),
    // @ts-ignore
    parseFloat(process.env.SCALE_BASELINE_GRAMS_3),
  ];

  private tares = [0, 0, 0];
  private gramConversions = [0, 0, 0];
  constructor() {
    this.gramConversions = GRAM_CONVERSIONS;
    process.on('SIGINT', () => {
      logger.info('\nGracefully shutting down from SIGINT (Ctrl+C)');
      process.exit();
    });
  }
  public setGramConversion(gramConversion: number, nodeId: number) {
    this.gramConversions[nodeId] = gramConversion;
  }
  public getGramConversion(nodeId: number) {
    return this.gramConversions[nodeId];
  }
  public async init(): Promise<void> {
    logger.info(`Silos.init()`);
    const readInterval = 1000;
    setInterval(async () => {
      await this.getReadings();
    }, readInterval);
    await this.tareAll();
    await this.calcBaselines();
  }
  private async calcBaselines() {
    const readings = await this.getReadings();
    logger.info(`calcBaselines: ${readings}`);
    readings.map((reading, i) => {
      logger.info(`reading: ${reading}`);
      this.baselineConversion[i] = 100000 / reading;
    });
  }
  public async getReadings(): Promise<number[]> {
    // const result: ResponseType = await request(endpoint, READ_ALL);
    //  this.readings = result.readAll;
    //logger.info(`getReadings: ${this.readings[1]}, grams: ${this.grams(1)}`);
    return this.readings;
  }
  public readAll(): number[] {
    return this.readings;
  }
  public read(nodeId: number): number {
    return this.readings[nodeId];
  }
  public getScaleReading(index: number) {
    return this.readings[index];
  }
  public gramsAll() {
    return this.tared().map((reading, i) => {
      return Math.round(reading * this.gramConversions[i] * 100) / 100;
    });
  }
  private tared(): number[] {
    return this.readings.map((reading, i) => {
      return reading - this.tares[i];
    });
  }
  public grams(nodeId: number) {
    // const tared = this.tared();
    // const grams =
    //   Math.round(
    //     this.baseline(nodeId) * this.baselineGramsConversion[nodeId] * 10000
    //   ) / 10000;
    return 100;
  }
  public baseline(nodeId: number) {
    // this.readings[nodeId];
    // const value = this.readings[nodeId] - this.tares[nodeId];
    // const baseline = value * this.baselineConversion[nodeId];
    return 100;
  }
  public async tareAll(): Promise<Status> {
    this.tares = await this.getReadings();
    return {
      success: true,
      code: 200,
      message: `tared`,
    };
  }
  public async tare(nodeId: number): Promise<Status> {
    this.tares[nodeId] = this.readings[nodeId];
    return {
      success: true,
      code: 200,
      message: `tared`,
    };
  }
}
export default Scales;
