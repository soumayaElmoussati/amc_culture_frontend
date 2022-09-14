class Step1EditorForm{
    refEditor:string;
    businessName:any;
    lineOfBusiness:any;
    ownerName:any;
    creationDate:any;
    faxNumber:any;
    phoneNumber:any;
    businessRegisterNumber:any;
    commonCompanyIdentifier:any;
    cnssNumber:any;
    city:any;
    space:any;
    socialCapital:any;
    website:any;
    email:any;
    Address:any;
    permanentEmployeesNumber:any;
    temporaryEmployeesNumber:any;
    membershipAssociationOrSyndicate:any;
    setObject(arr:any){
        for(let i of Object.keys(arr))
          this[i]=arr[i];
      }
   
    }
    export default Step1EditorForm;
  