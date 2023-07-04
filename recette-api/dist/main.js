"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const grpc_config_1 = require("./grpc.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const cs = app.get(config_1.ConfigService);
    app.connectMicroservice(grpc_config_1.grpcConfig);
    app.enableShutdownHooks();
    await app.startAllMicroservices();
    const healthCheckPort = cs.get('HEALTH_PORT');
    await app.listen(healthCheckPort);
}
bootstrap();
//# sourceMappingURL=main.js.map