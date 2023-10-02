import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalVisibilityService {
  private addToDictionaryModalVisible = new BehaviorSubject<boolean>(false);
  addToDictionaryModalVisibleData$ = this.addToDictionaryModalVisible.asObservable();

  private addNewDictionaryModalVisible = new BehaviorSubject<boolean>(false);
  addNewDictionaryModalVisibleData$ = this.addNewDictionaryModalVisible.asObservable();
  constructor() { }

  public onAddToDictionaryModalVisible() {
    this.addToDictionaryModalVisible.next(true);
  }

  public offAddToDictionaryModalVisible() {
    this.addToDictionaryModalVisible.next(false);
  }

  public onAddNewDictionaryModalVisible() {
    this.addNewDictionaryModalVisible.next(true);
  }

  public offAddNewDictionaryModalVisible() {
    this.addNewDictionaryModalVisible.next(false);
  }
}
