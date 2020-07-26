import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { AppState } from "src/app/store";
import {
  setAPIToken,
  AnnotationActions,
  getAPIToken,
} from "src/app/store/actions";
import { selectToken, selectAnnotations } from "src/app/store/selectors";
import { Annotation } from "src/app/core/models/annotation";

@Component({
  selector: "home",
  template: `
    <form
      #tokenForm="ngForm"
      class=" my-10 flex flex-col"
      (ngSubmit)="addToken(tokenForm.value)"
    >
      <div class="flex space-x-2">
        <input
          name="token"
          class="px-3 py-2 w-2/4 bg-white rounded"
          placeholder="Paste token here"
          ngModel
          required=""
        />
        <button
          type="submit"
          class="px-3 py-2 bg-gray-700 text-gray-200 rounded"
        >
          Add token
        </button>
      </div>
      <label class="mt-1 text-xs text-gray-700"
        >{{ currentToken$ | async | json }}
      </label>
    </form>

    <div class="flex flex-col justify-center space-y-3">
      <annotation
        class="w-full"
        *ngFor="let annotation of annotations$ | async"
        [annotation]="annotation"
        (annotate)="annotate($event)"
        (add-tag)="addTag($event)"
        (remove-tag)="removeTag($event)"
      ></annotation>
    </div>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  private currentToken$: Observable<{ token: string }>;
  private annotations$: Observable<Annotation[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // TODO Togliere questi dispatch da qui
    this.store.dispatch(AnnotationActions.getAnnotations());
    this.store.dispatch(getAPIToken());

    this.currentToken$ = this.store.pipe(select(selectToken));
    this.annotations$ = this.store.pipe(select(selectAnnotations));
  }

  addToken({ token }: { token: string }) {
    this.store.dispatch(setAPIToken({ token }));
  }

  annotate($event: { id: string; text: string; tags?: string[] }) {
    this.store.dispatch(AnnotationActions.updateAnnotation({ data: $event }));
  }

  addTag(tag: string) {
    // TODO Dispatch dell'azione per aggiungere il tag
  }

  removeTag(tag: string) {
    // TODO Dispatch dell'azione per rimuovere il tag
  }
}
