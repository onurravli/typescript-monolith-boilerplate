import "module-alias/register";

import app from "@/app";

import { env, logger } from "@/utils";

app.listen(env.PORT, () => {
  logger.success(`Server is running on ${env.HOST}:${env.PORT} 🚀`);
});
