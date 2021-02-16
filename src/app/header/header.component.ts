import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageServ: DataStorageService) { }

  ngOnInit(): void {
  }

  onSelected(feature: string) {
    // this.featureSelected.emit(feature);
    // console.log("ShowRecipes Clicked");
  }

  saveRecipes() {
    this.dataStorageServ.storeRecipes()
  }
}
