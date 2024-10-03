import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {LngLat, Map} from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{


  @ViewChild('map') divMap?:ElementRef;

  public zoom:number =  10;
  public map?:Map;
  public lng:number = -100.31586602967639;
  public lat:number = 25.665710492875135;
  public currentLngLat:LngLat = new LngLat(this.lng, this.lat);



  ngAfterViewInit(): void {

    if(!this.divMap) throw 'elemento html no encontrado'

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove()
  }


  mapListeners(){
    if(!this.map)throw 'Mapa no inicializado';

    this.map.on('zoom',(ev)=>{
      this.zoom = this.map!.getZoom();
    })

    this.map.on('zoomend',(ev)=>{
      if(this.map!.getZoom() > 18) {
        this.map?.zoomTo(18);
      }else if(this.map!.getZoom() < 1){
        this.map?.zoomTo(1);
      }

    this.map?.on('move', (ev)=>{
      this.currentLngLat = this.map!.getCenter();
      const {lng, lat} = this.currentLngLat;
      this.lng = lng;
      this.lat= lat;
    })
      return;
    })

  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }


  zoomChanged(value:string){
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }




}
