// 1. Найти кнопку Добавить в корзину
// 2. Повесить клик на эту кнопку
// 3. По клику определим, какой товар добавляется в корзину
// 4. Собираем данные этого товара
// 5. Подставим собранные данные в шаблон для товара в корзине
// 6. Отобразим товар в корзине

// div внутри корзины, куда мы добавляем товары
let cartWrapper = document.querySelector(".cart-wrapper")

let cartButtons = document.querySelectorAll("[data-cart]");

cartButtons.forEach( function(item) {
    item.addEventListener("click", function() {
        let card = this.closest(".card"); 
        // this.closest- ссылаемся на кликнутую кнопку в рамках ближайшего родителя, this используется внутри функции, срабатывающей благодаря addEventListener
        let id = card.dataset.id;
		let counterItem = card.querySelector("[data-counter]").innerText;
		let counter = card.querySelector("[data-counter]").innerText;
		let itemInCart = cartWrapper.querySelector(`[data-id="${id}"]`);

		// проверим, есть ли уже тот или иной товар в корзине
		if (itemInCart) {
			let cartCounterItem = itemInCart.querySelector("[data-counter]");
			cartCounterItem.innerText = parseInt(cartCounterItem.innerText) + parseInt(counter);
		} else {
			let imgSrc = card.querySelector(".product-img").getAttribute("src");
			let title = card.querySelector(".item-title").innerText;
			let amount = card.querySelector("[data-items-in-box]").innerText;
			let weight = card.querySelector(".price__weight").innerText;
			let price = card.querySelector(".price__currency").innerText;

			let cartItemHTML = `
			<div class="cart-item" data-id="${id}">
				<div class="cart-item__top">
					<div class="cart-item__img">
						<img src="${imgSrc}" alt="">
					</div>
					<div class="cart-item__desc">
						<div class="cart-item__title">${title}</div>
						<div class="cart-item__weight">${amount} / ${weight}</div>

						<!-- cart-item__details -->
						<div class="cart-item__details">

							<div class="items items--small counter-wrapper">
								<div class="items__control" data-action="minus">-</div>
								<div class="items__current" data-counter="">${counter}</div>
								<div class="items__control" data-action="plus">+</div>
							</div>

							<div class="price">
								<div class="price__currency">${price}</div>
							</div>

						</div>
						<!-- // cart-item__details -->

					</div>
				</div>
			</div>`;

			// отображаем товар в корзине: обращаемся к родителю-обертке, туда подставяем добавленную разметку с товаром
			cartWrapper.insertAdjacentHTML("beforeend", cartItemHTML);
		};

		// Сброс счетчика на 1 после добавления товара
       counterItem.innerText = 1;

	   // Вызов функции для обновления состояния корзины
	   toggleCartStatus();
		
    });
});

function toggleCartStatus() {
	// показываем или скрываем элементы корзины
	// проверка, есть ли в корзине товары
	if(cartWrapper.querySelectorAll(".cart-item").length > 0) {
		// скрыть вставку Корзина пустая при заполнении корзины товарами
		document.querySelector("[data-cart-empty]").classList.add("none");

		document.querySelector(".cart-total").classList.remove("none");

		document.querySelector("#order-form").classList.remove("none");
	} else {
		// отобразить вставку Корзина пустая при удалении всех товаров из корзины
		document.querySelector("[data-cart-empty]").classList.remove("none");

		document.querySelector(".cart-total").classList.add("none");

		document.querySelector("#order-form").classList.add("none");
	};
	// пересчитываем стоимость заказа
	let totalPrice = 0;


	cartWrapper.querySelectorAll(".cart-item").forEach(function(item) {
		let counter = item.querySelector("[data-counter]").innerText;
		let priceItem = item.querySelector(".price__currency").innerText;
		let price = parseInt(counter) * parseInt(priceItem);
		totalPrice = totalPrice + price;
	});
	console.log(totalPrice);
	document.querySelector(".total-price").innerText = totalPrice;

	// Логика для доставки
	let deliveryCost = document.querySelector(".delivery-cost");
	if (totalPrice >= 1000) {
		deliveryCost.innerText = "500 ₽";
		totalPrice += 500;
	} else {
		deliveryCost.innerText = "бесплатно";
	}
	// Обновляем итоговую сумму с учетом доставки
	document.querySelector(".total-price").innerText = totalPrice;

};
	// Сохраняем номер телефона в localStorage
	document.addEventListener("DOMContentLoaded", function() {
		const phoneInput = document.querySelector(".form-control");
		if(localStorage.getItem("phoneNumber")) {
			phoneInput.value = localStorage.getItem("phoneNumber");
		};
		phoneInput.addEventListener("input", function() {
			localStorage.setItem("phoneNumber", phoneInput.value);
		});
	});