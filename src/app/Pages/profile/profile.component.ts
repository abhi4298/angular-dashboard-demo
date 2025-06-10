import { Component } from '@angular/core';
import { GetService } from '../../Services/Get/get.service';
import { CommonModule } from '@angular/common';
import { PostService } from '../../Services/Post/post.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { config } from '../../../environments/environment';

interface User {
  firstName: String;
  lastName: String;
  email: String;
  phoneNumber: String;
  profileImage: String;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  userData: User = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profileImage: ''
  };

  selectedFile: File | null = null;

  constructor(
    private getService: GetService,
    private postService: PostService,
  ) {
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.getService.getProfileData().subscribe({
      next: (resp: User) => {
        console.log('Data:', resp);
        this.userData = resp;
      },
      error: (err: any) => {
        console.log('Handled error:', err.error.message);
      }
    });
  }

  onFileSelected(event: Event) {
    let input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      let formData = new FormData();
      formData.append('file', this.selectedFile);
      this.postService.uploadFile(formData).subscribe({
        next: (resp: User) => {
          console.log('Data:', resp);
          this.userData = resp;
        },
        error: (err: any) => {
          console.log('Handled error:', err.error.message);
        }
      });
    }
  }

  getImage() {
    return config.imageBaseUrl + this.userData.profileImage;
  }

}
