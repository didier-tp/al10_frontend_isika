import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bsu-my-fg-label',
  templateUrl: './bsu-my-form-group-with-label.component.html',
  styleUrls: ['./bsu-my-form-group-with-label.component.scss']
})
export class BsuMyFormGroupWithLabelComponent implements OnInit {

  @Input()
  label : string ="?";

  @Input()
  proportion : string ="3-9";//or 2-10 or 4-8 ...

  label_col_class : string = "col-sm-3";//or "col-sm-4" or ...
  input_col_class : string = "col-sm-9";//or "col-sm-8" or ...

  constructor() { }

  ngOnInit() {
    switch(this.proportion){
      case "2-10":
        this.label_col_class="col-sm-2";
        this.input_col_class="col-sm-10";
        break;
      case "4-8":
            this.label_col_class="col-sm-4";
            this.input_col_class="col-sm-8";
      break;
      case "5-7":
        this.label_col_class="col-sm-5";
        this.input_col_class="col-sm-7";
        break;
      case "6-6":
            this.label_col_class="col-sm-6";
            this.input_col_class="col-sm-6";
            break;
      case "3-9":
      default:
            this.label_col_class="col-sm-3";
            this.input_col_class="col-sm-9";
    }
  }

}
