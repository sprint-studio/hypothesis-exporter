import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { selectAnnotations } from './store/selectors/annotation.selector';

@Component({
  selector: 'app-root',
  template: `<home></home>`
})
export class AppComponent {
  title = 'hypotesis-exporter';

  constructor(private store: Store<AppState>) { }
}
