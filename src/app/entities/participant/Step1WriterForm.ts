class Step1WriterForm{
    refAuthor:String;
    fullName:String;
    gender:String;
    birthDate:Date;
    dateOfDeath:Date;
    address:String;
    countryOfResidence:String;
    city:String;
    phoneNumber:String;
    fax:String;
    email:String;
    webPage:String;
    picture?:any;
/*    picture?:any;
    constructor(){

        this.picture={file:null,value:"",refDocument:""};
    }*/
    setObject(arr:any){
        for(let i of Object.keys(arr))
          this[i]=arr[i];
      }
   
    }
    export default Step1WriterForm;
  