//HTMLのselectorをbuildする構造体！
//今回は本領発揮しないけどproject2のBattery finder programでめっちゃ使えそう。
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
            case 1: Object.keys(this.iterable).map((key,idx) => [ idx , this.iterable[key][dataKey] ]); break;
            case 2: Object.keys(this.iterable).map(key => [this.iterable[key][valueKey],this.iterable[key][dataKey]]); break;
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

    static simpleSelectorByArrayOfObjects(selectorId, iterable, dataKey){

        return new SelectorOption(selectorId,iterable).mapByValues((cur)=> cur[dataKey]).uniquify().adjust().build();

    }
    //非同期用
    static simpleSelectorByApiData(selectorId, url, dataKey){

        fetch(url).then(res => res.json()).then(iterable => this.simpleSelectorOptionByArrayOfObjects(selectorId,iterable,dataKey));

    }
}
class SelectorOptionDirector{
    
    static simpleSelectorOptionByArray(selectorId, iterable){

        new SelectorOption(selectorId,iterable).adjust().buildAtId();

    }
    static simpleSelectorOptionByArrayOfObjects(selectorId, iterable, dataKey){

        new SelectorOption(selectorId,iterable).mapByValues((cur)=> cur[dataKey]).uniquify().adjust().buildAtId();

    }
    static filteredSelectorOptionByArrayOfObject(selectorId, iterable, dataKey,f){

        new SelectorOption(selectorId,iterable).filter(f).mapByValues((cur)=> cur[dataKey]).uniquify().adjust().buildAtId();

    }
    //非同期用
    static simpleSelectorOptionByApiData(selectorId, url, dataKey){
        
        fetch(url).then(res => res.json())
                .then(iterable => this.simpleSelectorOptionByArrayOfObjects(selectorId,iterable,dataKey))
                .catch(()=> View.alert("Failed to get data from API url"));
        
    }
    static filteredSelectorOptionByApiData(selectorId, url, dataKey,f){

        fetch(url).then(res => res.json())
                .then(iterable => this.filteredSelectorOptionByArrayOfObject(selectorId,iterable,dataKey,f))
                .catch(()=> View.alert("Failed to get data from API url"));
        
    }
}

export {Selector,SelectorOption,SelectorDirector,SelectorOptionDirector};
