"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Backbone = require('backbone');
var User = Backbone.Model.extend({
    defaults: {
        ids: 0,
        name: '',
        tel: ''
    }
});
exports.default = User;
