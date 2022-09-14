export  interface CooperativeAccount{
    refCooperativeAccount?: string,
    cooperativeName: string,
    phoneNumber: string,
    faxNumber: string,
    firstName: string,
    lastName: string,
    responsibleName: string,
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
    address?: {
      refAddress?: string,
      province?: string,
      postalCode: string,
      city: string,
      country: string,
      address: string,
      region: string
    },
    status?: string,
    cooperativeMember?:string,
}