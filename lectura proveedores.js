// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
    
console.log("Welcome to Programiz!");
const ROLES = {
    "proveedores":
    [
    {
    "id":1,
    "nombre":"proveedor1",
    "direccion": "ciudad",
    "telefono":59595959,
    "correo": "proveedor1@gmail.com"
    },
    {
    "id":2,
    "nombre":"proveedor2",
    "direccion": "ciudad",
    "telefono":55550000,
    "correo": "proveedor2@gmail.com"
    },
    {
    "id":3,
    "nombre":"proveedor3",
    "direccion": "ciudad",
    "telefono":51515151,
    "correo": "proveedor3@gmail.com"
    }
    ]
    }
ROLES.proveedores.forEach(function(items) {
  console.log('*********************')
  console.log('-->',items.id);
  console.log('-->',items.nombre);
  console.log('-->',items.direccion);
  console.log('-->',items.telefono);
  console.log('-->',items.correo);
});
