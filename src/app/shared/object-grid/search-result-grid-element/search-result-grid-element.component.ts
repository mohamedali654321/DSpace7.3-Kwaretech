import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchResult } from '../../search/models/search-result.model';
import { BitstreamDataService } from '../../../core/data/bitstream-data.service';
import { DSpaceObject } from '../../../core/shared/dspace-object.model';
import { Metadata } from '../../../core/shared/metadata.utils';
import { hasValue } from '../../empty.util';
import { AbstractListableElementComponent } from '../../object-collection/shared/object-collection-element/abstract-listable-element.component';
import { TruncatableService } from '../../truncatable/truncatable.service';
import { LinkService } from 'src/app/core/cache/builders/link.service';
import { LocaleService } from 'src/app/core/locale/locale.service';

@Component({
  selector: 'ds-search-result-grid-element',
  template: ``
})
export class SearchResultGridElementComponent<T extends SearchResult<K>, K extends DSpaceObject> extends AbstractListableElementComponent<T> implements OnInit {
  /**
   * The DSpaceObject of the search result
   */
  dso: K;


  
  //kware-edit 
 keywords=[];  //subject
 title:string;  // title
 authors:any;  //authors

  /**
   * Whether or not the grid element is currently collapsed
   */
  isCollapsed$: Observable<boolean>;

  public constructor(
    protected truncatableService: TruncatableService,
    protected bitstreamDataService: BitstreamDataService,
    protected linkService: LinkService,
    public localeService : LocaleService ,
  ) {
    super();
  }

  /**
   * Retrieve the dso from the search result
   */
  ngOnInit(): void {
    if (hasValue(this.object)) {
      this.dso = this.object.indexableObject;
      this.isCollapsed$ = this.isCollapsed();
    }

     // this.keywords=this.dso.allMetadataValues('dc.subject').slice(0,3); //kwar-edit
     let  arabic = /[\u0600-\u06FF]/;
     let english= /[a-zA-Z]/;
     let arabicKeyswords= this.dso.allMetadataValues('dc.subject').filter(key=>arabic.test(key));
     let englishKeywords=this.dso.allMetadataValues('dc.subject').filter(key=>english.test(key));
   this.localeService.getCurrentLanguageCode() === 'ar' ? this.keywords= arabicKeyswords.slice(0,3) : this.keywords= englishKeywords.slice(0,3);

   
if(this.localeService.getCurrentLanguageCode() === 'ar' && this.dso.firstMetadataValue('dc.language.iso') === 'Arabic | العربية'){
this.title=this.dso.firstMetadataValue('dc.title');
}

if(this.localeService.getCurrentLanguageCode() === 'ar' && !(this.dso.firstMetadataValue('dc.language.iso') === 'Arabic | العربية') && this.dso.firstMetadataValue('dc.title.alternative') ){
  this.title=this.dso.firstMetadataValue('dc.title.alternative');
  }

  if(this.localeService.getCurrentLanguageCode() === 'ar' && !(this.dso.firstMetadataValue('dc.language.iso') === 'Arabic | العربية') && !this.dso.firstMetadataValue('dc.title.alternative') ){
    this.title=this.dso.firstMetadataValue('dc.title');
    }

if(this.localeService.getCurrentLanguageCode() === 'en' && this.dso.firstMetadataValue('dc.language.iso') === 'English | الإنجليزية'){
this.title=this.dso.firstMetadataValue('dc.title');
}

if(this.localeService.getCurrentLanguageCode() === 'en' && !(this.dso.firstMetadataValue('dc.language.iso') === 'English | الإنجليزية') && this.dso.firstMetadataValue('dc.title.alternative') ){
  this.title=this.dso.firstMetadataValue('dc.title.alternative');
  }
  if(this.localeService.getCurrentLanguageCode() === 'en' && !(this.dso.firstMetadataValue('dc.language.iso') === 'English | الإنجليزية') && !this.dso.firstMetadataValue('dc.title.alternative') ){
    this.title=this.dso.firstMetadataValue('dc.title');
    }


// authors based on interface language 


     if(this.localeService.getCurrentLanguageCode() === 'ar' && this.dso.firstMetadataValue('dc.language.iso') === 'Arabic | العربية'){
      this.authors=this.dso.allMetadataValues(['dc.contributor.author', 'dc.creator', 'dc.contributor.advisor']);
      }
      
      if(this.localeService.getCurrentLanguageCode() === 'ar' && !(this.dso.firstMetadataValue('dc.language.iso') === 'Arabic | العربية') && this.dso.allMetadataValues(['dc.contributor.authoralternative',  'dc.contributor.advisoralternative']).length > 0 ){
        this.authors=this.dso.allMetadataValues(['dc.contributor.authoralternative',  'dc.contributor.advisoralternative']);
        }
      
        if(this.localeService.getCurrentLanguageCode() === 'ar' && !(this.dso.firstMetadataValue('dc.language.iso') === 'Arabic | العربية') && this.dso.allMetadataValues(['dc.contributor.authoralternative',  'dc.contributor.advisoralternative']).length <= 0  ){
          this.authors=this.dso.allMetadataValues(['dc.contributor.author', 'dc.creator', 'dc.contributor.advisor']);;
          }
      
      if(this.localeService.getCurrentLanguageCode() === 'en' && this.dso.firstMetadataValue('dc.language.iso') === 'English | الإنجليزية'){
        this.authors=this.dso.allMetadataValues(['dc.contributor.author', 'dc.creator', 'dc.contributor.advisor']);
      }
      
      if(this.localeService.getCurrentLanguageCode() === 'en' && !(this.dso.firstMetadataValue('dc.language.iso') === 'English | الإنجليزية') && this.dso.allMetadataValues(['dc.contributor.authoralternative',  'dc.contributor.advisoralternative']).length > 0 ){
        this.authors=this.dso.allMetadataValues(['dc.contributor.authoralternative',  'dc.contributor.advisoralternative']);
        }
        if(this.localeService.getCurrentLanguageCode() === 'en' && !(this.dso.firstMetadataValue('dc.language.iso') === 'English | الإنجليزية') && this.dso.allMetadataValues(['dc.contributor.authoralternative',  'dc.contributor.advisoralternative']).length <= 0  ){
          this.authors=this.dso.allMetadataValues(['dc.contributor.author', 'dc.creator', 'dc.contributor.advisor']);
          }


  }

  /**
   * Gets all matching metadata string values from hitHighlights or dso metadata, preferring hitHighlights.
   *
   * @param {string|string[]} keyOrKeys The metadata key(s) in scope. Wildcards are supported; see [[Metadata]].
   * @returns {string[]} the matching string values or an empty array.
   */
  allMetadataValues(keyOrKeys: string | string[]): string[] {
    return Metadata.allValues([this.object.hitHighlights, this.dso.metadata], keyOrKeys);
  }

  /**
   * Gets the first matching metadata string value from hitHighlights or dso metadata, preferring hitHighlights.
   *
   * @param {string|string[]} keyOrKeys The metadata key(s) in scope. Wildcards are supported; see [[Metadata]].
   * @returns {string} the first matching string value, or `undefined`.
   */
  firstMetadataValue(keyOrKeys: string | string[]): string {
    return Metadata.firstValue([this.object.hitHighlights, this.dso.metadata], keyOrKeys);
  }

  private isCollapsed(): Observable<boolean> {
    return this.truncatableService.isCollapsed(this.dso.id);
  }
}
