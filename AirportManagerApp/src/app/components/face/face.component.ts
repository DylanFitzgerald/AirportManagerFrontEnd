import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { DataService } from '../../services/data.service';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-face',
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.css']
})
export class FaceComponent implements OnInit {
  trigger:Subject<void> = new Subject<void>();
  webcamImage:WebcamImage = null;
  id:string = "";
  userDNE:boolean = true;
  closeAlert:boolean = false;
  uploadBool:boolean = true;
  uploaded:boolean = true;
  restart:boolean = true;
  data:any;
  status:any;
  type:any;

  constructor(private dataService:DataService, public progress: NgProgress) { }

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
    this.webcamImage = webcamImage;

    this.data = {
      jpegUrl: webcamImage.imageAsBase64,
      id: this.id
    } 
  }

  checkFace() {
    this.progress.start();
    this.triggerSnapshot();
    this.dataService.checkFace(this.data).subscribe((result) => {
      console.log(result);
      if  (result.user == "does not exist") {
        this.type = 'danger';
        this.status = 'USER DOES NOT EXIST'
        this.userDNE = false;
      }
      else if  (result.user == 'SUCCESS') {
        this.type = 'success';
        this.status = 'Found User in Bucket!'
        this.uploaded = false;
        this.restart = false;
      }
      else {
        this.type = 'danger';
        this.status = 'Something went wrong. Are you sure there is a face in camera?'
        this.webcamImage = null;
      }
      this.progress.complete();
    });
    this.uploadBool = true;
    this.uploaded = false;  
  }

  upload(id) {
    this.data.id = id;
    if (id == "") {
      this.uploadedWrongAlert();
      this.status = 'ERROR: Must enter a name in the input box! Try again.';
      this.webcamImage = null;
    }
    else {
      this.dataService.uploadImage(this.data).subscribe((res) => {
        if (res.response == "received") {
          console.log('recieved');
          this.uploadBool = true;
          this.uploaded = false;
          this.type = 'success';
          this.status = 'UPLOADED IMAGE!'
          this.webcamImage = null;
        }
        else {
          this.uploadedWrongAlert();
        }
      });
    }
    this.userDNE = true;
  }

  retakePhoto() {
    location.reload();
  }

  uploadedWrongAlert() {
    console.log('ERROR');
    this.uploaded = false;
    this.uploadBool = true;
    this.type = 'danger';
    this.status = 'ERROR: Image not recieved by bucket.'
  } 

  closeAlertNow() {
    this.closeAlert = true;
  }

}
