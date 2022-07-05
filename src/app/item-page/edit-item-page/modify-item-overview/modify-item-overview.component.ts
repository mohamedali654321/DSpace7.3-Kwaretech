import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../core/shared/item.model';
import {MetadataMap} from '../../../core/shared/metadata.models';
import { LocaleService } from 'src/app/core/locale/locale.service'; // import LocaleService
@Component({
  selector: 'ds-modify-item-overview',
  templateUrl: './modify-item-overview.component.html'
})
/**
 * Component responsible for rendering a table containing the metadatavalues from the to be edited item
 */
export class ModifyItemOverviewComponent implements OnInit {
  constructor(
    public localeService: LocaleService , /* kware edit - call service from LocaleService */
  ){
  }
  @Input() item: Item;
  metadata: MetadataMap;

  ngOnInit(): void {
    this.metadata = this.item.metadata;
  }
}
