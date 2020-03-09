"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Backbone = require('backbone');
var _ = require('underscore');
var model_1 = require("../model/model");
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
        findInputs.querySelector('.formSubmit').removeAttribute('disabled');
    }
    else if (findInputs.querySelectorAll('.error').length > 0) {
        findInputs.querySelector('.formSubmit').setAttribute('disabled', 'disabled');
    }
};
var AddNewUser = Backbone.View.extend({
    tagName: 'form',
    className: 'newUserForm',
    template: _.template("   \n        <h3>\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u043E\u0433\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F:</h3>\n        <div class=\"form-group\">\n            <label for=\"formName\">\u0418\u043C\u044F</label>\n            <input type=\"text\" class=\"form-control\" id=\"formName\" placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F\" required>\n        <p class=\"error hidden\">\u0412\u044B \u0432\u0432\u0435\u043B\u0438 \u0438\u043C\u044F \u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E!</p>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"formTel\">\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430</label>\n        <input type=\"tel\" class=\"form-control\" id=\"formTel\"  placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440 \u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u0444\u043E\u0440\u043C\u0430\u0442\u0435 +380956744342\" required>\n        <p class=\"error hidden\">\u0412\u044B \u0432\u0432\u0435\u043B\u0438 \u043D\u0435\u043A\u043E\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430!</p>\n        </div>\n        <button type=\"submit\" class=\"btn btn-primary formSubmit\" disabled>+</button>    \n    "),
    initialize: function () {
        this.render();
    },
    events: {
        'blur #formName': 'editName',
        'blur #formTel': 'editTel',
        'click .formSubmit': 'submit'
    },
    render: function () {
        this.el.innerHTML = this.template();
        return this;
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
    submit: function (e) {
        e.preventDefault();
        var currentInput = e.target;
        var findInputs = currentInput.parentNode.parentNode;
        var name = findInputs.querySelector('#formName').value;
        var tel = findInputs.querySelector('#formTel').value;
        var ids = Math.floor(Math.random() * 1000);
        var newUser = new model_1.default({ ids: ids, tel: tel, name: name });
        this.collection.add(newUser);
    }
});
exports.default = AddNewUser;
