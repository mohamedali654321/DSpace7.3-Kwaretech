import { Component } from '@angular/core';
import { listableObjectComponent } from '../../../../../object-collection/shared/listable-object/listable-object.decorator';
import { ViewMode } from '../../../../../../core/shared/view-mode.model';
import { ItemSearchResult } from '../../../../../object-collection/shared/item-search-result.model';
import { SearchResultListElementComponent } from '../../../search-result-list-element.component';
import { Item } from '../../../../../../core/shared/item.model';
import { getItemPageRoute } from '../../../../../../item-page/item-page-routing-paths';
import { LocaleService } from 'src/app/core/locale/locale.service';
import { TruncatableService } from 'src/app/shared/truncatable/truncatable.service';
import { BitstreamDataService } from 'src/app/core/data/bitstream-data.service';
import { DSONameService } from 'src/app/core/breadcrumbs/dso-name.service';
@listableObjectComponent('PublicationSearchResult', ViewMode.ListElement)
@listableObjectComponent(ItemSearchResult, ViewMode.ListElement)
@Component({
  selector: 'ds-item-search-result-list-element',
  styleUrls: ['./item-search-result-list-element.component.scss'],
  templateUrl: './item-search-result-list-element.component.html'
})
/**
 * The component for displaying a list element for an item search result of the type Publication
 */
export class ItemSearchResultListElementComponent extends SearchResultListElementComponent<ItemSearchResult, Item> {

  
  constructor(
   
    protected truncatableService: TruncatableService,
    protected dsoNameService: DSONameService,
    public localeService : LocaleService ,
    
  ){
    super(truncatableService,dsoNameService )
  }
  /**
   * Route to the item's page
   */
  itemPageRoute: string;

  ngOnInit(): void {
    super.ngOnInit();
    this.itemPageRoute = getItemPageRoute(this.dso);
  }


   // kware edit 

    // replace comma ', or ;' to '،' if language  is Arabic
    convertComma(str :String):String{
      var newstr="";
      if(this.localeService.getCurrentLanguageCode() === 'ar'){
        var regx = /;|,/gi 
       newstr = str.replace(regx, "،"); 
       return newstr;
  
      }
      else{
        return str
      }
    }
    // put comma ',' to '،' if language  is Arabic
    regxComma():String{
      if(this.localeService.getCurrentLanguageCode() === 'ar') return '،'
      else return ','
    }
       // replace comma ';' to '؛' if language  is Arabic
     regxColon():String{
      if(this.localeService.getCurrentLanguageCode() === 'ar') return '؛'
      else return ';'
    }



}
