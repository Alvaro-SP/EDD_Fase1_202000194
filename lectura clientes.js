// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
    
console.log("Welcome to Programiz!");
    
console.log("Welcome to Programiz!");
const ROLES = {
        "vendedores":
        [
        {
        "id":1,
        "clientes":[
        {
        "id":1,
        "nombre":"cliente1",
        "correo":"cliente1@gmail.com"
        },
        {
        "id":2,
        "nombre":"cliente2",
        "correo":"cliente2@gmail.com"
        },
        {
        "id":3,
        "nombre":"cliente3",
        "correo":"cliente3@gmail.com"
        }
        ]
        },
        {
        "id":2,
        "clientes":[
        {
        "id":1,
        "nombre":"cliente1",
        "correo":"cliente1@gmail.com"
        },
        {
        "id":2,
        "nombre":"cliente2",
        "correo":"cliente2@gmail.com"
        }
        ]
        }
        ]
        }
ROLES.vendedores.forEach(function(items) {
    console.log('*********************')
  console.log('-->',items.id);
  items.clientes.forEach(function(item){
      console.log('   ------>', item.id)
      console.log('   --->', item.nombre)
      console.log('   --->', item.correo)
  });
});