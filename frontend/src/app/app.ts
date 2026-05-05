import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loginservice } from '../app/service/loginservice';
import { CurrentUserService } from '../app/service/current-user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit{
  protected readonly title = signal('FRONT-END');

  constructor(
    private auth: Loginservice,
    private currentUser: CurrentUserService
  ) {}

  ngOnInit() {
    if (!this.currentUser.snapshot) {
      this.auth.me().subscribe({
        next: user => this.currentUser.set(user),
        error: () => this.currentUser.clear()
      });
    }
  }
}
