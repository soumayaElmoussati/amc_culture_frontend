class Step3PrinterForm{
  refPrinter:string;
  otherProducts:string[];

    setObject(arr:any){
        for(let i of Object.keys(arr))
          this[i]=arr[i];
      }
   
    }
    export default Step3PrinterForm;