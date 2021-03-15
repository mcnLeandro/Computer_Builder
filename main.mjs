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
    static selectorOption(key,data){
        return `
            <option class="p-3" value="${key}">${data}</option>
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
        //第一引数がセットしてるselectorのid
        View.AsyncSelectorOptionsByObjectsArray("step1-brand",config.url + "?type=cpu","Brand");
        // View.AsyncSelectorOptionsByObjectsArray("step1-model",config.url + "?type=cpu","Model");

        View.AsyncSelectorOptionsByObjectsArray("step2-brand",config.url + "?type=gpu","Brand");
        View.AsyncSelectorOptionsByObjectsArray("step2-model",config.url + "?type=gpu","Model");

        View.selectorOptionsByArray("step3-how-many?",[1,2,3,4]);
        View.AsyncSelectorOptionsByObjectsArray("step3-brand",config.url + "?type=ram","Brand");
        View.AsyncSelectorOptionsByObjectsArray("step3-model",config.url + "?type=ram","Model");


        View.selectorOptionsByArray("step4-hdd-or-ssd",["HHD","SSD"]);
        View.selectorOptionsByArray("step4-strage",["4TB","2TB","1TB","960GB","800GB","512GB","500GB","480GB","400GB","280GB","256GB","250GB","128GB","118GB","58GB"]);
        View.AsyncSelectorOptionsByObjectsArray("step4-brand",config.url + "?type=gpu","Brand");
        View.AsyncSelectorOptionsByObjectsArray("step4-model",config.url + "?type=gpu","Model");



        ///Event
        Render.changeToLeadAsyncSelectorOptionsByObjectsArray("step1-brand",["step1-model",config.url + "?type=cpu","Model"])

        
    }


    //==========================================================================
    // selectorOptions
    //========================================================================
    //ここはオーバーロードしたかったところ。以下のメソッドは全部出力は同じで入力値やselector内のoptionの構成が少し違うだけ。
    //今回は使わないのもあるけど、これでもうselectorはテンプレート化できたと思う

    //1. iterableが[0,1,2,3,4,5,6,7..]
    static selectorOptionsByArray(id,iterable){

        document.getElementById(id).innerHTML = `

            <option class="p-3" value="-1">Choose...</option>
            ${Object.keys(iterable).reduce((options,index) => options += ViewTemplate.selectorOption(1, iterable[index]),``)}

        `

    }
    //2. iterableが[[value,data],[value,data]]
    static selectorOptionsBy2DArray(id,iterable){

        document.getElementById(id).innerHTML = `

            <option class="p-3" value="-1">Choose...</option>
            ${Object.keys(iterable).reduce((options,key) => options += ViewTemplate.selectorOption(iterable[key][0], iterable[key][1]),``)}

        `

    }
    //3. iterableが {key : {}, key :{}}
    static selectorOptionsByObjectsObject(id, iterable, dataColumn, valueColumn){

        switch(arguments.length){
            case 3:
                let arr = [...new Set(Object.keys(iterable).map(key => iterable[key][dataColumn]))]
                View.selectorOptionsByArray(id,arr);
                break;
            case 4:
                let arr2D = Object.keys(iterable).map(key => [iterable[key][valueColumn],iterable[key][dataColumn]]);
                View.selectorOptionsBy2DArray(id,arr2D);
                break;
            default:
                return;
        }

    }
    //4. iterableが[{},{}],実は3.と処理が全く同じだったりする笑。でも一応分けておく
    static selectorOptionsByObjectsArray(id, iterable, dataColumn, valueColumn){

        switch(arguments.length){
            case 3:
                let arr = [...new Set(Object.keys(iterable).map(key => iterable[key][dataColumn]))]
                View.selectorOptionsByArray(id,arr);
                break;
            case 4:
                let arr2D = Object.keys(iterable).map(key => [iterable[key][valueColumn],iterable[key][dataColumn]]);
                View.selectorOptionsBy2DArray(id,arr2D);
                break;
            default:
                return;
        }
    }
    
    //===============================================================
    // 非同期selectorOptions 
    //==============================================================
    //以下は、上の非同期version
    //基本的にAPIで取得したデータは[{}{}{}]の形だと思うからそれ以外は今回はコメントアウトしておく
    // static AsyncSelectorOptionsByArray(id,url){

    //     fetch(url).then(responce => responce.json()).then(data => {
        
    //         View.selectorOptionsByArray(id,data);

    //     })

    // }
    // static AsyncSelectorOptionsBy2DArray(id,url){

    //     fetch(url).then(responce => responce.json()).then(data => {
        
    //         View.selectorOptionsBy2DArray(id,data);

    //     })

    // }
    // static AsyncSelectorOptionsByObjectsObject(id,url,dataColumn,valueColumn){

    //     fetch(url).then(responce => responce.json()).then(data => {
            
    //         switch(arguments.length){
    //             case 3:
    //                 View.selectorOptionsByObjectsObject(id,data,dataColumn);
    //                 break;
    //             case 4:
    //                 View.selectorOptionsByObjectsObject(id,data,dataColumn,valueColumn)
    //                 break;
    //             default:
    //         };

    //     })

    // }
    static AsyncSelectorOptionsByObjectsArray(id,url,dataColumn,valueColumn){

        fetch(url).then(responce => responce.json()).then(data => {

            switch(arguments.length){
                case 3:
                    View.selectorOptionsByObjectsArray(id,data,dataColumn);
                    break;
                case 4:
                    View.selectorOptionsByObjectsArray(id,data,dataColumn,valueColumn)
                    break;
                default:
            }

        })

    }
    
}


View.base();
View.main();
