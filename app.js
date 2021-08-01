// variable to know, if the soundscape is played or not
let isPlaying = false;

// create Audio Elements:

// birds (every second file is same as first file; created to make a loop)
const birdsOne = new Audio();
const birdsTwo = new Audio();

// weather
const weatherOne = new Audio();
const weatherTwo = new Audio();

// wind
const windOne = new Audio();
const windTwo = new Audio();

// water
const waterOne = new Audio();
const waterTwo = new Audio();

// trees
const treesOne = new Audio();
const treesTwo = new Audio();

// set Attributes (for Debugging):
/*
weatherOne.setAttribute('designator', 'rain1');
weatherTwo.setAttribute('designator', 'rain2');

windOne.setAttribute('designator', 'wind1');
windTwo.setAttribute('designator', 'wind2');

birdsOne.setAttribute('designator', 'birds1');
birdsTwo.setAttribute('designator','birds2');

treesOne.setAttribute('designator', 'trees1');
treesTwo.setAttribute('designator', 'trees2');

waterOne.setAttribute('designator', 'water1');
waterTwo.setAttribute('designator', 'water2');
*/




function createForest(){
    //console.log('Enter function create Forest() ...');
    // get all the user input values
    const birdsValue = document.getElementById('birdsInput').value;
    const waterValue = document.getElementById('waterInput').value;
    const windValue = document.getElementById('windInput').value;
    const treesValue = document.getElementById('treesInput').value;
    const weatherValue = document.getElementById('weatherInput').value;

    // and create a forest based on the values:
    const forest = {
        birds: birdsValue,
        water: waterValue,
        wind: windValue,
        trees: treesValue,
        weather: weatherValue
    };
    // return the forest object (will be saved in a variable)
    return forest;
}


function insertRandomInputValues(){
    // console.log('Enter function insertRandomInputValues() ...');
    // random values between 0 .. 100 insert in all input-fields
    const forestAttributes = document.getElementsByTagName('input');

    // loop thru all inputs and set the input value to a random number
    for(i = 0; i < forestAttributes.length; i++){
        forestAttributes[i].value = Math.floor(Math.random() * 101) // return random integer between 0 and 100 and insert as value
    }
}


// when the Random-Forest Button is clicked:
function randomButtonAction(){
    // console.log('Enter function randomButtonAction() ...');
    insertRandomInputValues();
    
    // if isPlaying is false then simply run startForest() 
    // else stop it and start it ...
    if (isPlaying == false){
        startMyForest();
    } else {
        stopMyForest().then(startMyForest());
    }
}



// play a loop, based on two files (they share the same audio file)
// the next file will start playing just a bit before the current file will end...
// the function will call itself, but with changed parameters
function playLoop(sound1, sound2){
    // console.log('Playing', sound1.getAttribute('designator'));
    sound1.play();
    sound1.ontimeupdate = function (){
        // console.log(sound1.getAttribute('designator'), ':', sound1.currentTime);
        // double check 'isPlaying' due to an occured error, when the stop button has been clicked,
        // in 1 of 99 cases, an audio element keeps on playing
        // to check this twice: if global variable isPlaying is false: stop playing...
        if (isPlaying == false){
            sound1.pause();
            // console.log('Enter isPlaying() == false.. in playLoop-function');
        } else {
            const buffer = 1.45; // 1.36 
            if (sound1.currentTime > sound1.duration - buffer){
                sound1.ontimeupdate = null;
                if (isPlaying){ // prevent new call of playLoop when stop button is clicked and asynchron function call is executed shortly after stopping;
                    // console.log('Preparing : ', sound2.getAttribute('designator'));
                    playLoop(sound2, sound1);
                }
            }
        }
    }
}


/*---------------------------------- */
/* Functions to select audio files   */

function selectBirdsAudio(value){
    if(value > 85){
        return './audio/birds5.ogg';
    } else if (value > 75){
        return './audio/birds4.ogg';
    } else if (value > 65){
        return './audio/birds3.ogg';
    } else if (value > 45){
        return './audio/birds2.ogg';
    } else if (value > 10){
        return './audio/birds1.ogg';
    } else {
        return './audio/silence.ogg';
    }
}

function selectWeatherAudio(value){
    if(value > 90){
        return './audio/rain5.ogg';
    } else if (value > 80){
        return './audio/rain4.ogg';
    } else if (value > 70){
        return './audio/rain3.ogg';
    } else if (value > 60){
        return './audio/rain2.ogg';
    } else if (value > 50){
        return './audio/rain1.ogg';
    } else {
        return './audio/silence.ogg';
    }
}

function selectTreesAudio(value){
    if(value > 90){
        return './audio/trees3.ogg';
    } else if (value > 75){
        return './audio/trees2.ogg';
    } else if (value > 60){
        return './audio/trees1.ogg';
    } else {
        return './audio/silence.ogg';
    }
}

function selectWaterAudio(value){
    if(value > 90){
        return './audio/water4.ogg';
    } else if (value > 75){
        return './audio/water3.ogg';
    } else if (value > 60){
        return './audio/water2.ogg';
    } else if (value > 45){
        return './audio/water1.ogg';
    } else {
        return './audio/silence.ogg';
    }
}

function selectWindAudio(value){
    if(value > 90){
        return './audio/wind4.ogg';
    } else if (value > 70){
        return './audio/wind3.ogg';
    } else if (value > 60){
        return './audio/wind2.ogg';
    } else if (value > 40){
        return './audio/wind1.ogg';
    } else {
        return './audio/silence.ogg';
    }
}

function stopMyForest(){
    // console.log('Enter function stopMyForest() to stop playback loop...');
    isPlaying = false;

    // halt the audio files => double check in the function playLoop() above to halt definitive the audio files
    birdsOne.pause();
    birdsTwo.pause();
    windOne.pause();
    windTwo.pause();
    treesOne.pause();
    treesTwo.pause();
    waterOne.pause();
    waterTwo.pause();
    weatherOne.pause();
    weatherTwo.pause();

    document.getElementById('startButton').innerText = 'PLAY'; // change inner Text of Button to 'PLAY'
    // button is now a play-Button, where we can start the forest audio again....
    document.getElementById('startButton').removeEventListener('click', stopMyForest); // remove function stop
    document.getElementById('startButton').addEventListener('click', startMyForest);

}



function startMyForest(){
    // console.log('Enter startMyForest() ...');

    document.getElementById('startButton').innerText = 'STOP'; // change inner Text, to show new function of that button (see below)

    isPlaying = true;

    const myForest = createForest();


    // Audio elements settings
    // birds
    birdsOne.src = selectBirdsAudio(myForest.birds);
    birdsTwo.src = birdsOne.src;
    birdsOne.volume = myForest.birds / 100;
    birdsTwo.volume = birdsOne.volume;

    // weather
    weatherOne.src = selectWeatherAudio(myForest.weather);
    weatherTwo.src = weatherOne.src;
    weatherOne.volume = myForest.weather / 100;  
    weatherTwo.volume = weatherOne.volume;

    // wind
    windOne.src = selectWindAudio(myForest.wind);
    windTwo.src = windOne.src;
    windOne.volume = myForest.wind / 100;
    windTwo.volume = windOne.volume;


    // water
    waterOne.src = selectWaterAudio(myForest.water);
    waterTwo.src = waterOne.src;
    waterOne.volume = myForest.water / 100;
    waterTwo.volume = waterOne.volume;

    // trees
    treesOne.src = selectTreesAudio(myForest.trees)
    treesTwo.src = treesOne.src;
    treesOne.volume = myForest.trees / 100;
    treesTwo.volume = treesOne.volume;


    // Initialize functions / start play Loops:
    playLoop(birdsOne, birdsTwo);
    playLoop(windOne, windTwo);
    playLoop(treesOne, treesTwo);
    playLoop(weatherOne, weatherTwo);
    playLoop(waterOne, waterTwo);


    // change Start-Button to a Stop-Button with function to stop all audio
    document.getElementById('startButton').removeEventListener('click', startMyForest);
    document.getElementById('startButton').addEventListener('click', stopMyForest);

}

function closeModal(){
    document.getElementById('infoModal').style.display='none';
}

function openModal(){
    document.getElementById('infoModal').style.display='block';
}


// add event-listeners to elements
function addHandlers(){
    // console.log('Enter function addHandlers()...');
    document.getElementById('startButton').addEventListener('click', startMyForest);
    document.getElementById('randomButton').addEventListener('click', randomButtonAction);
    
    // add event listeners to the inputs; if user changes input, then a function will be called
    const inputFields = document.getElementsByTagName('input');
    for (i = 0; i < inputFields.length; i++){
        inputFields[i].addEventListener('input', () => {
            // console.log('User Input received');
            // if isPlaying is false then simply run startForest() by automatically clicking on button:
            // else if files are playing, then stop (stopMyForest) and startmyForest with new inputs (2 clicks on start button)
            if (isPlaying == false){
                document.getElementById('startButton').click();
            } else {
                document.getElementById('startButton').click();
                document.getElementById('startButton').click();
            }
        })
    }

    // modal show up and hide handler:
    document.getElementById('closeModalButton').addEventListener('click', closeModal);
    document.getElementById('openModalButton').addEventListener('click', openModal);
}


// add primary eventListener:
addEventListener('load', addHandlers);
