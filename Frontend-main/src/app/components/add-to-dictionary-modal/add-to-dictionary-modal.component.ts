import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalVisibilityService} from "../../services/modal-visibility/modal-visibility.service";
import {Subscription} from "rxjs";
import {DictionaryService} from "../../services/dictionary.service";

@Component({
  selector: 'add-to-dictionary-modal',
  templateUrl: './add-to-dictionary-modal.component.html',
  styleUrls: ['./add-to-dictionary-modal.component.css']
})
export class AddToDictionaryModalComponent implements OnInit, OnDestroy{
  isVisible:boolean = false;
  private isVisibleSubscription: Subscription = new Subscription();

  dictionaries: any[] = [];
  checkedDictionaries: any[] = [];
  constructor(private modalVisibilityService: ModalVisibilityService,
              private dictionaryService: DictionaryService) {
  }
  ngOnInit(): void {
    this.isVisibleSubscription = this.modalVisibilityService.addToDictionaryModalVisibleData$.subscribe(
      (data) => {
        this.isVisible = data;
        if (this.isVisible) {
          this.fetchAllDictionaries();
        }
      }
    );
  }

  fetchAllDictionaries() {
    this.dictionaryService.getAllDictionariesByUser().subscribe(
      (response) => {
        if (response) {
          this.dictionaries = response.map((item: any)=>{
            return {
              id: item.id,
              title: item.name,
              desc: item.originCode.code + " - " + item.translateCode.code
            }
          })
        }
      }
    );
  }

  closeModalHandler() {
    this.modalVisibilityService.offAddToDictionaryModalVisible();
  }

  addDictionaryModalHandler() {
    this.closeModalHandler();
    this.modalVisibilityService.onAddNewDictionaryModalVisible();
  }

  checkedHandler(id: any) {
    const index = this.checkedDictionaries.indexOf(id);
    if (index === -1) {
      this.checkedDictionaries.push(id);
    }
    else {
      this.checkedDictionaries.splice(index, 1);
    }
  }








  ngOnDestroy(): void {
    this.isVisibleSubscription.unsubscribe();
  }

}
