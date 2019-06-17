import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactSearchComponent } from './contact-search/contact-search.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { AuthGuard } from '../../auth-guard.service';

const contactRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', component: ContactSearchComponent
      },
      {
        path: 'new', component: ContactEditComponent
      },
      {
        path: 'edit/:id', canActivate: [AuthGuard], component: ContactEditComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(contactRoutes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
