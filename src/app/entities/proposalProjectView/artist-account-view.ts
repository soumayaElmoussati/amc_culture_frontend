export class ArtistAccount {
  refArtistAccount: string;
  cin: string;
  firstName: string;
  lastName: string;
  firstNameAR: string;
  lastNameAR: string;
  artistName: string;
  artistNameAR: string;
  gender: string;
  identityType: string;
  identityNumber: string;
  identityProfType: string;
  artistSpeciality: string;
  artistSpecialityAR: string;
  email: string;
  phoneNumber: string;
  otherPhoneNumber: string;
  maritalStatus: string;
  dependentChildren:number;
  otherJobName: string;
  socialSecurityName: string;
  socialSecurityID: string;
  artisticWorkStartDate: Date;
  lastArtisticActivity: string;
  teamName: string;
  teamCreationDate: Date;
  studyLevel: string;
  artisticEtablishmentName: string;
  ribNumber: string;
  domainName: string;
  birthdata: {
    birthDate: Date,
    birthCountry: string,
    birthCity: string,
    nationality: string
  };
  generalInformation?: {
    refCompanyAccount?: string,
    projectName?:  string,
    projectTitle?:  string,
    projectType?:  string,
    numDancesOrSongs?:  0,
    durationTime?:  string,
    projectCost?:  0,
    projectDescription?:  string,
    albumTitle?:  string
  };
  refArtisticProfession?:string;
  address: {
    refAddress?: string,
    province?: string,
    postalCode: string,
    city: string,
    country: string,
    address: string,
    region: string
  };
  status?: string
}
 