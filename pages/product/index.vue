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
  computed: {
    product: function() {
      return this.$store.state.product.product;
    },
    nutriment: function() {
      return {
        product_name: this.$store.state.product.product.product_name,
        image_front_url: this.$store.state.product.product.image_front_url,
        nutrients: this.$store.getters.getNutrientsBy100g,
        allergers: this.$store.getters.getAllergens,
        vitamins: this.$store.getters.getVitamins,
        minerals: this.$store.getters.getMinerals
      };
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
