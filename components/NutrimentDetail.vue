<template>
  <section class="absolute pin-x pin-t z-index-minus100">
    <div class="bg-image"></div>
    <!-- <div class="max-w rounded overflow-hidden shadow-lg">

      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
        <p
          class="text-grey-darker text-base"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
      </div>
      <div class="px-6 py-4">
        <span
          class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2"
        >#photography</span>
        <span
          class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2"
        >#travel</span>
        <span
          class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker"
        >#winter</span>
      </div>
    </div>-->
    <h2 class="product-name text-grey-light">Product Name</h2>
    <div class="nutriment-list">
      <h4 class="text-grey-light pt-3">Nutrients per 100gr</h4>
      <div class="flex flex-wrap pt-3 text-grey-light">
        <div class="w-1/2 p-1">
          <span>Proteins</span>
          <span>23g</span>
        </div>
      </div>
    </div>

    <div class="text-justify pt-5 pl-4">
      <h4 class="text-left">Allergens</h4>
      <p
        class="p-2 leading-normal"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
      <h4 class="text-left pt-3">Vitamins</h4>
      <p
        class="p-2 leading-normal"
      >incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit</p>
      <h4 class="text-left pt-3">Minerals</h4>
      <p class="p-2 leading-normal">consectetur adipiscing elit, sed do eiusmod tempor</p>
    </div>
  </section>
</template>

<style scoped>
.z-index-minus100 {
  z-index: -100;
}

.product-name {
  position: absolute;
  z-index: 10;
  top: 7rem;
  left: 1.1rem;
}

.bg-image {
  position: relative;
  width: 100vw;
  height: 194px;
  left: 0px;
  top: 0px;
  background: linear-gradient(180deg, rgba(49, 50, 79, 0.17) 0%, #242539 100%),
    url(https://tailwindcss.com/img/card-top.jpg);
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
}

.nutriment-list {
  position: relative;
  width: 80%;
  height: auto;
  margin: auto;
  margin-top: -2rem;
  padding-bottom: 1rem;

  background: #3c444d;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
}
</style>
