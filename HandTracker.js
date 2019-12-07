navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

const modelParams = {
    flipHorizontal: true, // flip e.g for video 
    imageScaleFactor: 0.7, // reduce input image size for gains in speed.
    maxNumBoxes: 20, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.79, // confidence threshold for predictions.
}
//Select everything in the HTML
const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

//Train AI to this model to detect hand movement
let newModel;

handTrack.startVideo(video)
    .then(status => {
        if (status) {
            navigator.getUserMedia({
                    video: {}
                }, stream => {
                    video.srcObject = stream;
                    setInterval(playVideo, 1000);
                },
                err => console.log(err)
            );
        }
    });

const playVideo = () => {
    newModel.detect(video)
        .then(predictions => {
            console.log(predictions);
            if (predictions.length > 0) {
                audio.play();
            }
            //newModel.renderPredictions(predictions, canvas, context, video);
        });
}

handTrack.load(modelParams).then(model => {
    newModel = model;
});