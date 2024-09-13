import { Component } from '@angular/core';
import { Author } from 'src/app/models/author';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  friend : Author = {
    id: 1,
    name: 'Ahmed Alaa',
    bio: 'A passionate developer with a love for Angular.',
    email: 'ahmedalaa@example.com',
    profilePictureUrl: 'https://w0.peakpx.com/wallpaper/814/650/HD-wallpaper-spongebob-squarepants-minimalist-cartoons-spongebob-spongebob-squarepants-minimalism-minimalist-yellow-deviantart.jpg',
    createdAt: new Date(), 
    posts: [],
    friends: [],
  }

  friend1 : Author = {
    id: 1,
    name: 'Ismail',
    bio: 'A passionate developer with a love for Angular.',
    email: 'ahmedalaa@example.com',
    profilePictureUrl: 'https://i.pinimg.com/736x/9b/bd/92/9bbd9297b91dd8d8de331a4bfb6439db.jpg',
    createdAt: new Date(), 
    posts: [],
    friends: [],
  }

}
