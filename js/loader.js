var click = new Audio();
    click.src = 'audio/click.wav';

var sizePage=document.getElementById('size-page');
sizePage.addEventListener('click',funSizePage);

function funSizePage(EO){
    EO=EO||window.event;
    if(!(document.getElementById('audio-off').classList.contains('done'))){
        click.play();
    }
    var full=document.getElementById('full');
    var exitFull=document.getElementById('exit-full');
    if(full.classList.contains('done')){
        full.classList.remove('done');
        exitFull.classList.remove('done');
        cancelFullscreen();

    }else{
        full.classList.add('done');
        exitFull.classList.add('done');
        document.body.requestFullscreen();

    }
}

function cancelFullscreen() {
    if(document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }

document.body.onload=function(){
    setTimeout(function(){
        var boxPreload=document.getElementById('boxPreload');
        var cntue = document.getElementById('cntue');
        if(!boxPreload.classList.contains('done')){
            boxPreload.classList.add('done');
            cntue.classList.add('close');
        }
            var buttonsRecAud=document.getElementById('buttons-rec-aud');
            buttonsRecAud.classList.add('done');
       
    },800);
};

var preload = document.getElementById('preload');
var boxPreload = document.getElementById('boxPreload');

var cntue = document.getElementById('cntue');

cntue.addEventListener('click', contFun, false);
function contFun(EO){
    if(!(document.getElementById('audio-off').classList.contains('done'))){
        click.play();
    }
    EO = EO || window.event;
    var loader=document.getElementById('loader');
    loader.classList.add('done');
    cntue.classList.add('done');
}

