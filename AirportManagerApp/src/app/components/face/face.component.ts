import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-face',
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.css']
})
export class FaceComponent implements OnInit {
  trigger:Subject<void> = new Subject<void>();
  webcamImage:WebcamImage = null;

  constructor() { }

  ngOnInit() {

  }

  triggerSnapshot() {
    this.trigger.next();
  }

  handleImage(webcamImage): void {
    console.log(webcamImage.imageAsBase64);
    this.webcamImage = webcamImage;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

}
