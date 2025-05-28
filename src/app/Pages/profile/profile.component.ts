import { Component } from '@angular/core';
import { GetService } from '../../Services/Get/get.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(
    private getService: GetService,
  ) {
  }

  ngOnInit(): void {
    this.getProfile();
  }

  public getProfile() {
    this.getService.getProfileData().subscribe({
      next: (data: any) => {
        console.log('Data:', data);
      },
      error: (err: any) => {
        console.log('Handled error:', err.error.message);
      }
    });
  }

}
