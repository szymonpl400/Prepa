import { NgModule } from '@angular/core';
import { MatButtonModule, MatGridListModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule } from '@angular/material';

const MODULES = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatCardModule,
  MatGridListModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class MaterialModule { }
