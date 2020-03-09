const Backbone = require('backbone');
const _  = require('underscore');
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
         findInputs.querySelector('.save').removeAttribute('disabled');
   }else if(findInputs.querySelectorAll('.error').length > 0){
       findInputs.querySelector('.save').setAttribute('disabled','disabled');
    }
};
const UserView = Backbone.View.extend({
   tagName: "tr",
   className: "user-tr",
   template: _.template(`
                  <td>
                       <span class="currentVal"><%= name %></span>
                       <input type="text" class="editName editValue validate hidden" value="<%= name %>" data-id="<%= ids %>">
                       <p class="error hidden">Вы ввели некоректно имя!</p>
                  </td>
                  <td>
                        <span class="currentVal"><%= tel %></span>
                        <input type="tel" class="editTel editValue validate hidden " value="<%= tel %>">
                        <p class="error hidden">Вы ввели некоректный номер телефона!</p>
                  </td>
                  <td>
                        <button type="button" class="btn btn-primary edit">Редактировать</button>
                        <button type="button" class="btn btn-success save hidden" disabled>Сохранить</button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger delete">Удалить</button>
                  </td>
                  `
   ),
   initialize: function(){
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
   render: function():object{
      this.el.innerHTML = this.template( this.model.toJSON() );
      return this;
   },
   destroy: function (e):void {
      // const currentInput = e.target;
      // const findInputs = currentInput.parentNode.parentNode;
      // fetch('/api/deleteUser',{
      //    method: 'POST',
      //    headers: {
      //       'Content-Type': 'application/json;charset=utf-8'
      //    },
      //    body: JSON.stringify({
      //       ids: findInputs.querySelector('.editName').getAttribute('data-id')
      //    })
      // }).then((res)=>{
      //    console.log(res);
      //    this.model.destroy();
      // }).catch(err=>console.log(err));
      this.model.destroy();
   },
   remove: function ():void {
      this.el.remove();
   },
   edit:  (e):void =>{
      e.target.classList.add('hidden');
      e.target.nextElementSibling.classList.remove('hidden');
      let findInputs = e.target.parentNode.parentNode;
      findInputs.querySelectorAll('.editValue').forEach((item)=>{
         item.classList.remove('hidden');
      });
      findInputs.querySelectorAll('.currentVal').forEach((item)=>{
         item.classList.add('hidden');
      });
      checkValidate(findInputs);
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
   editUser: function(e):void {
      const currentInput = e.target;
      const findInputs = currentInput.parentNode.parentNode;
      let currentName = findInputs.querySelector('.editName.validate').value;
      let currentTel =  findInputs.querySelector('.editTel.validate').value;
          // fetch('/api/editUser',{
          //    method: 'POST',
          //    headers: {
          //       'Content-Type': 'application/json;charset=utf-8'
          //    },
          //    body: JSON.stringify({
          //       ids: findInputs.querySelector('.editName').getAttribute('data-id'),
          //          name: currentName,
          //          tel: currentTel
          //    })
          // }).then((res)=>{
          //    console.log(res);
          //    this.model.set('name',currentName);
          //    this.model.set('tel',currentTel);
          //    currentInput.classList.add('hidden');
          //    currentInput.setAttribute('disabled','disabled');
          //    currentInput.previousElementSibling.classList.remove('hidden');
          //    findInputs.querySelectorAll('editValue').forEach((item)=>{
          //       item.classList.remove('validate');
          //       item.classList.add('hidden');
          //    });
          //    findInputs.querySelectorAll('.currentVal').forEach((item)=>{
          //       item.classList.remove('hidden');
          //    })
          // }).catch(err=>console.log(err));
      this.model.set('name',currentName);
      this.model.set('tel',currentTel);
      currentInput.classList.add('hidden');
      currentInput.setAttribute('disabled','disabled');
      currentInput.previousElementSibling.classList.remove('hidden');
      findInputs.querySelectorAll('editValue').forEach((item)=>{
         item.classList.remove('validate');
         item.classList.add('hidden');
      });
      findInputs.querySelectorAll('.currentVal').forEach((item)=>{
         item.classList.remove('hidden');
      })
   }
});
export default UserView