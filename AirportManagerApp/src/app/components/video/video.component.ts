import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  fileToUpload: File = null;

  constructor(private dataService:DataService) { }

  ngOnInit() {

  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
  }

  uploadVideoToStream() {
    this.dataService.uploadMVKVideoToStream(this.fileToUpload).subscribe((data) => {
      console.log(data);
    });
  }

}
