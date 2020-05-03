import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import {MaterialModule} from './material/material.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DialogComponent } from './dialog/dialog.component';
import { AsideComponent } from './aside/aside.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    NotfoundComponent,
    DialogComponent,
    AsideComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
