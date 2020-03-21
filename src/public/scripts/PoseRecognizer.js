const PoseRecognizer = {
    pose: null,
    isLoaded: false,
    init: async _ => {
        const URL = "./model/";
        let model, webcam;

        const loop = async (timestamp) => {
            webcam.update(); // update the webcam frame
            await predict();
            window.requestAnimationFrame(loop);
        }

        const predict = async () => {
            const { pose } = await model.estimatePose(webcam.canvas);
            PoseRecognizer.isLoaded = true;
            PoseRecognizer.pose = pose;
        }

        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmPose.load(modelURL, metadataURL);

        // Convenience function to setup a webcam
        const size = 200;
        const flip = false; // whether to flip the webcam
        webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);
    },

}