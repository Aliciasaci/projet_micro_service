"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grpcConfig = void 0;
var microservices_1 = require("@nestjs/microservices");
var recette_1 = require("./stubs/recette/v1alpha/recette");
var path_1 = require("path");
var nestjs_grpc_reflection_1 = require("nestjs-grpc-reflection");
exports.grpcConfig = (0, nestjs_grpc_reflection_1.addReflectionToGrpcConfig)({
    transport: microservices_1.Transport.GRPC,
    options: {
        url: '0.0.0.0:6000',
        package: recette_1.RECETTE_V1ALPHA_PACKAGE_NAME,
        protoPath: (0, path_1.join)(__dirname, 'proto/recette/v1alpha/recette.proto'),
    },
});
