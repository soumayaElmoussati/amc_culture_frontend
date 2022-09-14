export interface TypeOfPointSale {
    refTypeOfPointSale:any;
    Name:string;
    description:any;
     }
     
     export class TypeOfPointSaleData {
       public static typeOfPointSale: TypeOfPointSale[] = [
             // ng-select => peoples
         {
           'refTypeOfPointSale': '5a15b13c36e7a7f00cf0d7cb',
           'Name': 'Bibliothèques',
           'description': 'https://via.placeholder.com/20x20',
          
         },
         {
           'refTypeOfPointSale': '5a15b13c36e7a7f00cf0d7cb',
           'Name': 'Cabines',
           'description': 'https://via.placeholder.com/20x20',
          
         },
         {
           'refTypeOfPointSale': '5a15b13c36e7a7f00cf0d7cb',
           'Name': 'Supermarchés',
           'description': 'https://via.placeholder.com/20x20',
          
         },
         {
           'refTypeOfPointSale': '5a15b13c36e7a7f00cf0d7cb',
           'Name': 'Autre',
           'description': 'https://via.placeholder.com/20x20',
          
         }
         
       ]
     }