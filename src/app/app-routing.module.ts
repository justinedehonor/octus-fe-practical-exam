import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/contacts',
    pathMatch: 'full'
  }, {
    path: 'contacts',
    loadChildren: () => import('./components/contact/contact.module').then(mod => mod.ContactModule)
  }, {
    path: '**',
    redirectTo: '/contacts'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
