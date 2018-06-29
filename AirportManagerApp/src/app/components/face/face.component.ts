import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-face',
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.css']
})
export class FaceComponent implements OnInit {
  trigger:Subject<void> = new Subject<void>();
  webcamImage:WebcamImage = null;
  id:string = "";
  uploadBool:boolean = true;
  uploaded:boolean = true;
  data:any;
  status:any;
  type:any;

  constructor(private dataService:DataService) { }

  ngOnInit() {
     
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  triggerSnapshot() {
    this.trigger.next();
  }

  handleImage(webcamImage): void {
    this.uploadBool = false;
    console.log(webcamImage.imageAsBase64);
    this.webcamImage = webcamImage;

    this.data = {
      jpegUrl: webcamImage.imageAsBase64,
      id: this.id
    } 
  }

  upload(id) {
    this.data.id = id;
    if (id == "") {
      this.uploadedWrongAlert();
      this.status = 'ERROR: Must enter a name in the input box!';
    }
    else {
      this.dataService.uploadImage(this.data).subscribe((res) => {
        if (res.response == "received") {
          console.log('recieved');
          this.uploadBool = true;
          this.uploaded = false;
          this.type = 'success';
          this.status = 'uploaded image!'
          this.retakePhoto();
        }
        else {
          this.uploadedWrongAlert();
        }
      });
    }
    this.retakePhoto();
  }

  retakePhoto() {
    this.webcamImage = null;
  }

  uploadedWrongAlert() {
    console.log('ERROR');
    this.uploaded = false;
    this.uploadBool = true;
    this.type = 'danger';
    this.status = 'ERROR: Image not recieved by bucket.'
  } 

}
