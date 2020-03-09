const Backbone = require('backbone');
const _  = require('underscore');
import User from "../model/model";
const checkInputs = (regex,event):void =>{
    if(regex.test(event.value)){
        event.classList.add('validate');
        if(!event.nextElementSibling.classList.contains('hidden')){
            event.nextElementSibling.classList.add('hidden');
        }
    }else{
        if(event.classList.contains('validate')){
            event.classList.remove('validate');
        }
        event.nextElementSibling.classList.remove('hidden');
    }
};
const checkValidate = (event):void =>{
    const findInputs = event.parentNode.parentNode;
    if(findInputs.querySelectorAll('.validate').length > 1){
        findInputs.querySelector('.formSubmit').removeAttribute('disabled');
    }else if(findInputs.querySelectorAll('.error').length > 0){
        findInputs.querySelector('.formSubmit').setAttribute('disabled','disabled');
    }
};
const AddNewUser = Backbone.View.extend({
    tagName: 'form',
    className: 'newUserForm',
    template: _.template(`   
        <h3>Добавить нового пользователя:</h3>
        <div class="form-group">
            <label for="formName">Имя</label>
            <input type="text" class="form-control" id="formName" placeholder="Введите имя" required>
        <p class="error hidden">Вы ввели имя некорректно!</p>
        </div>
        <div class="form-group">
            <label for="formTel">Номер телефона</label>
        <input type="tel" class="form-control" id="formTel"  placeholder="Введите номер в следующем формате +380956744342" required>
        <p class="error hidden">Вы ввели некоректный номер телефона!</p>
        </div>
        <button type="submit" class="btn btn-primary formSubmit" disabled>+</button>    
    `),
    initialize: function(){

        this.render();
    },
    events: {
        'blur #formName': 'editName',
        'blur #formTel': 'editTel',
        'click .formSubmit' : 'submit'
    },
    render: function():object{
        this.el.innerHTML = this.template();
        return this;
    },
    editName: (e):void =>{
        const currentInput = e.target;
        const findName = /([a-zA-Zа-яА-Я]{3,}$)/g;
        checkInputs(findName,currentInput);
        checkValidate(currentInput);
    },
    editTel: (e):void =>{
        const currentInput = e.target;
        const findNumber = /(\+\d{12}$)/g;
        checkInputs(findNumber,currentInput);
        checkValidate(currentInput);
    },
    submit: function(e):void {
        e.preventDefault();
        const currentInput = e.target;
        const findInputs = currentInput.parentNode.parentNode;
        let name = findInputs.querySelector('#formName').value;
        let tel = findInputs.querySelector('#formTel').value;
        let ids = Math.floor(Math.random()*1000);
        // fetch('/api/addNewUser',{
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     body: JSON.stringify({
        //         ids,
        //         name,
        //         tel
        //     })
        // }).then((res)=>{
        //     console.log(res);
        //     const newUser = new  User({ids:ids,tel:tel,name:name});
        //     this.collection.add(newUser);
        // }).catch((err)=>{
        //     console.log(err);
        // });
        const newUser = new  User({ids:ids,tel:tel,name:name});
        this.collection.add(newUser);
    }
});
export default AddNewUser;