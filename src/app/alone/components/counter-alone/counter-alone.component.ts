import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'counter-alone',
  standalone: true,
  // imports: [CommonModule],
  templateUrl: './counter-alone.component.html',
  styleUrl: './counter-alone.component.css',

})
export class CounterAloneComponent {

  @Input()
  public counter = 10;

  // @Output()
  // public emiter:EventEmitter<string> = new EventEmitter<string>();

  // eventoEnCounter(){
  //   this.emiter?.emit('prueba output');
  // }

}
