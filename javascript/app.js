// select elements
const input = document.querySelector(".navbar__input");
const inputPlaceholder = document.querySelector(".navbar__placeholder");
const featuredProducts = document.querySelector(".featured__products");
const bestSellerProductsSlider = document.querySelector(
  ".bestSeller__swiper-wrapper"
);

// select dataset
const featuredProductsData = document.querySelector(".featured__products")
  .dataset.uri;
const bestSellerProductsData = document.querySelector(".bestseller__products")
  .dataset.uri;

// events
input.addEventListener("focus", () => {
  inputPlaceholder.classList.add("d-none");
});
input.addEventListener("focusout", () => {
  inputPlaceholder.classList.remove("d-none");
  inputPlaceholder.classList.add("d-flex");
});

// featured products list
window.addEventListener("DOMContentLoaded", async () => {
  const featuredPresponse = await fetch(featuredProductsData);
  const featuredPdata = await featuredPresponse.json();
  featuredPdata.map((item) => {
    const html = `
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
					<p class="product__count text-uppercase fw-bolder">yalnızca 2 ürün kaldı</p>
					<small class="text-uppercase rounded px-3 py-2">
					${item.samedayshipping ? "bugün kargoda" : ""}	
					</small>

					<div class="product__addtocart w-100 d-flex position-absolute bottom-0 left-0">
						<button type="button">
							<i class="fa-solid fa-right-left"></i>
						</button>
						<button type="button" class="text-uppercase fw-bolder">Sepete
							ekle</button>
					</div>
				</div>
  `;

    return featuredProducts.insertAdjacentHTML("afterbegin", html);
  });

  const bestSellerPResponse = await fetch(bestSellerProductsData);
  const bestSellerPdata = await bestSellerPResponse.json();

  bestSellerPdata.map((item) => {
    const html = `
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
							<p class="product__count text-uppercase fw-bolder">yalnızca 2 ürün kaldı</p>
							<small class="text-uppercase rounded px-3 py-2">
								${item.samedayshipping ? "bugün kargoda" : ""}
							</small>

							<div class="product__addtocart w-100 d-flex position-absolute bottom-0 left-0">
								<button type="button">
									<i class="fa-solid fa-right-left"></i>
								</button>
								<button type="button" class="text-uppercase fw-bolder">Sepete
									ekle</button>
							</div>
						</div>
					</div>
				`;

    return bestSellerProductsSlider.insertAdjacentHTML("beforeend", html);
  });
});
