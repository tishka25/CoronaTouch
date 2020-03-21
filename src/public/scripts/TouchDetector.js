class TouchDetector {
    constructor() {
        this._detectionTime = 200;
        this._detectionInterval = null;
        this.init = this.init.bind(this);
        this.onDetectionTime = this.onDetectionTime.bind(this);
        this._detectionHandler = this._detectionHandler.bind(this);
    }

    init() {
        //Init Pose recognition
        PoseRecognizer.init();
        //Register interval
        this._detectionInterval = setInterval(this.onDetectionTime, this._detectionTime);
    }

    dist(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }

    _detectionHandler() {
        const leftEar = PoseRecognizer.pose.keypoints[3].position;
        const rightEar = PoseRecognizer.pose.keypoints[4].position;
        //Radius of the head
        let rHead = this.dist(leftEar.x, leftEar.y, rightEar.x, rightEar.y) / 2;
        const nose = PoseRecognizer.pose.keypoints[0].position;

        // 0: {bbox: Array(4), class: 0, score: 0.9266628623008728}
        //         0: -0.11374056339263916
        // 1: 2.999335527420044
        // 2: 54.555895924568176
        // 3: 144.56116557121277
        // 1: {bbox: Array(4), class: 0, score: 0.695424497127533}
        //Radius of left hand
        let rLeftHand = PoseRecognizer.hands[0].bbox[2]
        //Left hand coordinates
        let leftHand = {
            x: PoseRecognizer.hands[0].bbox[0] + (PoseRecognizer.hands[0].bbox[2] / 2),
            y: PoseRecognizer.hands[0].bbox[1] + (PoseRecognizer.hands[0].bbox[3] / 2),
        };

        let thereIsAnother = false;
        if (PoseRecognizer.hands[1] ) {
            //Radius of right hand
            let rRightHand = PoseRecognizer.hands[1].bbox[2];
            //Right hand coordinates
            let rightHand = {
                x: PoseRecognizer.hands[1].bbox[0] + (PoseRecognizer.hands[1].bbox[2] / 2),
                y: PoseRecognizer.hands[1].bbox[1] + (PoseRecognizer.hands[1].bbox[3] / 2),
            };

            let dRight = this.dist(rightHand.x, rightHand.y, nose.x, nose.y);
            thereIsAnother = dRight < rRightHand + rHead;
        }

        let dLeft = this.dist(leftHand.x, leftHand.y, nose.x, nose.y);
        console.log( thereIsAnother || dLeft < rLeftHand + rHead);
        const canvas = document.getElementById("testVideo");
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#000000"; // Red color
        ctx.fillRect(0,0,window.innerWidth , window.innerHeight);
        ctx.fillStyle = "#ff2626"; // Red color
        ctx.fillRect(leftHand.x , leftHand.y , 10, 10);
        ctx.fillStyle = "#ffFFFF"; // Red color
        ctx.fillRect(nose.x , nose.y , 10 , 10);;
        
        // console.log(dLeft , leftHand);
    }

    onDetectionTime() {
        if (PoseRecognizer.isLoaded && PoseRecognizer.pose && PoseRecognizer.hands != null && PoseRecognizer.hands.length)
            this._detectionHandler();
    }

}