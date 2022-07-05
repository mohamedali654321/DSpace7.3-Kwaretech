import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PaginatedSearchOptions } from '../../shared/search/models/paginated-search-options.model';
import { fadeIn, fadeInOut } from '../../shared/animations/fade';
import { RemoteData } from '../../core/data/remote-data';
import { PaginatedList } from '../../core/data/paginated-list.model';
import { Item } from '../../core/shared/item.model';
import { PaginationComponentOptions } from '../../shared/pagination/pagination-component-options.model';
import { PaginationService } from '../../core/pagination/pagination.service';
import { SearchService } from '../../core/shared/search/search.service';
import { SortDirection, SortOptions } from '../../core/cache/models/sort-options.model';
import { DefaultAppConfig } from '../../../config/default-app-config';
import { AppConfig } from '../../../config/app-config.interface';
import { ViewMode } from '../../core/shared/view-mode.model';
import {
  toDSpaceObjectListRD
} from '../../core/shared/operators';
import {
  Observable,
 } from 'rxjs';
@Component({
  selector: 'ds-recent-item-list',
  templateUrl: './recent-item-list.component.html',
  styleUrls: ['./recent-item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeIn,
    fadeInOut
  ]
})
export class RecentItemListComponent implements OnInit {
  itemRD$: Observable<RemoteData<PaginatedList<Item>>>;
  paginationConfig: PaginationComponentOptions;
  sortConfig: SortOptions;''
    /**
   * The view-mode we're currently on
   * @type {ViewMode}
   */
  
     viewMode = ViewMode.ListElement;
  constructor(private searchService: SearchService,
    private paginationService: PaginationService,
   ) {
    const appConfig: AppConfig = new DefaultAppConfig();
    this.paginationConfig = Object.assign(new PaginationComponentOptions(), {
      id: 'hp',
      pageSize:5,
      currentPage: 1,
      maxSize:1
    });
    this.sortConfig = new SortOptions('dc.date.accessioned', SortDirection.DESC);
  }
  ngOnInit(): void {
    this.itemRD$ = this.searchService.search(
      new PaginatedSearchOptions({
        pagination: this.paginationConfig,
        sort: this.sortConfig,
      }),
       ).pipe(toDSpaceObjectListRD()) as Observable<RemoteData<PaginatedList<Item>>>;
       
      
  }
  ngOnDestroy(): void {
    this.paginationService.clearPagination(this.paginationConfig.id);
  }
}

