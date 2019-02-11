var apiKey = "e6674da0-82e2-4584-8daa-797f03695db4";
var catLink = "https://api.thecatapi.com/v1/categories";
var lista = document.getElementById("paginas").getElementsByTagName("li");
var divLista = document.getElementById("LinksPaginacion");
var buscar = document.getElementById("buscar");
var paginaActual = 1;
buscar.addEventListener("click", search);

requireData(catLink).then(function (data) {
    fillOptions(data);
}).catch(function (error) {
    console.log(error);
})



document.getElementById("anterior").addEventListener("click", () => {
    if (paginaActual > 1) {
        let opt = document.getElementById("categories").value;
        paginaActual--;
        let lnk = "https://api.thecatapi.com/v1/images/search?limit=8&mime_types=jpg,png&order=desc&page=" + paginaActual + "&category_ids=" + opt;
        console.log(lnk);
        requireData(lnk).then(function (data) {
            showImages(data);
        }).catch(function (error) {
            console.log(error);
        })
        modificarPaginaActual();

    }
})

document.getElementById("siguiente").addEventListener("click", () => {
     lista = document.getElementById("paginas").getElementsByTagName("li");
    
     if(paginaActual != lista.length-1){

        let opt = document.getElementById("categories").value;
        paginaActual++;

        let lnk = "https://api.thecatapi.com/v1/images/search?limit=8&mime_types=jpg,png&order=desc&page=" + paginaActual + "&category_ids=" + opt;
        console.log(lnk);

        requireData(lnk).then(function (data) {
            showImages(data);
        }).catch(function (error) {
            console.log(error);
        })
        modificarPaginaActual();
        if(paginaActual ==   lista.length - 2){
            let numPag = parseInt(paginaActual) + 1;
            let siguiente = "https://api.thecatapi.com/v1/images/search?limit=8&mime_types=jpg,png&order=desc&page=" +  numPag+ "&category_ids=" + opt;

            comprobarSiguiente(siguiente);
        }
     }
        
        
    
})

for (let i = 1; i < lista.length - 1; i++) {
    lista[i].addEventListener("click", () => {
        paginaActual = i;
        let opt = document.getElementById("categories").value;
        let lnk = "https://api.thecatapi.com/v1/images/search?limit=8&mime_types=jpg,png&order=desc&page=" + paginaActual + "&category_ids=" + opt;
        requireData(lnk).then(function (data) {
            showImages(data);
        }).catch(function (error) {
            console.log(error);
        })
        modificarPaginaActual();
        if(paginaActual ==   lista.length - 2){
            let numPag = parseInt(paginaActual) + 1;
            let siguiente = "https://api.thecatapi.com/v1/images/search?limit=8&mime_types=jpg,png&order=desc&page=" +  numPag+ "&category_ids=" + opt;

            comprobarSiguiente(siguiente);
        }
    })
}

function crearPaginador(){

    let sg = document.getElementById("siguiente");
    let numPag = parseInt(paginaActual);
    let sigPag = parseInt(paginaActual) + 1;
    let opt = document.getElementById("categories").value;

    let nuevoAt = document.createElement("li");
        nuevoAt.setAttribute("class", "waves-effect active");
    let hrf = document.createElement("a");
    let att = "#!" + numPag;
        hrf.setAttribute("href", att)
        hrf.textContent = numPag;
    nuevoAt.appendChild(hrf);
    divLista.appendChild(nuevoAt);

    
    let siguiente = "https://api.thecatapi.com/v1/images/search?limit=8&mime_types=jpg,png&order=desc&page=" +  sigPag+ "&category_ids=" + opt;
    comprobarSiguiente(siguiente);

    añadirBusqueda(nuevoAt);

    


}

function modificarPaginador() {

    let sg = document.getElementById("siguiente");
    let opt = document.getElementById("categories").value;
    let numPag = parseInt(paginaActual) + 1;
    let pagSiguiente = "https://api.thecatapi.com/v1/images/search?limit=8&mime_types=jpg,png&order=desc&page=" + numPag + "&category_ids=" + opt

    let nuevoAt = document.createElement("li");
    nuevoAt.setAttribute("class", "waves-effect");
    let hrf = document.createElement("a");
    let att = "#!" + numPag;
    hrf.setAttribute("href", att)
    hrf.textContent = numPag;
    nuevoAt.appendChild(hrf);
    divLista.appendChild(nuevoAt);
    añadirBusqueda(nuevoAt);
    
    
}

function reiniciarPaginador(){

    
    while(divLista.firstChild){
        divLista.removeChild(divLista.firstChild);
    }
    
    paginaActual = 1;


}

function añadirBusqueda(element){

    element.addEventListener("click",function(){
        let opt = document.getElementById("categories").value;
        let lnk = "https://api.thecatapi.com/v1/images/search?limit=8&mime_types=jpg,png&order=desc&page=" + element.textContent + "&category_ids=" + opt;
        requireData(lnk).then(function (data) {
            showImages(data);
        }).catch(function (error) {
            console.log(error);
        })
        paginaActual = element.textContent;
        modificarPaginaActual();
        if(paginaActual ==   lista.length - 2){
            let numPag = parseInt(paginaActual) + 1;
            let siguiente = "https://api.thecatapi.com/v1/images/search?limit=8&mime_types=jpg,png&order=desc&page=" +  numPag+ "&category_ids=" + opt;
            comprobarSiguiente(siguiente);
        }
    })
}

function modificarPaginaActual() {

    lista = document.getElementById("paginas").getElementsByTagName("li");
    for (let i = 0; i < lista.length; i++) {
        lista[i].className = "waves-effect";
    }
    lista[paginaActual].className = "waves-effect active";

}

function search() {

    let opt = document.getElementById("categories").value;
    let lnk = "https://api.thecatapi.com/v1/images/search?limit=8&mime_types=jpg,png&order=desc&page=1&category_ids=" + opt;
    requireData(lnk).then(function (data) {
        reiniciarPaginador();
        showImages(data);
        crearPaginador();
    }).catch(function (error) {
        console.log(error);
    })
}

function requireData(url) {

    return new Promise(function (resolve, reject) {

        var xhtml = new XMLHttpRequest();

        xhtml.open("GET", url, true);
        xhtml.setRequestHeader("x-api-key", apiKey);

        xhtml.onload = function () {
            if (xhtml.status == 200) {
                resolve(JSON.parse(xhtml.responseText));
            } else {
                reject(xhtml.statusText);
            }
        }

        xhtml.onerror = function () {
            reject(xhtml.statusText);
        }
        xhtml.send();
    })

}

function fillOptions(data) {
    let sel = document.getElementById("categories");
    for (let i = 0; i < data.length; i++) {

        let op = document.createElement("option");
        op.value = data[i].id;
        let palabra = data[i].name;
        let first = palabra.charAt(0).toUpperCase();
        op.textContent = first + palabra.slice(1, palabra.length);
        sel.appendChild(op);

    }
}

function showImages(data) {

    
    console.log(data.get);
    var cont = document.getElementById("listaImagenes");
    while (cont.firstChild) {
        cont.removeChild(cont.firstChild);
    }
    if(data.length==0){
        let elem = document.createElement("span");
            elem.textContent="No hay más imágenes para mostrar en esta categoría.";
        cont.appendChild(elem);
    }else{

    
    

    for (let i = 0; i < data.length; i++) {

        let image = document.createElement("img");

        image.className = "materialboxed z-depth-3";
        image.src = data[i].url;
        image.height = 200;
        image.width = 200;
        image.setAttribute("style", "border:15px solid #edf2f4;margin-bottom:15px");


        let listItem = document.createElement("li");
        listItem.className = "col s6 m4 l3 xl3";

        listItem.appendChild(image);
        cont.appendChild(listItem);
    }
    
    }
    M.AutoInit();
}


function comprobarSiguiente(link) {
    requireData(link).then(function (data) {
        console.log(data.length);
        if (data.length>0) {
            modificarPaginador();
        } 
    }).catch(function (error) {
        console.log(error);
    })
}

function limitarPaginador(){

    




}


