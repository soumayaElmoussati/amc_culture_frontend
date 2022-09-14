class Step4EditorForm{
    refEditor:string;
    numberPublicationsPerYearArabic:any;
    numberPublicationsPerYearAmazigh:any;
    numberPublicationsPerYearFrench:any;
    numberPublicationsPerYearEnglish:any;
    permanentEmployeesNumber:any;
    customerBase:any[];
    numberBooksPublishedPerYear:any;
    numberBooksPublishedLastYear:any;
    setObject(arr:any){
        for(let i of Object.keys(arr))
          this[i]=arr[i];
      }
   
    }
    export default Step4EditorForm;
  