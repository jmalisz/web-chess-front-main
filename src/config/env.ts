// Base Vite envs
const IS_DEV = import.meta.env.DEV;
const IS_PROD = import.meta.env.PROD;

const SOCKET_IO_URL = import.meta.env.VITE_SOCKET_IO_URL;

export { IS_DEV, IS_PROD, SOCKET_IO_URL };
