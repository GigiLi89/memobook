![Memobook logo](src/assets/logo_memo.png)

# About / Introduction

Link to the deployed project: (https://memobook-af0ef88c7472.herokuapp.com/signup)

![Responsive](src/assets/responsive_m.png)

Memobook, or Memo for short, is a platform for friends and family to connect and share posts with stories and images with eachother. Users are able to interact with posts/eachother by likes, comments and even chats. 

The idea for this project came to me as I was buildning a project along side the learning materials from Code Institute, but with a twist and the idea of expanding the idea with something more. Memobooks concept was developed as a interactive place for people to connect and as the in the name, shar memos - Memories!

The project is built in two parts, a backend and a frontend, keeping them seperate for a better overview. This part is the backend.

Link to the frontend repository on Github: (https://github.com/GigiLi89/memobook)
Link to the backend repository on Github: (https://github.com/GigiLi89/memobook-drfapi)

---

# Wireframes (created in Balsamiq)

Memobooks wireframes, a rough sketch of the project with the focus of the site being responsive as the priority as well as choosing colours that will meet accessability criterias. 

![Wireframes](src/assets/memo_wireframe.png)

The difference between the desktop version compared to the tablet and mobile version is of course the layout but also the column to the right on the desktop page disapears on tablet and mobile mode. This will make it more user friendly and eliminate "not necessary" objects to optimize the space on a smaller display.

---

# ERD (created in Lucidchart)

![ERD](src/assets/memo_erd.png)

---

# Process of building the workspace

![homepage](src/assets/home_m.png)

After creating a new repository with the new CI template I opened the workspace in VS code through Gitpod. Most of the project was not made with Gitpod Enterprise since I had major issues moving there. After talking to both Student Care and 3 different tutors I was told to use the old Gitpod and wait for more information until the issues were fixed. 

I installed Django and started my DRF API project. I also started setting up Cloudinary, PostgreSQL and Heroku for:
- Cloudinary: To store images
- PostgreSQL: Database
- Heroku: For deployment

When starting the project I first created the DRF API and the necessary apps for the project: Profile, Post, Comment, Like, Followers and Chat. Models using the ERD's that were necessary to handle and store user data for the project in the database. Using generic views and serializers to create all of them.

---

# Features

## Header / Navigation Bar

![nav](src/assets/navbar_m.png)
![navloggedout](src/assets/navloggedout_m.png)

In the header / navigation bar we have the logo in the upper left corner. The logo is also a link that will link back to the Home page. The logo will be there no matter if the user is logged in or not. 

If user is not logged in, user will have:
- HOME (will redirect to home page)
- SIGNIN (will redirect to sign in page)
- SINGUP (will redirect to sign up page)

If user is logged in, user will have:
- Add post (will redirect to add post page)
- HOME (will redirect to home page)
- FEED (will redirect to feeds page)
- LIKES (will redirect to likes page)
- PROFILE (will redirect to profile page)
- SINGOUT (will sign out user and resirect to home page)

## Home page

On the Home page the structure will look different depending on the device the user is on. Image at the top of the page on how it looks on different devices.

![homepage](src/assets/home_m.png)

### Desktop
A searchbar is just under the header/navigation bar. The serachbar can be used to search for posts or posts made by a specific user. Under the search bar we have the post feeds. Next to the search bar and post feed we have a column with the profiles that are most popular/have most followers. 

### Tablet
In tablet mode it will almost look the same as the desktop mode apart from the popular profiles column which will instead be found at the top, above the search bar. 

### Mobile
In the mobile version it will almost look like the tablet version apart from the navigation bar at the top that is a hamburger menu instead of a vidible one. 

## Add Post page
On the Add Post Page we have the following features: Upload image, textarea to write a title and textarea to write some content. There is also a create and cancel button. Everything you need to create a post!

![post](src/assets/post_m.png)

## Search bar

![searchbar](src/assets/searchbar_m.png)

Searchbar at the top off the page to search for specific posts.

## Feed page
The feed page will show all the feeds from the profiles that you follow, with the newest post at the top.

## Liked page
The liked page will show the posts that the user has liked, like a collection of liked posts. 

## Profile page
On this page the users are able to view their own profiles as well as the their own posts. There is also a three dot menu for the user to change profile, like adding/changing profile image and adding bio. The user can also change username and password.

![profile](src/assets/profile_m.png)

## Visiting other users profiles
By clicking on the avatar, the user will be redirected to that specific users profile where we will find information such as, how many followers, how many people the user is following and the users posts thats been made. 

---

## Chat
A chat function has been built where the user can either access the message page from under the "popular page"-page or from the navbar. 

![chat](src/assets/chat_m.png)

---

## Register, Login or Logout
The user needs to sign up for an account and be logged in to be able to use the site fully. The user can for example not like or comment posts. 

### Sign up
Sign up for an account to get full access to all the features. To sign up, the user needs to fill out a username and password.

![signup](src/assets/signout_m.png)

### Sign in
User can sign in by filling out the username and password field. 

![signin](src/assets/signin_m.png)

### Sign out
User can sign out from the page simply by clicking the signout button at the top of the page. 

---

# Future Features
Some possible features in the future:
- Notifications, lets the user now that they have received a like, a comment or a follow. 
- Add multiple images to a post.
- Drafts, user can write drafts and post them at a later time. 

---

# User Stories

## First time visitors

- Wants to find out more about the platform
- Signs up for an account
- Checks posts

## Returning visitors

- Wants to be active on the platform with other users
- Wants to be updated with what other users are sharing
- Wants to keep contact with other users

---

# User Experience

Potential users
From children to adults can use the platform. Children should most likely have permission for an adult first. 
Anyone interested in staying in touch with others or just wants to keep updates about others. 

---

# Deployment

The site was pushed to Github Pages and deployed to Heroku. 
Link to the live page: (https://memobook-af0ef88c7472.herokuapp.com/)

# Testing
The testing was made and documented in a seperate file.
Please find the testing documentation [here](TESTING.md): 
