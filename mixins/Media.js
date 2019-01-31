/*
    MediaDevices.getUserMedia()
    https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
*/
export const MEDIA = {
  methods: {
    initializeMedia(ElemRef) {
      console.log("initializeMedia", ElemRef);
      if (!"mediaDevices" in navigator) {
        navigator.mediaDevices = {};
      }

      if (!("getUserMedia" in navigator.mediaDevices)) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          var getUserMedia =
            navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

          if (!getUserMedia) {
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
          let video = ElemRef;
          video.srcObject = mediaStream;
          video.onloadedmetadata = function(e) {
            video.play();
          };
        })
        .catch(function(err) {
          console.log(err.name + ": " + err.message);
        });
    }
  }
};
