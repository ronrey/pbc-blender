"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const Query_1 = require("./Query");
const Mutation_1 = require("./Mutation");
const Type_1 = require("./Type");
exports.resolvers = Object.assign({ Query: Query_1.Query,
    Mutation: Mutation_1.Mutation }, Type_1.Type);
exports.default = exports.resolvers;
