<template>
  <section class="bg-landingpage">
    <app-title class="px-4"></app-title>
    <div v-if="showError" class="bg-orange-darkest text-center py-4 lg:px-4 relative z-50">
      <div
        class="p-2 bg-orange-darker items-center text-orange-lightest leading-none lg:rounded-full flex lg:inline-flex"
        role="alert"
      >
        <span class="flex rounded-full bg-orange uppercase px-2 py-1 text-xs font-bold mr-3">!</span>
        <span class="font-semibold mr-2 text-left flex-auto">{{errorMsg}}</span>
        <svg
          class="fill-current h-6 w-6 text-orange"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          @click="showError = false"
        >
          <title>Close</title>
          <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
          ></path>
        </svg>
      </div>
    </div>

    <h4 class="description text-grey-light px-4">Scan a barcode to get nutritional food value</h4>

    <input
      class="relative z-50 hidden"
      type="file"
      accept="image/*"
      id="image-picker"
      ref="image-picker"
    >
    <span class="flex justify-center">
      <button
        class="btn-camera bg-blue hover:bg-blue-light text-white font-bold py-2 px-4 border-b-4 border-blue-dark hover:border-blue rounded z-50"
        @click="capture($event)"
      >
        <img src="../static/camera.svg" alt="camera-icon" width="25px">
      </button>
    </span>

    <div class="camera-wrapper" ref="camera">
      <video id="player" ref="player" autoplay :class="{'hidden': isSnapshot}"></video>
      <canvas
        id="canvas"
        ref="canvas"
        :class="{'hidden': !isSnapshot, 'snapshot': isSnapshotTaken}"
      ></canvas>
    </div>
  </section>
</template>

<script>
import Quagga from "quagga";
import { MEDIA } from "../mixins/Media";
import Title from "@/components/Title.vue";

export default {
  components: {
    appTitle: Title
  },
  data() {
    return {
      isSnapshot: false,
      isSnapshotTaken: false,
      showError: false,
      errorMsg: ""
    };
  },
  mixins: [MEDIA],
  mounted() {
    this.initializeMedia(this.$refs.player);
  },
  methods: {
    initialState() {
      this.isSnapshot = false;
      this.isSnapshotTaken = false;
    },
    capture(ev) {
      this.isSnapshot = true;
      let canvas = this.$refs.canvas;
      let context = this.$refs.canvas.getContext("2d");
      let videoPlayer = this.$refs.player;
      context.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
      //videoPlayer.srcObject.getVideoTracks().forEach(track => {});
      //this.generateBarcode(canvas.toDataURL("image/jpeg", 1));
      this.isSnapshotTaken = true;
      this.goToProduct("3700279305420");
    },
    generateBarcode(dataURIjpg) {
      let self = this;
      dataURIjpg = dataURIjpg.replace("image/jpeg", "image/jpg");
      console.log("dataURIjpg", dataURIjpg);
      Quagga.decodeSingle(
        {
          numOfWorkers: 0, // Needs to be 0 when used within node
          decoder: {
            readers: ["ean_reader"] // List of active readers
          },
          locate: true, // try to locate the barcode in the image
          multiple: false,
          src: dataURIjpg //'/test/fixtures/code_128/image-001.jpg' or 'data:image/jpg;base64,' + data
        },
        function(result) {
          self.initialState();
          if (!result) {
            self.displayErrorAlert(
              self,
              `Couldn't detect the barcode, please try it again.`
            );
          }
          if (result.codeResult) {
            console.log("result", result.codeResult.code);
            self.goToProduct("3700279305420", self);
          } else {
            self.displayErrorAlert(
              self,
              `Couldn't detect the barcode, please try it again.`
            );
            console.log("not detected");
          }
        }
      );
    },
    goToProduct(barcode) {
      this.$store.dispatch("getProduct", barcode).then(product => {
        if (this.$store.state.product.status === 1) {
          this.$router.push({ path: `/product` });
        } else {
          this.displayErrorAlert(this, `Product not found`);
        }
      });
    },
    displayErrorAlert(self, msg) {
      self.showError = true;
      self.errorMsg = msg;
    }
  }
};
</script>

<style scoped>
.btn-camera {
  position: fixed !important;
  top: 80vh;
  padding: 0.8rem;
  z-index: 9999;
}

.btn-camera:active {
  border-bottom: 0;
  box-shadow: inset 0px 2px 0px #12283a;
  background: #1c3d5a;
}

.bg-landingpage {
  /* Rectangle */
  width: 100vw;
  height: 100vh;

  background-color: #3c444d;
  box-shadow: 0px 30px 40px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}

.title-name {
  top: 2rem;
  position: relative;
  margin: auto;
  width: 100%;
  z-index: 1;
}

.description {
  position: relative;
  top: 3.5rem;
  margin: auto;
  width: 100%;
  text-align: center;
  z-index: 1;
}

.camera-wrapper {
  /* Rectangle */
  position: absolute;
  width: 100vw;
  height: 100vh;
  margin: auto;
  left: 0;
  top: 0;

  background: #3c444d;
  box-shadow: 0px -10px 10px rgba(251, 241, 241, 0.25),
    0px 10px 10px rgba(242, 233, 233, 0.25);
}

video {
  position: absolute;
  width: 100vw;
  height: 100vh;
  margin: auto;
}

canvas {
  position: absolute;
  width: 75vw;
  height: 75vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.snapshot {
  animation: snapshot 0.3s, 0s, ease-out, forwards;
}

@keyframes snapshot {
  0% {
    opacity: 1;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
