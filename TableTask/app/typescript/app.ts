const Backbone = require('backbone');
import UsersCollection from "./collection/collection";
import UsersView from "./view/users";
import AddNewUser from "./view/form";
const newUsersMassive = [{ids:Math.floor(Math.random()*1000),name:'Анатолий',tel:'+380644563225'},
    {ids:Math.floor(Math.random()*1000),name:'Василий',tel:'+380954563225'},
    {ids:Math.floor(Math.random()*1000),name:'Иван',tel:'+380944513225'},
    {ids:Math.floor(Math.random()*1000),name:'Марина',tel:'+380943563225'},
    {ids:Math.floor(Math.random()*1000),name:'Дмитрий',tel:'+380944563225'}];
const newUsers  = new UsersCollection(newUsersMassive);
const newUsersView = new UsersView({collection:newUsers});
const newAddUser = new AddNewUser({collection:newUsers});
document.querySelector('.table').append(newUsersView.render().el);
document.querySelector('body').append(newAddUser.render().el);
console.log(newUsers);