// NOTE - leave it as "raspberrypi.local:4301/graphql" for both server and local

import dotenv from 'dotenv';
dotenv.config();

export const SERVER_NAME = process.env.SERVER_NAME || 'pbctemplate';

const URI_SCALES = `${SERVER_NAME}.local:4001/graphql`;
const URI_SILOS = `${SERVER_NAME}.local:4002/graphql`;

const serverUrl = {
  URI_SCALES: `http://${URI_SCALES}`,
  URI_SILOS: `http://${URI_SILOS}`,
};

export default serverUrl;
