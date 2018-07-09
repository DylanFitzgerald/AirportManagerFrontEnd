import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { WebcamModule } from 'ngx-webcam';
import { NgProgressModule } from '@ngx-progressbar/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PersonsComponent } from './components/persons/persons.component';
import { ManageComponent } from './components/manage/manage.component';
import { HistoryComponent } from './components/history/history.component';

import { DataService } from './services/data.service';
import { FaceComponent } from './components/face/face.component';

const appRoutes: Routes = [  
  {path: '', component: HomeComponent},
  {path: 'persons', component: PersonsComponent},
  {path: 'manage', component: ManageComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'face', component: FaceComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PersonsComponent,
    ManageComponent,
    HistoryComponent,
    FaceComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    WebcamModule,
    NgProgressModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
