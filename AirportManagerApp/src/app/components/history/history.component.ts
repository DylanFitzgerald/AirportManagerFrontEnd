import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history:Object[];
  multHistory:Object[];
  histories:Object[][];
  tableBool:boolean = true;
  tableBool2:boolean = true;

  constructor(private dataService:DataService) { }

  ngOnInit() {

  }

  checkHistory(id) {
    this.dataService.checkHistoryForPerson(id).subscribe((res) => {
      console.log(res);
      if (res.length == 0 && id != '') {
        alert('Not a valid id');
      }
      else {
        var histArr = new Array<Object>(res.length);
        for  (var i = 0; i < histArr.length; i++) {
          histArr[i] = res[i];
        }
        this.history = histArr;
        this.tableBool = false;
        if (id == '') {
          this.tableBool = true;
        }
      }
    });
  }

  checkAllHistory() {
    this.dataService.checkAllHistory().subscribe((res) => {
      this.multHistory = new Array(1);
      this.histories = res;
      var i = 0;
      for (var arr of this.histories) {
        for (var entry of arr) {
          this.multHistory[i] = entry;
          i++;
        }
      }
      this.multHistory.sort(this.compareTimes);
      console.log(this.multHistory);
      this.tableBool2 = !this.tableBool2;
    });
  }

  compareTimes(a, b) {
    if (a.Timestamp > b.Timestamp) {
      return 1
    }
    else if (a.Timestamp < b.Timestamp) {
      return -1;
    }
    else {
      return 0;
    }
  }

}
 