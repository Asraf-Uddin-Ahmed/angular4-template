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
    min,
    max,
    required,
    pattern,
    startsWithout
}
enum ValidationType {
    minLength,
    maxLength,
    min,
    max,
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
    url,
    text,
    checkbox,
    checkboxGroup
}
enum InputType {
    text,
    number,
    email,
    color,
    tel,
    url,
    file,
    textArea
}


export class JsonToDynamicForm {

    private readonly JSON_INPUT_TYPE_TO_FUNCTION: { [typeName: string]: (json) => DynamicFormControlModel; } = {};

    constructor() {
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.string]] = (json) => this.getInput(json, InputType.text);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.email]] = (json) => this.getInput(json, InputType.email);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.integer]] = (json) => this.getInput(json, InputType.number);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.url]] = (json) => this.getInput(json, InputType.url);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.object]] = (jsonObject) => this.getFormGroup(jsonObject);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.text]] = (json) => this.getTextArea(json);
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.checkbox]] = (json) => this.getCheckbox(json, '');
        this.JSON_INPUT_TYPE_TO_FUNCTION[JsonInputType[JsonInputType.checkboxGroup]] = (json) => this.getCheckboxGroup(json);
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

    private getCheckboxGroup(json: any): DynamicCheckboxGroupModel {
        const dynamicCheckboxGroupModel = new DynamicCheckboxGroupModel(
            {
                id: json.name,
                label: json.label,
                group: []
            },
            {
                element: {
                    label: 'col-form-label'
                }
            }
        );
        json.array.forEach(jsonCheckbox => {
            console.log(jsonCheckbox);
            const controlModel = this.getCheckbox(jsonCheckbox, 'btn btn-primary');
            dynamicCheckboxGroupModel.group.push(controlModel);
        });
        return dynamicCheckboxGroupModel;
    }
    private getCheckbox(json: any, controlClass: string): DynamicCheckboxModel {
        return new DynamicCheckboxModel(
            {
                id: json.name,
                label: json.label,
                hint: json.hint
            },
            {
                element: {
                    control: controlClass
                }
            }
        );
    }

    private getTextArea(json: any) {
        return new DynamicTextAreaModel(
            {
                id: json.name,
                label: json.label,
                placeholder: json.label,
                value: json.value,
                hint: json.hint,
                minLength: json.minLength,
                maxLength: json.maxLength,
                rows: 5,
                validators: this.getValidators(json, InputType.textArea),
                errorMessages: this.getErrorMessages(json, InputType.textArea)
            },
            {
                element: {
                    label: 'col-form-label'
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
                min: json.min,
                max: json.max,
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
        if (json[JsonValidationType[JsonValidationType.min]]) {
            validators[ValidationType[ValidationType.min]] = json[JsonValidationType[JsonValidationType.min]];
        }
        if (json[JsonValidationType[JsonValidationType.max]]) {
            validators[ValidationType[ValidationType.max]] = json[JsonValidationType[JsonValidationType.max]];
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
        if (json[JsonValidationType[JsonValidationType.min]]) {
            errorMessages[ValidationType[ValidationType.min]] =
                'Minimum value of {{ label }} is ' + json[JsonValidationType[JsonValidationType.min]];
        }
        if (json[JsonValidationType[JsonValidationType.max]]) {
            errorMessages[ValidationType[ValidationType.max]] =
                'Maximum value of {{ label }} is ' + json[JsonValidationType[JsonValidationType.max]];
        }

        if (json[JsonValidationType[JsonValidationType.startsWithout]]
            && json[JsonValidationType[JsonValidationType.startsWithout]] === 'abc') {

            errorMessages[ValidationType[ValidationType.validateStartsWithoutAbc]] = '{{label}} cannot start with abc';
        }

        return errorMessages;
    }
}
