import { Component, OnInit } from '@angular/core';
import { UtilService } from '../util.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog} from '@angular/material/dialog';
import { DialogueComponent } from './dialogue/dialogue.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cr2-assigment';
  repoData = [];
  searchText = '';
  averageScore = '';

  constructor(private utilService: UtilService, private spinner: NgxSpinnerService, private dialog: MatDialog ) {

  }

  ngOnInit() {
  }

  handleSearch()
  {
    if (this.searchText.trim().length > 0)
    {
      this.getRepositories(this.searchText);
    }
  }

  dispError()
  {
    const dialogRef = this.dialog.open(DialogueComponent, {
      width: '300px'
    });
  }


  getRepositories(searchText: string)
  {
    this.spinner.show();
    const that = this;
    const url = `search/repositories?q=${searchText}&sort=stars&order=desc&per_page=5`;
    this.utilService.getData(url).subscribe(
      responseData => {
        that.getAverageScore(responseData.items);
        that.repoData = responseData.items;
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        that.dispError();
      }
      );

  }

  getAverageScore(responseData)
  {
    let score = 0;
    responseData.forEach(element => {
      score = score + element.score;
    });
    this.averageScore = `Average score of these repository is ${score / responseData.length}`;
  }
}
