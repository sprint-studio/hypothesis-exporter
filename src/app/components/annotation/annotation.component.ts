import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Annotation } from "src/app/core/models/annotation";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/store";

@Component({
  selector: "annotation",
  template: `
    <div class="bg-white rounded shadow">
      <div class="px-5 py-4 flex flex-col">
        <div class="flex justify-between">
          <label class="text-xs text-gray-600">{{ annotation.uri }}</label>
          <div class="flex space-x-3">
            <a (click)="onEdit()">
              <svg
                class="w-4 h-4 text-gray-600"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
            </a>

            <a href="{{ annotation.links.incontext }}" target="_blank">
              <svg
                class="w-4 h-4 text-gray-600"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
            </a>
            <a (click)="download()">
              <svg
                class="w-4 h-4 text-gray-600"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <div class="pt-5 flex flex-col space-y-3">
          <p
            name="highlight"
            class="pl-2 md:pr-10 text-sm text-gray-600 border-l-2 border-gray-500"
          >
            <!-- TODO modellare meglio le annotazioni -->
            {{ annotation.target[0].selector[2].exact }}
          </p>
          <p class="pt-2 md:pr-10 text-gray-800 border-gray-500">
            {{ annotation.text }}
          </p>
        </div>
      </div>
      <div *ngIf="edit" class="p-5 flex flex-col">
        <form
          #annotationForm="ngForm"
          (ngSubmit)="saveAnnotation(annotationForm.value)"
        >
          <textarea
            name="text"
            class="h-32 px-3 py-2 w-full text-sm border rounded"
            placeholder="Write your annotation here..."
            required=""
            ngModel
          ></textarea>
          <div class="flex items-center">
            <div
              class=" w-2/4 h-10 flex justify-between bg-white border rounded"
            >
              <button
                *ngFor="let tag of tags"
                class="ml-1 my-1 px-2 inline-flex justify-center items-center space-x-1 rounded bg-gray-300 text-gray-700 text-sm"
              >
                <svg
                  class="w-3 h-3 text-gray-600"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span>{{ tag }}</span>
              </button>
              <input
                name="tag"
                class="px-2 py-1 inline-flex flex-grow text-sm border-0 rounded focus:outline-none"
                ngModel
              />
              <a
                class="px-2 py-1 inline-flex justify-center items-center space-x-1 rounded-tr rounded-br border-l bg-white text-gray-800 text-xs focus:outline-none"
                (click)="selectTag(annotationForm.value.tag)"
              >
                Add tags
              </a>
            </div>
          </div>
          <div class="mt-2 flex justify-end">
            <button
              type="submit"
              class="px-3 py-1 text-xs font-bold text-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-3 py-1 bg-gray-700 text-xs text-gray-100 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div class="px-3 py-3 h-10 flex justify-between items-center border-t">
        <div class="flex items-center">
          <span
            *ngFor="let tag of annotation.tags"
            class="px-4 py-1 relative object-contain bg-gray-200 rounded-full text-xs text-gray-600"
            >{{ tag }}</span
          >
        </div>
        <label class="text-xs text-gray-600">{{
          annotation.created | date
        }}</label>
      </div>
    </div>
  `,
  styles: [],
})
export class AnnotationComponent implements OnInit {
  @Input() annotation: Annotation;
  @Output() annotate: EventEmitter<{
    id: string;
    text?: string;
    tags?: string[];
  }> = new EventEmitter();
  @Output() editAnnotation: EventEmitter<string> = new EventEmitter();
  @Output() addTag: EventEmitter<{
    id: string;
    tag: string;
  }> = new EventEmitter();
  @Output() removeTag: EventEmitter<{
    id: string;
    tag: string;
  }> = new EventEmitter();

  private edit: boolean;
  private tags: string[];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.tags = [];
    //this.store.pipe(select())
  }

  onEdit() {
    this.edit = true;
    this.editAnnotation.emit(this.annotation.id);
  }

  saveAnnotation(data: { text?: string; tags?: string[] }) {
    this.edit = false;
    this.annotate.emit({ id: this.annotation.id, ...data });
  }

  download() {}

  selectTag(tag: string) {
    this.tags.push(tag);
    this.addTag.emit({ id: this.annotation.id, tag });
  }

  deleteTag(tag: string) {
    this.tags = this.tags.filter((_tag) => _tag !== tag);
    this.removeTag.emit({ id: this.annotation.id, tag });
  }
}
