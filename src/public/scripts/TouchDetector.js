class TouchDetector{
    constructor(){
        this._detectionTime = 200;
        this._detectionInterval = null;
        this.init = this.init.bind(this);
        this.onDetectionTime = this.onDetectionTime.bind(this);
        this._detectionHandler = this._detectionHandler.bind(this);
    }

    init(){
        //Init Pose recognition
        PoseRecognizer.init();
        //Register interval
        this._detectionInterval = setInterval(this.onDetectionTime , this._detectionTime);
    }

    dist(x1,y1,x2,y2){
        return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
    }

    _detectionHandler(){
        const leftWrist = PoseRecognizer.pose.keypoints[9].position;
        const leftEar = PoseRecognizer.pose.keypoints[3].position;
        const distance = this.dist(leftEar.x , leftEar.y , leftWrist.x , leftWrist.y);
        console.log(distance);
    }

    onDetectionTime(){
        if(PoseRecognizer.isLoaded && PoseRecognizer.pose)
            this._detectionHandler();
    }

}