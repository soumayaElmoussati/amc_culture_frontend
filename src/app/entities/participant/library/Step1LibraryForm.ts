class Step1LibraryForm{
    refLibrary:string;
    libraryName:any;
    StandardDefinitionOfBusiness:any;
    libraryOwnerName:any;
    libraryCreationDate:any;
    faxNumber:any;
    phoneNumber:any;
    businessRegisterNumber:any;
    commonCompanyIdentifier:any;
    cnssNumber:any;
    city:any;
    librarySpace:any;
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
    export default Step1LibraryForm;
  