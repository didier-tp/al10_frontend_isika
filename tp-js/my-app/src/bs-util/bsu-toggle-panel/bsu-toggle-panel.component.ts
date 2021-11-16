import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bsu-toggle-panel',
  templateUrl: './bsu-toggle-panel.component.html',
  styleUrls: ['./bsu-toggle-panel.component.scss']
})
export class BsuTogglePanelComponent implements OnInit {

  toggleP : boolean =false;

  @Input()
  title : string = 'default panel title';

  constructor() { }

  ngOnInit() {
  }

}

/*
exemple d'utilisation:

<bsu-toggle-panel [title]="'panel1'" >
		<app-part1></app-part1> ou ...
	</bsu-toggle-panel>
	  
	<bsu-toggle-panel [title]="'panel2'" >
		<div>contenu du paneau 2</div>
	</bsu-toggle-panel>

*/
