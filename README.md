# Rutas

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
  "cantidadConseguida": 0,
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
  "cantidadConseguida": 0,
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
