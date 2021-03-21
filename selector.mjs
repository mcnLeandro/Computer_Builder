import { View } from '/main.mjs';

//HTMLのselectorをbuildする構造体！
//計算量は良くないと思う。場合による。
class Selector{

    constructor(selectorId,iterable){

        this.selectorId = selectorId;
        this.iterable = iterable;

    }

    //iterable( [..] => [..] )
    uniquify(){
        this.iterable = [...new Set(this.iterable)];
        return this;
    }
    //iterable( <E> => <E> )
    //f(cur,idx,src)
    filter(f){
        this.iterable = this.iterable.filter(f);
        return this;
    }
    //iterable( [..] => [..] )
    //f(cur,idx,src)
    map(f){
        this.iterable = this.iterable.map(f);
        return this;
    }
    //iterable( [{}..] => [..] )
    //f(key,idx,keys)
    mapByKeys(f){
        this.iterable = Object.keys(this.iterable).map(f);
        return this;
    }
    //iterable( [{}..] => [..] )
    //f(val,idx,values)
    mapByValues(f){
        this.iterable = Object.values(this.iterable).map(f);
        return this;
    }
    //iterable( <E> => [[2]..] )  // <E> can be [..], or [{}..],
    adjust(dataKey,valueKey){
        switch(arguments.length){
            case 0: this.iterable = this.iterable.map((cur,idx) => [idx,cur]);break;
            case 1: this.iterable = Object.keys(this.iterable).map((key,idx) => [ idx , this.iterable[key][dataKey] ]); break;
            case 2: this.iterable = Object.keys(this.iterable).map(key => [this.iterable[key][valueKey],this.iterable[key][dataKey]]); break;
        }
        return this;
    }
    //iterable [[2]..] => done
    build(){

        return `
            <div class="col-12 mt-3">
                <select id="${this.selectorId}" class="custom-select col-12 col-md-6" >
                    ${new SelectorOption(this.selectorId, this.iterable).build()}
                </select>
            </div>
        `

    }
    buildAt(id){

        document.getElementById(id).innerHTML = this.build();

    }

    static textOf(selectorId){

        let select = document.getElementById(selectorId);
        return select.options[select.selectedIndex].text;

    }

}
class SelectorOption extends Selector{

    constructor(selectorId, iterable){
        super(selectorId, iterable);
    }

    //iterable [[2]..] => done
    build(){
        return `${this.iterable.reduce((acc,cur) => acc += `<option class="p-3" value="${cur[0]}">${cur[1]}</option>`,`<option class="p-3" value="-1">Choose...</option>`)}`
    }
    buildAtId(){
        document.getElementById(this.selectorId).innerHTML = this.build();
    }
}
class SelectorDirector{

    static simpleByArrayOfObjects(selectorId, iterable, dataKey){

        return new SelectorOption(selectorId,iterable).mapByValues((cur)=> cur[dataKey]).uniquify().adjust().build();

    }
    //非同期用
    static simpleByApiData(selectorId, url, dataKey){

        fetch(url).then(res => res.json()).then(iterable => this.simpleByArrayOfObjects(selectorId,iterable,dataKey));

    }
}
class SelectorOptionDirector{
    
    static simpleByArray(selectorId, iterable){

        new SelectorOption(selectorId,iterable).adjust().buildAtId();

    }
    static uniqueByArrayOfObjects(selectorId, iterable, dataKey,f){

        switch(arguments.length){

            case 3:
                new SelectorOption(selectorId,iterable)
                .mapByValues(cur=> cur[dataKey])
                .uniquify()
                .adjust()
                .buildAtId();
                break;
            case 4:
                new SelectorOption(selectorId,iterable)
                .filter(f)
                .mapByValues(cur=> cur[dataKey])
                .uniquify()
                .adjust()
                .buildAtId();
                break;
            default:return;

        }

    }
    static searchableByArrayOfObjects(selectorId, iterable, dataKey,valueKey,f){

        switch(arguments.length){

            case 4 :
                new SelectorOption(selectorId,iterable)
                .adjust(dataKey,valueKey)
                .buildAtId();
                break;
            case 5 :
                new SelectorOption(selectorId,iterable)
                .filter(f)
                .adjust(dataKey,valueKey)
                .buildAtId();
                break;
            default:return;

        }

    }

    //非同期用 上のメソッドをそれぞれ呼び出してるだけ
    static simpleByApiData(selectorId, url, dataKey){

        fetch(url).then(res => res.json())
        .then(iterable => this.simpleByArray(selectorId,iterable,dataKey))
        .catch(()=> View.alert("danger",`Failed to set Selector with API data. The Selector\`s id is ${selectorId}`));

    }
    static uniqueByApiData(selectorId, url, dataKey,f){
        
        switch(arguments.length){

            case 3:
                fetch(url).then(res => res.json())
                .then(iterable => this.uniqueByArrayOfObjects(selectorId,iterable,dataKey))
                .catch(()=> View.alert("danger",`Failed to set Selector with API data. The Selector\`s id is ${selectorId}`));
                break;
            case 4:
                fetch(url).then(res => res.json())
                .then(iterable => this.uniqueByArrayOfObjects(selectorId,iterable,dataKey,f))
                .catch(()=> View.alert("danger",`Failed to set Selector with API data. The Selector\`s id is ${selectorId}`));
                break;
            default:return;

        }
        
    }
    static searchableByApiData(selectorId, url, dataKey,valueKey,f){

        switch(arguments.length){

            case 4:
                fetch(url).then(res => res.json())
                .then(iterable => this.searchableByArrayOfObjects(selectorId,iterable,dataKey,valueKey))
                .catch(()=> View.alert("danger",`Failed to set Selector with API data. The Selector\`s id is ${selectorId}`));
                break;
            case 5:
                fetch(url).then(res => res.json())
                .then(iterable => this.searchableByArrayOfObjects(selectorId,iterable,dataKey,valueKey,f))
                .catch(()=> View.alert("danger",`Failed to set Selector with API data. The Selector\`s id is ${selectorId}`));
                break;
            default:return;

        }

    }
}

export {Selector,SelectorOption,SelectorDirector,SelectorOptionDirector};
