import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, NG_VALIDATORS, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsNGBootstrapUIModule } from '@ng-dynamic-forms/ui-ng-bootstrap';
import { NgbDatepickerModule, NgbTimepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule, FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { validateStartsWithoutAbc, customDateRangeValidator, validateUrl, requireCheckbox, requireCheckboxGroup } from './app.validators';

import { HttpService } from './services/http.service';

import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DynamicBootstrapFormComponent } from './components/dynamic-bootstrap-form/dynamic-bootstrap-form.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MasterSearchComponent } from './components/master-search/master-search.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DynamicBootstrapFormComponent,
    FileUploadComponent,
    MasterSearchComponent,
    DropdownComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    DynamicFormsCoreModule.forRoot(),
    DynamicFormsNGBootstrapUIModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    AngularFontAwesomeModule,
    AppRoutingModule
  ],
  providers: [
    HttpService,
    { provide: NG_VALIDATORS, multi: true, useValue: validateStartsWithoutAbc },
    { provide: NG_VALIDATORS, multi: true, useValue: validateUrl },
    { provide: NG_VALIDATORS, multi: true, useValue: requireCheckbox },
    { provide: NG_VALIDATORS, multi: true, useValue: requireCheckboxGroup },
    { provide: NG_VALIDATORS, multi: true, useValue: customDateRangeValidator }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
