import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Annotation } from "src/app/core/models/annotation";

@Component({
  selector: "annotation",
  template: `
    <div class="bg-white rounded shadow">
      <div class="px-5 py-4 flex flex-col">
        <div class="flex justify-between">
          <label class="text-xs text-gray-600">{{ annotation.uri }}</label>
          <div class="flex space-x-3">
            <a (click)="edit = !edit">
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
    text: string;
  }> = new EventEmitter();

  private edit: boolean;

  constructor() {}

  ngOnInit() {}

  saveAnnotation(data: { text: string }) {
    this.edit = false;
    this.annotate.emit({ id: this.annotation.id, ...data });
  }
}
