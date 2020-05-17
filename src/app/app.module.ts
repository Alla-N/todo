import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CreateComponent } from './components/create/create.component';
import { FiltersComponent } from './components/filters/filters.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { EditComponent } from './components/edit/edit.component';

import { TodoListService } from './services/todo/todolist.service';
import { StoreService } from './services/store/store.service';

import { TodosSearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    NotfoundComponent,
    CreateComponent,
    FiltersComponent,
    HeaderComponent,
    MainComponent,
    EditComponent,
    TodosSearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
