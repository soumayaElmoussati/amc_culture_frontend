export  interface CompanyAcount{
  refCompanyAccount?: string,
  companyName: string,
  juridicForm: string,
  phoneNumber: string,
  faxNumber: string,
  responsibleName: string,
  registerNumber: string,
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
  },
  refArtisticProfession?:string,
  address: {
    refAddress?: string,
    province?: string,
    postalCode: string,
    city: string,
    country: string,
    address: string,
    region: string
  },
  status?: string,
  cnss?:{
    refDocument?:string,
    name?:string,
    nature?:string,
  },
  legalStatus?:{
    refDocument?:string,
    name?:string,
    nature?:string,
  },
  register?:{
    refDocument?:string,
    name?:string,
    nature?:string,
  },
  fiscalityRegularity?:{
    refDocument?:string,
    name?:string,
    nature?:string,
  }
  
}