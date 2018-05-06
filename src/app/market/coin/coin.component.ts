import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Location} from '@angular/common';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent implements OnInit {
  coin;
  current_btc_price;
  market_cap_btc;
  imageUrl = 'https://www.cryptocompare.com';
  constructor(private route: ActivatedRoute, iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer, public location: Location) {
    this.route.queryParams.subscribe(
    params => {
         this.coin = params;
         this.current_btc_price = this.coin.usd_price / this.coin.btc_price;
         this.market_cap_btc = this.coin.market_cap_usd / this.current_btc_price;
    });
    iconRegistry.addSvgIcon(
      'btc',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/btc.svg'));
  }

  backToMarker() {
    this.location.back();
  }
  ngOnInit() {
  }

}
