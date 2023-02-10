
import { FooterComponent } from './components/footer/footer.component';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { routing } from "./app.routing";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { SidebarComponent } from './components/usuario/sidebar/sidebar.component';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetallesProductoComponent } from './components/productos/detalles-producto/detalles-producto.component';
import { CartComponent } from './components/cart/cart.component';
import { DescuentoPipe } from './pipes/descuento.pipe';
import { IndexOrdenesComponent } from './components/usuario/ordenes/index-ordenes/index-ordenes.component';
import { DetalleOrdenComponent } from './components/usuario/ordenes/detalle-orden/detalle-orden.component';
import { DireccionesComponent } from './components/usuario/direcciones/direcciones.component';
import { NgRatingBarModule } from 'ng-rating-bar';
import { IndexReviewComponent } from './components/usuario/reviews/index-review/index-review.component';
import { RegistroComponent } from './components/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    PerfilComponent,
    SidebarComponent,
    IndexProductoComponent,
    DetallesProductoComponent,
    CartComponent,
    DescuentoPipe,
    IndexOrdenesComponent,
    DetalleOrdenComponent,
    DireccionesComponent,
    IndexReviewComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    routing,
    NgRatingBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
