import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function customValidator(control: AbstractControl): ValidationErrors | null {
    if (typeof control.value !== 'string') {
        return null;
    }

    const hasError = control.value ? (control.value as string).startsWith('abc') : false;

    return hasError ? { customValidator: true } : null;
}

export function customDateRangeValidator(group: FormGroup): ValidationErrors | null {

    const dateArrival = group.get('arrivalDate').value as Date;
    const dateDeparture = group.get('departureDate').value as Date;
    let hasError = false;

    if (dateArrival && dateDeparture) {
        hasError = dateArrival >= dateDeparture || dateDeparture <= dateArrival;
    }

    return hasError ? { customDateRangeValidator: true } : null;
}
