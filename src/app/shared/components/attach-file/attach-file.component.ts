import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-attach-file',
  templateUrl: './attach-file.component.html',
  styleUrls: ['./attach-file.component.scss']
})
export class AttachFileComponent implements OnInit {
  @Input() title;
  @Input() multiple = false;
  @Output() change = new EventEmitter();
  @ViewChild('filenames', {static: false}) filenames: ElementRef;

  files: FileList;

  constructor() { }

  ngOnInit() {
  }

  emitChange(event) {
    this.files = event.target.files;

    this.filenames.nativeElement.innerHTML = Array.from(this.files)
      .map(f => {
        return `<span> ${f.name} </span>`
      })
      .join(' ');

    this.change.emit(event);
  }

}
