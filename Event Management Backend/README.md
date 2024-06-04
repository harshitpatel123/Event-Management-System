## React-Nest Project

Permission
-> id, name, is_active, created_at, updated_at, deleted_at

Roles
-> id, name, is_active, created_at, updated_at, deleted_at

Users
-> id, name, email, phone, password, user_type, is_active, created_at, updated_at, deleted_at

Migrations:
typeorm migration:create "./src/database/migrations/<tablename>"

Run Migration Files:
npm run migration:run

Revert Migration Files:
npm run migration:revert

Mailer module:
npm i --save @nestjs/config
npm install -save @nestjs-modules/mailer nodemailer handlebars
