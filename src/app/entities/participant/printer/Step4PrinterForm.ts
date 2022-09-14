class Step4PrinterForm{
  refPrinter:string;
    
    membershipAssociationOrSyndicate:any;
    setObject(arr:any){
        for(let i of Object.keys(arr))
          this[i]=arr[i];
      }
   
    }
    export default Step4PrinterForm;