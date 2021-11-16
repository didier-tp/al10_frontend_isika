import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { ViewChild } from "@angular/core";
import { BsModalService , BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'bsu-modal',
  templateUrl: './bsu-modal.component.html',
  styleUrls: ['./bsu-modal.component.scss', '../css/bs-util.scss']
})
export class BsuModalComponent implements OnInit {

  modalRef! : BsModalRef;

  @Input()
  title : string ="default modal title";

  @Input()
  innerHtmlText : string ="default modal <b>content</b>";

  
    constructor(private modalService: BsModalService) {}

    @ViewChild('content', {static : false}) //<ng-template #content ...>
    thisContent : any ;

    public openThisContext() {
      let options : object | null = null;
      //console.log("length="+this.innerHtmlText.length);
      if(this.innerHtmlText && this.innerHtmlText.length > 400){
        options = {  size: 'lg' };
      }
      else{
        options = {  size: 'sm' };
      }

      this.modalRef=this.modalService.show(this.thisContent , options   );
    }

    open(content : any) {
      this.modalRef=this.modalService.show(content);
    }
  
    

  ngOnInit() {
  }

}
