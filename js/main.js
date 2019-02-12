var apiKey = "e6674da0-82e2-4584-8daa-797f03695db4";
var catLink = "https://api.thecatapi.com/v1/categories";
var catImages = "https://api.thecatapi.com/v1/images/search?limit=50&order=Desc&mime_types=jpg,png";
var lista = document.getElementById("paginas").getElementsByTagName("li");
var divLista = document.getElementById("LinksPaginacion");
var buscar = document.getElementById("buscar");
var numeroDeImagenes = document.getElementById("numeroDeImagenes").value;
var paginaActual = 0;
var totalPaginas = 0;

buscar.addEventListener("click", search);

requireData(catLink).then(function (data) {
    fillOptions(data);
}).catch(function (error) {
    console.log(error);
})


requireData(catImages).then(function (data) {
    if(data.length%numeroDeImagenes==0){
        totalPaginas = parseInt((data.length/numeroDeImagenes));
    } else{
        totalPaginas = parseInt((data.length/numeroDeImagenes)+1);
    }
}).catch(function (error) {
    console.log(error);
})




document.getElementById("anterior").addEventListener("click", () => {
    if (paginaActual > 0) {
        let opt = document.getElementById("categories").value;
        paginaActual--;
        numeroDeImagenes = document.getElementById("numeroDeImagenes").value;
        let lnk = "https://api.thecatapi.com/v1/images/search?limit="+numeroDeImagenes+"&mime_types=jpg,png&order=desc&page=" + paginaActual + "&category_ids=" + opt;
        console.log(lnk);
        requireData(lnk).then(function (data) {
            showImages(data);
        }).catch(function (error) {
            console.log(error);
        })
        modificarPaginador();

    }
})

document.getElementById("siguiente").addEventListener("click", () => {
     lista = document.getElementById("paginas").getElementsByTagName("li");
    
     if(paginaActual<totalPaginas-1){
        let opt = document.getElementById("categories").value;
        paginaActual++;
        numeroDeImagenes = document.getElementById("numeroDeImagenes").value;
        let lnk = "https://api.thecatapi.com/v1/images/search?limit="+numeroDeImagenes+"&mime_types=jpg,png&order=desc&page=" + paginaActual + "&category_ids=" + opt;
        console.log(lnk);

        requireData(lnk).then(function (data) {
            showImages(data);
        }).catch(function (error) {
            console.log(error);
        })
        modificarPaginador();
     }
        
    
})

document.getElementById("primero").addEventListener("click", () => {
    
        let opt = document.getElementById("categories").value;
        paginaActual = 0;
        numeroDeImagenes = document.getElementById("numeroDeImagenes").value;
        let lnk = "https://api.thecatapi.com/v1/images/search?limit="+numeroDeImagenes+"&mime_types=jpg,png&order=desc&page=" + paginaActual + "&category_ids=" + opt;
        console.log(lnk);
        requireData(lnk).then(function (data) {
            showImages(data);
        }).catch(function (error) {
            console.log(error);
        })
        modificarPaginador();

    
})
document.getElementById("ultimo").addEventListener("click", () => {
    
    let opt = document.getElementById("categories").value;
    paginaActual = totalPaginas-1;
    numeroDeImagenes = document.getElementById("numeroDeImagenes").value;
    let lnk = "https://api.thecatapi.com/v1/images/search?limit="+numeroDeImagenes+"&mime_types=jpg,png&order=desc&page=" + paginaActual + "&category_ids=" + opt;
    console.log(lnk);
    requireData(lnk).then(function (data) {
        showImages(data);
    }).catch(function (error) {
        console.log(error);
    })
    modificarPaginador();


})



function crearPaginador(){

   
    let numPag = parseInt(paginaActual)+1;
    let nuevoAt = document.createElement("li");
        nuevoAt.setAttribute("class", "waves-effect active");
        nuevoAt.setAttribute("id","numeroPagina");
    let hrf = document.createElement("a");
    let att = "#!" + numPag;
        hrf.setAttribute("href", att)
        hrf.textContent = "Pagina "+numPag+"/"+totalPaginas;
    nuevoAt.appendChild(hrf);
    divLista.appendChild(nuevoAt);
    
}

function modificarPaginador() {

    let numPag = parseInt(paginaActual)+1;
    let numeroPagina = document.getElementById("numeroPagina").firstElementChild;
        numeroPagina.textContent = "Pagina "+numPag+"/"+totalPaginas;
}



function reiniciarPaginador(){
    let opt = document.getElementById("categories").value;

    while(divLista.firstChild){
        divLista.removeChild(divLista.firstChild);
    }
    paginaActual = 0;
    catImages = "https://api.thecatapi.com/v1/images/search?limit=50&order=Desc&mime_types=jpg,png&category_ids=" + opt;
    numeroDeImagenes = document.getElementById("numeroDeImagenes").value;
    requireData(catImages).then(function (data) {
        console.log(Math.ceil(data.length/numeroDeImagenes));
        totalPaginas = Math.ceil(data.length/numeroDeImagenes);
        modificarPaginador();
    }).catch(function (error) {
        console.log(error);
    })
}



function search() {

    let opt = document.getElementById("categories").value;
    numeroDeImagenes = document.getElementById("numeroDeImagenes").value;
    let lnk = "https://api.thecatapi.com/v1/images/search?limit="+numeroDeImagenes+"&mime_types=jpg,png&order=desc&page=0&category_ids=" + opt;
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

    
    console.log(data);
    var cont = document.getElementById("listaImagenes");
    while (cont.firstChild) {
        cont.removeChild(cont.firstChild);
    }
    
    
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
    
    
    M.AutoInit();
}
