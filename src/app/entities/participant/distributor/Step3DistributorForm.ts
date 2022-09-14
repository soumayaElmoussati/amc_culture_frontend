class Step3DistributorForm{
    refDistributor: string;
    formsOfPromotingBooks:any[];
  
   
    setObject(arr:any){
        for(let i of Object.keys(arr))
          this[i]=arr[i];
      }
   
    }
    export default Step3DistributorForm;
  