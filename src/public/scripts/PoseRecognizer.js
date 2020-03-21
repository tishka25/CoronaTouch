const PoseRecognizer = {
    pose: null,
    hands: null,
    isLoaded: false,
    init: async _ => {
        const URL = "./model/";
        let model, webcam, handTrackModel;

        const loop = async (timestamp) => {
            webcam.update(); // update the webcam frame
            await predict();
            window.requestAnimationFrame(loop);
        }

        const predict = async () => {
            const { pose } = await model.estimatePose(webcam.canvas);
            const handPredictions = await handTrackModel.detect(webcam.canvas);
            PoseRecognizer.isLoaded = true;
            // console.log(pose , handPredictions);
            PoseRecognizer.pose = pose;
            PoseRecognizer.hands = handPredictions;
        }

        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmPose.load(modelURL, metadataURL);

        const modelParams = {
            flipHorizontal: false,   // flip e.g for video  
            maxNumBoxes: 10,        // maximum number of boxes to detect
            imageScaleFactor: 0.7,
            iouThreshold: 0.5,      // ioU threshold for non-max suppression
            scoreThreshold: 0.7,    // confidence threshold for predictions.
        }
        handTrackModel = await handTrack.load(modelParams);
        console.log(handTrackModel.detect);

        // Convenience function to setup a webcam
        const size = 200;
        const flip = false; // whether to flip the webcam
        webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);
    },

}