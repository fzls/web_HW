///**
// * Created by 风之凌殇 on 4/8/2016.
// */
// 1
var animate, akari = null;

function init() {

    akari = document.getElementById('akari');
    akari.style.position = 'absolute';
    akari.style.top = '240px';
    akari.style.left = '-300px';
    akari.style.visibility = 'hidden';

    akari.addEventListener('mouseover', stop);
    akari.addEventListener('mouseout', move);
    akari.addEventListener('click', openUrl);

    move();
}

function mod(a, b) {
    return (a + b) % b;
}

function move() {
    akari.style.left = mod(parseInt(akari.style.left, 10) + (Math.random() - 0.5) * 30, window.innerWidth) + 'px';
    akari.style.top = mod(parseInt(akari.style.top, 10) + (Math.random() - 0.5) * 30, window.innerHeight) + 'px';
    akari.style.visibility = 'visible';

    animate = setTimeout(function () {
        move();
    }, 20); // call move in 20msec
}

function stop() {
    clearTimeout(animate);
}


function openUrl() {
    window.open("http://baike.baidu.com/view/5711864.htm?fromtitle=%E9%98%BF%E5%8D%A1%E6%9E%97&fromid=7067471&type=syn");

}

// 2
function init2() {
    var oTab = document.getElementById('tab');
    var aH3 = oTab.getElementsByTagName('h3');
    var aDiv = oTab.getElementsByTagName('div');
    for (var i = 0; i < aH3.length; i++) {
        aH3[i].index = i;
        aH3[i].onclick = function () {
            for (var i = 0; i < aH3.length; i++) {
                if (i == this.index)
                    continue;
                aH3[i].className = "";
                aDiv[i].style.display = "none";
            }
            aH3[this.index].className = 'active';
            aDiv[this.index].style.display = 'block';
        }
    }
}

//3
function spinner() {
    var delta = 1;
    if (this.textContent == '-')
        delta = -1;
    var number = document.getElementById('number');
    //noinspection JSValidateTypes
    number.textContent = parseInt(number.textContent) + delta;
}
function init3() {
    var plus = document.getElementById('plus');
    var minus = document.getElementById('minus');
    plus.addEventListener('click', spinner);
    minus.addEventListener('click', spinner);
}
var bar,slider,number;
function init4() {
    bar = document.getElementById('bar');
    slider=document.getElementById('slider');
    number = document.getElementById('number');
    bar.addEventListener('mousedown',startSlide,false);
    bar.addEventListener('mouseup',stopSlide,false);
}

function startSlide(event){
    var set_perc = ((((event.clientX-bar.offsetLeft)/bar.offsetWidth)).toFixed(2));
    number.innerHTML = parseInt(set_perc*100);
    bar.addEventListener('mousemove',moveSlide,false);
    slider.style.width = (set_perc * 100) + '%';
    slider.style.backgroundColor='cyan';
}

function moveSlide(event){
    var set_perc = ((((event.clientX - bar.offsetLeft) / bar.offsetWidth)).toFixed(2));
    number.innerHTML = parseInt(set_perc*100);
    slider.style.width = (set_perc * 100) + '%';
    slider.style.backgroundColor='cyan';
}
function stopSlide(event){
    var set_perc = ((((event.clientX - bar.offsetLeft) / bar.offsetWidth)).toFixed(2));
    number.innerHTML = parseInt(set_perc*100);
    bar.removeEventListener('mousemove', moveSlide, false);
    slider.style.width = (set_perc * 100) + '%';
    slider.style.backgroundColor='cyan';
}
var progress,progress_bar;
function increase(){
    var width = parseInt((progress.offsetWidth/progress_bar.offsetWidth)*100+0.5);
    if(width<100){
        progress.textContent=width+1+"%";
        progress.style.width=width+1+"%";
        setTimeout(function(){increase()},100);
    }
}

function init5() {
    progress_bar=document.getElementById('progress_bar');
    progress=document.getElementById('progress');
    increase();
}
window.onload = function () {
    init();//漂移的小图标
    init2();//选项卡
    init3();//Spinner
    init4();//Slider
    init5();//进度条
};
