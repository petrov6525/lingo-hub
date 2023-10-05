import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalVisibilityService} from "../../services/modal-visibility/modal-visibility.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})

export class SuccessModalComponent implements OnInit, OnDestroy{
  isVisible: boolean = false;
  private isVisibleSubscription: Subscription = new Subscription();
  constructor(private modalVisibilityService: ModalVisibilityService) {
  }
  ngOnInit(): void {
    this.isVisibleSubscription = this.modalVisibilityService.successModalVisibleData$.subscribe(
      (data)=> {
        this.isVisible = data;
      }
    );
  }

  okClickHandler() {
    this.modalVisibilityService.offSuccessModalVisible();
  }


  ngOnDestroy(): void {
    this.isVisibleSubscription.unsubscribe();
  }

}
