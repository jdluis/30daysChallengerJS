const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const redEffectBtn = document.querySelector('#redEffect');
const rgbSplitBtn = document.querySelector('#rgbSplit');


function getVideo () { /* Will give as the permission of the camara if the user accept it*/
    navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then(localMediaStream => {
        video.srcObject = localMediaStream
        //Is because the video.src dont understand de localMediaStream
        //So we manke the converstion to a url object.
        video.play();
    })
    .catch (err => {
        console.log(new Error(`What Happends?: ${err}`))
    })
}


function paintToCanvas () {
    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        //take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        //mess with them


        pixels = greenScreen(pixels);
       
        /* pixels = redEffect(pixels);  */
       
        pixels = rgbSplit(pixels);
        ctx.globalAlpha = 0.8;  //ghost effect
       
        
       //put them back
        ctx.putImageData(pixels, 0 , 0);
    }, 16);
}

function takePhoto () {
    //played the sound
    snap.currentTime = 0;
    snap.play();

    //take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg'); //devuelve una imagen
    const link = document.createElement('a');
    link.href = data;
    date = new Date;
    link.setAttribute('download', date.toLocaleDateString());
    link.textContent = 'Download Image';
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4) {
       pixels.data[i + 0] = pixels.data[i + 0] + 100; //red
       pixels.data[i + 1] = pixels.data[i + 1] - 50;  //green
       pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //blue
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for(i = 0; i < pixels.data.length; i = i + 4) {
       red = pixels.data[i + 0];
       green = pixels.data[i + 1];
       blue = pixels.data[i + 2];
       alpha = pixels.data[i + 3];

       if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
            //take it out
            pixels.data[i + 3] = 0;
        }
    }
    return pixels;
}

function rgbSplit(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4) {
       pixels.data[i - 150] = pixels.data[i + 0]; //red
       pixels.data[i + 200] = pixels.data[i + 1];  //green
       pixels.data[i - 350] = pixels.data[i + 2]; //blue
    }
    return pixels;
}
 /*
 el evento canplay hace que inmediatamente 
 despues de que video reciba la imagen se lance
 */
getVideo();

video.addEventListener('canplay', paintToCanvas);

