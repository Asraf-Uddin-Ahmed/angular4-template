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


enum JsonValidationType {
    minLength,
    maxLength,
    required,
    pattern
}
enum ValidationType {
    minLength,
    maxLength,
    required,
    email,
    pattern
}
enum JsonInputType {
    email,
    string,
    object,
    integer
}
enum InputType {
    text,
    number,
    email,
    color,
    tel,
    url,
    file
}


export class JsonToDynamicForm {

    private readonly JSON_INPUT_TYPE_TO_FUNCTION: { [typeName: string]: (json) => DynamicFormControlModel; } = {};

    constructor() {
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.string]] = (json) => this.getInput(json, InputType.text);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.email]] = (json) => this.getInput(json, InputType.email);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.integer]] = (json) => this.getInput(json, InputType.number);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.object]] = (json) => this.getInput(json, InputType.url);
    }

    getDynamicForm(jsonModels: any[]): DynamicFormControlModel[] {
        const dynamicFormControlModels: DynamicFormControlModel[] = [];
        jsonModels.forEach(jsonModel => {
            jsonModel.type = jsonModel.type ? jsonModel.type : JsonInputType[JsonInputType.string];
            console.log(jsonModel);
            const obj = this.JSON_INPUT_TYPE_TO_FUNCTION[jsonModel.type](jsonModel);
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
                hint: json.hint,
                prefix: json.prefix,
                suffix: json.suffix,
                mask: json.mask,
                minLength: json.minLength,
                maxLength: json.maxLength,
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
        if (json[JsonValidationType[JsonValidationType.required]]) {
            validators[ValidationType[ValidationType.required]] = null;
        }
        if (json[JsonValidationType[JsonValidationType.pattern]]) {
            validators[ValidationType[ValidationType.pattern]] = json[JsonValidationType[JsonValidationType.pattern]];
        }
        if (json[JsonValidationType[JsonValidationType.minLength]]) {
            validators[ValidationType[ValidationType.minLength]] = json[JsonValidationType[JsonValidationType.minLength]];
        }
        if (json[JsonValidationType[JsonValidationType.maxLength]]) {
            validators[ValidationType[ValidationType.maxLength]] = json[JsonValidationType[JsonValidationType.maxLength]];
        }

        if (JsonInputType[JsonInputType.email] === json.type) {
            validators[ValidationType[ValidationType.email]] = null;
        }
        return validators;
    }
    private getErrorMessages(json) {
        const errorMessages = {};
        if (json[JsonValidationType[JsonValidationType.required]]) {
            errorMessages[ValidationType[ValidationType.required]] = '{{ label }} is required';
        }
        if (json[JsonValidationType[JsonValidationType.pattern]]) {
            errorMessages[ValidationType[ValidationType.pattern]] = '{{label}} does not match pattern {{validator.requiredPattern}}';
        }
        if (json[JsonValidationType[JsonValidationType.minLength]]) {
            errorMessages[ValidationType[ValidationType.minLength]] =
                'Minimum length of {{ label }} is ' + json[JsonValidationType[JsonValidationType.minLength]];
        }
        if (json[JsonValidationType[JsonValidationType.maxLength]]) {
            errorMessages[ValidationType[ValidationType.maxLength]] =
                'Maximum lenght of {{ label }} is ' + json[JsonValidationType[JsonValidationType.maxLength]];
        }

        if (JsonInputType[JsonInputType.email] === json.type) {
            errorMessages[ValidationType[ValidationType.email]] = '{{ label }} is not valid';
        }
        return errorMessages;
    }
}
