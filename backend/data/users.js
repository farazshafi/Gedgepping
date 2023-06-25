import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Faraz Shafi',
    email: 'farazpachu777@gmail.com',
    password: bcrypt.hashSync('PachuGedgepping@123#&*$', 10),
  },
  {
    name: 'test',
    email: 'test@example.com',
    password: bcrypt.hashSync('test', 10),
  },
]

export default users