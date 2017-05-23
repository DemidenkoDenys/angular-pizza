import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BasketComponent } from './basket/basket.component';
import { ListComponent } from './list/list.component';
import { CreatorComponent } from './creator/creator.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './header/menu/menu.component';
import { OrderComponent } from './order/order.component';
import { ItemlistComponent } from './list/itemlist/itemlist.component';
import { OrderService } from './services/order.service';
import { GetDataService } from './services/get-data.service';
import { ItemsizeComponent } from './list/itemlist/itemsize/itemsize.component';
import { BasketitemComponent } from './basket/basketitem/basketitem.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BasketComponent,
    ListComponent,
    CreatorComponent,
    FooterComponent,
    MenuComponent,
    OrderComponent,
    ItemlistComponent,
    ItemsizeComponent,
    BasketitemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [OrderService, GetDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
