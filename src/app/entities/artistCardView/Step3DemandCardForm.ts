class Step3DemandCardForm{
    refArtistAccount: string;
    cardType:String;
    artisticSpecialityFR:String;
    artisticSpecialityAR:String;
    otherJob:Boolean;
    organism:String;
    establishmentName:String;
    socialCoverage:String;
    numeroAffiliation:Number;
    firstArtisticJobDate:any;
    lastArtisticActivity:String;
    goupName:String;
    creationGroupDate:Date;
    belongToGroup:string;
    
    setObject(arr:any){
        for(let i of Object.keys(arr))
          this[i]=arr[i];
      }

}
export default Step3DemandCardForm;