import { node } from '../index';
import logger from '../winston';

export const Mutation = {
  setGramConversion: async (
    _: null,
    args: { nodeId: number; gramConversion: number }
  ) => {
    node.getScales()?.setGramConversion(args.gramConversion, args.nodeId);
    logger.info(
      `Mutation:setGramConversions ${args.nodeId} ${args.gramConversion}`
    );
    return {
      success: true,
      code: 200,
      message: `setGramConversions ${args.nodeId} ${args.gramConversion}`,
    };
  },
  setSiloGramConversion: async (
    _: null,
    args: { nodeId: number; gramConversion: number }
  ) => {
    node.getSilos()?.setGramConversion(args.gramConversion, args.nodeId);
    logger.info(
      `Mutation:setGramConversions ${args.nodeId} ${args.gramConversion}`
    );
    return {
      success: true,
      code: 200,
      message: `setGramConversions ${args.nodeId} ${args.gramConversion}`,
    };
  },
  tareAllScales: async (_: null, __: null) => {
    node.getScales()?.tareAll();
    logger.info(`Mutation:tareAllScales`);
    return {
      success: true,
      code: 200,
      message: `tared all scales`,
    };
  },
  tareAllSilos: async (_: null, __: null) => {
    node.getSilos()?.tareAll();
    logger.info(`Mutation:tareAllSilos`);
    return {
      success: true,
      code: 200,
      message: `tared all silos`,
    };
  },
  tareScale: async (_: null, args: { nodeId: number }) => {
    node.getScales()?.tare(args.nodeId);
    logger.info(`Mutation:tareScale ${args.nodeId}`);
    return {
      success: true,
      code: 200,
      message: `tared scale ${args.nodeId}`,
    };
  },
  tareSilo: async (_: null, args: { nodeId: number }) => {
    node.getSilos()?.tare(args.nodeId);
    logger.info(`Mutation:tareSilo ${args.nodeId}`);
    return {
      success: true,
      code: 200,
      message: `tared silo ${args.nodeId}`,
    };
  },
  stopAll: async (_: null, __: null) => {
    logger.info(`Mutation:stopAll`);
    await node.stop();
    return {
      success: true,
      code: 200,
      message: `stop all`,
    };
  },
  stopFeed: async (_: null, args: { nodeId: number }) => {
    await node.getFeeds()?.stop(args.nodeId);
    return {
      success: true,
      code: 200,
      message: `stop Feed ${args.nodeId}`,
    };
  },
  startFeed: async (_: null, args: { nodeId: number }) => {
    await node.getFeeds()?.start(args.nodeId);
    return {
      success: true,
      code: 200,
      message: `start Feed ${args.nodeId}`,
    };
  },
  feed: async (_: null, args: { nodeId: number; grams: number }) => {
    await node.getFeeds()?.feed(args.nodeId, args.grams);
    return {
      success: true,
      code: 200,
      // message: `feed( grams:${11}, nodeId:${2} )`,
      message: `feed( grams:${args.grams}, nodeId:${args.nodeId} )`,
    };
  },
  closeGate: async (_: null, args: { nodeId: number }) => {
    await node.getGates()?.closeGate(args.nodeId);
    return {
      success: true,
      code: 200,
      message: `close gate ${args.nodeId}`,
    };
  },
  openGate: async (_: null, args: { nodeId: number }) => {
    await node.getGates()?.openGate(args.nodeId);
    return {
      success: true,
      code: 200,
      message: `open gate ${args.nodeId}`,
    };
  },
  cycleGate: async (_: null, args: { nodeId: number }) => {
    await node.getGates()?.cycleGate(args.nodeId);
    return {
      success: true,
      code: 200,
      message: `cycle gate ${args.nodeId}`,
    };
  },
};
export default Mutation;
