const PoseRecognizer = {
    pose: null,
    init: async _ => {
        const URL = "./model/";
        let model, webcam;
        
        const loop = async(timestamp)=>{
            webcam.update(); // update the webcam frame
            await predict();
            window.requestAnimationFrame(loop);
          }
      
          const predict = async ()=>{
            const { _pose } = await model.estimatePose(webcam.canvas);
            PoseRecognizer.pose = _pose;
          }
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmPose.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const size = 200;
        const flip = true; // whether to flip the webcam
        webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);
    },

}