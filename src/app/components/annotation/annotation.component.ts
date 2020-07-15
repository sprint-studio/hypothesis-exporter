import { Component, OnInit, Input } from '@angular/core';
import { Annotation } from 'src/app/core/models/annotation';

@Component({
  selector: 'annotation',
  template: `
   <label>{{ annotation.created }}</label>
   <span *ngFor="let tag of annotation.tags">{{ tag }}</span>
   <p>{{ annotation.text }}</p>
   <a href="{{ annotation.uri }}" target="_blank">{{ annotation.uri }}</a>
  `,
  styles: []
})
export class AnnotationComponent implements OnInit {
  @Input() annotation: Annotation;

  constructor() { }

  ngOnInit() {
  }

}
