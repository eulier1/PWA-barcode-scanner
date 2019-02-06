<template>
  <section class="container">
    <appBackButton @back-to="$router.push('/')"></appBackButton>
    <appNutriScore :nutritionGrade="product.nutrition_grades"></appNutriScore>
    <appNutrimentDetail :product="product"></appNutrimentDetail>
  </section>
</template>

<script>
import BackButton from "~/components/BackButton.vue";
import NutriScore from "~/components/NutriScore.vue";
import NutrimentDetail from "~/components/NutrimentDetail.vue";
import Error from "~/components/Error.vue";

export default {
  components: {
    appBackButton: BackButton,
    appNutriScore: NutriScore,
    appNutrimentDetail: NutrimentDetail,
    appError: Error
  },
  data() {
    return {
      product: {}
    };
  },
  mounted() {
    this.product = this.$store.state.product.product;
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
