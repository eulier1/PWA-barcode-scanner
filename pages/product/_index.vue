<template>
  <section class="container">
    <appBackButton></appBackButton>
    <appNutriScore></appNutriScore>
    <appNutrimentDetail></appNutrimentDetail>
  </section>
</template>

<script>
import Logo from "~/components/Logo.vue";
import BackButton from "~/components/BackButton.vue";
import NutriScore from "~/components/NutriScore.vue";
import NutrimentDetail from "~/components/NutrimentDetail.vue";
import Error from "~/components/Error.vue";

export default {
  components: {
    Logo,
    appBackButton: BackButton,
    appNutriScore: NutriScore,
    appNutrimentDetail: NutrimentDetail,
    appError: Error
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
