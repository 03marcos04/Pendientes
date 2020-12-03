// =================== NECESARIO ======================
// validacion para obtener el path relation cuando se ejecuta mi aplicacion
// path puede ser de github otro servidor o local host
var NombreCarpertaProyecto = 'pendientes';


var url = window.location.href;
var swLocation = '/' + NombreCarpertaProyecto + '/sw.js';


if (navigator.serviceWorker) {
    if (url.includes('localhots')) {
        swLocation = '/sw.js';
    }
    navigator.serviceWorker.register(swLocation);
}
// =================== NECESARIO ======================

/*----------------- variables ---------------*/
const listaTweets = document.getElementById('lista-tweets');


// agregar el texto aprendiendo java script local storage
const textoNuevo = document.querySelector('h1');
textoNuevo.textContent = 'Pendientes';


// event listeners
eventListeners();

function eventListeners() {
    //cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    // borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    // contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);


}


/*----------- funciones---------------*/
// añadir tweet del formulario

function agregarTweet(e) {
    e.preventDefault();
    // leer el valor del text area
    const tweet = document.getElementById('tweet').value;
    // crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'x';


    // crear elemento y añadir el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    li.appendChild(botonBorrar);

    // añade el tweet a la lista
    listaTweets.appendChild(li);
    // console.log(tweet);

    // añadir a local storage
    agregarTweetLocalStorage(tweet);
    document.getElementById('tweet').value = '';

}
// ELIMINA EL TWEET DEL DOM
function borrarTweet(e) {
    e.preventDefault();
    if (e.target.className === 'borrar-tweet') {
        // console.log('diste click en eliminar'); 
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    } else {
        // console.log('diste click en otra parte') 
    }
    //console.log('diste click en la lista');
}


// MOSTRAR LOCAL STORAGE EN LISTA

function localStorageListo() {
    let tweets;

    tweets = obtenerTweetsLocalStorage();


    tweets.forEach(function(tweet) {
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'x';


        // crear elemento y añadir el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        li.appendChild(botonBorrar);

        // añade el tweet a la lista
        listaTweets.appendChild(li);
    });
}

// AGREGA TWEET A LOCAL STORAGE
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    // añadir el nuevo tweet
    tweets.push(tweet);
    // convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

// COMPROBAR QUE HAYA ELEMENTOS EN LOCAL STORAGE, RETORNA UN ARREGLO
function obtenerTweetsLocalStorage() {
    let tweets;
    // revisamos los valores de local storage
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));

    }
    return tweets;
}

// eliminar tweet de local storage
function borrarTweetLocalStorage(tweet) {

    let tweets, tweetBorrar;
    // elimina la x del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) {
        //console.log(tweet);
        if (tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}