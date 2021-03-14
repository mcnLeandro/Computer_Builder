// const fetch = require("node-fetch");
// const { cpus } = require("node:os");

// global.fetch = require('node-fetch');

// const config = {
//     url : "https://api.recursionist.io/builder/computers",
//     parentId: "target"
// }

// fetch(config.url).then(responce => responce.json()).then(data => {

//     console.log("Server data is as follows........");
//     console.log(data);

//     afterProcees(data);

// });


class View{
    
    static base(){
        document.getElementById("body").innerHTML = `
            <header class="p-2 d-flex justify-content-between bg-dark">
                <h2 class="text-white">Computer Builder</h2>
            </header>
            <div id="alert"></div>
            <div id="main">
            </div>
            <footer class="mt-lg-auto p-3 bg-dark">
                <div class="d-flex justify-content-center mb-5">
                    <small class="text-white">
                        Copyright ©️ <a href="https://twitter.com/leandro83g" target="_blank">Leandro,inc</a>　All <a href="https://github.com/mcnLeandro/Computer_Builder"target="_blank">Rights</a> Unreserved
                    </small>
                </div>
            </footer>
        `
    }
    static main(){
        
        document.getElementById("main").innerHTML = `
            <section class="container shadow my-5 py-3 rounded">
                ${ViewTemplate.h2("step1 : Select your CPU")}
                ${ViewTemplate.h3("Brand")}
                ${ViewTemplate.h3("Model")}
                ${ViewTemplate.h2("step2 : Select your GPU")}
                ${ViewTemplate.h3("Brand")}
                ${ViewTemplate.h3("Model")}
                ${ViewTemplate.h2("step3 : Select your memory card")}
                ${ViewTemplate.h3("How Many?")}
                ${ViewTemplate.h3("Brand")}
                ${ViewTemplate.h3("Model")}
                ${ViewTemplate.h2("step4 : Select your storage")}
                ${ViewTemplate.h3("HDD or SSD")}
                ${ViewTemplate.h3("Storage")}
                ${ViewTemplate.h3("Brand")}
                ${ViewTemplate.h3("Model")}

                <div class="col-12 mt-5">
                    <Button class="btn btn-primary ">Add PC</Button>
                </div>
            </section>

        `
    }

    
}
class ViewTemplate{
    static h2(title){
        return `
            <div class="col-12 mt-3">
                <h2 class="text-white">${title}</h2>
            </div>
        `
    }
    static h3(title){
        return `
            <div class="col-12 mt-3">
                <h3 class="text-white">${title}</h3>
            </div>
        `
    }
    static selecter(id, models, column,value){

        let selecterHtml = 
        `
            <div class="col-12 mt-3">
                <select id="${id}" class="custom-select col-12 col-md-6 p-3 text-2vw" >
                    <option class="p-3 text-2vw" value="0">Choose...</option>
        `
        Object.keys(models).map(key => {
            let data = models[key][column];
            selecterHtml += 
            `
                <option class="p-3 text-2vw" value="${key}" ${key == value? "selected":""}>${data}</option>
            `;
        });

        selecterHtml += 
        `
                </select>
            </div>
            
        `

        return selecterHtml;

    }
    static selecterOption(key,value){
        return `
            <option class="p-3 text-2vw" value="${key}" ${key == value? "selected":""}>${data}</option>
        `
    }
}

View.base();
View.main();


