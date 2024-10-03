import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';


interface MarkerAndColor {
  color:string,
  marker:Marker
}

interface PlainMarker {
  color:string,
  lnglat: number[]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy{


  @ViewChild('map') divMap?:ElementRef;

  public zoom:number =  13;
  public map?:Map;
  public lng:number = -100.31586602967639;
  public lat:number = 25.665710492875135;
  public currentLngLat:LngLat = new LngLat(this.lng, this.lat);

  public markers:MarkerAndColor[] = [];



  ngAfterViewInit(): void {

    if(!this.divMap) throw 'elemento html no encontrado'

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.readFromLocalStorage();

    //asignar elementos personalizados
    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'ramiro'

    // const marker = new Marker({
    //   color:'red',
    //   // element: markerHtml
    // })
    //   .setLngLat(this.currentLngLat)
    //   .addTo(this.map);

  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  createMarker(){

    if(!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lnglat = this.map.getCenter();

    this.addMarker(lnglat, color);
  }

  addMarker(lnglat:LngLat, color:string = 'red'){
    if(!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true
    }).setLngLat(lnglat)
      .addTo(this.map);

    this.markers.push({
      color:color,
      marker:marker
    });

    this.saveToLocalStorage();
    this.markersListeners(marker);
  }


  markersListeners(marker:Marker): void{

    if(!this.map) return;

    marker.on('dragend',(ev)=>{
      console.log(ev)
      this.saveToLocalStorage();
    })

  }


  deleteMarker(index:number){
    this.markers[index].marker.remove()
    this.markers.splice(index, 1);
    this.saveToLocalStorage()
  }

  flyTo(marker:Marker){
    this.map?.flyTo({
      zoom:16,
      center: marker.getLngLat()
    })

  }


  saveToLocalStorage(){
    const plainMarkers: PlainMarker[] = this.markers.map(({color, marker}) => {

      return{
        color:color,
        lnglat: marker.getLngLat().toArray()
      }
    })

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString); //!cuidado

    //llamar instrucción que los pone en el mapa a los markers

    plainMarkers.forEach(({color, lnglat}) => {
      const [lng, lat] = lnglat;
      const coord = new LngLat(lng, lat);


      this.addMarker(coord, color);
    })
  }

}
