import { Component } from '@angular/core';
import { SearchResultListElementComponent } from '../search-result-list-element.component';
import { Community } from '../../../../core/shared/community.model';
import { CommunitySearchResult } from '../../../object-collection/shared/community-search-result.model';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../object-collection/shared/listable-object/listable-object.decorator';
//kware-edit
import { TruncatableService } from 'src/app/shared/truncatable/truncatable.service';
import { LocaleService } from 'src/app/core/locale/locale.service';
import { BitstreamDataService } from 'src/app/core/data/bitstream-data.service';
import { DSONameService } from 'src/app/core/breadcrumbs/dso-name.service';


@Component({
  selector: 'ds-community-search-result-list-element',
  styleUrls: ['../search-result-list-element.component.scss', 'community-search-result-list-element.component.scss'],
  templateUrl: 'community-search-result-list-element.component.html'
})
/**
 * Component representing a community search result in list view
 */
@listableObjectComponent(CommunitySearchResult, ViewMode.ListElement)
export class CommunitySearchResultListElementComponent extends SearchResultListElementComponent<CommunitySearchResult, Community> {

//kware-edit

constructor(
  public localeService : LocaleService ,
  protected truncatableService: TruncatableService,
  protected dsoNameService: DSONameService
  
){
  super(truncatableService,dsoNameService)
}
}
