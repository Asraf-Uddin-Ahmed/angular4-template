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

export class JsonToDynamicForm {

    private readonly typeToFunction: { [typeName: string]: (json) => DynamicFormControlModel; } = {
        'string': this.getText,
        'email': this.getText,
        'object': this.getText,
        'integer': this.getText
    };

    constructor() { }

    getDynamicForm(jsonModels: any[]): DynamicFormControlModel[] {
        const dynamicFormControlModels: DynamicFormControlModel[] = [];
        jsonModels.forEach(jsonModel => {
            jsonModel.type = jsonModel.type ? jsonModel.type : 'string';
            console.log(jsonModel);
            dynamicFormControlModels.push(this.typeToFunction[jsonModel.type](jsonModel));
        });
        return dynamicFormControlModels;
    }

    private getText(json): DynamicInputModel {
        return new DynamicInputModel(
            {
                id: json.name,
                label: json.label,
                placeholder: json.label,
                value: json.value,
                validators: {
                    required: null
                },
                errorMessages: {
                    required: '{{ label }} is required'
                }
            },
            {
                element: {
                    label: 'col-form-label'
                }
            }
        );
    }
}
