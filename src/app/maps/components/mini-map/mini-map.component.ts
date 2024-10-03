import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import {Map, Marker} from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{


  @ViewChild('map')
  public divMap?:ElementRef;

  @Input()
  public lnglat?:[number, number];

  public color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));


  ngAfterViewInit(): void {
    if(!this.divMap?.nativeElement) throw 'Map div not found';
    if(!this.lnglat) throw 'lnglat cant be null';
    //mapa
    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lnglat, // starting position [lng, lat]
      zoom: 18, // starting zoom
      interactive:false
    })

    //marker

    const marker = new Marker({
      color: this.color,
      draggable: true
    }).setLngLat(this.lnglat)
      .addTo(map);

  }



}
