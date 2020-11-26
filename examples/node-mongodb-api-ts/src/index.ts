import { connectToDb, env } from "./config";
import { createServer } from "./loaders";

(() => {
  const app = createServer();

  connectToDb().then(() => {
    console.log("🚀 Database connected!");
    return app.listen(env.port, () => {
      console.log(`🚀 The server is running on ${env.port}!`);
    });
  });
})();
