import { Component, Input, OnInit } from '@angular/core';
import { DataCentralService } from '../../services/controlGeneralServices';
import { User } from '../../models/user.iterface';
import { LoginService } from 'src/app/services/loginServices';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent {

  @Input() showBtn: boolean = false;

  public get user(): User {
    return this.dcentral.user
  }

  constructor(
    private dcentral: DataCentralService,
    public loginService: LoginService
  ) { }

}
