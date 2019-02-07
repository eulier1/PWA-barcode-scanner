<template>
  <div class="bg-orange-darkest text-center py-4 lg:px-4 relative z-50">
    <div
      class="p-2 bg-orange-darker items-center text-orange-lightest leading-none lg:rounded-full flex lg:inline-flex"
      role="alert"
    >
      <span class="flex rounded-full bg-orange uppercase px-2 py-1 text-xs font-bold mr-3">!</span>
      <span class="font-semibold mr-2 text-left flex-auto">{{msg}}</span>
      <svg
        class="fill-current h-6 w-6 text-orange"
        role="button"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        @click="$emit('click')"
      >
        <title>Close</title>
        <path
          d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: ["msg"]
};
</script>
