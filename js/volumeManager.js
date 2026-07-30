const player = document.getElementById("player");
const knob=document.getElementById("volume-knob");
const needle=document.getElementById("needle");
const ticks=document.getElementById("ticks");

const TOTAL=40;

for(let i=0;i<TOTAL;i++){

    const angle=-135+i*(270/(TOTAL-1));

    const tick=document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
    );

    tick.setAttribute("x1",110);
    tick.setAttribute("y1",18);

    tick.setAttribute("x2",110);
    tick.setAttribute("y2",6);

    tick.setAttribute(
        "transform",
        `rotate(${angle} 110 110)`
    );

    ticks.appendChild(tick);
}

const tickList=[...ticks.children];

function setVolume(v){

    v=Math.max(0,Math.min(1,v));

    player.volume=v;

    const angle = -135 + v * 270;

    needle.setAttribute(
        "transform",
        `rotate(${angle} 110 110)`
    );

    tickList.forEach((t,i)=>{

        t.classList.toggle(
            "active",
            i<=v*(TOTAL-1)
        );

    });

}

setVolume(.75);

let dragging=false;

knob.addEventListener("pointerdown",e=>{
    dragging=true;
    update(e);
});

window.addEventListener("pointerup",()=>dragging=false);

window.addEventListener("pointermove",e=>{

    if(dragging)
        update(e);

});

function update(e){

    const rect = knob.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    let angle = Math.atan2(
        e.clientY - cy,
        e.clientX - cx
    ) * 180 / Math.PI;

    // corregir sistema de coordenadas
    angle += 90;

    // mantener rango de la perilla
    if(angle > 180) angle -= 360;

    angle = Math.max(-135, Math.min(135, angle));

    const volume = (angle + 135) / 270;

    setVolume(volume);
}

knob.addEventListener("wheel",e=>{
    e.preventDefault();
    setVolume(player.volume-(e.deltaY*.001));
});