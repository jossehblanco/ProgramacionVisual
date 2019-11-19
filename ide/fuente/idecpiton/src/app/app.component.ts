import { Component } from '@angular/core';
import * as go from 'gojs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'teoangular';

  /*Se declara un modelo en el AppComponent
  para que se pueda tener acceso a este por medio de databinding (linkear datos entre componentes)
  en caso de que se expanda la aplicación.
  */
  public model : go.GraphLinksModel;

}
