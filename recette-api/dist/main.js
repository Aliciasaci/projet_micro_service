"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const grpc_config_1 = require("./grpc.config");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, grpc_config_1.grpcConfig);
    await app.listen();
}
//# sourceMappingURL=main.js.map