import { Injectable } from '@angular/core';
import { hasValue, isEmpty } from '../../shared/empty.util';
import { DSpaceObject } from '../shared/dspace-object.model';
import { TranslateService } from '@ngx-translate/core';
import { LocaleService } from 'src/app/core/locale/locale.service'; // import LocaleService
/**
 * Returns a name for a {@link DSpaceObject} based
 * on its render types.
 */
@Injectable({
  providedIn: 'root'
})
export class DSONameService {
  title: string; // kware-edit
  constructor(private translateService: TranslateService,
    public localeService: LocaleService , /* kware edit - call service from LocaleService */
    ) {

  }

  /**
   * Functions to generate the specific names.
   *
   * If this list ever expands it will probably be worth it to
   * refactor this using decorators for specific entity types,
   * or perhaps by using a dedicated model for each entity type
   *
   * With only two exceptions those solutions seem overkill for now.
   */
  private readonly factories = {
    Person: (dso: DSpaceObject): string => {
      const familyName = dso.firstMetadataValue('person.familyName');
      const givenName = dso.firstMetadataValue('person.givenName');
      if (isEmpty(familyName) && isEmpty(givenName)) {
        return dso.firstMetadataValue('dc.title') || dso.name;
      } else {
        return `${familyName}, ${givenName}`;
      }
    },
    OrgUnit: (dso: DSpaceObject): string => {
      return dso.firstMetadataValue('organization.legalName');
    },
    Default: (dso: DSpaceObject): string => {
         // If object doesn't have dc.title metadata use name property



         if (this.localeService.getCurrentLanguageCode() === 'ar' && dso.firstMetadataValue('dc.language.iso') === 'Arabic | العربية'){
          this.title = dso.firstMetadataValue('dc.title');
          }

          if (this.localeService.getCurrentLanguageCode() === 'ar' && !(dso.firstMetadataValue('dc.language.iso') === 'Arabic | العربية') && dso.firstMetadataValue('dc.title.alternative') ){
            this.title = dso.firstMetadataValue('dc.title.alternative');
            }

            if (this.localeService.getCurrentLanguageCode() === 'ar' && !(dso.firstMetadataValue('dc.language.iso') === 'Arabic | العربية') && !dso.firstMetadataValue('dc.title.alternative') ){
              this.title = dso.firstMetadataValue('dc.title');
              }

          if (this.localeService.getCurrentLanguageCode() === 'en' && dso.firstMetadataValue('dc.language.iso') === 'English | الإنجليزية'){
          this.title = dso.firstMetadataValue('dc.title');
          }

          if (this.localeService.getCurrentLanguageCode() === 'en' && !(dso.firstMetadataValue('dc.language.iso') === 'English | الإنجليزية') && dso.firstMetadataValue('dc.title.alternative') ){
            this.title = dso.firstMetadataValue('dc.title.alternative');
            }
            if (this.localeService.getCurrentLanguageCode() === 'en' && !(dso.firstMetadataValue('dc.language.iso') === 'English | الإنجليزية') && !dso.firstMetadataValue('dc.title.alternative') ){
              this.title = dso.firstMetadataValue('dc.title');
              }

        return this.title || dso.name || this.translateService.instant('dso.name.untitled');
    }
  };

  /**
   * Get the name for the given {@link DSpaceObject}
   *
   * @param dso  The {@link DSpaceObject} you want a name for
   */
  getName(dso: DSpaceObject): string {
    const types = dso.getRenderTypes();
    const match = types
      .filter((type) => typeof type === 'string')
      .find((type: string) => Object.keys(this.factories).includes(type)) as string;

       //kware-edit    
      if (hasValue(match)) {
        return this.localeService.getStringByLocale(this.factories[match](dso));
      } else {
        return this.localeService.getStringByLocale(this.factories.Default(dso)) ;
      }
  }

}
