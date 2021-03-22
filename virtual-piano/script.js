const piano = document.querySelector('.piano'),
      pianoKeys = document.querySelectorAll('.piano-key'),
      notesBtn = document.querySelector('.btn-notes'),
      lettersBtn = document.querySelector('.btn-letters'),
      fullscreenEnabled = document.fullscreenEnabled || 
      document.mozFullscreenEnabled || 
      document.webkitFullscreenEnabled;


function addActive(e) {
    const target = e.target;
    if (target.classList.contains('piano-key')) {
        target.classList.add('piano-key-active','piano-key-active-pseudo');
        if(target.dataset.note !== undefined) {
            playAudio(`assets/audio/${target.dataset.note}.mp3`);
        }
    }
}

// letters or Notes and fullscreen

document.addEventListener('click', (e)=>{
    const target = e.target;
    if (target.classList.contains('btn-letters')){
        notesBtn.classList.remove('btn-active');
        target.classList.add('btn-active');
        pianoKeys.forEach(element=>{
            element.classList.add('piano-key-letter');
        });
    }
    if (target.classList.contains('btn-notes')){
        lettersBtn.classList.remove('btn-active');
        target.classList.add('btn-active');
        pianoKeys.forEach(element=>{
            element.classList.remove('piano-key-letter');
        });
    }
   // fullscreen
   if (target.classList.contains('fullscreen')) {
    if(document.body.requestFullScreen) {
        document.body.requestFullScreen();
    } else if(document.body.mozRequestFullScreen) {
        document.body.mozRequestFullScreen();
    } else if(document.body.webkitRequestFullScreen) {
        document.body.webkitRequestFullScreen();
    }
    if (fullscreenEnabled) {
        if(document.cancelFullScreen) {
            document.cancelFullScreen();
          } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if(document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
    }
    
}
})

// mouse Events
piano.addEventListener('mousedown', (e)=>{
    const target = e.target;
    if(target.dataset.note !== undefined) {
        playAudio(`assets/audio/${target.dataset.note}.mp3`);
    }
    if (target.classList.contains('piano-key')) {
        target.classList.add('piano-key-active','piano-key-active-pseudo');
        
    }
    piano.addEventListener('mouseover', addActive); 
});

piano.addEventListener('mouseup', (e)=>{
    piano.removeEventListener('mouseover', addActive)
    const target = e.target;
    if (target.classList.contains('piano-key')) {
        target.classList.remove('piano-key-active','piano-key-active-pseudo');
    }
});
document.addEventListener('mouseout', (e)=>{
    const target = e.target;
    if (target.classList.contains('piano-key')) {
        target.classList.remove('piano-key-active','piano-key-active-pseudo');
    }
});

// keyboard events 
document.addEventListener('keydown',(e)=>{
    let keyPressed = '';
    if (e.code.substring(0,3) == 'Key') {
    keyPressed = document.querySelector(`[data-letter='${e.code[3]}']`);
    }
    if (keyPressed && !e.repeat) {
        playAudio(`assets/audio/${keyPressed.dataset.note}.mp3`);
        keyPressed.classList.add('piano-key-active','piano-key-active-pseudo');
    }
})

document.addEventListener('keyup',(e)=>{
    let keyPressed = '';
    if (e.code.substring(0,3) == 'Key') {
        keyPressed = document.querySelector(`[data-letter='${e.code[3]}']`);
        }
    if (keyPressed) {
        keyPressed.classList.remove('piano-key-active','piano-key-active-pseudo');
    }
})

// Audio func
function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}
