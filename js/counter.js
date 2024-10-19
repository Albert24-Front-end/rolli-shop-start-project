let body = document.querySelector("body").addEventListener("click", function(event) {
    // Вешаем клик на кнопки + и -
    if (event.target.hasAttribute("data-action")) {
        // Находим div с счетчиком
        let counterWrapper = event.target.closest(".counter-wrapper");
        let counter = counterWrapper.querySelector("[data-counter]");
       
        // для кнопки + :  увеличиваем
        if (event.target.dataset.action === "plus") {
            counter.innerText = ++counter.innerText;
        } else {
        // для кнопки - :  проверяем на > 1 и уменьшаем
            if (parseInt(counter.innerText) > 1) {
                counter.innerText = --counter.innerText;
            } else if (parseInt(counter.innerText) === 1 && counter.closest(".cart-wrapper")) {
                counter.closest(".cart-item").remove();
                
            }
         }
         toggleCartStatus(); // пересчитываем корзину
    }
});

let buttons = document.querySelectorAll("[data-action]");

// buttons.forEach( function (item) {
//     item.addEventListener("click", function() {
//         // Находим div с счетчиком
//         let counterWrapper = this.closest(".counter-wrapper");
//         let counter = counterWrapper.querySelector("[data-counter]");
       
//         // для кнопки + :  увеличиваем
//         if (this.dataset.action === "plus") {
//             counter.innerText = ++counter.innerText;
//         } else {
//         // для кнопки - :  проверяем на > 1 и уменьшаем
//             if (parseInt(counter.innerText) > 1) {
//                 counter.innerText = --counter.innerText;
//             }
//          }
//     });
// });
