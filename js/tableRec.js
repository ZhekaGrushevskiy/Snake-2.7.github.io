var scoreSave=false;


var buttonSave = document.getElementById('button-save');
buttonSave.addEventListener('click', storeInfo, false);
buttonSave.addEventListener('touchend', storeInfo, false);

var fieldNik=document.getElementById('field-nik');

var ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword;
var stringName = 'Grushevskiy_SnakeGame_tableRecords';

function storeInfo(EO) {
    EO = EO || window.event;
    document.getElementById('field-nik').blur();
    if (!(document.getElementById('audio-off').classList.contains('done'))) {
        click.play();
    }
    updatePassword = Math.random();
    $.ajax({
        url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
        data: { f: 'LOCKGET', n: stringName, p: updatePassword },
        success: lockGetReady, error: errorHandler
    }
    );
}


function lockGetReady(callresult) {
    var score=localStorage.score;
    if (callresult.error != undefined){
        fieldNik.value='';
        fieldNik.placeholder='your name..';
        alert(callresult.error);
    }else {
        var info = JSON.parse(callresult.result);
        if(info.length>=25){
            info='';
        }
        infoRepeat={};
        var nik = fieldNik.value;
        for(let i=0;i<info.length;i++){
            var key=info[i].nik;
           infoRepeat[key]=info[i].score;
        }
        if(nik in infoRepeat && infoRepeat[nik]>=score){
            nik='';
        }
               
        
        
        if (nik.length>2 && nik.length<17) {
            if (Array.isArray(info)) {
                if(nik in infoRepeat && infoRepeat[nik]<score){
                    for(i=0;i<info.length;i++){
                        if(info[i].nik==nik)
                        info[i].score=score;
                    }
                }else{
                    info.push(
                        {
                            nik: nik,
                            score: score
                        }
                    );
                }
            } else {
                info = [{
                    nik: nik,
                    score: score
                }];
            }

            $.ajax({
                url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
                data: { f: 'UPDATE', n: stringName, v: JSON.stringify(info), p: updatePassword },
                success: updateReady, error: errorHandler
            }
            );
            scoreSave=true;
            fieldNik.value='';
            fieldNik.placeholder='record save';
        }else{
            fieldNik.value='';
            fieldNik.placeholder='your name..';
        }
    }
}

function updateReady(callresult) {
    if (callresult.error != undefined){
        fieldNik.value='';
        fieldNik.placeholder='your name..';
        alert(callresult.error);
    }
        
}


var click = new Audio();
    click.src = 'audio/click.wav';


var innerTableRec=document.getElementById('innertableRec');

setInterval(function(){
    innerTableRec.style.height=window.innerHeight-50+'px';
},100);

var records=document.getElementById('records');

var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword;
var stringName='Grushevskiy_SnakeGame_tableRecords';

function restoreInfo() {
    $.ajax(
        {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : stringName },
            success : readReady, error : errorHandler
        }
    );
}

function readReady(callresult) {
    var mas=[];
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else if ( callresult.result!="" ) {
        mas=JSON.parse(callresult.result);
    }
    if(Array.isArray(mas))
    mas.sort(compareScore);
    if(records.innerHTML=''){
        for(let i=0;i<mas.length;i++){
                records.removeChild(records.firstChild);
        }
    }

    for(let i=0;i<mas.length;i++){
       
        var divBox=document.createElement('div');
        divBox.classList.add('delBox');
        divBox.style.position='relative';
        divBox.style.display='flex';
        divBox.style.alignItems='center';
        divBox.style.paddingLeft=20+'px';
        divBox.style.marginBottom=20+'px';
        
        var colors=color();
        
        var divCircle=document.createElement('div');
        divCircle.style.position='absolute';
        divCircle.style.width=40+'px';
        divCircle.style.height=40+'px';
        divCircle.style.borderRadius=50+'%';
        divCircle.style.border='2px solid black';
        if(i>2){
            divCircle.style.backgroundColor=colors;
        }else if(i==0){
            divCircle.style.backgroundColor='rgb(94, 255, 0)';
        }else if(i==1){
            divCircle.style.backgroundColor='rgb(13, 233, 203)';
        }else if(i==2){
            divCircle.style.backgroundColor='rgb(173, 6, 123)';
        }
        divCircle.style.display='flex';
        divCircle.style.alignItems='center';
        divCircle.style.justifyContent='center';
        divCircle.style.fontSize=22+'px';
        divCircle.innerHTML=mas[i].score;
        
        var divRec=document.createElement('div');
        divRec.id='divRec';
        if(i>2){
            divRec.style.background='linear-gradient(90deg,'+colors+' 0%,rgba(0, 0, 0, 0) 100% )';
        }else if(i==0){
            divRec.style.background='linear-gradient(90deg,rgb(94, 255, 0) 0%,rgba(0, 0, 0, 0) 100% )';

        }else if(i==1){
            divRec.style.background='linear-gradient(90deg,rgb(13, 233, 203) 0%,rgba(0, 0, 0, 0) 100% )';
        }else if(i==2){
            divRec.style.background='linear-gradient(90deg,rgb(173, 6, 123) 0%,rgba(0, 0, 0, 0) 100% )';
        }
        divRec.style.width=90+'%';
        divRec.style.height=25+'px';
        divRec.style.marginLeft=25+'px';
        divRec.style.paddingLeft=25+'px';
        divRec.style.display='flex';
        divRec.style.alignItems='center';
        divRec.innerHTML=mas[i].nik;
        
        divBox.appendChild(divCircle);
        divBox.appendChild(divRec);
        records.appendChild(divBox);
        }
}

function errorHandler(jqXHR,statusStr,errorStr) {
    fieldNik.value='';
    fieldNik.placeholder='your name..';
    alert(statusStr+' '+errorStr);
}



function compareScore(a,b){
    return b.score-a.score;
}

function randomDiap(n,m) {
    return Math.floor(Math.random()*(m-n+1))+n;
}

function color() {
var colors=[ '', 'red', 'orange', 'yellow', 'green', 'blue', 'pink', 'grey' ];
    var n=randomDiap(1,7);
    var colorName=colors[n];
    return colorName;
}

var buttonRecord=document.getElementById('button-record');
var tableRec=document.getElementById('tableRec');
buttonRecord.addEventListener('click',clickRec);
buttonRecord.addEventListener('touchend', clickRec);



function clickRec(EO){
    EO=EO||window.event;
    if(!(document.getElementById('audio-off').classList.contains('done'))){
        click.play();
    }
    restoreInfo();
    tableRec.classList.add('done'); 
}

var closeTableRec=document.getElementById('closeTableRec');
closeTableRec.addEventListener('click',clickRecClose);
closeTableRec.addEventListener('touchend',clickRecClose);

function clickRecClose(EO){
    EO=EO||window.event;
    if(!(document.getElementById('audio-off').classList.contains('done'))){
        click.play();
    }
    tableRec.classList.remove('done');
}

window.onbeforeunload=befUnload;

  function befUnload(EO) {
    EO=EO||window.event;
      EO.returnValue='А у вас есть несохранённые изменения!';
  };