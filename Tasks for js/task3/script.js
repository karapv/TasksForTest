document.addEventListener('DOMContentLoaded',function () {
    //Функция по преобразованию гет параметров с текущей страницы в объект
    const URLtoObj = () =>{
        let currentUrl = window.location.href.match(/\?(.*)/g).join('')
            .replace(/&/g,',')
            .replace(/\?/,'')
            .replace(/=/g,':')
            .replace(/([a-z]+)(:)/g,str=>`"${str.replace(/:/g,'":')}`)
            .replace(/:([a-zA-Z]+)/g,str=>`${str.replace(/:/g,':"')}"`);
        currentUrl = `{${currentUrl}}`;
        currentUrl = eval('('+currentUrl+')');
        return currentUrl;
    };
    console.log(URLtoObj());
});