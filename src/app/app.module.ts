import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, provideRouter, withComponentInputBinding } from '@angular/router';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { PostComponent } from './components/post/post.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FriendDetailsComponent } from './components/friend-details/friend-details.component';
import { LoginComponent } from './pages/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt.interceptor';
import { CommentsComponent } from './components/comments/comments.component';  

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomeComponent,
    NewPostComponent,
    PostComponent,
    SideNavComponent,
    HeaderComponent,
    AvatarComponent,
    FriendDetailsComponent,
    LoginComponent,
    CommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    provideRouter([], withComponentInputBinding()),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
