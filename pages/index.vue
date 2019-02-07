<template>
  <main>
    <section v-show="isCameraActive" class="bg-landingpage">
      <app-title class="px-4"></app-title>

      <transition name="slide-fade">
        <appAlert v-if="showError" :msg="errorMsg" @click="showError = false"></appAlert>
      </transition>

      <h4
        v-if="!showError"
        class="description text-grey-light px-4"
      >Scan a barcode to get nutritional food value</h4>

      <input
        class="relative z-50 hidden"
        type="file"
        accept="image/*"
        id="image-picker"
        ref="image-picker"
      >
      <span class="flex justify-center">
        <button
          v-if="isLoading === 'false'"
          class="btn-camera bg-blue hover:bg-blue-light text-white font-bold py-2 px-4 border-b-4 border-blue-dark hover:border-blue rounded z-50"
          @click="capture($event)"
        >
          <img src="../static/camera.svg" alt="camera-icon" width="25px">
        </button>
        <button
          v-if="isLoading === 'loading'"
          class="btn-camera bg-grey hover:bg-grey-light text-white font-bold py-2 px-4 border-b-4 border-grey-dark hover:border-grey rounded z-50"
        >. . .</button>
        <button
          v-if="isLoading === 'done'"
          class="btn-camera bg-green hover:bg-green-light text-white font-bold py-2 px-4 border-b-4 border-green-dark hover:green-blue rounded z-50"
        >
          <img src="../static/done.svg" alt="camera-icon" width="25px">
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
    <app-error
      v-show="!isCameraActive"
      @activate-camera="isCameraActive = true; initializeMedia($refs.player)"
    ></app-error>
  </main>
</template>

<script>
import Quagga from "quagga";
import { MEDIA } from "../mixins/Media";
import Alert from "@/components/Alert.vue";
import Title from "@/components/Title.vue";
import Error from "@/components/Error.vue";
import { setInterval } from "timers";

export default {
  components: {
    appAlert: Alert,
    appTitle: Title,
    appError: Error
  },
  data() {
    return {
      isSnapshot: false,
      isSnapshotTaken: false,
      isLoading: "false",
      showError: false,
      errorMsg: ""
    };
  },
  mixins: [MEDIA],
  methods: {
    initialState() {
      this.isSnapshot = false;
      this.isSnapshotTaken = false;
      this.isLoading = "false";
    },
    capture(ev) {
      this.isLoading = "loading";
      this.isSnapshot = true;
      let canvas = this.$refs.canvas;
      let context = this.$refs.canvas.getContext("2d");
      let videoPlayer = this.$refs.player;
      context.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
      //videoPlayer.srcObject.getVideoTracks().forEach(track => {});
      this.generateBarcode(canvas.toDataURL("image/jpeg", 1));
      //this.goToProduct("3560070955589"); //"3700279305420"
    },
    generateBarcode(dataURIjpg) {
      let self = this;
      dataURIjpg = dataURIjpg.replace("image/jpeg", "image/jpg");
      //console.log("dataURIjpg", dataURIjpg);
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
          if (!result) {
            self.initialState();
            self.displayErrorAlert(
              self,
              `Couldn't detect the barcode, please try it again.`
            );
          }
          if (result.codeResult) {
            self.goToProduct(result.codeResult.code);
          } else {
            self.initialState();
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
      console.log(barcode);
      this.$store
        .dispatch("getProduct", barcode)
        .then(product => {
          console.log(this.$store.state.product);
          this.isLoading = "done";

          if (this.$store.state.product.status === 1) {
            this.isSnapshotTaken = true;
            let self = this;
            setTimeout(() => {
              self.$router.push({ path: `/product` });
            }, 375);
          } else {
            this.initialState();
            this.displayErrorAlert(this, `Product not found`);
          }
        })
        .catch(err => {
          console.log(err);
          this.initialState();
          this.displayErrorAlert(this, `Network Error`);
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
main {
  background-color: #f3f3f3;
}

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

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
