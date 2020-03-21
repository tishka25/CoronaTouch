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
        const leftEar = PoseRecognizer.pose.keypoints[3].position;
        const rightEar = PoseRecognizer.pose.keypoints[4].position;
        //Radius of the head
        let rHead = this.dist(leftEar.x, leftEar.y, rightEar.x, rightEar.y)/2;
        const nose = PoseRecognizer.pose.keypoints[0].position;

        //Radius of left hand
        let rLeftHand = 5;
        //Left hand coordinates
        let leftHand = 
        {
            x: 5,
            y: 5
        };

        //Radius of right hand
        let rRightHand = 5;
        //Right hand coordinates
        let rightHand = {
            x: 5,
            y: 5
        };

        let dRight = this.dist(rightHand.x, rightHand.y, nose.x, nose.y);
        let dLeft = this.dist(leftHand.x, lefttHand.y, nose.x, nose.y);
        console.log(dRight < rRightHand + rHead || dLeft < rLeftHand + rHead);
    }

    onDetectionTime(){
        if(PoseRecognizer.isLoaded && PoseRecognizer.pose)
            this._detectionHandler();
    }

}