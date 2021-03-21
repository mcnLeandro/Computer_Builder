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
        model:"step4-model"
    },
    buildBtn:"build-btn"
}

class Render{

    static changeToUniqueSelectorOptionByApiData(id,argumentArr){

        document.getElementById(id).addEventListener("change",()=> SelectorOptionDirector.uniqueByApiData(...argumentArr))

    }
    static changeToSearchableSelectorOptionByApiData(id,argumentArr){

        document.getElementById(id).addEventListener("change",()=> SelectorOptionDirector.searchableByApiData(...argumentArr))

    }
    static clickToBuildPC(id){

        let areFilledAll = ()=>{
            return Array.from(document.getElementsByTagName("select"))
                        .reduce((bool,selector) => selector.value == "-1" ? false : bool ,true);
        } 

        document.getElementById(id).addEventListener("click",()=> {
            if(areFilledAll()){
                //implement of build PC
            }
            else View.alert("danger","You have to choose everything.")
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

    static alert(type,message){

        document.getElementById("alert").innerHTML = `
            <div id="alert" class="alert alert-${type} alert-fade-out" role="alert">
                ${message}
            <div>
        `

        setTimeout(function(){

            document.getElementById("alert").innerHTML = "";

        },6000)

    }
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
                    <Button id="${id.buildBtn}" class="btn btn-primary ">Add PC</Button>
                </div>

            </section>

        `
        //===================================
        //selector内のoptionをセット initialize
        //===================================
        //テンプレートリテラル内でセットしたかったけど非同期だと無理だった。。
        SelectorOptionDirector.uniqueByApiData(    id.step1.brand, `${config.url}?type=cpu`, "Brand");
        SelectorOptionDirector.searchableByApiData(id.step1.model, `${config.url}?type=cpu`, "Model","Rank");

        SelectorOptionDirector.uniqueByApiData(    id.step2.brand, `${config.url}?type=gpu`, "Brand");
        SelectorOptionDirector.searchableByApiData(id.step2.model, `${config.url}?type=gpu`, "Model","Rank");

        SelectorOptionDirector.simpleByArray(      id.step3.howMany,[1,2,4,8]);
        SelectorOptionDirector.uniqueByApiData(    id.step3.brand, `${config.url}?type=ram`, "Brand");
        SelectorOptionDirector.searchableByApiData(id.step3.model, `${config.url}?type=ram`, "Model","Rank");


        SelectorOptionDirector.simpleByArray(id.step4.ssdOrHdd, ["HDD","SSD"]);
        SelectorOptionDirector.simpleByArray(id.step4.strage,[]);//最初はなし
        SelectorOptionDirector.simpleByArray(id.step4.brand, []);//最初はなし
        SelectorOptionDirector.simpleByArray(id.step4.model, []);//最初はなし


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
        /////第二引数 : eventで使う関数の引数が入った配列
        //第一引数と、配列のindex0..つまりフィルターされるselectorのid、のふたつに注目するといいかも。
        //あとはSelectorOptionDirectorクラスを見てもいいし、ブラックボックスとして理解してもオッケー。
        Render.changeToSearchableSelectorOptionByApiData(
            id.step1.brand   ,
            [id.step1.model, `${config.url}?type=cpu`, "Model","Rank", (cur)=> isSelectedBrand(id.step1.brand, cur) ]
        );
        Render.changeToSearchableSelectorOptionByApiData(
            id.step2.brand   ,
            [id.step2.model, `${config.url}?type=gpu`, "Model","Rank", (cur)=> isSelectedBrand(id.step2.brand, cur) ]
        );
        Render.changeToUniqueSelectorOptionByApiData(    
            id.step3.howMany ,
            [id.step3.brand, `${config.url}?type=ram`, "Brand", (cur)=> isSelectedRamStickAmount(id.step3.howMany, cur) ]
        );
        Render.changeToSearchableSelectorOptionByApiData(
            id.step3.howMany ,
            [id.step3.model, `${config.url}?type=ram`, "Model","Rank", (cur)=> isSelectedBrand(id.step3.brand, cur) && isSelectedRamStickAmount(id.step3.howMany, cur) ]
        );
        Render.changeToSearchableSelectorOptionByApiData(
            id.step3.brand   ,
            [id.step3.model, `${config.url}?type=ram`, "Model","Rank", (cur)=> isSelectedBrand(id.step3.brand, cur) && isSelectedRamStickAmount(id.step3.howMany, cur) ]
        );
        // //step4
        document.getElementById(id.step4.ssdOrHdd).addEventListener("change",()=>{

            SelectorOptionDirector.uniqueByApiData(    id.step4.brand, `${config.url}?type=${Selector.textOf(id.step4.ssdOrHdd).toLowerCase()}`, "Brand")
            SelectorOptionDirector.searchableByApiData(id.step4.model, `${config.url}?type=${Selector.textOf(id.step4.ssdOrHdd).toLowerCase()}`, "Model","Rank")

            SelectorOptionDirector.simpleByArray(id.step4.strage, setStrageArr());


            Render.changeToUniqueSelectorOptionByApiData(
                id.step4.strage, 
                [id.step4.brand, `${config.url}?type=${Selector.textOf(id.step4.ssdOrHdd).toLowerCase()}`, "Brand", (cur)=> isSelectedStrage(id.step4.strage,cur)]
            );
            Render.changeToSearchableSelectorOptionByApiData(
                id.step4.strage, 
                [id.step4.model, `${config.url}?type=${Selector.textOf(id.step4.ssdOrHdd).toLowerCase()}`, "Model","Rank", (cur)=> isSelectedStrage(id.step4.strage,cur)]
            );
            Render.changeToSearchableSelectorOptionByApiData(
                id.step4.brand , 
                [id.step4.model, `${config.url}?type=${Selector.textOf(id.step4.ssdOrHdd).toLowerCase()}`, "Model","Rank", (cur)=> isSelectedBrand(id.step4.brand, cur) && isSelectedStrage(id.step4.strage,cur)]
            );

        })
        //やること
    
        //その後最後のPCのHTML追加
        //計算の処理を追加してまたやることを書く。
        //fiilの処理はModelのselectorのみに適応したい。
        //検索の際はRankが必ずしもindexではないからModel名が一致するまでindex++。Rank == value && textOf == Model;
        //やることが見つからなかったら完成！！
        Render.clickToBuildPC(id.buildBtn);

    }

}

View.base();
View.main();


export{View};