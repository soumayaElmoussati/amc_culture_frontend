
 class GeneralMemberResponse{
  refGeneralMember:string;
  refParent: string;
  cin: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phoneNumber: string;
  role:number;
  setObject(arr:any){
    for(let i of Object.keys(arr))
      this[i]=arr[i];
  }
}
export default GeneralMemberResponse;