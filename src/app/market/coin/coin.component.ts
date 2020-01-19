import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Location} from '@angular/common';
import { CoinService } from '../../services/coin-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent implements OnInit, OnDestroy {
  coin;
  current_btc_price;
  market_cap_btc;
  imageUrl = 'https://www.cryptocompare.com';

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute, iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer, public location: Location, private coinService: CoinService) {
    this.route.queryParams.subscribe(
      params => {
        this.getCoinDetails(params.coinId);
      }
    );
    iconRegistry.addSvgIcon(
      'btc',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/btc.svg')
    );
  }

  getCoinDetails(coinId) {
    this.coinService.getCoinDetail(coinId)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(coin => {
      if (!coin) { return; }
      this.coin = coin.coin;
      this.current_btc_price = this.coin.price / this.coin.priceBtc;
      this.market_cap_btc = this.coin.marketCap / this.current_btc_price;
    });
  }

  backToMarker() {
    this.location.back();
  }

  ngOnInit() {}
  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
