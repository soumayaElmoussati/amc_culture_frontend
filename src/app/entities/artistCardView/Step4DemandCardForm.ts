
class Step4DemandCardForm {
  refObject: string;
  refParent: string;
  documentType: string;
  file: any;
  cv?: any;
  catalogues?: any;
  piecesMusicales?: any;
  ficheJudiciaire?: any;
  contratTravail?: any;
  attestationTravail?: any;
  constructor() {
    this.cv = { file: null, value: "", refDocument: "" };
    this.catalogues = { file: null, value: "", refDocument: "" };
    this.piecesMusicales = { file: null, value: "", refDocument: "" };
    this.ficheJudiciaire = { file: null, value: "", refDocument: "" };
    this.contratTravail = { file: null, value: "", refDocument: "" };
    this.attestationTravail = { file: null, value: "", refDocument: "" };
  }
  setObject(arr: any) {
    for (let i of Object.keys(arr)) this[i] = arr[i];
  }
}
export default Step4DemandCardForm;
