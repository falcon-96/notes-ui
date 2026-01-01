import { Component, OnInit } from '@angular/core';
import { Note } from '../../core/models/note';
import { NotesService } from '../../core/services/notes';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Confirmation } from "../confirmation/confirmation";
import { MatDialog } from '@angular/material/dialog';
import { QuillEditor } from "../quill-editor/quill-editor";

@Component({
  selector: 'app-notes',
  imports: [ReactiveFormsModule, MatIconModule, QuillEditor],
  templateUrl: './notes.html',
  styleUrl: './notes.scss',
})
export class Notes implements OnInit {
  notes: Note[] = [];
  // quill: any;
  formGroup: FormGroup;
  selectedNote!: Note;
  isEditing = false;
  constructor(private readonly dialog: MatDialog, private readonly notesService: NotesService, private readonly router: Router, private readonly fb: FormBuilder) {
    this.formGroup = fb.group({
      title: [''],
      content: ['']
    });
  }
  ngOnInit(): void {
    this.loadExistingNotes();
  }

  loadExistingNotes() {
    this.notesService.getNotes().subscribe(data => {
      this.notes = data;
    });
  }

  saveNote(note: Note): void {
    this.notesService.createNote(note).subscribe({
      next: (response) => {

        this.notesService.getNotes().subscribe(data => {
          this.notes = data;
        });
        if (this.isEditing) {
          this.isEditing = false;
        }
      }, error: (error) => {
        console.error("Error while adding note.", error);
      }, complete: () => {
        console.log('Request Completed.')
      }
    });
  }

  saveEdit(note: Note) {

    this.notesService.updateNote(note).subscribe({
      next: (response) => {
        this.notesService.getNotes().subscribe(data => {
          this.notes = data;
        });

        if (this.isEditing) {
          this.isEditing = false;
        }
      }, error: (error) => {
        console.error("Error while adding note.", error);
      }, complete: () => {
        console.log('Request Completed.')
      }
    });
  }

  deleteNote(note: Note) {
    this.notesService.deleteNote(note.id)
      .subscribe({
        next: (response) => {
          alert('Note deleted successfully');
          this.loadExistingNotes();
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => console.log('Request Complete.')
      })
  }

  warnAndDelete(note: Note) {
    this.selectedNote = note;
    const dialogRef = this.dialog.open(Confirmation, {
      width: '250px',
      data: note.id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteNote(note);
      }
    });

  }

  enableEdit(note: Note) {
    this.selectedNote = note;
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  signOut() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
