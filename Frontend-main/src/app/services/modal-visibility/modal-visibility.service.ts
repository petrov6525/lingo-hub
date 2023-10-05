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

  private successModalVisible = new BehaviorSubject<boolean>(false);
  successModalVisibleData$ = this.successModalVisible.asObservable();

  private errorModalVisible = new BehaviorSubject<boolean>(false)
  errorModalVisibleData$ = this.errorModalVisible.asObservable();
  constructor() { }

  public onErrorModalVisible() {
    this.errorModalVisible.next(true);
  }
  public offErrorModalVisible() {
    this.errorModalVisible.next(false);
  }

  public onSuccessModalVisible() {
    this.successModalVisible.next(true);
  }
  public offSuccessModalVisible() {
    this.successModalVisible.next(false);
  }

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
