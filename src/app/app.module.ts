import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, NG_VALIDATORS } from '@angular/forms';

import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsNGBootstrapUIModule } from '@ng-dynamic-forms/ui-ng-bootstrap';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { validateStartsWithoutAbc, customDateRangeValidator, validateUrl, requireCheckbox } from './app.validators';

import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DynamicBootstrapFormComponent } from './components/dynamic-bootstrap-form/dynamic-bootstrap-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DynamicBootstrapFormComponent
  ],
  imports: [
    BrowserModule,
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    DynamicFormsCoreModule.forRoot(),
    DynamicFormsNGBootstrapUIModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: NG_VALIDATORS, multi: true, useValue: validateStartsWithoutAbc },
    { provide: NG_VALIDATORS, multi: true, useValue: validateUrl },
    { provide: NG_VALIDATORS, multi: true, useValue: requireCheckbox },
    { provide: NG_VALIDATORS, multi: true, useValue: customDateRangeValidator }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
