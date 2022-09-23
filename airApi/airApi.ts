
class w_station {
    name: string;
    nox: number;
    no2: number;

    constructor(name: string, nox: number, no2: number) {
        this.name = name;
        this.nox = nox;
        this.no2 = no2;
    }
}

function fetchApi() {
    return new Promise<any>(async function (resolve, reject) {
        const res: any = await fetch("https://catalog.goteborg.se/rowstore/dataset/cb541050-487e-4eea-b7b6-640d58f28092/json")
        resolve(res.json())
    })
}

function getData(station: string) {
    const data: any = fetchApi()
        .then(actualdata => {
            console.log(actualdata)
            let no2: number;
            let nox: number;
            for (let i = 0; i < actualdata.results.length; i++) {
                if ((actualdata.results[i].station === station) && (actualdata.results[i].parameter === "NOx")) {
                    nox = actualdata.results[i].raw_value;
                }
                if ((actualdata.results[i].station === station) && (actualdata.results[i].parameter === "NO2")) {
                    no2 = actualdata.results[i].raw_value;
                }
            }

        return new w_station(station, nox, no2);
    })
    return data;
}

function setParaText(paragraf: string, station: string) {
    let stat: any = getData(station)
        .then((stat) => {
            document.getElementById(paragraf).innerText = stat.name+" "+stat.no2+" "+stat.nox;
        })
}