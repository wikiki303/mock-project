import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css'],
})
export class ItemEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() shopId: string;
  @Input() itemId: string;
  @Output() refreshShop = new EventEmitter<string>();
  selectedFile?: File;
  preview: string;
  item: Item;

  constructor(private itemService: ItemService, private spinner: NgxSpinnerService, private alertService: AlertService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.itemId) {
      this.spinner.show();
      this.itemService.getItemById(this.itemId).subscribe(
        (resData) => {
          var file = this.dataURLtoFile(`data:image/png;base64,${resData.image}`);
          this.fileReader(file);
          this.item = resData;
          this.spinner.hide();
        },
        (errorMessage) => {
          this.alertService.error(errorMessage, true);
          this.spinner.hide();
        }
      );
    } else {
      this.resetForm();
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const itemName = form.value.itemName;
    const price = form.value.price;

    let itemObs: Observable<any>;
    this.spinner.show();

    if (this.itemId) {
      itemObs = this.itemService.editItem(this.shopId, this.itemId, itemName, price, this.selectedFile);
    } else {
      itemObs = this.itemService.createItem(this.shopId, itemName, price, this.selectedFile);
    }

    itemObs.subscribe(
      (resData) => {
        this.refreshShop.emit(this.shopId);
        this.spinner.hide();
        form.reset();
        this.resetForm();
      },
      (errorMessage) => {
        this.alertService.error(errorMessage, true);
        this.spinner.hide();
      }
    );
  }

  selectFiles(event: any): void {
    const files: FileList = event.target.files;
    this.preview = '';
    this.selectedFile = null;
    if (files && files[0]) {
      this.fileReader(files[0]);
    }
  }

  fileReader(file) {
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.preview = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  dataURLtoFile(dataurl) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], 'filename.png', { type: mime });
  }

  resetForm() {
    this.item = undefined;
    this.preview = '';
    this.selectedFile = null;
  }

  ngOnDestroy() {
    this.spinner.hide();
  }
}
