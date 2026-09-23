const btnAutomatico = document.getElementById("btn-automatico");
const btnManual = document.getElementById("btn-manual");
const btnLuzVerde = document.getElementById("btn-verde");
const btnLuzAmarilla = document.getElementById("btn-amarilla");
const btnLuzRoja = document.getElementById("btn-roja");
const luzVerde = document.getElementById("luz-verde");

let cicloId = null;
let parpadeoTimeoutId = null;

const contadores = { verde: 0, amarilla: 0, roja: 0 };

const luces = ['verde','amarilla','roja']
const intervalos = {'verde' : 7500, 'amarilla' : 2000, 'roja':4000}

const tiempoParpadeo = 1500;


btnAutomatico.addEventListener("click",() => ciclo());

function ciclo (i=0){

    document.querySelectorAll('.btn-luz').forEach(b => {
        b.disabled = true;
    })


    const color = luces[i % luces.length];
    encender(color);
    cicloId = setTimeout(() => ciclo(i + 1), intervalos[color])

    if (color === 'verde') {
        parpadeoTimeoutId = setTimeout(() => {
            luzVerde.classList.add('parpadeo');
        }, intervalos.verde - tiempoParpadeo);
    }
}


btnManual.addEventListener("click", function() {
    clearTimeout(cicloId);
    clearTimeout(parpadeoTimeoutId);

    document.querySelectorAll('.btn-luz').forEach(b => {
        b.disabled = false;
    })

    document.querySelectorAll('.luz').forEach(l => {
        l.classList.remove('activa');
        l.classList.remove('parpadeo');
    });

});

btnLuzVerde.addEventListener("click", function() {
    encender("verde");
})
btnLuzAmarilla.addEventListener("click", function() {
    encender("amarilla");
})
btnLuzRoja.addEventListener("click", function() {
    encender("roja");
})


function encender(color){

    document.querySelectorAll('.luz').forEach(l => {
        l.classList.remove('activa');
        l.classList.remove('parpadeo');
    });
    document.querySelector(`.${color}`).classList.add('activa');
    
    contadores[color]++;
    document.getElementById(`contador-${color}`).textContent = contadores[color];

}

luzVerde.addEventListener('animationiteration', () => {
    contadores['verde']++;
    document.getElementById(`contador-verde`).textContent = contadores['verde'];
});
