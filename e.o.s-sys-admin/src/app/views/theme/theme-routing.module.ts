import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'User Management'
    },
    children: [
      {
        path: '',
        redirectTo: 'store-manager'
      },
      {
        path: 'store-manager',
        component: ColorsComponent,
        data: {
          title: 'Store Managers'
        }
      },
      {
        path: 'sales-person',
        component: TypographyComponent,
        data: {
          title: 'Sales Personnel'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {}
