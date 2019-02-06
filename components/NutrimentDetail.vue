<template>
  <section class="absolute pin-x pin-t z-index-minus100">
    <div
      class="bg-image"
      :style="{background: 'linear-gradient(180deg, rgba(49, 50, 79, 0.17) 0%, #242539 100%), url(' + nutriment.image_front_url + ')'}"
    ></div>
    <h2 class="nutriment-name text-grey-light">{{nutriment.product_name}}</h2>
    <div class="nutriment-list">
      <h4 class="text-grey-light pt-3">Nutrients per 100gr</h4>
      <div class="flex flex-wrap pt-3 text-grey-light fontsize">
        <div
          v-for=" (nutrient, index) in nutriment.nutrients"
          :key="index+100"
          class="w-1/2 flex justify-between paddingNutrient"
        >
          <span>
            <strong>{{nutrient.name}}</strong> :
          </span>
          <span>{{nutrient.value}} gr</span>
        </div>
      </div>
    </div>

    <div class="text-justify pt-5 pl-4">
      <h4 class="text-left">Allergens</h4>
      <p
        class="p-2 leading-normal"
        v-for="(allergen, index) in nutriment.allergers"
        :key="index+200"
      >
        <span v-if="nutriment.allergers.length > 0">{{allergen}}</span>
        <span v-else>Free of known allergens</span>
      </p>
      <h4 v-if="nutriment.vitamins.length > 0" class="text-left pt-3">Vitamins</h4>
      <p class="p-2 leading-normal" v-for="(vitamin, index) in nutriment.vitamins" :key="index+300">
        <span>{{vitamin}}</span>
      </p>

      <h4 v-if="nutriment.minerals.length > 0" class="text-left pt-3">Minerals</h4>
      <p class="p-2 leading-normal" v-for="(mineral, index) in nutriment.minerals" :key="index+400">
        <span>{{mineral}}</span>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  props: ["nutriment"]
};
</script>


<style scoped>
.z-index-minus100 {
  z-index: -100;
}

.nutriment-name {
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
  top: -5px;
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
}

.nutriment-list {
  position: relative;
  width: 90%;
  height: auto;
  margin: auto;
  margin-top: -2rem;
  padding-bottom: 1rem;

  background: #3c444d;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
}

@media (max-width: 480px) {
  .fontsize {
    font-size: 0.7rem;
  }
  .paddingNutrient {
    padding: 0.05rem 0.6rem;
  }
}

@media (min-width: 481px) {
  .fontsize {
    font-size: 1rem;
  }
  .paddingNutrient {
    padding: 0.05rem 0.5rem;
  }
}
</style>
