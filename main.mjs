import { Selector,SelectorDirector } from '/selector.mjs';
import { SelectorOption,SelectorOptionDirector } from '/selector.mjs';

const config = {
    url : "https://api.recursionist.io/builder/computers",
    image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCjyztNf0Tm1M720Kd0RWj6ACMWtjdYvVimg&usqp=CAU"
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
    buildBtn:"build-btn",
    pcInfo:"pc-info"
}
class PC{

    cpu;
    gpu;
    ram;
    strage;

    constructor(){}

    setCPU(cpu){
        this.cpu = cpu;
        console.log(this)
    }
    setGPU(gpu){
        this.gpu = gpu;
        console.log(this)
    }
    setRAM(ram){
        this.ram = ram;
        console.log(this)
    }
    setSTRAGE(strage){
        this.strage = strage;
        console.log(this)
    }

    set(part,data){
        switch(part){
            case "cpu":this.setCPU(data);break;
            case "gpu":this.setGPU(data);break;
            case "ram":this.setRAM(data);break;
            case "ssd":this.setSTRAGE(data);break;
            case "hdd":this.setSTRAGE(data);break;
        }
    }
    
}
class Render{

    static changeToUniqueSelectorOptionByApiData(targetId,argumentArr){

        document.getElementById(targetId).addEventListener("change",()=> SelectorOptionDirector.uniqueByApiData(...argumentArr))

    }
    static changeToSearchableSelectorOptionByApiData(targetId,argumentArr){

        document.getElementById(targetId).addEventListener("change",()=> SelectorOptionDirector.searchableByApiData(...argumentArr))

    }
    static  clickToBuildPC(targetId){

        let areFilledAll = ()=>{

            return [
                document.getElementById(id.step1.model),
                document.getElementById(id.step2.model),
                document.getElementById(id.step3.model),
                document.getElementById(id.step4.model)
            ].reduce((bool,selector) => selector.value == "-1" ? false : bool ,true);

        }
        let search = (data,value,model) => {

            let l = data.length;
            let index = parseInt(value)-1;

            while(l > index){
                if(value == data[index]["Rank"] && model == data[index]["Model"]) return data[index]
                index++;
            }
            View.alert("danger",`Search error. There was no match. Replaced to most related to build PC.`)
            return data[parseInt(value)-1]

        }
        let  searchAndSet = async (pc,part,selectorId) => {

            let value = document.getElementById(selectorId).value;
            let model = Selector.textOf(selectorId);

            return fetch(`${config.url}?type=${part}`).then(res => res.json())
            .then(data => pc.set(part,search(data,value,model)));

        }
        

        document.getElementById(targetId).addEventListener("click",async function(){

            if(areFilledAll()){

                let pc = new PC();
                await searchAndSet(pc,"cpu",id.step1.model);
                await searchAndSet(pc,"gpu",id.step2.model);
                await searchAndSet(pc,"ram",id.step3.model);
                await searchAndSet(pc,Selector.textOf(id.step4.ssdOrHdd).toLowerCase(),id.step4.model)

                document.getElementById(id.pcInfo).innerHTML += ViewTemplate.pcInfo(pc);
            }
            else View.alert("danger","You have to choose all of model selector at least.")

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
    static pcInfo(pc){
        console.log(pc)

        let work = 1;
        let gaming = 1;

        return`
            <div class="row mx-0 bg-info p-3 mt-3 rounded">
                            
                <div class="col-12 col-md-6">
                    <img src="${config.image}" alt="" width="100%">

                    <h3 class="mt-3">Work : ${work}%</h3>
                    <h3>Gaming : ${gaming}%</h3>
                </div>

                <div class="col-12 col-md-6">
                    <h3 class="mt-3">CPU</h3>
                    <p>brand : ${pc["cpu"]["Brand"]}</p>
                    <p>model : ${pc["cpu"]["Model"]}</p>
                    <h3>GPU</h3>
                    <p>brand : ${pc["gpu"]["Brand"]}</p>
                    <p>model : ${pc["gpu"]["Model"]}</p>
                    <h3>RAM</h3>
                    <p>brand : ${pc["ram"]["Brand"]}</p>
                    <p>model : ${pc["ram"]["Model"]}</p>
                    <h3>Strage</h3>
                    <p>type : ${pc["strage"]["Type"]}</p>
                    <p>brand : ${pc["strage"]["Brand"]}</p>
                    <p>model : ${pc["strage"]["Model"]}</p>
                </div>

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

                <div id="${id.pcInfo}" class="col-12 my-5 ">
                    
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

        Render.clickToBuildPC(id.buildBtn);

    }

}

View.base();
View.main();


export{View};