import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[myHighlight]'
})
export class MyHighlightDirective {

@Input('myHighlight') 
public highlightColor: string = "white";

private _defaultColor = 'red';

@HostBinding('style.backgroundColor') 
backgroundColor: string = "white";

@HostListener('mouseenter')
onMouseEnter() { this._highlight(this.highlightColor || this._defaultColor); }

@HostListener('mouseleave') 
onMouseLeave() { this._highlight("white"); }

private _highlight(color: string) { this.backgroundColor = color; }

}
