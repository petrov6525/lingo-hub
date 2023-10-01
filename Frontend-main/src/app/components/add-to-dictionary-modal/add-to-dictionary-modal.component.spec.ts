import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToDictionaryModalComponent } from './add-to-dictionary-modal.component';

describe('AddToDictionaryModalComponent', () => {
  let component: AddToDictionaryModalComponent;
  let fixture: ComponentFixture<AddToDictionaryModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddToDictionaryModalComponent]
    });
    fixture = TestBed.createComponent(AddToDictionaryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
