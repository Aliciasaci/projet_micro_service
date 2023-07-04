"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RECETTE_SERVICE_NAME = exports.RecetteServiceControllerMethods = exports.RECETTE_V1ALPHA_PACKAGE_NAME = exports.protobufPackage = void 0;
var microservices_1 = require("@nestjs/microservices");
exports.protobufPackage = "recette.v1alpha";
exports.RECETTE_V1ALPHA_PACKAGE_NAME = "recette.v1alpha";
function RecetteServiceControllerMethods() {
    return function (constructor) {
        var grpcMethods = ["get", "add", "update", "delete"];
        for (var _i = 0, grpcMethods_1 = grpcMethods; _i < grpcMethods_1.length; _i++) {
            var method = grpcMethods_1[_i];
            var descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcMethod)("RecetteService", method)(constructor.prototype[method], method, descriptor);
        }
        var grpcStreamMethods = [];
        for (var _a = 0, grpcStreamMethods_1 = grpcStreamMethods; _a < grpcStreamMethods_1.length; _a++) {
            var method = grpcStreamMethods_1[_a];
            var descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcStreamMethod)("RecetteService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.RecetteServiceControllerMethods = RecetteServiceControllerMethods;
exports.RECETTE_SERVICE_NAME = "RecetteService";
