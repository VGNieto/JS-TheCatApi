var apiKey = "e6674da0-82e2-4584-8daa-797f03695db4";
var catLink = "https://api.thecatapi.com/v1/categories";
var lista = document.getElementsByTagName("li");
var buscar = document.getElementById("buscar");
buscar.addEventListener("click", search);

requireData(catLink).then(function (data) {
    fillOptions(data);
}).catch(function (error) {
    console.log(error);
})

for (let i = 0; i < lista.length; i++) {
    lista[i].addEventListener("click", () => {
        let opt = document.getElementById("categories").value;
        let lnk = "https://api.thecatapi.com/v1/images/search?limit=8&order=desc&page=" + i + "&category_ids=" + opt;
        requireData(lnk).then(function (data) {
            showImages(data);
        }).catch(function (error) {
            console.log(error);
        })
    })
};


function search() {

    let opt = document.getElementById("categories").value;
    let lnk = "https://api.thecatapi.com/v1/images/search?limit=8&order=desc&page=1&category_ids=" + opt;
    requireData(lnk).then(function (data) {
        showImages(data);
    }).catch(function (error) {
        console.log(error);
    })
}

function requireData(url) {

    return new Promise(function (resolve, reject) {

        var xhtml = new XMLHttpRequest();

        xhtml.open("GET", url, true);
        xhtml.setRequestHeader("Authorization", apiKey);

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
        op.textContent = data[i].name;
        sel.appendChild(op);

    }
}

function showImages(data) {

    var cont = document.getElementById("listaImagenes");
    while (cont.firstChild) {
        cont.removeChild(cont.firstChild);
    }
    console.log(data);

    for (let i = 0; i < data.length; i++) {

        let image = document.createElement("img");
        image.src = data[i].url;
        image.height = 300;
        image.width = 300;

        let listItem = document.createElement("li");
        listItem.className = "col s12 m5 l5 xl3";

        listItem.appendChild(image);
        cont.appendChild(listItem);
    }


}