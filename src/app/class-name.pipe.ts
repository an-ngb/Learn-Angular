import { Pipe, PipeTransform } from '@angular/core';
import { CLASS_NAME } from '../app/layout.enum';

@Pipe({
  name: 'className'
})
export class ClassNamePipe implements PipeTransform {

  /**
   * Transform to class name
   * @param value any
   * @param type string:  'B' | 'E' | 'M'
   * @param args any
   * @returns text or null
   */
  transform(value: any, type: string = 'B', args?: any): any {
    let _eleText = '_';
    switch (type) {
      case 'E':
        _eleText = '_';
        break;
      case 'M':
        _eleText = '-';
        break;
      case 'B':
        break;
      default: break;
    }
    if (!value)
      return null;
    return `${CLASS_NAME}${_eleText}${value}`;
    /// loy_header_left, loy_header_left-collapse, loy_header_left-expand
    /// loy_header_right
    /// loy_header-blue
    /// loy_header-blue
  }

}
