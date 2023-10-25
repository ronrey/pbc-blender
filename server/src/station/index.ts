import { LargeNumberLike } from "crypto";

import { request, gql } from "graphql-request";
import SERVER_URL from "../constants/apollo";
const endpoint = SERVER_URL.SERVER_URL;

const GET_OZS = gql`
  query getOzs($nodeId: Int) {
    getOzs(nodeId: $nodeId)
  }
`;

const STEPPER_POSITION = gql`
  query stepperPosition($nodeId: Int) {
    stepperPosition(nodeId: $nodeId)
  }
`;

const FEED = gql`
  mutation feed($ozs: Float, $key: Int) {
    feed(ozs: $ozs, nodeId: $key)
  }
`;

export const station = {
  getNode: async (id: number) => {
    const variables = {
      nodeId: id,
    };
    const weight = await request(endpoint, GET_OZS, variables);
    const gate = await request(endpoint, STEPPER_POSITION, variables);
    const node = {
      weight: weight,
      gatePosition: gate,
    };
    console.log("data", node);
    //  console.log(JSON.stringify(data, undefined, 2))
    return node;
  },
  feed: async (key: number, ozs: number) => {
    const variables = {
      ozs: ozs,
      key: key,
    };
    console.log("feed", variables);

    const response = await request(endpoint, FEED, variables);

    console.log("data", response);
    //  console.log(JSON.stringify(data, undefined, 2))
    return {
      success: true,
      code: "123",
      message: "String",
    };
  },
};
export default station;
