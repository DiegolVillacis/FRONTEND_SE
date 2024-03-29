import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-titulo',
  templateUrl: './titulo.component.html',
  styles: [
    `
      
      .titulo {
        position: relative;
        text-align: center ;
        background: #0746bb ;
        color: white;
        width: 100%;
        height: 60px ;
        z-index: 10;
      }

      #cerrar {
        position: absolute;
        background: #0746bb ;
        top: 3px;
        right: 3px;
        z-index: 1;

      }

      @media only screen and (max-width: 600px) {
        h5 {
          padding-top: 10px;
          font-size: 18px;

        }
      }
    `
  ]
})
export class TituloComponent implements OnInit {

  @Input() titulo: string = '';
  @Output() onCerrar: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  CerrarVentana(value) {
    this.onCerrar.emit(value)
  }

}
