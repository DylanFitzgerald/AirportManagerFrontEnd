import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptions, Headers } from '@angular/http';
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

  uploadImage(data:any) {
    return this.http.post('http://localhost:3000/request', data)
    .pipe(map(res => res.json()));
  }

  checkFace(face:any) {
    return this.http.post('http://localhost:3000/compareFaces', face)
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

  uploadMVKVideoToStream(video: File) {
    var myHeaders = new Headers();
    myHeaders.append('x-amzn-stream-name', 'dylan-video-stream');
    myHeaders.append('x-amzn-stream-arn', 'arn:aws:kinesisvideo:us-east-1:360883585029:stream/dylan-video-stream/1531236987713');
    myHeaders.append('x-amzn-fragment-timecode-type', 'ABSOLUTE');
    myHeaders.append('x-amzn-producer-start-timestamp', '2018-07-10 15:36:27.713 UTC');
    var options = new RequestOptions({headers: myHeaders});
    return this.http.post('https://s-1e415f8b.kinesisvideo.us-east-1.amazonaws.com', video, options)
    .pipe(map(res => res.json()));
  }
}
