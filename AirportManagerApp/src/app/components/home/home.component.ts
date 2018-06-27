import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  status:string = 'the backend is not running.';
  type:string = 'danger';

  constructor(private dataService:DataService) {}

  ngOnInit() {  
    this.dataService.getAllPersons().subscribe((persons) => {
      console.log(persons['allpersons']);
      this.status = 'The backend is running';
      this.type = 'success';
    });
  }
}
