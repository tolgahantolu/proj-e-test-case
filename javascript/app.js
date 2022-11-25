"use strict";

// select elements
const input = document.querySelector(".navbar__input");
const inputPlaceholder = document.querySelector(".navbar__placeholder");
const featuredProducts = document.querySelector(".featured__products");
const bestSellerProductsSlider = document.querySelector(
  ".bestSeller__swiper-wrapper"
);
const navbarCartCount = document.querySelector(".navbar__cart-count");

// select dataset
const featuredProductsData = document.querySelector(".featured__products")
  .dataset.uri;
const bestSellerProductsData = document.querySelector(".bestseller__products")
  .dataset.uri;

// event listeners
input.addEventListener("focus", () => {
  inputPlaceholder.classList.add("d-none");
});
input.addEventListener("focusout", () => {
  inputPlaceholder.classList.remove("d-none");
  inputPlaceholder.classList.add("d-flex");
});

let count = 0;
window.addEventListener("DOMContentLoaded", async () => {
  getLocalStorage();

  await fetchData(featuredProductsData, "list", featuredProducts);
  await fetchData(bestSellerProductsData, "slider", bestSellerProductsSlider);
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.id == "btnAddToCart") {
    count += 1;
    navbarCartCount.textContent = count;
    setLocalStorage(count);
  }
});

// functions
const fetchData = async (url, forWhat, toWhere) => {
  const data = await (await fetch(url)).json();

  data.map((item) => {
    createHtml(forWhat, item, toWhere);
  });
};

const createHtml = (forWhat, item, toWhere) => {
  let html = undefined;
  if (forWhat == "slider") {
    html = `
		<div class="bestSeller__swiper-slide swiper-slide">
			<div class="product overflow-hidden position-relative">
				<small class="text-uppercase fw-bolder">Web'e Özel</small>
				<img src="${item.img}"
					alt="product image" class="my-4">
				<div class="d-flex align-items-center gap-1">
					<span><i class="fa-solid fa-star"></i>${item.rating}</span>
					<span>(${item.comment} Yorum)</span>
				</div>
				<p class="product__pcode text-uppercase mt-4">${item.code}</p>
				<h5 class="product__title text-uppercase text-center mt-1">${item.title}</h5>
				<h1 class="product__price my-2">₺${item.price}</h1>
				<p class="product__count text-uppercase fw-bolder">
				${
          item.productCount >= 5 || item.productCount == undefined
            ? ""
            : `Yalnızca ${item.productCount} ürün kaldı`
        }</p>
				<small class="text-uppercase rounded px-3 py-2">
					${item.samedayshipping ? "bugün kargoda" : ""}
				</small>

				<div class="product__addtocart w-100 d-flex position-absolute bottom-0 left-0">
					<button type="button">
						<i class="fa-solid fa-right-left"></i>
					</button>
					<button type="button" class="text-uppercase fw-bolder" id="btnAddToCart">Sepete
						ekle</button>
				</div>
			</div>
		</div>
	`;
  } else {
    html = `
		<div class="product product--featured overflow-hidden position-relative">
			<small class="text-uppercase fw-bolder">Web'e Özel</small>
			<img src="${item.img}"
				alt="product image" class="my-4">
			<div class="d-flex align-items-center gap-1">
				<span><i class="fa-solid fa-star"></i>${item.rating}</span>
				<span>(${item.comment} Yorum)</span>
			</div>
			<p class="product__pcode text-uppercase mt-4">${item.code}</p>
			<h5 class="product__title text-uppercase text-center mt-1">${item.title}</h5>
			<h1 class="product__price my-2">₺${item.price}</h1>
			<p class="product__count text-uppercase fw-bolder">
				${item.productCount >= 5 ? "" : `Yalnızca ${item.productCount} ürün kaldı`}</p>
			</p>
			<small class="text-uppercase rounded px-3 py-2">
			${item.samedayshipping ? "bugün kargoda" : ""}	
			</small>

			<div class="product__addtocart w-100 d-flex position-absolute bottom-0 left-0">
				<button type="button">
					<i class="fa-solid fa-right-left"></i>
				</button>
				<button type="button" class="text-uppercase fw-bolder" id="btnAddToCart">Sepete
					ekle</button>
			</div>
		</div>
  	`;
  }
  return toWhere.insertAdjacentHTML("afterbegin", html);
};

const setLocalStorage = (data) => {
  localStorage.setItem(`cartcount`, JSON.stringify(data));
};

const getLocalStorage = () => {
  const countdata = JSON.parse(localStorage.getItem(`cartcount`));
  count = countdata == null ? 0 : countdata;
  navbarCartCount.textContent = count;
};
