"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Backbone = require('backbone');
var _ = require('underscore');
var user_1 = require("./user");
var UsersView = Backbone.View.extend({
    tagName: 'tbody',
    initialize: function () {
        this.collection.on('add', this.addOne, this);
    },
    render: function () {
        this.collection.each(function (user) {
            var userView = new user_1.default({ model: user });
            this.el.append(userView.render().el);
        }, this);
        return this;
    },
    addOne: function (user) {
        var taskView = new user_1.default({ model: user });
        this.el.append(taskView.render().el);
    }
});
exports.default = UsersView;
