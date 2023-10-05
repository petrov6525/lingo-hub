import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ModalVisibilityService} from "../../services/modal-visibility/modal-visibility.service";

@Component({
  selector: 'error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit, OnDestroy{
  isVisible: boolean = false;
  private isVisibleSubscription: Subscription = new Subscription();
  constructor(private modalVisibilityService: ModalVisibilityService) {
  }
  ngOnInit(): void {
    this.isVisibleSubscription = this.modalVisibilityService.errorModalVisibleData$.subscribe(
      (data)=> {
        this.isVisible = data;
      }
    );
  }

  okClickHandler() {
    this.modalVisibilityService.offErrorModalVisible();
  }


  ngOnDestroy(): void {
    this.isVisibleSubscription.unsubscribe();
  }

}
