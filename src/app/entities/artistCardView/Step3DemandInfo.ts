class Step3DemandInformation {
  refDemandCard: string;
  status: string;
  refArtistAccount: string;
  cardType:string;
  setObject(arr: any) {
    for (let i of Object.keys(arr)) this[i] = arr[i];
  }
}
export default Step3DemandInformation;
