insert into users (first_name, last_name, email, username, password, image)
values ($1, $2, $3, $4, $5, $6)
returning *;