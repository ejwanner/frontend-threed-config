import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import { GeometryService } from "./geometry.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  geometries: any;

  // input form for the new color
  boxForm = this.formBuilder.group({
    _id: '',
    color: ''
  })

  constructor(private geoService: GeometryService, private formBuilder: FormBuilder) {}
  height: number = 1;
  width: number = 1;
  depth: number = 1;
  color: string = '';

  ngOnInit() {
    // first display of the default box
    this.main(this.height, this.width, this.depth, this.color);

    // get all the geometries who are stored in the database
    this.geoService.getGeometries()
      .subscribe(data=> {
        this.geometries = data;
        console.log(data)
      });
  }

  // select a box from the list
  select(boxId: string) {
    this.geoService.getOneBox(boxId)
      .subscribe( data => {
        this.height = data.height;
        this.width = data.width;
        this.depth = data.depth;
        this.color = data.color;
        this.main(this.height, this.width, this.depth, this.color);
      });
  }

  // delete one box
  delete(boxId: string) {
    this.geoService.deleteOneBox(boxId)
      .subscribe( () => {
        this.geoService.getGeometries();
      })
  }

  // update the color of one box, which is put into the input field
  update() {
    const color = this.boxForm.value.color;
    const boxId = this.boxForm.value._id;
    const newColor = color.replace('#', '')
    this.geoService.updateOneBox(boxId, newColor).subscribe( data => {console.log(data)});
  }

  // create the scene for the geometry with dynamic height, width, depth and color
  main(height: number, width: number, depth: number, color: string ) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry( height, width, depth );
    const material = new THREE.MeshBasicMaterial( { color: color, wireframe: true } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame( animate );

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render( scene, camera );
    }
    animate();

  }

  title = 'frontend-configurator';
}
