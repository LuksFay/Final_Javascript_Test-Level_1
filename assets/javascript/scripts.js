let header = document.getElementById('header_id');
let history = document.querySelector('.history');
let div = document.querySelector('#banner_id');
window.onscroll = function() {
    if(window.scrollY === 0){  
        header.classList.remove('scroll');
        history.classList.remove('changeColor');
        div.style='height:700px';
    }else{
        header.classList.add('scroll');
        history.classList.add('changeColor');
        div.style='height:760px';
    }
}
