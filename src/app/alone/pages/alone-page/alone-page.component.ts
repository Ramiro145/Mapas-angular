import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { CounterAloneComponent } from "../../components/counter-alone/counter-alone.component";
import { MapsModule } from '../../../maps/maps.module';
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";

@Component({
  standalone: true,
  imports: [CounterAloneComponent, SideMenuComponent],
  templateUrl: './alone-page.component.html',
  styleUrl: './alone-page.component.css',
})
export class AlonePageComponent {

  constructor(){}

  verEventoEnPadre(evento:string){
    console.log(evento)
  }

}
