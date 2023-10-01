import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ModalVisibilityService} from "../../services/modal-visibility/modal-visibility.service";
import {LanguageCodeServiceService} from "../../services/language-code/language-code.service.service";

@Component({
  selector: 'add-new-dictionary-modal',
  templateUrl: './add-new-dictionary-modal.component.html',
  styleUrls: ['./add-new-dictionary-modal.component.css']
})
export class AddNewDictionaryModalComponent implements OnInit, OnDestroy{
  isVisible:boolean = false;
  private isVisibleSubscription: Subscription = new Subscription();

  title:string = "";
  originCodeId:string = "";
  translateCodeId:string = "";
  languages: any[] = [];
  isValidate: boolean = false;

  constructor(private modalVisibilityService: ModalVisibilityService,
              private languageCodeService: LanguageCodeServiceService) {}
  ngOnInit(): void {
    this.isVisibleSubscription = this.modalVisibilityService.addNewDictionaryModalVisibleData$.subscribe(
      (data) => {
        this.isVisible = data;
      }
    );
    this.fetchLanguages();
  }
  closeModalHandler() {
    this.modalVisibilityService.offAddNewDictionaryModalVisible();
    this.modalVisibilityService.onAddToDictionaryModalVisible();
  }
  fetchLanguages() {
    this.languageCodeService.fetchLanguageCodes().subscribe(
      (data) => {
        if (data) {
          this.languages = data;
        }
      }
    )
  }
  inputChangeHandler() {
    this.isValidate = this.getIsValidate();
  }
  getIsValidate() {
    return this.title !== "" && this.originCodeId !== "" && this.translateCodeId !== "";
  }
  cancelClickHandler(){
    this.title = "";
    this.originCodeId = "";
    this.translateCodeId = "";
    this.closeModalHandler();
  }



  ngOnDestroy(): void {
    this.isVisibleSubscription.unsubscribe();
  }

}
