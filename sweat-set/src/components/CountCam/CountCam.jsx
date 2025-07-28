import Sketch from "react-p5";
import * as ml5 from "ml5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CountCam = ({userLoggedin}) => {
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5001/verify/verifyUser")
            .then((res) => {
                if (res.data.status) {
                    console.log("verified");
                } else {
                    navigate("/login");
                }
            })
            .catch((err) => {
                console.error(err);
                navigate("/login");
            });
    }, []);

    // Handle Submit after each session
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5001/pushup/data", {
                username: userLoggedin,
                exportPushCount:pushupCount,
                caloricBurn:pushupCount * 0.29,
            })
            .then((res) => {
                console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //Variables for P5
    let cnv;
    let capture;
    let cameraStarted = false;
    let startstopBtn;
    let bg_img;
    // Variables for ML5
    let poseNet;
    let leftShoulderX, leftShoulderY, rightShoulderX, rightShoulderY;
    let leftWristX, leftWristY, rightWristX, rightWristY;
    let leftElbowX, leftElbowY, rightElbowX, rightElbowY;
    let pushupCount = 0;
    let isPushup = false;


    // Setup Functions
    const setup = (p5) => {
        cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        styleCanvas();
        buttonFn(p5);
    };

    // ML5 Model
    const classifier = ml5.imageClassifier("MobileNet", function () {
        console.log("Model Loaded!");
    });

    // Preload Function
    const preload = (p5) => {
        bg_img = p5.loadImage("https://i.ibb.co/WkN6SCf/camera.png");
    };

    // ----- center canvas -----
    function centerCanvas(p5) {
        let x = (p5.windowWidth - p5.width) / 2;
        let y = (p5.windowHeight - p5.height) / 2;
        cnv.position(x, y);
    }

    // ----- start camera btn -----
    function buttonFn(p5) {
        startstopBtn = p5.createButton("Start Camera");

        // CSS styles for button
        startstopBtn.style("all", "unset");
        startstopBtn.style("background", "#ff4d4d");

        startstopBtn.style("color", "white");
        startstopBtn.style("width", "140px");
        startstopBtn.style("height", "40px");
        startstopBtn.style("text-align", "center");
        startstopBtn.style("text-decoration", "none");
        startstopBtn.style("display", "inline-block");
        startstopBtn.style("font-size", "17px");
        startstopBtn.style("cursor", "pointer");
        startstopBtn.style("border-radius", "5px");

        startstopBtn.style("transition", "background 0.3s ease");

        startstopBtn.mouseOver(() => {
            startstopBtn.style("background", "#eee");
            startstopBtn.style("color", "#ff4d4d");
        });

        startstopBtn.mouseOut(() => {
            startstopBtn.style("background", "#ff4d4d");
            startstopBtn.style("color", "#eee");
        });

        // Center the button
        let buttonX = (p5.windowWidth - startstopBtn.width) / 2;
        let buttonY =
            (p5.windowHeight - startstopBtn.height) / 2 +
            p5.windowHeight * 0.35 +
            40;
        startstopBtn.position(buttonX, buttonY);

        startstopBtn.mousePressed(() => startStopCamera(p5));
    }

    // ----- start camera -----
    function startStopCamera(p5) {
        if (!cameraStarted) {
            startCamera(p5);
            startstopBtn.html("Stop Camera");
        } else {
            if (capture) {
                capture.stop();
                capture.remove();
                capture = null;
            }
            if (poseNet) {
                poseNet.removeAllListeners();
                poseNet = null;
            }
            cameraStarted = false;
            startstopBtn.html("Start Camera");

            handleSubmit({ preventDefault: () => {} });
        }
    }

    function startCamera(p5) {
        if (!cameraStarted) {
            capture = p5.createCapture(p5.VIDEO, () => {
                capture.hide(); //capture is hidden once it's ready
            });

            // Set the size of the camera feed to maintain its aspect ratio
            let aspectRatio = capture.width / capture.height;
            let height = p5.windowHeight * 0.8;
            let width = height * aspectRatio;
            capture.size(width, height);

            cameraStarted = true;

            // poseNet method with a single detection
            poseNet = ml5.poseNet(capture, modelLoaded);
            poseNet.on("pose", gotPoses);

            function modelLoaded() {
                console.log("PoseNet Model Loaded!");
            }
        } else {
            capture.stop();
            capture.remove();
            cameraStarted = false;
        }
    }

    // ----- ML5 Poses -----
    function gotPoses(poses, error) {
        if (error) {
            console.error(error);
            return;
        }

        if (poses.length > 0) {
            console.log(poses);
            let singlePose = poses[0];

            let leftShoulder = singlePose.pose.leftShoulder;
            let rightShoulder = singlePose.pose.rightShoulder;

            let leftWrist = singlePose.pose.leftWrist;
            let rightWrist = singlePose.pose.rightWrist;

            let leftElbow = singlePose.pose.leftElbow;
            let rightElbow = singlePose.pose.rightElbow;

            console.log("Left Shoulder X:", leftShoulder.x);
            console.log("Left Shoulder Y:", leftShoulder.y);
            console.log("Right Shoulder X:", rightShoulder.x);
            console.log("Right Shoulder Y:", rightShoulder.y);

            console.log("Left Wrist X:", leftWrist.x);
            console.log("Left Wrist X:", leftWrist.x);
            console.log("Right Wrist X:", rightWrist.x);
            console.log("Right Wrist Y:", rightWrist.y);

            leftShoulderX = leftShoulder.x;
            leftShoulderY = leftShoulder.y;
            rightShoulderX = rightShoulder.x;
            rightShoulderY = rightShoulder.y;

            leftWristX = leftWrist.x;
            leftWristY = leftWrist.y;
            rightWristX = rightWrist.x;
            rightWristY = rightWrist.y;

            leftElbowX = singlePose.pose.leftElbow.x;
            leftElbowY = singlePose.pose.leftElbow.y;
            rightElbowX = singlePose.pose.rightElbow.x;
            rightElbowY = singlePose.pose.rightElbow.y;

            // Count Pushups
            if (leftWristY > leftShoulderY && rightWristY > rightShoulderY) {
                isPushup = true;
            } else if (
                leftWristY < leftShoulderY &&
                rightWristY < rightShoulderY &&
                isPushup
            ) {
                isPushup = false;
                pushupCount++;
                console.log("Pushup Count:", pushupCount);
            }
        }
    }

    // ----- style canvas -----
    function styleCanvas() {
        cnv.elt.style.border = "3px solid #ff4d4d";
        cnv.elt.style.borderRadius = "5px";
    }

    // Draw Functions
    const draw = (p5) => {
        p5.background(0);
        centerCanvas(p5);

        // fix img
        let imgWidth, imgHeight;
        let sizeFactor = 0.6;
        if (!cameraStarted && bg_img) {
            if (bg_img.width > bg_img.height) {
                imgWidth = p5.width * sizeFactor;
                imgHeight = bg_img.height * (imgWidth / bg_img.width);
            } else {
                imgHeight = p5.height * sizeFactor;
                imgWidth = bg_img.width * (imgHeight / bg_img.height);
            }

            let imgX = (p5.width - imgWidth) / 2;
            let imgY = (p5.height - imgHeight) / 2;

            p5.image(bg_img, imgX, imgY, imgWidth, imgHeight);

            let transparency = 0.7;
            p5.tint(255, 255 * (1 - transparency));
        }

        // camera
        if (capture) {
            p5.tint(255, 255);
            p5.push();
            p5.translate(p5.width, 0);
            p5.scale(-1, 1);
            p5.image(capture, 0, 0, p5.width, p5.height);
            p5.pop();
        }

        // draw the keypoints
        if (cameraStarted) {
            // for shoulder
            if (leftShoulderX && leftShoulderY) {
                p5.fill(0, 255, 0); // Green color
                p5.ellipse(leftShoulderX, leftShoulderY, 10);
            }
            if (rightShoulderX && rightShoulderY) {
                p5.fill(0, 255, 0); // Green color
                p5.ellipse(rightShoulderX, rightShoulderY, 10);
            }

            // for wrist
            if (
                (leftWristX && leftWristY) ||
                (rightWristX && rightWristY) ||
                (leftElbowX && leftElbowY) ||
                (rightElbowX && rightElbowY) ||
                (leftShoulderX && leftShoulderY) ||
                (rightShoulderX && rightShoulderY)
            ) {
                p5.fill(255, 0, 0); // Red color
                p5.ellipse(leftWristX, leftWristY, 10);
                p5.line(leftWristX, leftWristY, leftElbowX, leftElbowY);
                p5.line(rightWristX, rightWristY, rightElbowX, rightElbowY);
                p5.line(leftElbowX, leftElbowY, leftShoulderX, leftShoulderY);
                p5.line(
                    rightElbowX,
                    rightElbowY,
                    rightShoulderX,
                    rightShoulderY
                );
            }
            if (rightWristX && rightWristY) {
                p5.fill(255, 0, 0); // Red color
                p5.ellipse(rightWristX, rightWristY, 10);
            }

            if (leftElbowX && leftElbowY) {
                p5.fill(0, 0, 255); // Blue color
                p5.ellipse(leftElbowX, leftElbowY, 10);
            }
            if (rightElbowX && rightElbowY) {
                p5.fill(0, 0, 255); // Blue color
                p5.ellipse(rightElbowX, rightElbowY, 10);
            }
        }

        // Pushup Count
        p5.fill("#ff4d4d");
        p5.textSize(32);
        p5.textStyle(p5.BOLD);
        p5.text("Push-ups: " + pushupCount, 15, 40);
    };

    return (
        <div>
            <Sketch preload={preload} setup={setup} draw={draw} />
        </div>
    );
};

export default CountCam;
