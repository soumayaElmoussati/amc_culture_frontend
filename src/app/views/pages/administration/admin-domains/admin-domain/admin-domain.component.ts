import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { GenericPageable } from 'src/app/entities/generic-pageable';
import { Domains } from 'src/app/entities/proposalProjectView/domains';
import { LanguageService } from 'src/app/services/language/language.service';
import { DomainsService } from 'src/app/services/proposal-project/domains-general/domains.service';
import { HandleRequestService } from 'src/app/services/shared/handle-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-domain',
  templateUrl: './admin-domain.component.html',
  styleUrls: ['./admin-domain.component.scss']
})
export class AdminDomainComponent implements OnInit {
  /*********************** Managing ********************* */
  model: Domains = new Domains();
  fieldsForModel: string[] = ["shortName", "longName", "shortNameAr", "longNameAr", "component"];
  validationForm: FormGroup;
  isFormSubmitted: boolean = false;
  isInError: Boolean = false;
  dataSent: boolean = false;
  attaching: string = null;
  componentOptions = [{ value: "CULTURE", labelFr: "Culture", labelAr: "الثقافة" },
  { value: "ART", labelFr: "Art", labelAr: "فن" },
  { value: "BOOK", labelFr: "Livre", labelAr: "الكتاب" }
  ];
  initFormValidation() {
    var ValidationAllElement = {};
    for (let el of this.fieldsForModel)
      ValidationAllElement[el] = ['', Validators.required];
    this.validationForm = this.formBuilder.group({ ...ValidationAllElement });
  }
  getErrorInputs(key: string): string {
    if (!this.isInError) {
      this.isInError = true;
      document.getElementById(key).scrollIntoView(true);
    }
    let errors = this.getFormGroup.get(key).errors;
    let s = (Object.keys(errors)[0] + "Field");
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  get getFormGroup() {
    return this.validationForm;
  }
  get form() {
    return this.getFormGroup.controls;
  }
  inputs: any[] = [];
  setInputs() {
    this.inputs = [
      { type: "simpleInput", data: { formControlName: "shortName", label: "shortName", placeHolder: "", type: "text", ngModel: this.model.shortName, onChange: (v) => { this.onChangevalue(v, 'model', 'shortName') }, required: true } },
      { type: "simpleInput", data: { formControlName: "longName", label: "longName", placeHolder: "", type: "text", ngModel: this.model.shortName, onChange: (v) => { this.onChangevalue(v, 'model', 'longName') }, required: true } },
      { type: "simpleInput", data: { formControlName: "shortNameAr", label: "shortNameAr", placeHolder: "", type: "text", ngModel: this.model.shortName, onChange: (v) => { this.onChangevalue(v, 'model', 'shortNameAr') }, required: true } },
      { type: "simpleInput", data: { formControlName: "longNameAr", label: "longNameAr", placeHolder: "", type: "text", ngModel: this.model.shortName, onChange: (v) => { this.onChangevalue(v, 'model', 'longNameAr') }, required: true } },
      { type: "selectInput", data: { formControlName: "component", label: "component", placeHolder: "", type: "text", ngModel: 'model.component', onChange: (v) => { this.onChangevalue(v, 'model', 'component') }, required: true, options: 'component', value: 'value', labelS: 'component', getLabel: this.getLabel, multiple: false } }
    ];
  }
  onFormSubmit() {
    this.isFormSubmitted = true;
    this.isInError = false;
    if (this.getFormGroup.valid) {
      this.dataSent = true;
      let refIfExist = this.model[this.refName];
      let whatToSend = this.domainsService.createDomain(this.model);
      if (this.model[this.refName])
        whatToSend = this.domainsService.updateDomain(this.model, refIfExist);
      whatToSend.subscribe(response => {
        this.handleRequestService.successMessage(refIfExist ? "updated" : "added");
        this.refreshData();
        this.clearForm();
      }, err => {
        this.handleRequestService.handleError(err);
      }).add(() => {
        this.isFormSubmitted = false;
        this.dataSent = false;
      });
    }
  }
  clearForm() {
    this.model = Domains.clear();
    this.updateForm();
  }
  updateForm() {
    this.validationForm.patchValue(this.model);
  }
  linkItem(refToLink, index) {
    this.attaching = refToLink;
    document.getElementById("top").scrollIntoView(true);
  }
  finishing() {
    this.attaching = null;
    this.clearForm();
    this.refreshData();
  }


  /*************************SIMPLE INPUT FUNCTIONS ******************************/
  onChangevalue = (value, firstkey, key: string) => {
    let keys = key.split(".");
    var d = this[firstkey];
    for (var i = 0; i < keys.length - 1; i++)
      d = d[keys[i]];
    d[keys[i]] = value;
  }
  getOption(option) {
    if (option == "component") {
      return this.componentOptions;
    }
    return [];
  }
  getModelValue(key) {
    let keys = key.split(".");
    var d = this;
    for (var i = 0; i < keys.length; i++)
      d = d[keys[i]];
    return d;
  }
  getLabel(ar, lang) {
    if (lang == "ar") return ar["labelAr"];
    return (ar["labelFr"]);
  }
  /*********************** End Managing ********************* */


  data: GenericPageable = new GenericPageable();
  refName = "refDomain";
  fields: string[] = ["refDomain", "shortName", "longName", "shortNameAr", "longNameAr", , "component"];
  /* Static columns
  TODO translate status exist in StatusEnum [Backend] */
  fieldsStatic: string[] = [];
  fieldsDates: string[] = [];
  fieldsList: any[] = [];
  sizes: number[] = [5, 10, 20, 50, 100];
  isLoad: boolean = true;
  doingAction: boolean = false;
  doingActionTo: number = null;
  currentPage: number = 0;
  currentSize: number = 10;

  setFieldsListForNeed() {
    this.fieldsList.push({ "label": "subDomains", "data": ["refSubDomain", "name", "nameAr"] });
  }

  constructor(public formBuilder: FormBuilder, private modalService: NgbModal, private translate: TranslateService, private handleRequestService: HandleRequestService, private domainsService: DomainsService, public languageService: LanguageService, private router: Router) {
    this.setInputs();
    this.initFormValidation();
    this.setFieldsListForNeed();
  }

  ngOnInit(): void {
    this.initData();
  }

  private initData() {
    this.getData(0);
  }

  refreshData() {
    this.getData(this.currentPage);
  }

  private getData(page: number) {
    this.isLoad = true;
    this.domainsService.getDomainsWithPageAndSize(page, this.currentSize).subscribe(response => {
      this.data = response;
    }, err => {
      this.handleRequestService.handleErrorWithCallBack(err, () => {
        this.router.navigate(["/error"]);
      });
    }).add(() => {
      this.currentPage = page;
      this.isLoad = false;
    });
  }

  onChangePage(page) {
    this.getData(page - 1);
  }

  updateItem(refToUpdate, index) {
    this.doingAction = true;
    this.doingActionTo = index;
    this.attaching = null;
    this.domainsService.getDomain(refToUpdate).subscribe(response => {
      this.model = response;
      this.updateForm();
      document.getElementById("top").scrollIntoView(true);
    }, err => { this.handleRequestService.handleError(err); })
      .add(() => { this.doingAction = false; this.doingActionTo = null; });
  }

  deleteItem(componant, refToDelete, index) {
    this.modalService.open(componant, { centered: true }).result.then((result) => {
      if (result == "save") {
        this.doingAction = true;
        this.doingActionTo = index;
        this.domainsService.deleteDomain(refToDelete)
          .subscribe(e => {
            if (this.data.pageDetails.numberOfElements <= 1 && this.currentPage != 0)
              this.currentPage = this.currentPage - 1;
            this.getData(this.currentPage);
            if (this.data.content.length == 0 && this.currentPage != 0) {
              this.getData(0);
            }
            Swal.fire({ position: 'center', title: this.translate.instant("table_delete_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' });
          },
            error => { this.handleRequestService.handleError(error) })
          .add(() => { this.doingAction = false; this.doingActionTo = null; })
      }
    });
  }

  onChangeSize(data) {
    this.currentSize = data.target.value;
    this.getData(0);
  }

}
