document.addEventListener('DOMContentLoaded',function () {
  const formSubmit = document.querySelector('.form-submit'),formNumber = document.querySelector('.form-number');
  // Validate field
    formNumber.addEventListener('blur',function (e) {
      let currentEvent = e.target,currentValue = currentEvent.value,toNumb = +currentValue;
      if(isNaN(toNumb)){
          currentEvent.nextElementSibling.classList.remove('hidden');
          if(!formSubmit.getAttribute('disabled')){
              formSubmit.setAttribute('disabled', 'disabled');
          }
      }else if(!currentEvent.nextElementSibling.classList.contains('hidden') && typeof toNumb === 'number'){
          currentEvent.nextElementSibling.classList.add('hidden');
      }else{
          formSubmit.removeAttribute('disabled');
      }
  });
  // Form submit
  document.getElementById('form').addEventListener('submit',function (e) {
      localStorage.num23 = formNumber.value;
  });
  // Reset form and localstorage
  document.querySelector('.form-reset').addEventListener('click',function () {
     localStorage.removeItem('num23');
     if(document.querySelector('.number-paragraph')){
         let paragraph = document.querySelector('.number-paragraph');
         paragraph.parentNode.removeChild(paragraph);
     }
  });
  // Add paragraph
  if(localStorage.num23){
      const paragraphFragment = document.createDocumentFragment();
      const paragraph = document.createElement('p');
      paragraph.textContent =  localStorage.num23;
      paragraph.classList.add('number-paragraph');
      const even = n => !(n%2);
      if(even(localStorage.num23)){
          paragraph.style.backgroundColor = 'green';
      }else{
          paragraph.style.backgroundColor = 'red';
      }
      paragraphFragment.append(paragraph);
      document.body.append(paragraphFragment);
  }
});