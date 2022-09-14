class Step1PrinterForm{
    refPrinter:string;
    businessName:any;
    lineOfBusiness:any;
    ownerName:any;
    creationDate:any;
    Fax:any;
    phoneNumber:any;
    businessRegisterNumber:any;
    commonCompanyIdentifier:any;
    cnssNumber:any;
    City:any;
    space:any;
    Address:any;
    website:any;
    membershipAssociationOrSyndicate:any;
    email:any;
    permanentEmployeesNumber:any;
    temporaryEmployeesNumber:any;
    averageBooksPrintedAnnually:any;
    setObject(arr:any){
        for(let i of Object.keys(arr))
          this[i]=arr[i];
      }
   
    }
    export default Step1PrinterForm;
  