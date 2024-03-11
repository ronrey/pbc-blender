import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar DateTime

  type Scale {
    ozs: Float
    raw: Float
  }

  type Status {
    success: Boolean
    code: String
    message: String
  }

  type Query {
    getAllScaleReadings: [Float]
    getScaleReading(nodeId: Int): Float
    getAllScaleGrams: [Float]
    getScaleGrams(nodeId: Int): Float
    getGramConversion(nodeId: Int): Float
    getSiloGramConversion(nodeId: Int): Float
    getAllSiloReadings: [Float]
    getSiloReading(nodeId: Int): Float
    getAllSiloGrams: [Float]
    getSiloGrams(nodeId: Int): Float

    getScaleBaseline(nodeId: Int): Float
    getSiloBaseline(nodeId: Int): Float
  }
  type Mutation {
    stopFeed(nodeId: Int): Status
    startFeed(nodeId: Int): Status
    stopAll: Status
    feed(nodeId: Int, grams: Float): Status
    tareAllScales: Status
    tareScale(nodeId: Int): Status
    tareAllSilos: Status
    tareSilo(nodeId: Int): Status
    openGate(nodeId: Int): Status
    closeGate(nodeId: Int): Status
    cycleGate(nodeId: Int): Status
    setGramConversion(nodeId: Int, gramConversion: Float): Status
    setSiloGramConversion(nodeId: Int, gramConversion: Float): Status
  }
`;

export default typeDefs;
