
function getData(){
    return new Promise(async function (resolve, reject) {
        const res = await fetch("https://catalog.goteborg.se/rowstore/dataset/cb541050-487e-4eea-b7b6-640d58f28092/json")
        console.log("Started from the bottom now we're here")
        resolve(res.json())
        })
}
/*
   const data = getData()

        data.then(actualdata => {
          console.log(actualdata)
          let apitext = "";
          for (const property in actualdata.results[0]) {
            apitext += property + " " + actualdata.results[0][property] + "\n";
          }
          document.getElementById('myh1').innerText = apitext

        })
 */
