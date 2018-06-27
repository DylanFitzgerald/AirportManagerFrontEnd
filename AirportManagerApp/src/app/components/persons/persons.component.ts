import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  persons:Object[];
  searchBool:boolean = true;
  processBool:boolean = true;
  processStatus:string = '';
  person:Person = {
    name: '',
    flightNumber: '',
    transitStatus: '',
    date: '',
    airport: '',
    baggage:''
  };
  type:string;

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getAllPersons().subscribe((persons) => {
      var persArray = new Array<Object>(persons['allpersons'].length);
      for (var i=0; i < persons['allpersons'].length; i++) {
        persArray[i] = persons['allpersons'][i].Record;
      }
      this.persons = persArray;
    });
  }

  searchPersonByName(name) {
    this.dataService.getPersonByName(name).subscribe((obj) => {
      console.log(obj['allpersonsWithName'][0]);
      this.person.name = obj['allpersonsWithName'][0].name;
      this.person.flightNumber = obj['allpersonsWithName'][0].flightNumber;
      this.person.transitStatus = obj['allpersonsWithName'][0].transitStatus;
      this.person.date = obj['allpersonsWithName'][0].date;
      this.person.airport = obj['allpersonsWithName'][0].airport;
      this.person.baggage = obj['allpersonsWithName'][0].baggage;
    });
    this.searchBool = false;
  }

  processPerson(name) {
    this.dataService.getPersonByName(name).subscribe((obj) => {
      var id = {
        "action": "processPerson",
        "user": { "id": obj['allpersonsWithName'][0].id.slice(6) }
      }
      this.dataService.processPerson(id).subscribe((res) => {
        console.log(res);
        this.searchBool = true;
        this.processBool =false;
        if (res.res == 'SUCCESS') {
          this.type = 'success';
          this.processStatus = 'successfully!'
        }
        else {
          this.type = 'danger';
          this.processStatus = 'unsuccessfully.'
        }
      });
    });
  }

}

interface Person {
  name:string,
  flightNumber:string,
  transitStatus:string,
  date:string,
  airport:string,
  baggage:string
}