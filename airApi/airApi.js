

class w_station {
    constructor(name, nox, no2){
        this.name = name;
        this.nox = nox;
        this.no2 = no2;
    }
}

function fetchApi(){
    return new Promise(async function (resolve, reject) {
        const res = await fetch("https://catalog.goteborg.se/rowstore/dataset/cb541050-487e-4eea-b7b6-640d58f28092/json")
        resolve(res.json())
    })
}

function getData(station) {
    const data = fetchApi()
        .then(actualdata => {
        console.log(actualdata)
        let no2;
        let nox;
        for(let i = 0; i < actualdata.results.length; i++){
            if((actualdata.results[i].station === station) && (actualdata.results[i].parameter === "NOx")){
                nox = actualdata.results[i].raw_value;
            }
            if((actualdata.results[i].station === station) && (actualdata.results[i].parameter === "NO2")){
                no2 = actualdata.results[i].raw_value;
            }
        }

        return new w_station(station, nox, no2);
    })
    return data;
}

function setParaText(paragraf, station){
    let stat = getData(station)
        .then((stat) => {
            document.getElementById(paragraf).innerText = stat.name+" "+stat.no2+" "+stat.nox;
        })
}