import { ConfigComponent } from './components/config/config.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from "./app.routing";
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { IndexClienteComponent } from './components/clients/index-cliente/index-cliente.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateClientComponent } from './components/clients/create-client/create-client.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { CrearProductoComponent } from './components/producto/crear-producto/crear-producto.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { IndexProductoComponent } from './components/producto/index-producto/index-producto.component';
import { UpdateProductoComponent } from './components/producto/update-producto/update-producto.component';
import { InventarioProductoComponent } from './components/producto/inventario-producto/inventario-producto.component';
import { CreateCuponComponent } from './components/cupones/create-cupon/create-cupon.component';
import { IndexCuponComponent } from './components/cupones/index-cupon/index-cupon.component';
import { UpdateCuponComponent } from './components/cupones/update-cupon/update-cupon.component';
import { CaracteristicasProductoComponent } from './components/producto/caracteristicas-producto/caracteristicas-producto.component';
import { GaleriaProductoComponent } from './components/producto/galeria-producto/galeria-producto.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateDescuentoComponent } from './components/descuentos/create-descuento/create-descuento.component';
import { EditDescuentoComponent } from './components/descuentos/edit-descuento/edit-descuento.component';
import { IndexDescuentoComponent } from './components/descuentos/index-descuento/index-descuento.component';
import { ReviewsProductoComponent } from './components/producto/reviews-producto/reviews-producto.component';
import { IndexVentasComponent } from './components/venta/index-ventas/index-ventas.component';
import { DetallesVentasComponent } from './components/venta/detalles-ventas/detalles-ventas.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    LoginComponent,
    IndexClienteComponent,
    CreateClientComponent,
    EditClientComponent,
    CrearProductoComponent,
    IndexProductoComponent,
    UpdateProductoComponent,
    InventarioProductoComponent,
    CreateCuponComponent,
    IndexCuponComponent,
    UpdateCuponComponent,
    ConfigComponent,
    CaracteristicasProductoComponent,
    GaleriaProductoComponent,
    CreateDescuentoComponent,
    EditDescuentoComponent,
    IndexDescuentoComponent,
    ReviewsProductoComponent,
    IndexVentasComponent,
    DetallesVentasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgbModule,

    EditorModule,
    NgxPaginationModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
