import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./store";
import { selectAnnotations } from "./store/selectors/annotation.selector";

@Component({
  selector: "app-root",
  template: ` <div class="container mx-auto px-5 md:px-0 flex justify-center">
    <div class="w-full md:w-3/4">
      <home></home>
    </div>
  </div>`,
})
export class AppComponent {
  title = "hypotesis-exporter";

  constructor(private store: Store<AppState>) {}
}
