
### 1.Routes:
`/users/register`

### Description:
it will take user info and create user object in mongobd database in user collection

### req type:
 - `POST`

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




### 2.Routes:
`/users/login`

### Description:
it will take user email and password and user can login 
### req type:
 - `POST`

### Rquest body:
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