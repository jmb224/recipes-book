import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public userLoggedIn = false;
  private userSubs: Subscription;

  constructor(
    private authServ: AuthService,
    private dataStorageServ: DataStorageService) { }

  ngOnInit(): void {
    this.userSubs = this.authServ.userSubject.subscribe((user) => {
        this.userLoggedIn = !!user;
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  onSelected(feature: string) {
    // this.featureSelected.emit(feature);
    // console.log("ShowRecipes Clicked");
  }

  onSaveRecipes() {
    this.dataStorageServ.storeRecipes()
  }

  onFetchRecipes() {
    this.dataStorageServ.fetchRecipes().subscribe()
  }

  onLogout() {
    this.userLoggedIn = false;
    this.authServ.signout()
  }
}
