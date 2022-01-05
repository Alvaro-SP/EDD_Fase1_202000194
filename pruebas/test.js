
// var CircularJSON = CircularJSON || require('circular-json.js');
// var CircularJSON = import('');
class nodo{
    constructor(dato){
        this.dato = dato;
        this.siguiente = null;
        this.anterior = null;
        var pilatemp=localStorage.getItem("pila")
        // pilatemp=JSON.parse(pilatemp)
        // console.log(pilatemp)
        this.pila = new pila();
        Object.assign(this.pila, pilatemp)
    }
}

class listaDoble{
    constructor(obj){
        this.primero = null;
        Object.assign(this, obj || this.primero);
    }

    insertar(dato){
        let nuevo = new nodo(dato,this); 

        if(this.primero == null){ //la lista esta vacia
            this.primero = nuevo;
        }else{
            let aux = this.primero;
            while(aux.siguiente != null){
                if(aux.dato==dato){
                    console.log("el valor ya existe, No se puede insertar");
                    return
                }
                aux = aux.siguiente;
            };
            if(aux.dato==dato){
                console.log("2el valor ya existe, No se puede insertar");
                return
            }
            aux.siguiente = nuevo;
            nuevo.anterior = aux;
        }
    }

    mostrar(){
        let aux = this.primero;
        console.log("***** Mostar Lista *****")
        while(aux != null){
            console.log("* " + aux.dato);
            aux.pila.mostrar_pila();
            aux = aux.siguiente;
        }
    }

    insetar_Pila(dato_lista,valor_insertar){
        let aux= this.primero;
        while(aux!= null){
            if(dato_lista == aux.dato){
                aux.pila.push(valor_insertar);
                // Object.assign(this, obj || this.primero);
                // localStorage.removeItem('pila');
                // localStorage.setItem("pila",CircularJSON.stringify(this))
                console.log("se inserto el valor en la pila de "+aux.dato);
                return 
            }else{
                aux = aux.siguiente;
            }
        }
        console.log("no se encontro el dato en la lista")
        return null;
    }
    insertar_cola(dato_lista,dato_pila,valor_insertar){
        let aux= this.primero;
        while(aux!= null){
            if(dato_lista == aux.dato){
                aux.pila.insertar_cola(dato_pila,valor_insertar);
                // sessionStorage.setItem("pila",JSON.stringify(this))
                console.log("se inserto el valor en la pila de "+aux.dato);
                return 
            }else{
                aux = aux.siguiente;
            }
        }
        console.log("no se encontro el dato en la lista")
        return null;
    }
}

//*****pila */
class nodoPila{
    constructor(dato){
        this.dato = dato;
        this.siguiente=null;
        Object.assign(this, dato || this.dato|| this.siguiente);
    }
}
class pila{
    constructor(obj){
        this.tope=null;
        this.size=0;
        Object.assign(this, obj || this.tope|| this.size);
    }
    push(dato){
        var newpila=localStorage.getItem("pila");
        let nuevo = new nodoPila(dato);
        Object.assign(nuevo,newpila)
        if(this.pila_vacia()){
            this.tope = nuevo;
            this.size++;
        }else{
            let aux = this.tope;
            nuevo.siguiente = aux;
            this.tope = nuevo;
            this.size++;
        }
    }
    pop(){
        let aux = this.tope;
        this.tope = this.tope.siguiente;
        this.size--;
        return aux;
    }
    peek(){
        return this.tope.dato;
    }
    pila_vacia(){
        if(this.tope==null){
            return true;
        }
        return false;
    }
    mostrar_pila(){
        let aux = this.tope;
        //console.log("***** Mostar Pila *****")
        while(aux != null){
            console.log("   -> " + aux.dato);
            // sessionStorage.setItem("cola",JSON.stringify(aux.cola))
            aux = aux.siguiente;
        }
    }

    getSize(){
        return this.size;
    }

    
}
//****************** */


/*********** */

// let lista = new listaDoble();

// lista.insertar(202000166);
// lista.insertar(202000166);
// lista.insertar(202003894);
// lista.insertar(202000194);
// lista.insertar(199701857 );
// lista.insetar_Pila(202000166,10);
// lista.insetar_Pila(202000166,20);
// lista.insetar_Pila(202000166,30);

// lista.insertar_cola(202000166,10,111);
// lista.insertar_cola(202000166,30,333);

// lista.insetar_Pila(199701857,110);
// lista.insetar_Pila(199701857,120);
// lista.insetar_Pila(199701857,130);
// lista.mostrar();
function RegistrarProveedor(){
        var lista_tem = JSON.parse(sessionStorage.getItem("DD"));
        lista = new listaDoble();
        lista_tem = CircularJSON.parse(lista_tem);
        Object.assign(lista,lista_tem);
        let auxiliar = lista.primero;
        while(auxiliar!= null){
            var temp = auxiliar.pila;
            var pilanew = new pila();
            Object.assign(pilanew,temp);
            auxiliar.pila = pilanew;
            auxiliar = auxiliar.siguiente;
        }

        if(lista==null){ 
            var lista= new listaDoble();   
            lista.insertar(202000166);
            lista.insetar_Pila(202000166,10);
            lista.insetar_Pila(202000166,10);
            lista.insetar_Pila(202000166,10);
            var lista_temp = CircularJSON.stringify(lista);
            sessionStorage.setItem("DD",JSON.stringify(lista_temp))
            // localStorage.setItem("DD",CircularJSON.stringify(lista))
        }
        else{  

            lista.insertar(600);
            lista.insetar_Pila(600,110);
            lista.insetar_Pila(600,120);
            lista.insetar_Pila(600,130);
            lista.insetar_Pila(600,130);
            lista.mostrar()
            // localStorage.removeItem('DD');
            var lista_temp = CircularJSON.stringify(lista);
            sessionStorage.setItem("DD",JSON.stringify(lista_temp))
        }        

}
RegistrarProveedor()

// localStorage.clear()
// sessionStorage.clear()