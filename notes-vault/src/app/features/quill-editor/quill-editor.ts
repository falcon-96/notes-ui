import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Quill from 'quill';
import { NotesService } from '../../core/services/notes';
import { Note } from '../../core/models/note';

@Component({
  selector: 'app-quill-editor',
  imports: [ReactiveFormsModule],
  templateUrl: './quill-editor.html',
  styleUrl: './quill-editor.scss',
})
export class QuillEditor implements OnInit, AfterViewInit {
  quill: any;
  formGroup: FormGroup;
  @Output()
  save = new EventEmitter<Note>();
  @Input()
  existingNote!: Note;
  @Input()
  cardTitle!: string;
  editorId: string = 'editor';

  constructor(private readonly fb: FormBuilder, private readonly notesService: NotesService) {
    this.formGroup = fb.group({
      id: [''],
      title: [''],
      content: ['']
    });
  }

  ngOnInit(): void {
    if (this.existingNote?.id) {
      this.editorId += this.existingNote.id;
    }
  }

  ngAfterViewInit(): void {
    this.quill = new Quill('#' + this.editorId, {
      theme: 'snow'
    });

    if (!this.cardTitle) {
      this.cardTitle = 'Insert Card Title Here';
    }

    if (this.existingNote) {
      this.formGroup.patchValue({
        id: this.existingNote.id,
        title: this.existingNote.title,
        content: this.existingNote.content
      });
      this.quill.setText(this.existingNote.content);
    }
  }

  notifyParent() {
    const note: Note = this.formGroup.value as Note;
    note.content = this.quill.root.innerHTML;

    this.save.emit(note);
  }
}
