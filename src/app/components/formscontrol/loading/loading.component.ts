import { Component, DoCheck } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataCentralService } from 'src/app/services/controlGeneralServices';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: [
  ]
})
export class LoadingComponent implements DoCheck {

  
  public get loading() : boolean {
    return this.dcentral.loadingDialog
  }

  constructor(
    private dcentral: DataCentralService,
    public dialogRef: MatDialogRef<LoadingComponent>
  ) {}

  ngDoCheck() {
    if (this.loading === false) {
      this.dialogRef.close();
    }
  }

}
