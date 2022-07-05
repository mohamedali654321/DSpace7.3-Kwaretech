import { Component } from '@angular/core';
import { SearchResultListElementComponent } from '../search-result-list-element.component';
import { Collection } from '../../../../core/shared/collection.model';
import { CollectionSearchResult } from '../../../object-collection/shared/collection-search-result.model';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../object-collection/shared/listable-object/listable-object.decorator';
//kware-edit
import { TruncatableService } from 'src/app/shared/truncatable/truncatable.service';
import { LocaleService } from 'src/app/core/locale/locale.service';
import { BitstreamDataService } from 'src/app/core/data/bitstream-data.service';
import { DSONameService } from 'src/app/core/breadcrumbs/dso-name.service';
@Component({
  selector: 'ds-collection-search-result-list-element',
  styleUrls: ['../search-result-list-element.component.scss', 'collection-search-result-list-element.component.scss'],
  templateUrl: 'collection-search-result-list-element.component.html'
})
/**
 * Component representing a collection search result in list view
 */
@listableObjectComponent(CollectionSearchResult, ViewMode.ListElement)
export class CollectionSearchResultListElementComponent extends SearchResultListElementComponent<CollectionSearchResult, Collection> {
//kware-edit

constructor(
  public localeService : LocaleService ,
  protected truncatableService: TruncatableService,
  protected dsoNameService: DSONameService
  
){
  super(truncatableService,dsoNameService)
}

}
