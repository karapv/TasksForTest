"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Backbone = require('backbone');
var model_1 = require("../model/model");
var UsersCollection = Backbone.Collection.extend({
    model: model_1.default
});
exports.default = UsersCollection;
