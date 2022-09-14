class Step1DemandAwardHassan2Form{
    refArtistAccount:String;
    cin:String;
    firstName:String;
    lastName:String;
    firstNameAr:String;
    lastNameAr:String;
    gender:String;
    email:String;
    phoneNumber:String;
    ribNumber:String

    setObject(arr:any){
      for(let i of Object.keys(arr))
        this[i]=arr[i];
    }
  }
  export default Step1DemandAwardHassan2Form;