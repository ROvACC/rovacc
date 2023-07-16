import { Route } from '@angular/router';
import { LayoutComponent } from './shared/feature/layout/layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [{
      path: '',
      loadComponent: () => import('./home/feature/dashboard/dashboard.component').then(c => c.DashboardComponent),
    }]

  }
];
