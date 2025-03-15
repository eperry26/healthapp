import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MedSectionComponent } from './med-section/med-section.component';
import { EditMedsComponent } from './edit-meds/edit-meds.component';
import { UpdatePopupComponent } from './update-popup/update-popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    MedSectionComponent,
    EditMedsComponent,
    UpdatePopupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
