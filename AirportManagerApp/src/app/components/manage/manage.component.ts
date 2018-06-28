import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private dataService:DataService) { }

  ngOnInit() {

  }

  postPerson(name, flightNumber, date, airport) {
    var person = {
        "action": "createPerson",
        "user": {
          "name": name,
          "flightNumber": flightNumber,
          "date": date,
          "airport": airport
      }
    }

    this.dataService.postNewPerson(person).subscribe((res) => {
      
    });

    location.reload();
  }

}
