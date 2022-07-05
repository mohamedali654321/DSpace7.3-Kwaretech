import { Component, Input } from '@angular/core';
import { LocaleService } from 'src/app/core/locale/locale.service'; // import LocaleService
/**
 * This component renders any content inside this wrapper.
 * The wrapper prints a label before the content (if available)
 */
@Component({
  selector: 'ds-metadata-field-wrapper',
  styleUrls: ['./metadata-field-wrapper.component.scss'],
  templateUrl: './metadata-field-wrapper.component.html'
})
export class MetadataFieldWrapperComponent {
  constructor(
    public localeService: LocaleService  /* kware edit - call service from LocaleService */
  ){}
  /**
   * The label (title) for the content
   */
  @Input() label: string;

  @Input() hideIfNoTextContent = true;
}
