export interface NewCommissionResponse{

    "refCommission": string,
    "commissionType": string,
    "startedDate": Date,
    "endDate": Date,
    "plannings": [
      {
        "refPlanning": string,
        "planningDate": Date,
        "startedTime": string,
        "endTime": string
      }
    ],
    "members": [
      {
        "refCommissionMember": string,
        "cin": string,
        "firstName": string,
        "lastName": string,
        "gender": string
      }
    ]

}
