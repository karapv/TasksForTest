"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Backbone = require('backbone');
var collection_1 = require("./collection/collection");
var users_1 = require("./view/users");
var form_1 = require("./view/form");
var newUsersMassive = [{ ids: Math.floor(Math.random() * 1000), name: 'Анатолий', tel: '+380644563225' },
    { ids: Math.floor(Math.random() * 1000), name: 'Василий', tel: '+380954563225' },
    { ids: Math.floor(Math.random() * 1000), name: 'Иван', tel: '+380944513225' },
    { ids: Math.floor(Math.random() * 1000), name: 'Марина', tel: '+380943563225' },
    { ids: Math.floor(Math.random() * 1000), name: 'Дмитрий', tel: '+380944563225' }];
var newUsers = new collection_1.default(newUsersMassive);
var newUsersView = new users_1.default({ collection: newUsers });
var newAddUser = new form_1.default({ collection: newUsers });
document.querySelector('.table').append(newUsersView.render().el);
document.querySelector('body').append(newAddUser.render().el);
console.log(newUsers);
