# Instalar y Correr el código

## Configurando las variables de entorno

### En la carpeta de Frontend, crear un archivo llamado ".env.local":
```.env
JWT_SECRET = [string aleatorio]
NEXT_PUBLIC_SERVER_URL = "http://localhost:3000/"
```

### En la carpeta de Backend, crear un ".env":

```.env
JWT_SECRET = [mismo string aleatorio]
NEXT_PUBLIC_SERVER_URL = "http://localhost:3000/"
MYSQL_PASSWORD = [contraseña de la DB]
GEMINI_API_KEY = [private key de Gemini]
```

### Para conseguir una llave de Gemini, dirigirse a https://aistudio.google.com/app

## Descargando las dependencias requeridas
### Utilizando una terminal, correr "npm i" en @/
### Luego, correr "cd .\frontend\" y "npm i" nuevamente.

## Correr el programa
### Para correr el backend, ir a @/backend y correr "npx nodemon"
### Para correr el frontend, ir a @/frontend y correr "npx nodemon .\server.js"

# Rutas de Back-end

## Usuarios

### /register
- **Método**: <span style="color: yellow"> **POST** </span>
- **Body**:
```json
{
  "nombre": "string",
  "tag": "string",
  "contraseña": "string"
}
```
- **Descripción**: Registrar un usuario

### /login
- **Método**: <span style="color: yellow"> **POST** </span>
- **Body**:
```json
{
  "tag": "string",
  "contraseña": "string"
}
```
- **Descripción**: Iniciar sesión

### /usuarios
- **Método**: <span style="color: lime"> **GET** </span>
- **Descripción**: Obtiene todos los usuarios\
**Nota**: ***Requiere permisos de administrador***


### /usuarios/:tag
- **Método**: <span style="color: lime"> **GET** </span>
- **Descripción**: Obtiene un solo usuario según su tag


### /usuarios/:tag
- **Método**: <span style="color: cornflowerblue"> **PUT** </span>
- **Body**:
```json
{
  "tag": "string",
  "nombre": "string"
}
```
- **Descripción**: Actualiza un usuario según los datos proporcionados

### /usuarios/:tag
- **Método**: <span style="color: red"> **DELETE** </span>
- **Descripción**: Elimina un usuario según su tag

## Listas

### /listas
- **Método**: <span style="color: lime"> **GET** </span>
- **Descripción**: Obtiene todas las listas del usuario

### /listas/:id
- **Método**: <span style="color: lime"> **GET** </span>
- **Descripción**: Obtiene el nombre, descripcion e items de una lista

### /listas
- **Método**: <span style="color: yellow"> **POST** </span>
- **Body**:
```json
{
  "nombre": "string",
  "descripcion": "string"
}
```
- **Descripción**: Crea una lista para el usuario

### /listas/:id
- **Método**: <span style="color: cornflowerblue"> **PUT** </span>
- **Body**:
```json
{
  "nombre": "string",
  "descripcion": "string"
}
```
- **Descripción**: Actualiza una lista

### /listas/:id
- **Método**: <span style="color: red"> **DELETE** </span>
- **Descripción**: Elimina una lista

### /listas/:id/obtenerCompartidos
- **Método**: <span style="color: lime"> **GET** </span>
- **Descripción**: Obtiene los usuarios con los cuales la lista fue compartida

### /listas/:id/compartir
- **Método**: <span style="color: yellow"> **POST** </span>
- **Descripción**: Comparte una lista a un usuario según su tag
- **Body**:
```json
{
  "tag": "string"
}
```
### /listas/:id/compartir
- **Método**: <span style="color: red"> **DELETE** </span>
- **Descripción**: Elimina a un usuario de la lista de compartidos de una lista según su tag
- **Body**:
```json
{
  "tag": "string"
}
```

## Items

### /items
- **Método**: <span style="color: lime"> **GET** </span>
- **Descripción**: Obtiene todos los items

### /items
- **Método**: <span style="color: yellow"> **POST** </span>
- **Body**:
```json
{
  "nombre": "string",
  "marcado": false,
  "cantidadNecesitada": 1,
  "listaId": 123
}
```
- **Descripción**: Crea un item para una lista

### /items/:id
- **Método**: <span style="color: cornflowerblue"> **PUT** </span>
- **Body**:
```json
{
  "nombre": "string",
  "marcado": true,
  "cantidadNecesitada": 1,
  "listaId": 123
}
```
- **Descripción**: Actualiza un item de una lista

### /items/:id
- **Método**: <span style="color: lime"> **GET** </span>
- **Descripción**: Obtiene un solo item según su id

### /items/:id
- **Método**: <span style="color: red"> **DELETE** </span>
- **Descripción**: Elimina un item
