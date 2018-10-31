import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatTableModule
 } from '@angular/material';

const MODULES = [
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatCardModule,
  MatTableModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class MaterialModule { }
