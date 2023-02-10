import { IndexVentasComponent } from './components/venta/index-ventas/index-ventas.component';
import { ReviewsProductoComponent } from './components/producto/reviews-producto/reviews-producto.component';
import { CreateDescuentoComponent } from './components/descuentos/create-descuento/create-descuento.component';
import { GaleriaProductoComponent } from './components/producto/galeria-producto/galeria-producto.component';
import { CaracteristicasProductoComponent } from './components/producto/caracteristicas-producto/caracteristicas-producto.component';
import { ConfigComponent } from './components/config/config.component';
import { UpdateCuponComponent } from './components/cupones/update-cupon/update-cupon.component';
import { IndexCuponComponent } from './components/cupones/index-cupon/index-cupon.component';
import { CreateCuponComponent } from './components/cupones/create-cupon/create-cupon.component';
import { InventarioProductoComponent } from './components/producto/inventario-producto/inventario-producto.component';
import { UpdateProductoComponent } from './components/producto/update-producto/update-producto.component';
import { IndexProductoComponent } from './components/producto/index-producto/index-producto.component';
import { CrearProductoComponent } from './components/producto/crear-producto/crear-producto.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { CreateClientComponent } from './components/clients/create-client/create-client.component';
import { IndexClienteComponent } from './components/clients/index-cliente/index-cliente.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core';
import { IndexDescuentoComponent } from './components/descuentos/index-descuento/index-descuento.component';
import { EditDescuentoComponent } from './components/descuentos/edit-descuento/edit-descuento.component';
import { DetallesVentasComponent } from './components/venta/detalles-ventas/detalles-ventas.component';

const appRoute: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'admin', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AdminGuard] },

  {
    path: 'admin', children: [
      //clientes
      { path: 'clientes', component: IndexClienteComponent, canActivate: [AdminGuard] },
      { path: 'clientes/registro', component: CreateClientComponent, canActivate: [AdminGuard] },
      { path: 'clientes/:id', component: EditClientComponent, canActivate: [AdminGuard] },

      //productos
      { path: 'productos', component: IndexProductoComponent, canActivate: [AdminGuard] },
      { path: 'productos/registro', component: CrearProductoComponent, canActivate: [AdminGuard] },
      { path: 'productos/:id', component: UpdateProductoComponent, canActivate: [AdminGuard] },
      { path: 'productos/inventario/:id', component: InventarioProductoComponent, canActivate: [AdminGuard] },
      { path: 'productos/caracteristicas/:id', component: CaracteristicasProductoComponent, canActivate: [AdminGuard] },
      { path: 'productos/galeria/:id', component: GaleriaProductoComponent, canActivate: [AdminGuard] },
      { path: 'productos/reviews/:id', component: ReviewsProductoComponent, canActivate: [AdminGuard] },

      //cupones
      { path: 'cupones', component: IndexCuponComponent, canActivate: [AdminGuard] },
      { path: 'cupones/registro', component: CreateCuponComponent, canActivate: [AdminGuard] },
      { path: 'cupones/:id', component: UpdateCuponComponent, canActivate: [AdminGuard] },

      //descuentos
      { path: 'descuentos', component: IndexDescuentoComponent, canActivate: [AdminGuard] },
      { path: 'descuentos/registro', component: CreateDescuentoComponent, canActivate: [AdminGuard] },
      { path: 'descuentos/:id', component: EditDescuentoComponent, canActivate: [AdminGuard] },

      //ventas
      { path: 'ventas', component: IndexVentasComponent, canActivate: [AdminGuard] },
      { path: 'ventas/:id', component: DetallesVentasComponent, canActivate: [AdminGuard] },

      //configuraciones
      { path: 'configuraciones', component: ConfigComponent, canActivate: [AdminGuard] },
    ]
  },


  { path: 'login', component: LoginComponent }
]

export const AppRoutingProvider: any[] = [];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
