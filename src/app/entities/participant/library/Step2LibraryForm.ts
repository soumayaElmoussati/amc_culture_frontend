class Step2LibraryForm{
    refLibrary:string;
    libraryOtherProduct:any[];
    booksLanguageSold:any[];
    setObject(arr:any){
        for(let i of Object.keys(arr))
          this[i]=arr[i];
      }
   
    }
    export default Step2LibraryForm;