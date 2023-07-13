"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RECETTE_SERVICE_NAME = exports.RecetteServiceControllerMethods = exports.RECETTE_V1ALPHA_PACKAGE_NAME = exports.protobufPackage = void 0;
const microservices_1 = require("@nestjs/microservices");
exports.protobufPackage = "recette.v1alpha";
exports.RECETTE_V1ALPHA_PACKAGE_NAME = "recette.v1alpha";
function RecetteServiceControllerMethods() {
    return function (constructor) {
        const grpcMethods = ["get", "add", "update", "delete", "list"];
        for (const method of grpcMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcMethod)("RecetteService", method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = [];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcStreamMethod)("RecetteService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.RecetteServiceControllerMethods = RecetteServiceControllerMethods;
exports.RECETTE_SERVICE_NAME = "RecetteService";
//# sourceMappingURL=recette.js.map