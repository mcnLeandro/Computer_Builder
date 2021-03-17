import { Selector,SelectorDirector } from '/selector.mjs';
import { SelectorOption,SelectorOptionDirector } from '/selector.mjs';

const config = {
    url : "https://api.recursionist.io/builder/computers"
}
const id = {
    step1:{
        brand:"step1-brand",
        model:"step1-model"
    },
    step2:{
        brand:"step2-brand",
        model:"step2-model"
    },
    step3:{
        howMany:"step3-how-many?",
        brand:"step3-brand",
        model:"step3-model"
    },
    step4:{
        sshOrHdd:"step4-hdd-or-ssd",
        strage:"step4-strage",
        brand:"step4-brand",
        mdel:"step4-model"
    }
}

class Render{
    static changeToLeadAsyncSelectorOptionsByObjectsArray(id,argumentArr){

        document.getElementById(id).addEventListener("change" ,()=> View.AsyncSelectorOptionsByObjectsArray(...argumentArr) )

    }
    static changeToFilterSelectorOptionByApiData(id,argumentArr){

        document.getElementById(id).addEventListener("change",()=> SelectorOptionDirector.filteredSelectorOptionByApiData(...argumentArr))

    }

    static changeTolog(id){
        document.getElementById(id).addEventListener("change", ()=> {
            // do something to debug
        })
    }
}
class ViewTemplate{
    static h2(title){
        return `
            <div class="col-12 mt-4">
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
    static selector(id){

        return `
            <div class="col-12 mt-3">
                <select id="${id}" class="custom-select col-12 col-md-6" >
                    <!-- options -->
                </select>
            </div>
            
        `
    }
}
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

                <!-- Step1 -->
                ${ViewTemplate.h2("step1 : Select your CPU")}

                ${ViewTemplate.h3("Brand")}
                ${ViewTemplate.selector(id.step1.brand)}
                
                ${ViewTemplate.h3("Model")}
                ${ViewTemplate.selector(id.step1.model)}

                <!-- Step2 -->
                ${ViewTemplate.h2("step2 : Select your GPU")}

                ${ViewTemplate.h3("Brand")}
                ${ViewTemplate.selector(id.step2.brand)}

                ${ViewTemplate.h3("Model")}
                ${ViewTemplate.selector(id.step2.model)}

                <!-- Step3 -->
                ${ViewTemplate.h2("step3 : Select your memory card")}

                ${ViewTemplate.h3("How Many?")}
                ${ViewTemplate.selector(id.step3.howMany)}

                ${ViewTemplate.h3("Brand")}
                ${ViewTemplate.selector(id.step3.brand)}

                ${ViewTemplate.h3("Model")}
                ${ViewTemplate.selector(id.step3.model)}


                <!-- Step4 -->
                ${ViewTemplate.h2("step4 : Select your storage")}

                ${ViewTemplate.h3("HDD or SSD")}
                ${ViewTemplate.selector(id.step4.sshOrHdd)}

                ${ViewTemplate.h3("Storage")}
                ${ViewTemplate.selector(id.step4.strage)}

                ${ViewTemplate.h3("Brand")}
                ${ViewTemplate.selector(id.step4.brand)}

                ${ViewTemplate.h3("Model")}
                ${ViewTemplate.selector(id.step4.model)}



                <div class="col-12 mt-5">
                    <Button class="btn btn-primary ">Add PC</Button>
                </div>

            </section>

        `
        //============================
        //selector内のoptionをセット
        //============================
        //テンプレートリテラル内でセットしたかったけど非同期だと無理だった。。
        SelectorOptionDirector.simpleSelectorOptionByApiData(id.step1.brand, `${config.url}?type=cpu`, "Brand");
        SelectorOptionDirector.simpleSelectorOptionByApiData(id.step1.model, `${config.url}?type=cpu`, "Model");

        SelectorOptionDirector.simpleSelectorOptionByApiData(id.step2.brand, `${config.url}?type=gpu`, "Brand");
        SelectorOptionDirector.simpleSelectorOptionByApiData(id.step2.model, `${config.url}?type=gpu`, "Model");

        SelectorOptionDirector.simpleSelectorOptionByArray(id.step3.howMany,[1,2,3,4]);
        SelectorOptionDirector.simpleSelectorOptionByApiData(id.step3.brand, `${config.url}?type=ram`, "Brand");
        SelectorOptionDirector.simpleSelectorOptionByApiData(id.step3.model, `${config.url}?type=ram`, "Model");


        SelectorOptionDirector.simpleSelectorOptionByArray(id.step4.sshOrHdd, ["HHD","SSD"]);
        SelectorOptionDirector.simpleSelectorOptionByArray(id.step4.strage, ["4TB","2TB","1TB","960GB","800GB","512GB","500GB","480GB","400GB","280GB","256GB","250GB","128GB","118GB","58GB"]);
        SelectorOptionDirector.simpleSelectorOptionByArray(id.step4.brand, []);//最初はなし
        SelectorOptionDirector.simpleSelectorOptionByArray(id.step4.model, []);//最初はなし


        //=================
        ///Event
        //=================

        let textOf = (id)=>{
            let select = document.getElementById(id);
            return select.options[select.selectedIndex].text;
        }

        //選択したBrandによってModelのセレクタ内のoptionをフィルターするEvent
        Render.changeToFilterSelectorOptionByApiData(id.step1.brand,[id.step1.model, `${config.url}?type=cpu`, "Model", (cur)=> cur["Brand"] == textOf(id.step1.brand) ])
        Render.changeToFilterSelectorOptionByApiData(id.step2.brand,[id.step2.model, `${config.url}?type=gpu`, "Model", (cur)=> cur["Brand"] == textOf(id.step2.brand) ])
        Render.changeToFilterSelectorOptionByApiData(id.step3.brand,[id.step3.model, `${config.url}?type=ram`, "Model", (cur)=> cur["Brand"] == textOf(id.step3.brand) ])
        Render.changeToFilterSelectorOptionByApiData(id.step4.brand,[id.step4.model, `${config.url}?type=ram`, "Model", (cur)=> cur["Brand"] == textOf(id.step4.brand) ])

        
        
    }

}

View.base();
View.main();
