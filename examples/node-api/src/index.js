import { env } from "./config";
import { createServer } from "./loaders";

(() => {
  const app = createServer();

  app.listen(env.port, () => {
    console.log(`🚀 The server is running on ${env.port}!`);
  });
})();
