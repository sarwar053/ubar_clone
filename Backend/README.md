
### Routes:
`/users/register`

### Description:
it will take user info and create user object in mongobd database in user collection

### req type:
 - `POST`

### Database(mongodb)
    name:uber-video
    collection:user


### Rquest body:
- #`fullname`(object)
    - `firstname`(string,required):minimum 3 character max 50 character
    - `lastname`(string,optional):minimum 3 character max 50 character
- #`email`(string,required):valid and unique
- #`password`(string,required):minimum 6 character

### Response 

- `user`(object)
    - `fullname`(object)
       - `firstname`(string)
       - `lastname`(string)
    - `email`(string)
    - `password`(string)

- `token`(sting):JWT Token