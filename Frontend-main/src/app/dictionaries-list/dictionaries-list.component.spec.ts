import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionariesListComponent } from './dictionaries-list.component';

describe('DictionariesListComponent', () => {
  let component: DictionariesListComponent;
  let fixture: ComponentFixture<DictionariesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DictionariesListComponent]
    });
    fixture = TestBed.createComponent(DictionariesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
