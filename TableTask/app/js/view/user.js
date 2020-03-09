"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Backbone = require('backbone');
var _ = require('underscore');
var checkInputs = function (regex, event) {
    if (regex.test(event.value)) {
        event.classList.add('validate');
        if (!event.nextElementSibling.classList.contains('hidden')) {
            event.nextElementSibling.classList.add('hidden');
        }
    }
    else {
        if (event.classList.contains('validate')) {
            event.classList.remove('validate');
        }
        event.nextElementSibling.classList.remove('hidden');
    }
};
var checkValidate = function (event) {
    var findInputs = event.parentNode.parentNode;
    if (findInputs.querySelectorAll('.validate').length > 1) {
        findInputs.querySelector('.save').removeAttribute('disabled');
    }
    else if (findInputs.querySelectorAll('.error').length > 0) {
        findInputs.querySelector('.save').setAttribute('disabled', 'disabled');
    }
};
var UserView = Backbone.View.extend({
    tagName: "tr",
    className: "user-tr",
    template: _.template("\n                  <td>\n                       <span class=\"currentVal\"><%= name %></span>\n                       <input type=\"text\" class=\"editName editValue validate hidden\" value=\"<%= name %>\" data-id=\"<%= ids %>\">\n                       <p class=\"error hidden\">\u0412\u044B \u0432\u0432\u0435\u043B\u0438 \u043D\u0435\u043A\u043E\u0440\u0435\u043A\u0442\u043D\u043E \u0438\u043C\u044F!</p>\n                  </td>\n                  <td>\n                        <span class=\"currentVal\"><%= tel %></span>\n                        <input type=\"tel\" class=\"editTel editValue validate hidden \" value=\"<%= tel %>\">\n                        <p class=\"error hidden\">\u0412\u044B \u0432\u0432\u0435\u043B\u0438 \u043D\u0435\u043A\u043E\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430!</p>\n                  </td>\n                  <td>\n                        <button type=\"button\" class=\"btn btn-primary edit\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</button>\n                        <button type=\"button\" class=\"btn btn-success save hidden\" disabled>\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>\n                  </td>\n                  <td>\n                    <button type=\"button\" class=\"btn btn-danger delete\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>\n                  </td>\n                  "),
    initialize: function () {
        this.render();
        this.model.on('destroy', this.remove, this);
        this.model.on('change', this.render, this);
    },
    events: {
        'click .delete': 'destroy',
        'click .edit': 'edit',
        'blur .editName': 'editName',
        'blur .editTel': 'editTel',
        'click .save': 'editUser'
    },
    render: function () {
        this.el.innerHTML = this.template(this.model.toJSON());
        return this;
    },
    destroy: function (e) {
        this.model.destroy();
    },
    remove: function () {
        this.el.remove();
    },
    edit: function (e) {
        e.target.classList.add('hidden');
        e.target.nextElementSibling.classList.remove('hidden');
        var findInputs = e.target.parentNode.parentNode;
        findInputs.querySelectorAll('.editValue').forEach(function (item) {
            item.classList.remove('hidden');
        });
        findInputs.querySelectorAll('.currentVal').forEach(function (item) {
            item.classList.add('hidden');
        });
        checkValidate(findInputs);
    },
    editName: function (e) {
        var currentInput = e.target;
        var findName = /([a-zA-Zа-яА-Я]{3,}$)/g;
        checkInputs(findName, currentInput);
        checkValidate(currentInput);
    },
    editTel: function (e) {
        var currentInput = e.target;
        var findNumber = /(\+\d{12}$)/g;
        checkInputs(findNumber, currentInput);
        checkValidate(currentInput);
    },
    editUser: function (e) {
        var currentInput = e.target;
        var findInputs = currentInput.parentNode.parentNode;
        var currentName = findInputs.querySelector('.editName.validate').value;
        var currentTel = findInputs.querySelector('.editTel.validate').value;
        this.model.set('name', currentName);
        this.model.set('tel', currentTel);
        currentInput.classList.add('hidden');
        currentInput.setAttribute('disabled', 'disabled');
        currentInput.previousElementSibling.classList.remove('hidden');
        findInputs.querySelectorAll('editValue').forEach(function (item) {
            item.classList.remove('validate');
            item.classList.add('hidden');
        });
        findInputs.querySelectorAll('.currentVal').forEach(function (item) {
            item.classList.remove('hidden');
        });
    }
});
exports.default = UserView;
