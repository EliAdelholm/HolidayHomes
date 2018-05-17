import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PortalComponent} from './pages/portal/portal.component';
import {HousePreviewComponent} from './pages/house-preview/house-preview.component';
import {BookingComponent} from './pages/booking/booking.component';
import {LoginComponent} from './pages/login/login.component';
import {NewHouseFormComponent} from './pages/new-house-form/new-house-form.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {RegisterComponent} from './pages/register/register.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'portal', component: PortalComponent },
  { path: 'house-preview/:id', component: HousePreviewComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'new-house-form', component: NewHouseFormComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
