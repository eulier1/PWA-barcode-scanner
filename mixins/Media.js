/*
    MediaDevices.getUserMedia()
    https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
*/
export const MEDIA = {
  data() {
    return {
      isCameraActive: false
    };
  },
  methods: {
    initializeMedia(ElemRef) {
      console.log("initializeMedia", ElemRef);
      let self = this;
      if (!"mediaDevices" in navigator) {
        navigator.mediaDevices = {};
      }

      if (!("getUserMedia" in navigator.mediaDevices)) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          var getUserMedia =
            navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

          if (!getUserMedia) {
            self.isCameraActive = false;
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }

          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }

      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function(mediaStream) {
          console.log(self);
          let video = ElemRef;
          video.srcObject = mediaStream;
          video.onloadedmetadata = function(e) {
            video.play();
          };
        })
        .catch(function(err) {
          console.log(err.name + ": " + err.message);
          self.isCameraActive = false;
        });
    }
  }
};
