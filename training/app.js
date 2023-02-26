const video = document.getElementById('webcam')
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded)
const options = { numLabels: 2 }
const label = document.getElementById("label")
let classifier

const donald = document.querySelector("#donald")
const katrien = document.querySelector("#katrien")
const dagobert = document.querySelector("#dagobert")


const trainbtn = document.querySelector("#train")
const savebtn = document.querySelector("#save")
const cnv= document.querySelector("#canvas")



const save_img= document.querySelector("#save_img")


donald.addEventListener("click", () => addDonald())
katrien.addEventListener("click", () => addKatrien())

dagobert.addEventListener("click", () => addDagobert())


trainbtn.addEventListener("click", () => train())
savebtn.addEventListener("click", ()=>save_model())


const canvasElement = document.getElementById('canvas');







const webcam = new Webcam(video, "user", canvasElement);
webcam.start()
   .then(result =>{
      console.log("webcam started");
   })
   .catch(err => {
       console.log(err);
   });


// if (navigator.mediaDevices.getUserMedia) {
//     navigator.mediaDevices.getUserMedia({ video: true })
//         .then((stream) => {
//             video.srcObject = stream
//         })
//         .catch((err) => {
//             console.log("Something went wrong!");
//         });
// }

function modelLoaded(){
    console.log("The mobileNet model is loaded!")
    classifier = featureExtractor.classification(options)
    //classifier.load("./model.json")
    //startClassifying()
   
}

function videoReady(){

    console.log(classifier)
}


function add_image(){
    const val = document.querySelector('input').value;
    classifier.addImage(video, val, addedImage)
    console.log(val+"  added")
}

function addDonald(){
    classifier.addImage(video, "Donald Duck", addedImage)
}

function addKatrien() {
    classifier.addImage(video, "Daisy Duck", addedImage)
}

function addDagobert() {
    classifier.addImage(video, "Scrooge McDuck", addedImage)
}

function train(){
    console.log("start training...")
    classifier.train((lossValue) => {
        console.log(lossValue)
        // if(lossValue == null){
        //     startClassifying()
        // }
    })
}

function save_model(){
    classifier.save()
}

function startClassifying(){
    setInterval(()=>{
        classifier.classify(video, (err, result)=>{
            if(err) console.log(err)
            console.log(result)
            var num = result[0].confidence * 100;
            num= num.toFixed(0)

            lab= result[0].label

            label.innerHTML = result[0].label+": "+ num
        })
    }, 1000)
}


function startClassifying_foto(){
    
        classifier.classify(take_from_mobile, (err, result)=>{
            if(err) console.log(err)
            console.log(result)
            var num = result[0].confidence * 100;
            num= num.toFixed(0)

            lab= result[0].label

            label.innerHTML = result[0].label+": "+ num
        })
   
}






function addedImage(){
    console.log("added image to network")
}