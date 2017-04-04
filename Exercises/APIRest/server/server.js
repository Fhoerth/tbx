import { createServer } from './createServer';
import createApp from './createApp';

const server = async () => {
  const app = await createApp();
  createServer(app);
};

export default server();
