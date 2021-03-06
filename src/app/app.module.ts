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
import { CancelSelectDirective } from './directives/cancelSelect.directive';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { ShareModule } from 'ng2share/share.module';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';
import { TextMaskModule } from 'angular2-text-mask';
import { FioComponent } from './order/fio/fio.component';
import { AddressComponent } from './order/address/address.component';
import { PhoneComponent } from './order/phone/phone.component';
import { AmountComponent } from './order/amount/amount.component';
import { AlertModule } from 'ngx-bootstrap';

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
    BasketitemComponent,
    CancelSelectDirective,
    FioComponent,
    AddressComponent,
    PhoneComponent,
    AmountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ShareModule,
    Angular2FontAwesomeModule,
    TextMaskModule,
    Ng2PageScrollModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [OrderService, GetDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
