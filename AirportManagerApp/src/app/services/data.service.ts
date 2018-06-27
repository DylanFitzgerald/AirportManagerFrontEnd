import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http:Http) {
    console.log('data service connected ...');
  }

  getAllPersons() {
    return this.http.get('http://localhost:3000/hyperledger/persons?action=queryAll')
    .pipe(map(res => res.json()));
  }

  getPersonByName(name:any) {
    return this.http.get('http://localhost:3000/hyperledger/persons?action=queryPersonByName&name=' + name)
    .pipe(map(res => res.json()));
  }

  processPerson(id:any) {
    return this.http.post('http://localhost:3000/hyperledger/persons', id)
    .pipe(map(res => res.json()));
  }

  postNewPerson(person:any) {
    return this.http.post('http://localhost:3000/hyperledger/persons', person)
    .pipe(map(res => res.json()));
  }

  checkHistoryForPerson(id:any) {
    return this.http.get('http://localhost:3000/hyperledger/persons?action=queryHistoryForPerson&id=' + id, id)
    .pipe(map(res => res.json()));
  }

  checkAllHistory() {
    return this.http.get('http://localhost:3000/hyperledger/persons?action=queryAllPersonsHistory')
    .pipe(map(res => res.json()));
  }
}
