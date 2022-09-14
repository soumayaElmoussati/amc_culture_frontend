import address from "./Adress";
import birthData from "./Birthdata";

class Step1DemandCardForm {
  refArtistAccount: string;
  lastName: string;
  firstName: string;
  lastNameAR: string;
  firstNameAR: string;
  email: string;
  identityType: string;
  cin: string;
  phoneNumber: any;
  otherPhoneNumber: any;
  gender: string;
  address = new address();
  birthdata = new birthData();
  maritalStatus: string;
  dependentChildren: number;
  setObject(arr: any) {
    for (let i of Object.keys(arr)) this[i] = arr[i];
  }
}
export default Step1DemandCardForm;
