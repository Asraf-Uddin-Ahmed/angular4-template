import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicRadioGroupModel,
    DynamicTextAreaModel,
    DynamicFormArrayModel,
    DynamicFormGroupModel,
    DynamicDatePickerModel,
    DynamicTimePickerModel,
    DynamicFormControlModel
} from '@ng-dynamic-forms/core';


enum ValidationType {
    minlength,
    maxlength,
    required
}
enum InputType {
    text,
    number,
    email,
    color,
    tel,
    url
}


export class JsonToDynamicForm {

    private readonly typeToFunction: { [typeName: string]: (json) => DynamicFormControlModel; } = {
        'string': (json) => this.getInput(json, InputType.text),
        'email': (json) => this.getInput(json, InputType.email),
        'object': (json) => this.getInput(json, InputType.url),
        'integer': (json) => this.getInput(json, InputType.number)
    };

    constructor() { }

    getDynamicForm(jsonModels: any[]): DynamicFormControlModel[] {
        const dynamicFormControlModels: DynamicFormControlModel[] = [];
        jsonModels.forEach(jsonModel => {
            jsonModel.type = jsonModel.type ? jsonModel.type : 'string';
            console.log(jsonModel);
            const obj = this.typeToFunction[jsonModel.type](jsonModel);
            dynamicFormControlModels.push(obj);
        });
        return dynamicFormControlModels;
    }

    private getInput(json: any, inputType: InputType): DynamicInputModel {
        return new DynamicInputModel(
            {
                inputType: InputType[inputType],
                id: json.name,
                label: json.label,
                placeholder: json.label,
                value: json.value,
                validators: this.getValidators(json),
                errorMessages: this.getErrorMessages(json)
            },
            {
                element: {
                    label: 'col-form-label'
                }
            }
        );
    }

    private getValidators(json) {
        const validators = {};
        if (json[ValidationType[ValidationType.required]]) {
            validators[ValidationType[ValidationType.required]] = null;
        }
        return validators;
    }
    private getErrorMessages(json) {
        const errorMessages = {};
        if (json[ValidationType[ValidationType.required]]) {
            errorMessages[ValidationType[ValidationType.required]] = '{{ label }} is required';
        }
        return errorMessages;
    }
}
