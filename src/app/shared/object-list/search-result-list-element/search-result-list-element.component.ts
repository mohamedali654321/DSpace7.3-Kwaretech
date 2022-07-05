import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchResult } from '../../search/models/search-result.model';
import { DSpaceObject } from '../../../core/shared/dspace-object.model';
import { hasValue } from '../../empty.util';
import { AbstractListableElementComponent } from '../../object-collection/shared/object-collection-element/abstract-listable-element.component';
import { TruncatableService } from '../../truncatable/truncatable.service';
import { Metadata } from '../../../core/shared/metadata.utils';
import { DSONameService } from '../../../core/breadcrumbs/dso-name.service';

@Component({
  selector: 'ds-search-result-list-element',
  template: ``
})
export class SearchResultListElementComponent<T extends SearchResult<K>, K extends DSpaceObject> extends AbstractListableElementComponent<T> implements OnInit {
  /**
   * The DSpaceObject of the search result
   */
  dso: K;
  dsoTitle: string;
  authors=[];
  keywords=[];  //subject
  public constructor(protected truncatableService: TruncatableService, protected dsoNameService: DSONameService) {
    super();
  }

  /**
   * Retrieve the dso from the search result
   */
   ngOnInit(): void {
    if (hasValue(this.object)) {
      this.dso = this.object.indexableObject;
      this.dsoTitle = this.dso.firstMetadataValue('dc.title');

       // this.keywords=this.dso.allMetadataValues('dc.subject').slice(0,3); //kwar-edit
     let  arabic = /[\u0600-\u06FF]/;
     let english= /[a-zA-Z]/;
     let arabicKeyswords= this.dso.allMetadataValues('dc.subject').filter(key=>arabic.test(key));
     let englishKeywords=this.dso.allMetadataValues('dc.subject').filter(key=>english.test(key));
     (typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode')  === 'ar' ? this.keywords= arabicKeyswords : this.keywords= englishKeywords;


      // title seperate based on interface 

      if((typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode')  === 'ar' && this.dso.firstMetadataValue('dc.language.iso') === 'Arabic | العربية'){
        this.dsoTitle=this.dso.firstMetadataValue('dc.title');
        }
        
        if((typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode')  === 'ar' && !(this.dso.firstMetadataValue('dc.language.iso') === 'Arabic | العربية') && this.dso.firstMetadataValue('dc.title.alternative') ){
          this.dsoTitle=this.dso.firstMetadataValue('dc.title.alternative');
          }
        
          if((typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode') === 'ar' && !(this.dso.firstMetadataValue('dc.language.iso') === 'Arabic | العربية') && !this.dso.firstMetadataValue('dc.title.alternative') ){
            this.dsoTitle=this.dso.firstMetadataValue('dc.title');
            }
        
        if((typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode') === 'en' && this.dso.firstMetadataValue('dc.language.iso') === 'English | الإنجليزية'){
        this.dsoTitle=this.dso.firstMetadataValue('dc.title');
        }
        
        if((typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode') === 'en' && !(this.dso.firstMetadataValue('dc.language.iso') === 'English | الإنجليزية') && this.dso.firstMetadataValue('dc.title.alternative') ){
          this.dsoTitle=this.dso.firstMetadataValue('dc.title.alternative');
          }
          if((typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode') && !(this.dso.firstMetadataValue('dc.language.iso') === 'English | الإنجليزية') && !this.dso.firstMetadataValue('dc.title.alternative') ){
            this.dsoTitle=this.dso.firstMetadataValue('dc.title');
            }

      // end


      
     // authors based on interface language 


     if((typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode') === 'ar' && this.dso.firstMetadataValue('dc.language.iso') === 'Arabic | العربية'){
      this.authors=this.dso.allMetadataValues(['dc.contributor.author', 'dc.creator', 'dc.contributor.advisor']);
      }
      
      if((typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode') === 'ar' && !(this.dso.firstMetadataValue('dc.language.iso') === 'Arabic | العربية') && this.dso.allMetadataValues(['dc.contributor.authoralternative',  'dc.contributor.advisoralternative']).length > 0 ){
        this.authors=this.dso.allMetadataValues(['dc.contributor.authoralternative',  'dc.contributor.advisoralternative']);
        }
      
        if((typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode') === 'ar' && !(this.dso.firstMetadataValue('dc.language.iso') === 'Arabic | العربية') && this.dso.allMetadataValues(['dc.contributor.authoralternative',  'dc.contributor.advisoralternative']).length <= 0  ){
          this.authors=this.dso.allMetadataValues(['dc.contributor.author', 'dc.creator', 'dc.contributor.advisor']);;
          }
      
      if((typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode') === 'en' && this.dso.firstMetadataValue('dc.language.iso') === 'English | الإنجليزية'){
        this.authors=this.dso.allMetadataValues(['dc.contributor.author', 'dc.creator', 'dc.contributor.advisor']);
      }
      
      if((typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode') === 'en' && !(this.dso.firstMetadataValue('dc.language.iso') === 'English | الإنجليزية') && this.dso.allMetadataValues(['dc.contributor.authoralternative',  'dc.contributor.advisoralternative']).length > 0 ){
        this.authors=this.dso.allMetadataValues(['dc.contributor.authoralternative',  'dc.contributor.advisoralternative']);
        }
        if((typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode') === 'en' && !(this.dso.firstMetadataValue('dc.language.iso') === 'English | الإنجليزية') && this.dso.allMetadataValues(['dc.contributor.authoralternative',  'dc.contributor.advisoralternative']).length <= 0  ){
          this.authors=this.dso.allMetadataValues(['dc.contributor.author', 'dc.creator', 'dc.contributor.advisor']);
          }



      
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

  /**
   * Emits if the list element is currently collapsed or not
   */
  isCollapsed(): Observable<boolean> {
    return this.truncatableService.isCollapsed(this.dso.id);
  }

}
