# Next.js local authentication with MongoDB

Greetings, traveler!

This is the beginning stages of an app I'm building. As long as the app itself is half-finished, I figure this shell is a satisfactory portfolio piece in the meantime. Please enjoy [the source code](https://github.com/TyWMick/nextjs-local-authentication) on GitHub, and observe the following features:

### Pages

- This demo consists of five pages: a [homepage](https://nextjs-local-authentication.tymick.me/), [/dashboard](https://nextjs-local-authentication.tymick.me/dashboard), [/settings](https://nextjs-local-authentication.tymick.me/settings), [/register](https://nextjs-local-authentication.tymick.me/register), and [/login](https://nextjs-local-authentication.tymick.me/login).
- The dashboard and settings pages require aunthentication, so if you try to visit either before logging in, you'll be redirected to the login page.

### Accounts

- You can [register](https://nextjs-local-authentication.tymick.me/register) with any username (that doesn't currently exist in the database) and password you like, and your credentials (after your password has been hashed with [bcrypt](https://github.com/kelektiv/node.bcrypt.js)) will be stored in a database managed by [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) on a free plan.
- If you'd rather not create an account, you can instead [log in](https://nextjs-local-authentication.tymick.me/login) with username `ty` and password `password` (I promise I never use that in real life).
- Once you've logged in, the [dashboard page](https://nextjs-local-authentication.tymick.me/dashboard) isn't terribly interesting, but if you head on over to [Settings](https://nextjs-local-authentication.tymick.me/settings), you can change your username and/or password and even delete your account, which completely removes its database entry. Note, though, that you can do none of these things with the demo `ty` account, for which the profile update and delete account APIs will return `403` errors.
- If you try fiddling around with multiple accounts, you'll see that you can't register an account with a username that already exists, and you also can't change your username to that of another account.

### Cookies

- Authentication and session information are facilitated by a browser cookie named "token", which you can see with your browser's web development tools. If you do not check the "remember me" box on the login page, this cookie will expire when you end your browser session (i.e., quit the browser program, not just close the tab or window). If you do check the box, this cookie will expire in two weeks.
- If you open the dashboard and/or settings pages in multiple browser tabs, when you log out in one tab (in the profile dropdown in the top-right of the page), you'll automatically be logged out of all other tabs.

### Design

- The design of this demo comes from [Paper Dashboard React](https://www.creative-tim.com/product/paper-dashboard-react), v1.1.0, by [Creative Tim](https://www.creative-tim.com/), but I did [fix several parts](https://github.com/TyWMick/nextjs-local-authentication/blob/master/styles.scss) I found ugly or unwieldy.
- Design work also involved the [Bootstrap](https://getbootstrap.com/) library via [reactstrap](https://reactstrap.github.io/). I'll admit, I like [React Bootstrap](https://react-bootstrap.netlify.com/) better, but Paper Dashboard React already uses reactstrap in its template.

### Serverless functions

- This demo's APIs (and server-rendered pages) are serverless functions created using [Next.js](https://nextjs.org/) and hosted on [ZEIT Now](https://zeit.co/).

Thanks for checking out this demo!

Sincerely,\
[Ty](http://tymick.me)
