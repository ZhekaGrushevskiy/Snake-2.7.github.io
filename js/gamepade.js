var gamepade=document.getElementById('gamepade');



window.addEventListener('resize',fun);

function fun(EO){
    EO=EO||window.event;

    var fieldHeight=document.getElementById('box-content');
    document.getElementById('press-swipe').style.top=fieldHeight.offsetHeight-15+'px';
    
    var checkInput=document.getElementById('checkInput');
    checkInput.addEventListener('click',funCheckBox);

    if(window.innerWidth<500 ){

        if(document.getElementById('press-swipe').classList.contains('done')){
            document.getElementById('img-swipe').classList.add('done');
        }else{
            document.getElementById('img-swipe').classList.remove('done');
        }

        gamepade.classList.add('done');
        if(checkInput.checked){
            gamepade.style.height=window.innerHeight-fieldHeight.offsetHeight-30+'px';
        }else{
            gamepade.style.height=0;
            document.getElementById('img-swipe').style.display='block';

        }
        gamepade.style.top=fieldHeight.offsetHeight+20+'px';
        document.getElementById('pauseLand').classList.remove('done');
    }else {
        document.getElementById('img-swipe').style.display='none';


        gamepade.classList.remove('done');
        document.getElementById('pauseLand').classList.add('done');
    } 
}

setInterval(function(){
    fun();
    },100);



function funCheckBox(EO){
    EO=EO||EO.event;
    if(!(checkInput.checked)){
        checkInput.checked=false;
        gamepade.style.width=100+'%';
        document.getElementById('butTable').classList.remove('done');
    }else if(checkInput.checked){
        checkInput.checked=true;
        gamepade.style.width=100+'%';
        gamepade.style.height=0;
        setTimeout(function(){
            document.getElementById('img-swipe').style.display='none';

            document.getElementById('butTable').classList.add('done');
        },200);
    }
}

