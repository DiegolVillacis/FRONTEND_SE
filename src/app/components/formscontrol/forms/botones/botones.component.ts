import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { permisosSistema } from 'src/app/models/user.iterface';
import { DataCentralService } from 'src/app/services/controlGeneralServices';



@Component({
  selector: 'form-btn',
  templateUrl: './botones.component.html'
})
export class BotonesComponent implements OnInit {

  @Input() formulario: FormGroup;
  @Output() onGuardar: EventEmitter<any> = new EventEmitter();
  @Output() onCancelar: EventEmitter<any> = new EventEmitter();
  
  public get permisos() : permisosSistema {
    return this.dcentral.permisos
  }
  
  constructor(
    private dcentral: DataCentralService
  ) { }

  ngOnInit(): void {
  }

  Guardar(form: any) { // este guardar es solo para crear un nuevo registros en los formularios de REGISTRAR
    // if (this.permisos.crear === false) return this.dcentral.mostrarmsgerror('Usuario no tiene permiso para registrar');

    this.onGuardar.emit(form);
  }
  
  close() {
    this.onCancelar.emit();
  }
}
