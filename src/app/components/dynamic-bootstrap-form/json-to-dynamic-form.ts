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
import { validateStartsWithoutAbc, validateUrl } from '../../app.validators';


enum JsonValidationType {
    minLength,
    maxLength,
    required,
    pattern,
    startsWithout
}
enum ValidationType {
    minLength,
    maxLength,
    required,
    email,
    pattern,
    validateStartsWithoutAbc,
    validateUrl
}
enum JsonInputType {
    email,
    string,
    object,
    integer,
    url
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
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.url]] = (json) => this.getInput(json, InputType.url);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.object]] = (jsonObject) => this.getFormGroup(jsonObject);
    }

    getDynamicForm(jsonModels: any[]): DynamicFormControlModel[] {
        const dynamicFormControlModels: DynamicFormControlModel[] = [];
        jsonModels.forEach(jsonModel => {
            jsonModel.type = jsonModel.type ? jsonModel.type : JsonInputType[JsonInputType.string];
            console.log(jsonModel);
            const controlModel = this.JSON_INPUT_TYPE_TO_FUNCTION[jsonModel.type](jsonModel);
            dynamicFormControlModels.push(controlModel);
        });
        return dynamicFormControlModels;
    }


    private getFormGroup(jsonObject: any): DynamicFormGroupModel {
        return new DynamicFormGroupModel(
            {
                id: jsonObject.name,
                label: jsonObject.label,
                group: this.getDynamicForm(jsonObject.form.value)
            },
            {
                element: {
                    control: 'jumbotron', // form-row
                    label: 'col-form-label blockquote'
                }
            }
        );
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
                validators: this.getValidators(json, inputType),
                errorMessages: this.getErrorMessages(json, inputType)
            },
            {
                element: {
                    label: 'col-form-label'
                }
            }
        );
    }

    private getValidators(json: any, inputType: InputType) {
        const validators = {};

        if (inputType === InputType.email) {
            validators[ValidationType[ValidationType.email]] = null;
        }
        if (inputType === InputType.url) {
            validators[ValidationType[ValidationType.validateUrl]] = {
                name: validateUrl.name,
                args: null
            };
        }

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

        if (json[JsonValidationType[JsonValidationType.startsWithout]]
            && json[JsonValidationType[JsonValidationType.startsWithout]] === 'abc') {

            validators[ValidationType[ValidationType.validateStartsWithoutAbc]] = {
                name: validateStartsWithoutAbc.name,
                args: null
            };
        }

        return validators;
    }

    private getErrorMessages(json: any, inputType: InputType) {
        const errorMessages = {};

        if (inputType === InputType.email) {
            errorMessages[ValidationType[ValidationType.email]] = '{{ label }} is not valid';
        }
        if (inputType === InputType.url) {
            errorMessages[ValidationType[ValidationType.validateUrl]] = '{{ label }} is not valid';
        }

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

        if (json[JsonValidationType[JsonValidationType.startsWithout]]
            && json[JsonValidationType[JsonValidationType.startsWithout]] === 'abc') {

            errorMessages[ValidationType[ValidationType.validateStartsWithoutAbc]] = '{{label}} cannot start with abc';
        }

        return errorMessages;
    }
}
