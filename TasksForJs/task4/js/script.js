$(document).ready(function () {
    //Получаем товары и преобразовуем раскладываем их по тегам в li
    $.ajax({
        method: "GET",
        url: "http://54.39.188.42/"
    }).done(( data ) =>{
            let toProductObj = window.atob(data);
            toProductObj = JSON.parse(toProductObj);
            console.log(toProductObj);
            let listProduct = toProductObj.map((item)=>{
                  let price = +item.price;
                  price = price.toFixed(2);
                  return `
                    <li class="list-item">
                        <h5 class="list-item-number"># ${item.id}</h5>
                        <h4 class="list-item-title">${item.title}</h4>
                        <h5 class="list-item-sku">${item.sku}</h5>
                        <img src="${item.image}" alt="${item.title}">
                        <h5 class="list-item-options-title">Product options:</h5>
                        <ul class="list-item-options"> 
                            <li class="list-item-options-item">Metal type: ${item.options[0].metal_type}</li>
                            <li class="list-item-options-item">Metal color: ${item.options[0].metal_color}</li>
                            <li class="list-item-options-item">Stone shape: ${item.options[0].stone_shape}</li>
                            <li class="list-item-options-item">Gemstone color: ${item.options[0].gemstone_color}</li>
                        </ul>
                        <p class="list-item-price">${price} ${item.currency}</p>
                    </li>
                  `
            });
            //Вывод в товаров в фронтенд
            for(let i = 0;i<listProduct.length;i++){
                $('.products-list').append(listProduct[i]);
            }
     }).fail((error)=>{
         console.log(error);
    })
});