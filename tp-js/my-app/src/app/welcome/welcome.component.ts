import { Component, OnInit } from '@angular/core';
//import { MyLibService } from 'my-lib'; 

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(/*myLibService: MyLibService*/) {
    /*
    let tab = myLibService.virerDoublon([1,8,10,8,1,12,10]);
    console.log("sans doublon, tab="+tab);
    */
    }

  ngOnInit(): void {
  }

}
