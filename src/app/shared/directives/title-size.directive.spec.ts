import { TitleSizeDirective } from './title-size.directive';
import {ElementRef} from "@angular/core";

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe('TitleSizeDirective', () => {
  it('should create an instance', () => {
    const elementRef = new MockElementRef();
    const directive = new TitleSizeDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
