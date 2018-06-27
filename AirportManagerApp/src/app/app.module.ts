import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PersonsComponent } from './components/persons/persons.component';
import { ManageComponent } from './components/manage/manage.component';
import { HistoryComponent } from './components/history/history.component';

import { DataService } from './services/data.service';

const appRoutes: Routes = [  
  {path: '', component: HomeComponent},
  {path: 'persons', component: PersonsComponent},
  {path: 'manage', component: ManageComponent},
  {path: 'history', component: HistoryComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PersonsComponent,
    ManageComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    FormsModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
