const buttonPlay = document.querySelector('.play')
const buttonPause = document.querySelector('.pause')
const buttonStop = document.querySelector('.stop')
const buttonAddFive = document.querySelector('.add-five')
const buttonRemoveFive = document.querySelector('.remove-five')
const buttonForest = document.querySelector('.forest')
const buttonRain = document.querySelector('.rain')
const buttonCoffeeShop = document.querySelector('.coffee-shop')
const buttonFireplace = document.querySelector('.fireplace')
const minutesDisplay = document.querySelector('#minutes')
const secondsDisplay = document.querySelector('#seconds')

// light-dark-modes
const buttonLight = document.querySelector('.light-button')
const buttonDark = document.querySelector('.dark-button')
const body = document.querySelector('body')
const spans = document.querySelectorAll('span');
const controlsButtonSvgPath = document.querySelectorAll('.controls button svg path')
const controlsButton = document.querySelectorAll('.controls button')
const soundsButtonSvgPath = document.querySelectorAll('.sounds button svg path')
const soundsButton = document.querySelectorAll('.sounds button')
// Timer functions

let timerTimeOut
let minutes = Number(minutesDisplay.textContent)

function updateDisplay(minutes, seconds) {
  minutesDisplay.textContent = String(minutes).padStart(2, "0")
  secondsDisplay.textContent = String(seconds).padStart(2, "0")
}

function reset() {
  updateDisplay(minutes, 0)
  clearTimeout(timerTimeOut)
}

function countdown(){
  timerTimeOut = setTimeout(function() {
    let seconds =  Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)
    let timeIsUp = minutes <= 0 && seconds <= 0

    updateDisplay(minutes, 0)

    if (timeIsUp) {
      reset()
      return
    }

    if( seconds <= 0 ) {
      seconds = 60
      --minutes
    }

    updateDisplay(minutes, String(seconds - 1))

    countdown()
  }, 1000)
}

function hold() {
  clearTimeout(timerTimeOut)
}

function addFiveMinutes() {
  let currentMinutes = Number(minutesDisplay.textContent)
  let currentSeconds = Number(secondsDisplay.textContent)
  let newMinutes = currentMinutes + 5
  updateDisplay(newMinutes, currentSeconds)
}

function removeFiveMinutes() {
  let currentMinutes = Number(minutesDisplay.textContent)
  let currentSeconds = Number(secondsDisplay.textContent)
  if (currentMinutes <= 0)  {
    return
  } else if (currentMinutes <= 5 && currentSeconds >= 0) {
    return
  }
  let newMinutes = currentMinutes - 5
  updateDisplay(newMinutes, currentSeconds)
}

// sound functions

const forestAudio = new Audio("./assets/Floresta.wav")
const rainAudio = new Audio("./assets/Chuva.wav")
const coffeeShopAudio = new Audio("./assets/Cafeteria.wav")
const fireplaceAudio = new Audio("./assets/Lareira.wav")
const volumeSliderForest = document.querySelector('#volumeSliderForest')
const volumeSliderRain = document.querySelector('#volumeSliderRain')
const volumeSliderCoffeeShop = document.querySelector('#volumeSliderCoffeeShop')
const volumeSliderFireplace = document.querySelector('#volumeSliderFireplace')


volumeSliderForest.addEventListener("input", function() {
  const volume = volumeSliderForest.value / 100; 
  forestAudio.volume = volume;
});

volumeSliderRain.addEventListener("input", function() {
  const volume = volumeSliderRain.value / 100; 
  rainAudio.volume = volume;
});

volumeSliderCoffeeShop.addEventListener("input", function() {
  const volume = volumeSliderCoffeeShop.value / 100; 
  coffeeShopAudio.volume = volume;
});

volumeSliderFireplace.addEventListener("input", function() {
  const volume = volumeSliderFireplace.value / 100; 
  fireplaceAudio.volume = volume;
});


const forestAudioPlay = () => {
  forestAudio.volume = volumeSliderForest.value / 100;
  forestAudio.play()
  forestAudio.loop = true
}

const forestAudioStop = () => {
  forestAudio.pause()
}


const rainAudioPlay = () => {
  rainAudio.volume = volumeSliderRain.value / 100;
  rainAudio.play()
  rainAudio.loop = true
}

const rainAudioStop = () => {
  rainAudio.pause()
}


const coffeeShopAudioPlay = () => {
  coffeeShopAudio.volume = volumeSliderCoffeeShop.value / 100;
  coffeeShopAudio.play()
  coffeeShopAudio.loop = true
}

const coffeeShopAudioStop = () => {
  coffeeShopAudio.pause()
}


const fireplaceAudioPlay = () => {
  fireplaceAudio.volume = volumeSliderFireplace.value / 100;
  fireplaceAudio.play()
  fireplaceAudio.loop = true
}

const fireplaceAudioStop = () => {
  fireplaceAudio.pause()
}


let isPlaying = false
function playPauseAudio(pause, play) {
  if(isPlaying) {
    pause()
    isPlaying = false
  } else {
    play()
    isPlaying = true
  }
}

function toggleBgColorForest() {
  buttonForest.classList.toggle('forest-bg-audio')
}

function toggleBgColorRain() {
  buttonRain.classList.toggle('rain-bg-audio')
}

function toggleBgColorCoffeeShop() {
  buttonCoffeeShop.classList.toggle('coffee-shop-bg-audio')
}

function toggleBgColorFireplace() {
  buttonFireplace.classList.toggle('fireplace-bg-audio')
}


// events

buttonPlay.addEventListener('click', function() {
  countdown();
})

buttonPause.addEventListener('click', function() {
  hold()
})

buttonAddFive.addEventListener('click', function() {
  addFiveMinutes()
})

buttonRemoveFive.addEventListener('click', function() {
  removeFiveMinutes()
})

buttonForest.addEventListener('click', function() {
  playPauseAudio(forestAudioStop, forestAudioPlay)
  toggleBgColorForest()
})

buttonRain.addEventListener('click', function() {
  playPauseAudio(rainAudioStop, rainAudioPlay)
  toggleBgColorRain()
})

buttonCoffeeShop.addEventListener('click', function() {
  playPauseAudio(coffeeShopAudioStop, coffeeShopAudioPlay)
  toggleBgColorCoffeeShop()
})

buttonFireplace.addEventListener('click', function() {
  playPauseAudio(fireplaceAudioStop, fireplaceAudioPlay)
  toggleBgColorFireplace()
})

// Light-mode features

buttonLight.addEventListener('click', function() {
  body.classList.add('dark-body')
  spans.forEach(function(span) {
    span.classList.add('dark-span')
  });
  controlsButtonSvgPath.forEach(function(control) {
    control.classList.add('dark-controls')
  });
  controlsButton.forEach(function(control) {
    control.classList.remove('light-controls-bg')
    control.classList.add('dark-controls-bg')
  });
  soundsButtonSvgPath.forEach(function(sound) {
    sound.classList.add('dark-sounds')
  });
  soundsButton.forEach(function(sound) {
    sound.classList.remove('light-sounds-bg')
    sound.classList.add('dark-sounds-bg')
  })
  buttonLight.classList.add('hide');
  buttonDark.classList.remove('hide');
})

// Dark-mode features

buttonDark.addEventListener('click', function() {
  body.classList.remove('dark-body')
  spans.forEach(function(span) {
    span.classList.remove('dark-span')
  });
  controlsButtonSvgPath.forEach(function(control) {
    control.classList.remove('dark-controls')
  });
  controlsButton.forEach(function(control) {
    control.classList.add('light-controls-bg')
    control.classList.remove('dark-controls-bg')
  });
  soundsButtonSvgPath.forEach(function(sound) {
    sound.classList.remove('dark-sounds')
  });
  soundsButton.forEach(function(sound) {
    sound.classList.add('light-sounds-bg')
    sound.classList.remove('dark-sounds-bg')
  })
  soundsButtonSvgPath.forEach(function(sound) {
    sound.classList.remove('dark-sounds-bg')
  });
  buttonLight.classList.remove('hide')
  buttonDark.classList.add('hide')
})



