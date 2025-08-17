"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusEnum = exports.RoleEnum = void 0;
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["ADMIN"] = "ADMIN";
    RoleEnum["USER"] = "USER";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["ACTIVE"] = "ACTIVE";
    StatusEnum["PENDING"] = "PENDING";
    StatusEnum["DECLINED"] = "DECLINED";
})(StatusEnum || (exports.StatusEnum = StatusEnum = {}));
