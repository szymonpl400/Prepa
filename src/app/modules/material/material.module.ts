import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatTableModule,
    MatSliderModule
 } from '@angular/material';

const MODULES = [
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatCardModule,
  MatTableModule,
  MatSliderModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class MaterialModule { }
