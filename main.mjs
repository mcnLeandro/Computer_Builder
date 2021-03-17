import { Selector,SelectorDirector } from '/selector.mjs';
import { SelectorOption,SelectorOptionDirector } from '/selector.mjs';

const config = {
    url : "https://api.recursionist.io/builder/computers"
}

class Render{
    static changeToLeadAsyncSelectorOptionsByObjectsArray(eventId,argumentArr){

        document.getElementById(eventId).addEventListener("change" ,()=> View.AsyncSelectorOptionsByObjectsArray(...argumentArr) )

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
                ${ViewTemplate.selector("step1-brand")}
                
                ${ViewTemplate.h3("Model")}
                ${ViewTemplate.selector("step1-model")}

                <!-- Step2 -->
                ${ViewTemplate.h2("step2 : Select your GPU")}

                ${ViewTemplate.h3("Brand")}
                ${ViewTemplate.selector("step2-brand")}

                ${ViewTemplate.h3("Model")}
                ${ViewTemplate.selector("step2-model")}

                <!-- Step3 -->
                ${ViewTemplate.h2("step3 : Select your memory card")}

                ${ViewTemplate.h3("How Many?")}
                ${ViewTemplate.selector("step3-how-many?")}

                ${ViewTemplate.h3("Brand")}
                ${ViewTemplate.selector("step3-brand")}

                ${ViewTemplate.h3("Model")}
                ${ViewTemplate.selector("step3-model")}


                <!-- Step4 -->
                ${ViewTemplate.h2("step4 : Select your storage")}

                ${ViewTemplate.h3("HDD or SSD")}
                ${ViewTemplate.selector("step4-hdd-or-ssd")}

                ${ViewTemplate.h3("Storage")}
                ${ViewTemplate.selector("step4-strage")}

                ${ViewTemplate.h3("Brand")}
                ${ViewTemplate.selector("step4-brand")}

                ${ViewTemplate.h3("Model")}
                ${ViewTemplate.selector("step4-model")}



                <div class="col-12 mt-5">
                    <Button class="btn btn-primary ">Add PC</Button>
                </div>

            </section>

        `
        //selector内のoptionをセット。
        //テンプレートリテラル内でセットしたかったけど非同期だと無理だった。。
        //第一引数がセットしてるselectorのid
        SelectorOptionDirector.simpleSelectorOptionByApiData("step1-brand",config.url + "?type=cpu","Brand");
        SelectorOptionDirector.simpleSelectorOptionByApiData("step1-brand",config.url + "?type=cpu","Brand");
        SelectorOptionDirector.simpleSelectorOptionByApiData("step1-model",config.url + "?type=cpu","Model");

        SelectorOptionDirector.simpleSelectorOptionByApiData("step2-brand",config.url + "?type=gpu","Brand");
        SelectorOptionDirector.simpleSelectorOptionByApiData("step2-model",config.url + "?type=gpu","Model");

        SelectorOptionDirector.simpleSelectorOptionByArray("step3-how-many?",[1,2,3,4]);
        SelectorOptionDirector.simpleSelectorOptionByApiData("step3-brand",config.url + "?type=ram","Brand");
        SelectorOptionDirector.simpleSelectorOptionByApiData("step3-model",config.url + "?type=ram","Model");


        SelectorOptionDirector.simpleSelectorOptionByArray("step4-hdd-or-ssd",["HHD","SSD"]);
        SelectorOptionDirector.simpleSelectorOptionByArray("step4-strage",["4TB","2TB","1TB","960GB","800GB","512GB","500GB","480GB","400GB","280GB","256GB","250GB","128GB","118GB","58GB"]);
        SelectorOptionDirector.simpleSelectorOptionByApiData("step4-brand",config.url + "?type=gpu","Brand");
        SelectorOptionDirector.simpleSelectorOptionByApiData("step4-model",config.url + "?type=gpu","Model");



        ///Event
        Render.changeToLeadAsyncSelectorOptionsByObjectsArray("step1-brand",["step1-model",config.url + "?type=cpu","Model"])

        
    }

}

View.base();
View.main();
