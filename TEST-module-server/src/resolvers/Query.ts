import { AuthenticationError } from 'apollo-server-express';
import logger from '../winston';
import { node } from '../index';
export const Query = {
  getGramConversion: async (_: null, args: { nodeId: number }) => {
    return node.getScales()?.getGramConversion(args.nodeId);
  },
  getSiloGramConversion: async (_: null, args: { nodeId: number }) => {
    return node.getSilos()?.getGramConversion(args.nodeId);
  },
  getAllScaleGrams: async (_: null, __: null) => {
    //   console.log(`getFeedVibration - nodeId ${nodeId}`);
    //return getNode(nodeId).getFeed().getVibration();
    return [1, 2, 3];
  },
  getAllSiloGrams: async (_: null, __: null) => {
    //   console.log(`getFeedVibration - nodeId ${nodeId}`);
    //return getNode(nodeId).getFeed().getVibration();
    return [1, 2, 3];
  },
  getScaleGrams: async (_: null, args: { nodeId: number }) => {
    const reading = await node.getScales()?.grams(args.nodeId);
    if (reading) {
      return reading;
    }

    return 0;
  },
  getSiloGrams: async (_: null, args: { nodeId: number }) => {
    const reading = await node.getSilos()?.grams(args.nodeId);
    if (reading) {
      return reading;
    }

    return 0;
  },
  getScaleBaseline: async (_: null, args: { nodeId: number }) => {
    const baseline = await node.getScales()?.baseline(args.nodeId);
    if (baseline) {
      return baseline;
    }
    return 0;
  },
  getSiloBaseline: async (_: null, args: { nodeId: number }) => {
    const reading = await node.getSilos()?.baseline(args.nodeId);
    if (reading) {
      return reading;
    }

    return 0;
  },
  getAllScaleReadings: async (_: null, __: null) => {
    const readings = await node.getScales()?.readAll();
    if (readings) {
      return readings;
    }
    return [];
  },
  getAllSiloReadings: async (_: null, __: null) => {
    const readings = await node.getSilos()?.readAll();
    if (readings) {
      return readings;
    }
    return [];
  },
  getScaleReading: async (_: null, args: { nodeId: number }) => {
    const reading = await node.getScales()?.read(args.nodeId);
    if (reading) {
      return reading;
    }

    return 0;
  },
  getSiloReading: async (_: null, args: { nodeId: number }) => {
    const reading = await node.getSilos()?.read(args.nodeId);
    if (reading) {
      return reading;
    }

    return 0;
  },
};
export default Query;
