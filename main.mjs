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
        ssdOrHdd:"step4-hdd-or-ssd",
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
    static changeTolog(id,f){

        document.getElementById(id).addEventListener("change", ()=> {
            console.log(f(id))
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
                ${ViewTemplate.selector(id.step4.ssdOrHdd)}

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

        SelectorOptionDirector.simpleSelectorOptionByArray(id.step3.howMany,[1,2,4,8]);
        SelectorOptionDirector.simpleSelectorOptionByApiData(id.step3.brand, `${config.url}?type=ram`, "Brand");
        SelectorOptionDirector.simpleSelectorOptionByApiData(id.step3.model, `${config.url}?type=ram`, "Model");


        SelectorOptionDirector.simpleSelectorOptionByArray(id.step4.ssdOrHdd, ["HDD","SSD"]);
        SelectorOptionDirector.simpleSelectorOptionByArray(id.step4.strage,[]);//最初はなし
        SelectorOptionDirector.simpleSelectorOptionByArray(id.step4.brand, []);//最初はなし
        SelectorOptionDirector.simpleSelectorOptionByArray(id.step4.model, []);//最初はなし


        //================================================================
        ///Event
        //================================================================
        //フィルターするためのラムダ
        let isSelectedBrand = (selectorId,obj) =>{

            if(Selector.textOf(selectorId) == "Choose...") return true;
            return obj["Brand"] == Selector.textOf(selectorId)

        }
        let isSelectedRamStickAmount = (selectorId,obj) => {

            if(Selector.textOf(selectorId) == "Choose...") return true;

            let string = obj["Model"];
            let xIndex = string.lastIndexOf("x");
            let brankIndex = string.lastIndexOf(" ");
            let ramStickAmount = parseInt(string.substring(brankIndex,xIndex));

            return ramStickAmount == Selector.textOf(selectorId);
            
        }
        let isSelectedStrage = (selectorId,obj) => {

            if(Selector.textOf(selectorId) == "Choose...") return true;

            let string = obj["Model"];

            return string.lastIndexOf(Selector.textOf(selectorId)) != -1;
            
        }
        let setStrageArr = () => {

            switch(Selector.textOf(id.step4.ssdOrHdd)){
                case "SSD": return [ "4TB" , "2TB","1TB", "960GB","800GB", "512GB", "500GB", "480GB","400GB","280GB","256GB", "250GB","128GB", "118GB", "58GB"];break;
                case "HDD": return ["12TB", "10TB", "8TB", "6TB","5TB","4TB", "3TB", "2TB", "1.5TB","1TB", "500GB", "450GB", "250GB", "300GB"];break;
                default: return [];break;
            }

        }
        //選択したものによってセレクタ内のoptionをフィルターするEvent
        //文字が横に長いだけなので「えー」ってならずにぜひ読んで欲しい！
        //slecter内のoptionを変更したら狙ったselectorの中身をフィルターして作り直すRenderのメソッド
        //引数は2つ！ (id,[])
        /////第一引数 : eventをlistenerさせるターゲットのid
        /////第二引数 : eventで使う関数の引数が入った配列...今回の関数は => SelectorOptionDirector.filteredSelectorOptionByApiData(selectorId, url, dataKey,f)
        //第一引数と、配列のindex0..つまりフィルターされるselectorのid、のふたつに注目するといいかも。
        //あとはSelectorOptionDirectorクラスを見てもいいし、ブラックボックスとして理解してもオッケー。
        Render.changeToFilterSelectorOptionByApiData(id.step1.brand   ,[id.step1.model, `${config.url}?type=cpu`, "Model", (cur)=> isSelectedBrand(id.step1.brand, cur) ]);
        Render.changeToFilterSelectorOptionByApiData(id.step2.brand   ,[id.step2.model, `${config.url}?type=gpu`, "Model", (cur)=> isSelectedBrand(id.step2.brand, cur) ]);
        Render.changeToFilterSelectorOptionByApiData(id.step3.howMany ,[id.step3.brand, `${config.url}?type=ram`, "Brand", (cur)=> isSelectedRamStickAmount(id.step3.howMany, cur) ]);
        Render.changeToFilterSelectorOptionByApiData(id.step3.howMany ,[id.step3.model, `${config.url}?type=ram`, "Model", (cur)=> isSelectedBrand(id.step3.brand, cur) && isSelectedRamStickAmount(id.step3.howMany, cur) ]);
        Render.changeToFilterSelectorOptionByApiData(id.step3.brand   ,[id.step3.model, `${config.url}?type=ram`, "Model", (cur)=> isSelectedBrand(id.step3.brand, cur) && isSelectedRamStickAmount(id.step3.howMany, cur) ]);
        //step4
        document.getElementById(id.step4.ssdOrHdd).addEventListener("change",()=>{

            SelectorOptionDirector.filteredSelectorOptionByApiData(id.step4.brand, `${config.url}?type=${Selector.textOf(id.step4.ssdOrHdd).toLowerCase()}`, "Brand", (cur)=> true)
            SelectorOptionDirector.filteredSelectorOptionByApiData(id.step4.model, `${config.url}?type=${Selector.textOf(id.step4.ssdOrHdd).toLowerCase()}`, "Model", (cur)=> true)

            SelectorOptionDirector.simpleSelectorOptionByArray(id.step4.strage, setStrageArr());

            Render.changeToFilterSelectorOptionByApiData(id.step4.strage, [id.step4.brand, `${config.url}?type=${Selector.textOf(id.step4.ssdOrHdd).toLowerCase()}`, "Brand", (cur)=> isSelectedStrage(id.step4.strage,cur)]);
            Render.changeToFilterSelectorOptionByApiData(id.step4.strage, [id.step4.model, `${config.url}?type=${Selector.textOf(id.step4.ssdOrHdd).toLowerCase()}`, "Model", (cur)=> isSelectedStrage(id.step4.strage,cur)]);
            Render.changeToFilterSelectorOptionByApiData(id.step4.brand, [id.step4.model, `${config.url}?type=${Selector.textOf(id.step4.ssdOrHdd).toLowerCase()}`, "Model", (cur)=> isSelectedBrand(id.step4.brand, cur) && isSelectedStrage(id.step4.strage,cur)]);

        })

    }

}

View.base();
View.main();
