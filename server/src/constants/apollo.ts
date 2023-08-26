// NOTE - leave it as "raspberrypi.local:4301/graphql" for both server and local

const URI = "raspberrypi.local:4301/graphql";
//const URI = '/graphql';
// //export const SERVER_URL = '/graphql';

// export const SERVER_URL = `http://${URI}`;

// export const WsLinkUri = `ws://${URI}`;

// export const HttpLinkUri = `http://${URI}`;

// export default SERVER_URL;

const serverUrl = {
  SERVER_URL: `http://${URI}`,
};

export default serverUrl;
