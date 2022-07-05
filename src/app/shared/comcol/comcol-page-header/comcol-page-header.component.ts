import { Component, Input } from '@angular/core';
import { LocaleService } from 'src/app/core/locale/locale.service'; // import LocaleService 
@Component({
  selector: 'ds-comcol-page-header',
  styleUrls: ['./comcol-page-header.component.scss'],
  templateUrl: './comcol-page-header.component.html',
})
export class ComcolPageHeaderComponent {
  constructor(
    public localeService : LocaleService  /* kware edit - call service from LocaleService */
  ){

  }
  @Input() name: string;
}
