class Step4DistributorForm{
    refDistributor: string;
    numberPointSaleRural:any;
    numberPointSaleUrban:any;
    averageNumberContactsAnnuallyWithPublishers:any;
    costOfDistributionComparedRetailPrice:any;
    membershipAssociationOrSyndicate:any;
    customerBase:any;
    typeOfPointSale:any[];
    setObject(arr:any){
        for(let i of Object.keys(arr))
          this[i]=arr[i];
      }
   
    }
    export default Step4DistributorForm;
  