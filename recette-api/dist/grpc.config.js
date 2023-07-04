"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grpcConfig = void 0;
const microservices_1 = require("@nestjs/microservices");
const recette_1 = require("./stubs/recette/v1alpha/recette");
const path_1 = require("path");
const nestjs_grpc_reflection_1 = require("nestjs-grpc-reflection");
exports.grpcConfig = (0, nestjs_grpc_reflection_1.addReflectionToGrpcConfig)({
    transport: microservices_1.Transport.GRPC,
    options: {
        url: '0.0.0.0:4000',
        package: recette_1.RECETTE_V1ALPHA_PACKAGE_NAME,
        protoPath: (0, path_1.join)(__dirname, '../src/proto/recette/v1alpha/recette.proto'),
    },
});
//# sourceMappingURL=grpc.config.js.map