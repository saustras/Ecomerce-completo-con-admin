import { RegistroComponent } from './components/registro/registro.component';
import { DireccionesComponent } from './components/usuario/direcciones/direcciones.component';
import { DetalleOrdenComponent } from './components/usuario/ordenes/detalle-orden/detalle-orden.component';
import { CartComponent } from './components/cart/cart.component';
import { DetallesProductoComponent } from './components/productos/detalles-producto/detalles-producto.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { LoginComponent } from './components/login/login.component';
import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { IndexOrdenesComponent } from './components/usuario/ordenes/index-ordenes/index-ordenes.component';
import { IndexReviewComponent } from './components/usuario/reviews/index-review/index-review.component';


const appRoute: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },


  { path: 'productos', component: IndexProductoComponent },
  { path: 'productos/categoria/:categoria', component: IndexProductoComponent },
  { path: 'productos/:slug', component: DetallesProductoComponent },

  { path: 'cuenta/perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'cuenta/direcciones', component: DireccionesComponent, canActivate: [AuthGuard] },
  { path: 'cuenta/ordenes', component: IndexOrdenesComponent, canActivate: [AuthGuard] },
  { path: 'cuenta/ordenes/:id', component: DetalleOrdenComponent, canActivate: [AuthGuard] },
  { path: 'cuenta/reviews', component: IndexReviewComponent, canActivate: [AuthGuard] },
  { path: 'carrito', component: CartComponent, canActivate: [AuthGuard] },


]

export const AppRoutingProvider: any[] = [];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
