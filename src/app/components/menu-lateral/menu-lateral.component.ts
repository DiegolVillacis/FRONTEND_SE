import { Component, DoCheck, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MenuNode } from '../../models/menu.model';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { DataCentralService } from '../../services/controlGeneralServices';
import { User } from '../../models/user.iterface';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit, DoCheck {

  treeControl = new NestedTreeControl<MenuNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuNode>();
  hasChild = (_: number, node: MenuNode) => !!node.children && node.children.length > 0;

  public get user(): User {
    return this.dcentral.user
  }

  public get menu(): MenuNode[] {
    return this.dcentral.menuNode
  }

  constructor(
    private dcentral: DataCentralService,
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.menu;
  }

  ngDoCheck() {
    this.dataSource.data = this.menu;
  }

  /**
   * 
   * MENU PRINCIPAL
   * 
   */
  nombreSelect: string = '';
  manejarEstadoActivo(name) {
    this.nombreSelect = name;
  }

}
