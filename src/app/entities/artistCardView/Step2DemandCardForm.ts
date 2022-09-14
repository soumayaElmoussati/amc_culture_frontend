class Step2DemandCardForm{
    refArtistAccount: string;
    studyLevel:String;
    isGraduated:Boolean;
    artisticEtablishmentName:String;
    artistSpeciality:String;
    graduatedYear:any;
   
    setObject(arr:any){
        for(let i of Object.keys(arr))
          this[i]=arr[i];
      }
}
export default Step2DemandCardForm;