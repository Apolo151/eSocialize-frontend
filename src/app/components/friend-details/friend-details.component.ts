import { Component, importProvidersFrom, Input } from '@angular/core';
import { Author } from 'src/app/models/author';

@Component({
  selector: 'app-friend-details',
  templateUrl: './friend-details.component.html',
  styleUrls: ['./friend-details.component.css']
})

export class FriendDetailsComponent {
@Input() friend!: Author;

getProfilePictureUrl(): string {
  return this.friend.profilePictureUrl || 'assets/default-profile-picture-url.webp';
}

}
