import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule, routedComponents } from './forms-routing.module';
import { ToasterModule } from 'angular2-toaster';


@NgModule({
  imports: [
    ThemeModule,
    FormsRoutingModule,
    ToasterModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class FormsModule { }
