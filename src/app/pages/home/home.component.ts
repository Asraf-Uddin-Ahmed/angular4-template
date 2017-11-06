import { Component, OnInit } from '@angular/core';

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
  DynamicTimePickerModel
} from '@ng-dynamic-forms/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /*
  model = [

    new DynamicFormGroupModel(
      {
        id: 'stay',
        group: [

          new DynamicDatePickerModel(
            {
              id: 'arrivalDate',
              inline: false,
              label: 'Arrival',
              placeholder: 'Date of Arrival',
              toggleIcon: './assets/calendar-icon.svg'
            },
            {
              element: {
                container: 'p-0',
                label: 'col-form-label'
              },
              grid: {
                host: 'col-sm-4'
              }
            }
          ),

          new DynamicDatePickerModel(
            {
              id: 'departureDate',
              inline: false,
              label: 'Departure',
              placeholder: 'Date of Departure',
              toggleIcon: './assets/calendar-icon.svg'
            },
            {
              element: {
                container: 'p-0',
                label: 'col-form-label'
              },
              grid: {
                host: 'col-sm-4'
              }
            }
          )
        ]
      },
      {
        element: {
          control: 'form-row'
        }
      }
    ),

    new DynamicFormGroupModel(
      {
        id: 'room',
        group: [

          new DynamicSelectModel(
            {
              id: 'roomSize',
              label: 'Room Size',
              options: [
                {
                  label: 'Single Room',
                  value: 'single-room'
                },
                {
                  label: 'Double Room',
                  value: 'double-room'
                },
                {
                  label: 'Business Suite',
                  value: 'business-suite'
                },
                {
                  label: 'Presidential Suite',
                  value: 'presidential-suite'
                },
                {
                  label: 'Storeroom',
                  value: 'storeroom'
                }
              ],
              value: 'single-room'
            },
            {
              element: {
                label: 'col-form-label'
              },
              grid: {
                host: 'col-sm-6'
              }
            }
          ),
          new DynamicInputModel(
            {
              id: 'roomQuantity',
              inputType: 'number',
              label: 'Quantity',
              placeholder: 'Quantity',
              hint: 'Maximum: 5',
              max: 5,
              min: 0,
              value: 1
            },
            {
              element: {
                container: 'text-center',
                label: 'col-form-label'
              },
              grid: {
                host: 'col-sm-2'
              }
            }
          )
        ]
      },
      {
        element: {
          control: 'form-row'
        }
      }
    ),

    new DynamicFormGroupModel(
      {
        id: 'addressStreet',
        group: [

          new DynamicInputModel(
            {
              id: 'streetName',
              label: 'Street Name',
              placeholder: 'Street Name'
            },
            {
              element: {
                label: 'col-form-label'
              },
              grid: {
                host: 'col-sm-10'
              }
            }
          ),

          new DynamicInputModel(
            {
              id: 'streetNumber',
              label: 'Street Number',
              placeholder: 'Number'
            },
            {
              element: {
                label: 'col-form-label'
              },
              grid: {
                host: 'col-sm-2'
              }
            }
          )
        ]
      },
      {
        element: {
          control: 'form-row'
        }
      }
    ),

    new DynamicFormGroupModel(
      {
        id: 'addressLocation',
        group: [

          new DynamicInputModel(
            {
              id: 'zipCode',
              label: 'Zip Code',
              placeholder: 'ZIP'
            },
            {
              element: {
                label: 'col-form-label'
              },
              grid: {
                host: 'col-sm-2'
              }
            }
          ),

          new DynamicInputModel(
            {
              id: 'state',
              label: 'State',
              placeholder: 'State'
            },
            {
              element: {
                label: 'col-form-label'
              },
              grid: {
                host: 'col-sm-4'
              }
            }
          ),

          new DynamicInputModel(
            {
              id: 'city',
              label: 'City',
              placeholder: 'City'
            },
            {
              element: {
                label: 'col-form-label'
              },
              grid: {
                host: 'col-sm-6'
              }
            }
          )
        ]
      },
      {
        element: {
          control: 'form-row'
        }
      }
    ),

    new DynamicCheckboxGroupModel(
      {
        id: 'extras',
        label: 'Extras',
        group: [
          new DynamicCheckboxModel(
            {
              id: 'extraBreakfast',
              label: 'Breakfast'
            },
            {
              element: {
                control: 'btn-primary'
              }
            }
          ),
          new DynamicCheckboxModel(
            {
              id: 'extraTV',
              label: 'TV',
            },
            {
              element: {
                control: 'btn-primary'
              }
            }
          ),
          new DynamicCheckboxModel(
            {
              id: 'extraWiFi',
              label: 'WiFi'
            },
            {
              element: {
                control: 'btn-primary'
              }
            }
          ),
          new DynamicCheckboxModel(
            {
              id: 'extraParking',
              label: 'Parking Lot'
            },
            {
              element: {
                control: 'btn-primary'
              }
            }
          ),
          new DynamicCheckboxModel(
            {
              id: 'extraBalcony',
              label: 'Balcony'
            },
            {
              element: {
                control: 'btn-primary'
              }
            }
          )
        ]
      }
    ),

    new DynamicRadioGroupModel(
      {
        id: 'payment',
        label: 'Payment Method',
        options: [
          {
            label: 'Credit Card',
            value: 'cc'
          },
          {
            label: 'PayPal',
            value: 'paypal'
          },
          {
            label: 'Cash',
            value: 'cash'
          },
          {
            label: 'Bitcoin',
            value: 'bitcoin'
          }
        ],
        value: 'cc'
      },
      {
        element: {
          label: 'col-form-label',
          option: 'btn-primary'
        }
      }
    ),

    new DynamicTimePickerModel(
      {
        id: 'arrivalTime',
        label: 'Estimated Arrival Time'
      },
      {
        element: {
          container: 'pt-2 mb-0',
          label: 'col-form-label'
        }
      }
    ),

    new DynamicTextAreaModel(
      {
        id: 'notes',
        label: 'Personal Note',
        placeholder: 'Personal Note',
        rows: 5
      },
      {
        element: {
          label: 'col-form-label'
        }
      }
    ),

    new DynamicCheckboxModel(
      {
        id: 'confirm',
        label: 'I confirm the information given above'
      }
    ),

    new DynamicFormArrayModel(
      {
        id: 'bootstrapFormArray',
        initialCount: 5,
        label: 'Form Array',
        groupFactory: () => {
          return [
            new DynamicInputModel(
              {
                id: 'bootstrapArrayGroupInput',
                placeholder: 'example array group input'
              },
              {
                element: {
                  label: 'col-form-label'
                }
              }
            )
          ];
        }
      },
      {
        element: {
          label: 'col-form-label'
        }
      }
    )
  ];
  */

  modelJson = [
    {
      'name': 'name',
      'label': 'Area name.',
      'required': true,
      'value': 'Grand Pappy Marina.'
    },
    {
      'name': 'type',
      'label': 'Area type.',
      'required': true,
      'type': 'integer',
      'value': 1
    },
    {
      'name': 'timeZoneRef',
      'label': 'Area time zone.',
      'required': true,
      'pattern': '[a-c]+',
      'value': 'US-Pacific.'
    },
    {
      'name': 'officePhone',
      'label': 'Office Phone number.',
      'mask': ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      'required': true,
      'value': '+123456789.'
    },
    {
      'name': 'officeEmail',
      'label': 'Office email address.',
      'required': true,
      'type': 'email',
      'value': 'office@konnectedtechnology.com.'
    },
    {
      'name': 'numberOfSlots',
      'label': 'Office email address.',
      'type': 'integer',
      'value': 100
    },
    {
      'name': 'numberOfGates',
      'label': 'Area gates count.',
      'type': 'integer',
      'value': 5
    },
    {
      'name': 'numberOfRepeaters',
      'label': 'Area repeaters count.',
      'type': 'integer',
      'value': 0
    },
    {
      'name': 'numberOfGateways',
      'label': 'Area gateways count.',
      'type': 'integer',
      'value': 0
    },
    {
      'name': 'numberOfSections',
      'label': 'Office email address',
      'type': 'integer',
      'value': 0
    },
    {
      'name': 'address',
      'label': 'Address',
      'required': true,
      'type': 'object',
      'form': {
        'value': [
          {
            'name': 'cityRef',
            'label': 'City referance',
            'required': true,
            'value': '544-900ABT'
          },
          {
            'name': 'street',
            'label': 'Street Address',
            'required': true,
            'value': '1234 Street'
          },
          {
            'name': 'zip',
            'label': 'Zip code',
            'required': true,
            'value': '77342'
          }
        ]
      }
    }
  ];

  constructor() { }
  ngOnInit() {
  }

  postForm(formGroup) {
    console.log(formGroup);
  }
  cancelForm() {
    console.log('redirect to previous page');
  }
}
