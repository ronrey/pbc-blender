"use strict";
//import { AuthenticationError } from 'apollo-server-express';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const blender_1 = require("../blender");
exports.Mutation = {
    blend: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, blender_1.blend)(args.blend);
    }),
    stop: () => __awaiter(void 0, void 0, void 0, function* () {
        return { success: true, code: '200', message: 'stop' };
    }),
};
exports.default = exports.Mutation;
