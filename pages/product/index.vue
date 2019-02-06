<template>
  <section class="container">
    <appBackButton @back-to="$router.push('/')"></appBackButton>
    <appNutriScore :nutritionGrade="product.nutrition_grades"></appNutriScore>
    <appNutrimentDetail :nutriment="nutriment"></appNutrimentDetail>
  </section>
</template>

<script>
import BackButton from "~/components/BackButton.vue";
import NutriScore from "~/components/NutriScore.vue";
import NutrimentDetail from "~/components/NutrimentDetail.vue";
import Error from "~/components/Error.vue";
import productMiddleware from "../../middleware/product";

export default {
  middleware: [productMiddleware],
  components: {
    appBackButton: BackButton,
    appNutriScore: NutriScore,
    appNutrimentDetail: NutrimentDetail,
    appError: Error
  },
  data() {
    return {
      product: {},
      nutriments: {}
    };
  },
  mounted() {
    this.product = this.$store.state.product.product;
    this.nutriment.product_name = this.$store.state.product.product.product_name;
    this.nutriment.image_front_url = this.$store.state.product.product.image_front_url;
    this.nutriment.nutrients = this.$store.getters.getNutrientsBy100g;
    this.nutriment.allergers = this.$store.getters.getAllergens;
    this.nutriment.vitamins = this.$store.getters.getVitamins;
    this.nutriment.minerals = this.$store.getters.getMinerals;
  },
  methods: {
    test(ev) {
      console.log(ev);
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
