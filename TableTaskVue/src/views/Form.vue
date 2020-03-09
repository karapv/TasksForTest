<template>
    <form @submit.prevent="saveChanges">
        <h3>Добавить нового пользователя:</h3>
        <div class="form-group">
            <label for="formName">Имя</label>
            <input type="text" class="form-control" id="formName" placeholder="Введите имя" v-model="newUser.name" @change="validateName(newUser.name)" required>
            <p v-show="this.isErrorName" class="error">Вы ввели имя некорректно!</p>
        </div>
        <div class="form-group">
            <label for="formTel">Номер телефона</label>
            <input type="tel" class="form-control" id="formTel" v-model="newUser.tel" placeholder="Введите номер в следующем формате +380956744342" @change="validateTel(newUser.tel)" required>
            <p v-show="this.isErrorTel" class="error">Вы ввели некоректный номер телефона!</p>
        </div>
        <button type="submit" class="btn btn-primary">+</button>
    </form>
</template>
<script>
    // @ is an alias to /src
    //import axios  from 'axios';
    export default {
        name: 'Form',
        data(){
            return{
                isErrorName: false,
                isErrorTel: false,
                newUser:{
                    id: Math.floor(Math.random()*1000),
                    name: '',
                    tel: '',
                    isChange:false,
                    isErrorName:false,
                    isErrorTel:false,
                    isDone:false,
                    isDisabled:true
                }
            }
        },
        methods: {
            // Валидация имени
            validateName(name){
                this.newUser.name = name;
                const findName = /([a-zA-Zа-яА-Я]{3,}$)/g;
                if(findName.test(name)){
                    this.isErrorName = false;
                }else{
                    this.isErrorName = true;
                }
            },
            //Валидация телефона
            validateTel(tel){
                this.newUser.tel = tel;
                const findNumber = /(\+\d{12}$)/g;
                if(findNumber.test(tel)){
                    this.isErrorTel = false;
                }else{
                    this.isErrorTel = true;
                }
            },
            //Добавление нового пользователя
            saveChanges(){
                if(this.isErrorName || this.isErrorTel || this.newUser.name.length === 0 || this.newUser.tel.length === 0){
                    if(this.newUser.name.length === 0){
                        this.isErrorName = true;
                    }else if(this.newUser.tel.length === 0){
                        this.isErrorTel = true;
                    }
                    return false;
                }else {
                    this.$store.dispatch('addNewUser', this.newUser);
                }
            }
        }
    }
</script>