import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { PostService } from '../../Services/Post/post.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, MatListModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(
    private router: Router,
    private postService: PostService
  ) {

  }

  logout() {
    this.postService.logout().subscribe({
      next: (resp: any) => {
        console.log('Data:', resp);
        localStorage.removeItem("user");
        this.router.navigateByUrl('/login');
      },
      error: (err: any) => {
        console.log('Handled error:', err.error.message);
        localStorage.removeItem("user");
        this.router.navigateByUrl('/login');
      }
    });
  }

}
