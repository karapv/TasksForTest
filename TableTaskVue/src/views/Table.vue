<template>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Имя</th>
            <th scope="col">Телефон</th>
            <th scope="col">Добавить</th>
            <th scope="col">Удалить</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user,index) in currentInfo" :key="index" :class="{ tableTd: true ,active: user.isChange }">
            <td>
                <input type="text" v-model="user.name" @change="validateName(user.name,index)"><span>{{user.name}}</span>
                <p v-show="user.isErrorName" class="error">Вы ввели имя некорректно!</p>
            </td>
            <td>
                <input type="tel"  v-model="user.tel" @change="validateTel(user.tel,index)">
                <span>{{user.tel}}</span>
                <p v-show="user.isErrorTel" class="error">Вы ввели некоректный номер телефона!</p>
            </td>
            <th scope="row" v-show="!user.isDone"><button type="button" class="btn btn-outline-primary" @click="changeUser(index)">Редактировать</button></th>
            <th scope="row" v-show="user.isDone"><button type="button" class="btn btn-outline-success" @click="saveChanges(index,user.isErrorName,user.isErrorTel,user.name,user.tel)">Сохранить</button></th>
            <th scope="row"><button type="button" class="btn btn-outline-danger" @click="deleteUser(index)">Удалить</button></th>
        </tr>
        </tbody>
    </table>
</template>
<script>
    // @ is an alias to /src
    //import axios  from 'axios';
    import {mapGetters} from "vuex";
    export default {
        name: 'Table',
        data(){
            return{
               currentInfo: null
            }
        },
       created(){
            //Получаем массив пользователей из стейта и записываем в объект темплейта
            this.currentInfo = this.getUsers;
        },
        computed: {
            ...mapGetters([
                "getUsers"
            ])
        },
        methods: {
            //Удаление пользователя из массива
            deleteUser(index){
                this.$store.dispatch('deleteUser',index);
            },
            //Изменение данных определенного пользователя
            changeUser(index){
                this.currentInfo[index].isChange = true;
                this.currentInfo[index].isDone = true;
            },
            //Проверка имени
            validateName(name,index){
                this.currentInfo[index].name = name;
                const findName = /([a-zA-Zа-яА-Я]{3,}$)/g;
                if(findName.test(name)){
                    this.currentInfo[index].isErrorName = false;
                }else{
                    this.currentInfo[index].isErrorName = true;
                }
            },
            //Проверка телефона
            validateTel(tel,index){
                this.currentInfo[index].tel = tel;
                const findNumber = /(\+\d{12}$)/g;
                if(findNumber.test(tel)){
                   this.currentInfo[index].isErrorTel = false;
                }else{
                   this.currentInfo[index].isErrorTel = true;
                }
            },
            //Сохранение изменений по определенному пользователю
            saveChanges(index,errorName,errorTel,nameUser,telUser){
                console.log(errorName);
                if(errorName|| errorTel){
                    return false;
                }else {
                    let currentChanges = {
                        index: index,
                        nameUser: nameUser,
                        telUser: telUser
                    };
                    this.$store.dispatch('saveChanges', currentChanges);
                    this.currentInfo[index].isDone = false;
                    this.currentInfo[index].isChange = false;
                }
            }
        }
    }
</script>