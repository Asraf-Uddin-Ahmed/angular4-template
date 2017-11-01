import { FormArray, FormGroup } from '@angular/forms';
import { DynamicFormArrayModel, DynamicFormService, DynamicFormControlModel } from '@ng-dynamic-forms/core';

export class DynamicFormArrayModelHelper {

    constructor(
        private formService: DynamicFormService,
        private formArray: FormArray,
        private dynamicFormArrayModel: DynamicFormArrayModel
    ) {

    }

    add() {
        this.formService.addFormArrayGroup(this.formArray, this.dynamicFormArrayModel);
    }
    insert(index: number) {
        this.formService.insertFormArrayGroup(index, this.formArray, this.dynamicFormArrayModel);
    }
    remove(index: number) {
        this.formService.removeFormArrayGroup(index, this.formArray, this.dynamicFormArrayModel);
    }
    move(index: number, step: number) {
        this.formService.moveFormArrayGroup(index, step, this.formArray, this.dynamicFormArrayModel);
    }
    clear() {
        this.formService.clearFormArray(this.formArray, this.dynamicFormArrayModel);
    }

}
