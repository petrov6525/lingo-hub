import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDictionaryModalComponent } from './add-new-dictionary-modal.component';

describe('AddNewDictionaryModalComponent', () => {
  let component: AddNewDictionaryModalComponent;
  let fixture: ComponentFixture<AddNewDictionaryModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewDictionaryModalComponent]
    });
    fixture = TestBed.createComponent(AddNewDictionaryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
