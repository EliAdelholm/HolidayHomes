import {NgModule} from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {PortalComponent} from './pages/portal/portal.component';
import {HousePreviewComponent} from './pages/house-preview/house-preview.component';
import {BookingComponent} from './pages/booking/booking.component';
import {LoginComponent} from './pages/login/login.component';
import {NewHouseFormComponent} from './pages/new-house-form/new-house-form.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {RegisterComponent} from './pages/register/register.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {AuthGuardService} from './services/login/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'portal', pathMatch: 'full'},
  {path: 'portal', component: PortalComponent},
  {path: 'house-preview/:id', component: HousePreviewComponent},
  {path: 'booking/:id', component: BookingComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'new-house-form', component: NewHouseFormComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
