class Step2PrinterForm{
  refPrinter:string;
  facilitiesAndServices:any[];
   otherProducts:any[];

    setObject(arr:any){
        for(let i of Object.keys(arr))
          this[i]=arr[i];
      }
   
    }
    export default Step2PrinterForm;