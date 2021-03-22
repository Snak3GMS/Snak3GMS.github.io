const filters = document.querySelectorAll('input[type="range"]'),
      divFilters = document.querySelector('.filters'),
      img = document.querySelector('img'),
      divEditor = document.querySelector('.editor'),
      fullscreenEnabled = document.fullscreenEnabled || 
      document.mozFullscreenEnabled || 
      document.webkitFullscreenEnabled;
let   counter = 0,
      bluring = 0,
      sizeDifference = img.naturalHeight*2 / img.height;


    // filters property    

    divFilters.addEventListener('input', (e)=>{
        let target = e.target;
        if (target.type == 'range') {
            target.nextElementSibling.value = target.value;
            if(target.name == 'blur') {bluring=target.value;}
            img.style.cssText += `--${target.name}: ${target.value}${target.dataset.sizing};`;
        }
        
    })

    divEditor.addEventListener('click', (e)=>{
        let target = e.target;
        //Reset button 
        if (target.classList.contains('btn-reset')) {
            img.style.cssText = ' ';
            bluring = 0;
            filters.forEach(element=>{
                element.value = element.defaultValue;
                element.nextElementSibling.value = element.value;
            });
        }
        // Next photo button
        if (target.classList.contains('btn-next')) {
            let date = new Date();
            let time = Number(`${date.getHours()}.${date.getMinutes() < '10' ? '0'+ date.getMinutes(): date.getMinutes()}`),
                partOfDay = (time> 5.59 && time < 11.60) ? 'morning' : 
                            time < 17.60 ? 'day' :
                            time < 23.60 ? 'evening' :
                            'night';
            counter++;
            img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${partOfDay}/${counter !=21? counter<10 ? '0'+counter : counter : counter = '01'}.jpg`;2400
        }
        // download photo with filters
        if (target.classList.contains('btn-save')) {
            drawImage();

        }

    });
    // Load photo button
    divEditor.addEventListener('input', (e)=>{
        let target = e.target;
        if (target.classList.contains('btn-load--input')) {
            let photo = target.files[0],
                reader = new FileReader();
            if (photo){
                reader.readAsDataURL(photo);
                reader.onload = () => img.src = reader.result;
                sizeDifference = img.naturalHeight*2 / img.height;
            }
        }
    });


    document.addEventListener('click', (e)=>{
        const target = e.target;
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

    // func download photo with filters
    function drawImage() {
        let canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        let ctx = canvas.getContext('2d');
        ctx.filter = `blur(${bluring >0 ? bluring*sizeDifference: bluring}px) ${getComputedStyle(img).filter}`;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let link = document.createElement('a');
        link.download = 'download.png';
        link.href = canvas.toDataURL();
        link.click();
        link = 0;
    }
    

    
