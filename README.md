# API DOCUMENTATION

## POST /signup
send `username`, `password` and `name` properties to create a user. <br/>
<br/>
`sample request body`
```
{
    username: "sample@email.com",
    password: "yourpassword",
    name: "yourname"
}
```
<br/>

## POST /login
send a user's username and password to authenticate. The response will be a JWT.<br><br>
`sample request body`
```
{

    username: "sample@email.com",
    password: "yourpassword"
}
```
<br>

## GET /profile
an `authenticated endpoint``. The request to this endpoint must include an `Authorization` header with the authenticated user's bearer token.
<br>
<br>
`sample response`
```
{
    username: "user123",
    name: "yourname",
    iat: 123455,
    address: "your address",
    email: "youremail"
}
```
