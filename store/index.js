export const state = () => ({
  product: {},
  vitamins: [],
  minerals: []
});

export const mutations = {
  setProduct(state, product) {
    state.product = product;
  }
};

export const actions = {
  async getProduct(vuexContext, barcode) {
    const product = await this.$axios.$get(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );
    vuexContext.commit("setProduct", product);
  }
};

export const getters = {
  getNutritionGrades(state) {
    return state.product.product.nutrition_grades.toLowerCase();
  },
  getNutrientsBy100g(state) {
    let nutrients = [];
    Object.entries(state.product.product.nutriments).map(([key, value]) => {
      console.log(key, value);
      if (key.endsWith("100g")) {
        if (
          key.match("proteins") ||
          key.match("carbohydrates") ||
          key.match("sugars") ||
          key.match("salt") ||
          key.match("saturated-fat") ||
          key.match("sodium") ||
          key.match("fiber") ||
          key.match("cocoa") ||
          key.match("energy") ||
          key.match("nova-group")
        ) {
          let name = key.split("_")[0];
          name = name.replace("-", " ");
          name = name.charAt(0).toUpperCase() + name.slice(1);

          if (typeof value == "string") {
            value = parseInt(value, 10).toFixed(2);
          }

          if (typeof value == "number") {
            value = value.toFixed(2);
          }

          nutrients.push({ name: name, value: value });
        }
      }
    });
    return nutrients.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });
  },
  getAllergens(state) {
    if (Array.isArray(state.product.product.allergens)) {
      console.log(state.product.product.allergens);
      return state.product.product.allergens;
    }
    if (typeof state.product.product.allergens == "string") {
      console.log("allergers string", state.product.product.allergens);
      return [state.product.product.allergens];
    }
    return [];
  },
  getVitamins(state) {
    if (Array.isArray(state.product.product.vitamins_tags)) {
      console.log(state.product.product.vitamins_tags);
      return state.product.product.vitamins_tags.map(vitamin => {
        return vitamin.split(":")[1];
      });
    }
    return [];
  },
  getMinerals(state) {
    if (Array.isArray(state.product.product.minerals_tags)) {
      console.log(state.product.product.minerals_tags);
      return state.product.product.minerals_tags.map(mineral => {
        return mineral.split(":")[1];
      });
    }
    return [];
  }
};
