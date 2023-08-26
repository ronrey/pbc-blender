"use strict";
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
exports.blend = void 0;
const blender_1 = require("../constants/blender");
const modules = [
    { url: `http://blender-${blender_1.BLENDER_NUMBER}-module-0.local:${blender_1.SOCKET}/graphql` },
    { url: `http://blender-${blender_1.BLENDER_NUMBER}-module-1.local:${blender_1.SOCKET}/graphql` },
    { url: `http://blender-${blender_1.BLENDER_NUMBER}-module-2.local:${blender_1.SOCKET}/graphql` },
    { url: `http://blender-${blender_1.BLENDER_NUMBER}-module-3.local:${blender_1.SOCKET}/graphql` },
    { url: `http://blender-${blender_1.BLENDER_NUMBER}-module-4.local:${blender_1.SOCKET}/graphql` },
    { url: `http://blender-${blender_1.BLENDER_NUMBER}-module-5.local:${blender_1.SOCKET}/graphql` },
];
function blend(blendItems) {
    return __awaiter(this, void 0, void 0, function* () {
        blendItems.map(blendItem => {
            console.log(blendItem);
        });
        return { success: true, code: '200', message: 'blend' };
    });
}
exports.blend = blend;
