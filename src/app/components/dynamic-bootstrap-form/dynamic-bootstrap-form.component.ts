import { JsonToDynamicForm } from './json-to-dynamic-form';
import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import {
  DynamicFormService,
  DynamicFormControlModel,
  DynamicFormArrayModel,
  DynamicInputModel
} from '@ng-dynamic-forms/core';
import { DynamicFormArrayModelHelper } from './dynamic-form-array-model-helper';

@Component({
  moduleId: module.id,
  selector: 'app-dynamic-bootstrap-form',
  templateUrl: './dynamic-bootstrap-form.component.html',
  styleUrls: ['../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'],
  encapsulation: ViewEncapsulation.None
})
export class DynamicBootstrapFormComponent implements OnInit {

  @Input() dynamicFormControlModel: DynamicFormControlModel[];
  @Input() jsonModels: any[];

  @Output() dbfSubmit = new EventEmitter();
  @Output() dbfCancel = new EventEmitter();
  @Output() dbfBlur = new EventEmitter();
  @Output() dbfChange = new EventEmitter();
  @Output() dbfFocus = new EventEmitter();

  formGroup: FormGroup;


  private dynamicFormArrayModelHelpers: { [id: string]: DynamicFormArrayModelHelper; } = {};


  constructor(private dynamicFormService: DynamicFormService) { }

  ngOnInit() {
    const jsonToDynamicForm = new JsonToDynamicForm();
    this.dynamicFormControlModel = this.jsonModels ? jsonToDynamicForm.getDynamicForm(this.jsonModels) : [];
    this.dynamicFormControlModel = this.dynamicFormControlModel ? this.dynamicFormControlModel : [];
    this.formGroup = this.dynamicFormService.createFormGroup(this.dynamicFormControlModel);
    this.initDynamicFormArray();
    console.log(this.dynamicFormControlModel);
  }

  onBlur($event) {
    this.dbfBlur.emit($event);
  }
  onChange($event) {
    this.dbfChange.emit($event);
  }
  onFocus($event) {
    this.dbfFocus.emit($event);
  }

  submitForm() {
    this.dbfSubmit.emit(this.formGroup);
  }
  cancelForm() {
    this.dbfCancel.emit();
  }


  private initDynamicFormArray() {
    // tslint:disable-next-line:forin
    for (const group in this.formGroup.value) {
      const formArray = this.formGroup.get(group) as FormArray;
      if (formArray instanceof FormArray) {
        const dynamicFormArrayModel = this.dynamicFormService.findById(group, this.dynamicFormControlModel) as DynamicFormArrayModel;
        this.dynamicFormArrayModelHelpers[group] =
          new DynamicFormArrayModelHelper(this.dynamicFormService, formArray, dynamicFormArrayModel);
      }
    }
  }

}
