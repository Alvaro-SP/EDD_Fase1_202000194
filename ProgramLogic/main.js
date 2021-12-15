
//*************************************************************************** */
//!---------------------------PROVEEDORES BST-ABB -----------------------------
// CONSTRUYENDO LOS OBJETOS PARA PROVEEDORES
function Proveedoresobj(id, name, adress, tel, mail){
    this.id=id;
    // this.username=username;
    this.name=name;
    this.adress=adress;
    this.tel=tel;
    this.mail=mail;
}
class nodeBST_prov{
    constructor(data){
        this.data 	= data;
		this.derecha 	= null;
		this.izquierda 	= null;
    }
}
class BST_prov{
    constructor(obj) {
		this.head = null;
        this.dot = '';
        Object.assign(this, obj || this.head || this.dot);
	}
    //**METODO INSERTAR PARA BST */
    insert(data) {
        if (this.head != null){
            this.insertNode(data, this.head);
        }else{
            this.head = new nodeBST_prov(data);
        }
    }
    insertNode(data, tmphead) {
        if (data.id < tmphead.data.id) {
            if (tmphead.izquierda != null) {
                this.insertNode(data,tmphead.izquierda);
            }
            else{
                tmphead.izquierda = new nodeBST_prov(data);
            } ;
        } else {
            if (tmphead.derecha != null){
                this.insertNode(data,tmphead.derecha);
            }else{
                tmphead.derecha = new nodeBST_prov(data);
            };
        }
    }
    //! BUSCAR UN PROVEEDOR POR SU ID
    searchProveedor(id){        
        if(this.head!=null){
            return this.searchaux(id,this.head);
        }
    }
    searchaux(id, tmphead){        
        // document.getElementById("log").innerHTML+=tmphead.data+' '
        if (tmphead.data.id===id){
            return tmphead.data
        }
        if (id < tmphead.data.id) {
            if(tmphead.izquierda!=null){
                return this.searchaux(id, tmphead.izquierda);
            }            
        } else if (id > tmphead.data.id) {
            if(tmphead.derecha!=null){
            return this.searchaux(id, tmphead.derecha);
            }
        } else {
            return tmphead.data;
        }
        return null;
    }
    //! SABER SI EXISTE UN PROVEEDOR EN EL ARBOL POR SU ID
    intree(id){        
        if(this.head!=null){
            return this.intreeaux(id,this.head);
        }
    }
    intreeaux(id, tmphead){        
        // document.getElementById("log").innerHTML+=tmphead.data+' '
        if (tmphead.data.id==id){
            return true
        }
        if (id < tmphead.data.id) {
            if(tmphead.izquierda!=null){
                return this.intreeaux(id, tmphead.izquierda);
            } 
        } else if (id > tmphead.data.id) {
            if(tmphead.derecha!=null){
                return this.intreeaux(id, tmphead.derecha);
                }
        } else {
            return false
        }
        return false;
    }
    //? Los siguientes métodos son solamente para mostrar los distintos tipos 
    //?de recorridos que existen.
    //**METODO PREORDEN PARA BST */
    preorderBST(tmphead) {
        if (tmphead != null) {
            // document.getElementById("log").innerHTML+=tmphead.data+' '
            console.log(tmphead.data.id);
            this.preorderBST(tmphead.izquierda);
            this.preorderBST(tmphead.derecha);
        }
    }
    //**METODO IN ORDEN PARA BST */
    inorderBST(tmphead) {
        if (tmphead != null) {
            this.inorderBST(tmphead.izquierda)
            // document.getElementById("log").innerHTML+=tmphead.data+' '
            console.log(tmphead.data.id);
            this.inorderBST(tmphead.derecha)
        }

    }
    //**METODO POSTORDEN PARA BST */
    postorderBST(tmphead) {
        if (tmphead != null) {
            this.postorderBST(tmphead.izquierda)
            this.postorderBST(tmphead.derecha)
            // document.getElementById("log").innerHTML+=tmphead.data+' '
            console.log(tmphead.data.id);
        }
    }
    genNodos(tmphead){//preorden
        let nodos = "";
        if(tmphead!=null){
            nodos+=tmphead.data.id
            nodos+="[label = \""+tmphead.data.id+"\n"+tmphead.data.name+"\n"+tmphead.data.adress+"\n"+tmphead.data.tel+"\n"+tmphead.data.mail+"\"];\n"
            nodos+=this.genNodos(tmphead.izquierda);
            nodos+=this.genNodos(tmphead.derecha);
        } 
        return nodos;
    }
    enlazar(tmphead) {
        if (tmphead != null) {
            if (tmphead.izquierda != null) {
                this.dot += tmphead.data.id+'--'+tmphead.izquierda.data.id+';'
                // this.dot += tmphead.data.id+'--'+tmphead.izquierda.data.id+'[label = \"'+tmphead.izquierda.data.id+'\\n'+tmphead.izquierda.data.name+'\\n'+tmphead.izquierda.data.adress+'\\n'+tmphead.izquierda.data.tel+'\\n'+tmphead.izquierda.data.mail+'\"]'+';'
            }
            if (tmphead.derecha != null) {
                // this.dot += tmphead.data.id+'[label = \"'+tmphead.data.id+'\\n'+tmphead.data.name+'\\n'+tmphead.data.adress+'\\n'+tmphead.data.tel+'\n'+tmphead.data.mail+'\"]'+'--'+tmphead.derecha.data.id+'[label = \"'+tmphead.derecha.data.id+'\\n'+tmphead.derecha.data.name+'\\n'+tmphead.derecha.data.adress+'\\n'+tmphead.derecha.data.tel+'\\n'+tmphead.derecha.data.mail+'\"]'+';'
                this.dot += tmphead.data.id+'--'+tmphead.derecha.data.id+';'
            }
            this.enlazar(tmphead.izquierda)
            this.enlazar(tmphead.derecha)
        }
    }
    dotgen(tmphead){
        // let cadena="digraph arbol {\n";
        this.dot +=this.genNodos(tmphead);
        this.enlazar(tmphead)
        // this.dot +="}"
        // console.log(this.dot)


    }
    serialize() {
        return JSON.stringify(this)
      }
}
//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ CHART OF PROVEEDORES ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function networkProveedores() {
    Proveedoresg=sessionStorage.getItem("BST")
    Proveedoresg=JSON.parse(Proveedoresg)
    var Proveedoresg = new BST_prov(Proveedoresg);
    Proveedoresg.dot = '{'
    if (Proveedoresg.head!=null){
        // Proveedoresg.genNodos(Proveedoresg.head)
        Proveedoresg.dotgen(Proveedoresg.head)        
    }
    
    Proveedoresg.dot += '}'
    
    return Proveedoresg.dot
}
//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ REGISTER OF PROVEEDORES ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function RegistrarProveedor(){
    var idi=document.getElementById("idi").value;
    var username=document.getElementById("username").value;
    var name=document.getElementById("nombre").value;
    var adress=document.getElementById("direccion").value;
    var tel=document.getElementById("tel").value;
    var mail=document.getElementById("correo").value;
    
    // Proveedoresg=localStorage.getItem("BST")
    if(username!="" && idi!=""&& name!=""&& adress!=""&& tel!=""&& mail!=""){
        var add = new Proveedoresobj(parseInt(idi), name, adress, tel, mail );

        Proveedoresg=sessionStorage.getItem("BST")
        Proveedoresg=JSON.parse(Proveedoresg)
        var Proveedoresg = new BST_prov(Proveedoresg);
        if(Proveedoresg==null){ 
            var Proveedoresg= new BST_prov();           
            Proveedoresg.insert(add)
            sessionStorage.setItem("BST",JSON.stringify(Proveedoresg))
            alert("1. El Proveedor se ha ingresado correctamente")
            return
        }
        else if(Proveedoresg.intree(parseInt(idi))){
            alert("El id del Proveedor ya existe en el sistema.")
        }
        else{
            // Proveedoresg=JSON.parse(localStorage.getItem("BST"))
            Proveedoresg.insert(add)
            sessionStorage.setItem("BST",JSON.stringify(Proveedoresg))
            alert("El Proveedor se ha ingresado correctamente")
        }
        console.log("*********Lista de Proveedores*********")
        Proveedoresg.inorderBST(Proveedoresg.head);
    }else{
        alert("Rellene todos los campos")
    }
    
}
//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ MASSIVE CHARGE OF PROVEEDORES ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function cargaProveedor(){
    var input = document.getElementById('upload-json')
    // code = document.getElementById('code');
    //la tipica lectura de un JSON 
    
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var json;
        tempstring=String(e.target.result)
        //se parsea.
        // json = JSON.parse(e.target.result);
        json = JSON.parse(tempstring);
        console.log(json)
        var idi =    ""
        var name=   ""
        var adress= ""
        var tel=    ""
        var mail=   ""
        json.proveedores.forEach(function(items) {
            console.log('*********************');
            console.log('-->',items.id);
            console.log('-->',items.nombre);
            console.log('-->',items.direccion);
            console.log('-->',items.telefono);
            console.log('-->',items.correo);
            idi=items.id
            name=items.nombre
            adress=items.direccion
            tel=items.telefono
            mail=items.correo
            var add = new Proveedoresobj(parseInt(idi),name,adress,tel,mail);
            Proveedoresg=sessionStorage.getItem("BST") ;           
            Proveedoresg=JSON.parse(Proveedoresg);
            var Proveedoresg = new BST_prov(Proveedoresg);
            if(Proveedoresg==null){ 
                var Proveedoresg= new BST_prov();           
                Proveedoresg.insert(add);
                sessionStorage.setItem("BST",JSON.stringify(Proveedoresg));
                
            }else if(Proveedoresg.intree(parseInt(idi))){
                alert("El id del Proveedor ya existe en el sistema.");
            }
            else{
                Proveedoresg.insert(add);
                sessionStorage.setItem("BST",JSON.stringify(Proveedoresg));
            }
          });


    };
    alert("Se han cargado los Proveedores Correctamente.!!")
    reader.readAsText(file);
    
}

function testBST(){
    var prov1= new Proveedoresobj(1,"Alvaro","Guatemala","57707472","socop2412@gmail.com");
    var prov2= new Proveedoresobj(2,"Emmanuel","Israel","57707472","Ema2412@gmail.com");
    var bst = new BST_prov();
    bst.insert(prov1)
    bst.insert(prov2)
    // document.getElementById("log").innerHTML+='Preorder:  '
    console.log(" ** PREORDEN BST PROVEEDORES **")
    bst.preorderBST(bst.head);
    // document.getElementById("log").innerHTML+='<br>Inorder:   '
    console.log(" ** INORDEN BST PROVEEDORES **")
    bst.inorderBST(bst.head);
    // document.getElementById("log").innerHTML+='<br>Postorder: '
    console.log(" ** POSTORDEN BST PROVEEDORES **")
    bst.postorderBST(bst.head);
    console.log(" ** DOT **")
    bst.dot = '{'
    bst.dotgen(bst.head)
    bst.dot += '}'
    console.log(bst.dot)
    console.log(" ** Buscar por ID **")
    bst.searchProveedor(0)
    bst.intree()
    // var found =bst.searchNode(2,bst.head);


    

}
// testBST()

//*************************************************************************** */
//!---------------------------VENDEDORES AVL -----------------------------
function Vendedoresobj(id, username, name, edad, mail, pass){
    this.id=id;
    this.username=username;
    this.name=name;
    this.edad=edad;
    this.mail=mail;
    this.pass=pass;
}







//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ REGISTER OF VENDEDORES ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function RegistrarVendedor(){
    var idi=document.getElementById("idi").value;
    var username=document.getElementById("username").value;
    var name=document.getElementById("nombre").value;
    var adress=document.getElementById("direccion").value;
    var tel=document.getElementById("tel").value;
    var mail=document.getElementById("correo").value;
    
    // Proveedoresg=localStorage.getItem("BST")
    if(username!="" && idi!=""&& name!=""&& adress!=""&& tel!=""&& mail!=""){
        var add = new Vendedoresobj(parseInt(idi), username, name, adress, tel, mail );
        Proveedoresg=sessionStorage.getItem("BST")
        Proveedoresg=JSON.parse(Proveedoresg)
        var Proveedoresg = new BST_prov(Proveedoresg);
        if(Proveedoresg==null){ 
            var Proveedoresg= new BST_prov();           
            Proveedoresg.insert(add)
            sessionStorage.setItem("BST",JSON.stringify(Proveedoresg))
            alert("1. El Proveedor se ha ingresado correctamente")
            return
        }
        else if(Proveedoresg.intree(parseInt(idi))){
            alert("El id del Proveedor ya existe en el sistema.")
        }
        else{
            // Proveedoresg=JSON.parse(localStorage.getItem("BST"))
            Proveedoresg.insert(add)
            sessionStorage.setItem("BST",JSON.stringify(Proveedoresg))
            alert("El Proveedor se ha ingresado correctamente")
        }
        console.log("*********Lista de Proveedores*********")
        Proveedoresg.inorderBST(Proveedoresg.head);
    }else{
        alert("Rellene todos los campos")
    }
    
}
//*************************************************************************** */
//!---------------------------CLIENTES LISTA DOBLE -----------------------------
//! LISTA DOBLEMENTE ENLAZADA
function Clienteobj(id, idsale, name, mail){
    this.id=id;
    this.idsale=idsale;
    this.name=name;
    this.mail=mail;
}
//* Clase Nodo (CONSTRUCTOR)
class nodeLD_client{
    constructor(data,next,prev){
        this.data=data;
        this.next=next;
        this.prev=prev;
    };
};
//* Clase Lista Enlazada (CONSTRUCTOR)
class LD_client{
    constructor(){
        this.head = null; //primera parte de la lista
        this.cola = null; //ultima parte de la lista
        this.size = 0;
    };
    //!AGREGAR VALORES EN LA CABEZA DE LA LISTA
    insert(data){
        const newNode = new nodeLD_client(data, this.head, null);
        if(this.head){
            newNode.next=this.head;
            this.head.prev=newNode; //valor anterior a cabeza es el nuevo nodo
            this.head=newNode;// la cabeza de la lista será el nuevo nodo
        }else{
            this.head=newNode; //tanto la cabeza y la cola hacen referencia al mismo nodo cuando esta vacia la lista
            this.cola=newNode;
        };
        this.size++; //aumenta el tamaño de la lista.
        return null;
    };
    //!AGREGAR VALORES EN LA COLA DE LA LISTA
    addtoCola(data){
        const newNode = new nodeLD_client(data, null, this.cola);
        if(this.cola){
            newNode.prev=this.cola; //nodo anterior es la cola
            this.cola.next=newNode; //valor anterior a cola es el nuevo nodo
            this.cola=newNode;// la cola de la lista será el nuevo nodo
        }else{
            this.head=newNode; //tanto la cabeza y la cola hacen referencia al mismo nodo cuando esta vacia la lista
            this.cola=newNode;
        };
        this.size++; //aumenta el tamaño de la lista.
        return null;
    };
    //!AGREGAR EN UN LUGAR EN ESPECÍFICO
    insertAt(data, index){
        if(index<0 || index>this.size){
            return null;
        };
        const newNode = new nodeLD_client(data, null, null);
        let actual = this.head; //cabeza
        let previous;

        if (index===0){
            newNode.next = actual; //valor siguiente del nuevo nodo es la cabeza
            current.prev=newNode
            this.head=newNode;

        }else{
            for(let i=0; i<index; i++){
                previous = actual; //anterior es igual al actual
                actual = actual.next;//el valor actual es igual al valor siguiente
            };
            newNode.next=actual; //el valor siguiente del nodo es el actual
            newNode.prev=previous;//el anterior de nuevo nodo es el anterior
            actual.prev=newNode;//el valor anterior del actual es el nuevo nodo
            previous.next=newNode; //valor siguiente del anterior es el nuevo nodo
        };
        this.size++;
    };
    //!REMOVER UN ELEMENTO DE LA LISTA BASADO EN DATA
    removeData(data){
        let current = this.head;
        let previous = null;
        while(current!=null){
            if(current.data.id===data){
                if(!previous){
                    return this.removeHead();

                }else if(!current.next){
                    return this.removeCola();
                }else{
                    previous.next=current.next;
                    current.next.prev=previous;
                };
                this.size--;
                return current.data;
            };
            previous=current;
            current=current.next;
        };
        return null;
    };
    //!REMOVER VALOR DE LA CABEZA
    removeHead(){
        if(!this.head){
            return null;
        };
        const valueToReturn = this.head.data;
        if(this.head===this.cola){
            this.head=null;
            this.tail=null;
        }else{
            this.head=this.head.next;
            this.head.prev=null;

        };
        this.size--;
        return valueToReturn;
    };
    // ! REMOVER COLA
    removeCola(){
        if(!this.cola){
            return null;
        };
        const valueToReturn=this.cola.data;
        if(this.head===this.cola){
            this.head=null;
            this.cola=null;
        }else{
            this.cola=this.cola.prev;
            this.cola.next=null
        };
        this.size--;
        return valueToReturn;
    };
    //! BUSCAR POR ID
    searchClient(id){
        let current = this.head;
        let previous = null;
        while(current!=null){
            if(current.data.id===id){                
                return current.data;
            };
            previous=current;
            current=current.next;
        };
        return null;
    }
    //! BUSCAR SI ID EXISTE EN LA LISTA DOBLE
    inlist(id){
        let current = this.head;
        let previous = null;
        while(current!=null){
            if(current.data.id===id){                
                return true;
            };
            previous=current;
            current=current.next;
        };
        return false;
    }
    //!REVISAR SI LA LISTA ESTA VACÍA
    isEmpty(){
        return this.size === 0;
        // if(this.size===0){
        //     return true;
        // }else{
        //     return false;
        // };
    };
    getSize(){
        return this.size;
    };
    //!FUNCIÓN IMPRIMIR
    mostrar(){
        
        let current = this.head;
        let result= '';
        while(current){
            result += current.data.id+' <-> ';
            current=current.next;
        };
        return result+= 'X';
    };
    //!FUNCIÓN IMPRIMIR AL REVERSO
    reverseprint(){
        let current = this.cola;
        let result='';
        while(current){
            result += current.data + '<->';
            current=current.prev;
        };
        return result +='X';
    };
};

function testLD(){
    var c1= new Clienteobj(1,1,"Alvaro","socop2412@gmail.com");
    var c2= new Clienteobj(2,1,"Emmanuel","Ema2412@gmail.com");
    var ld = new LD_client();
    ld.insert(c1)
    ld.insert(c2)
    console.log(" ** CLIENTES **")
    ld.mostrar()
    ld.searchClient(2)
    console.log(" ** Buscar por ID **")

}

//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ REGISTER OF CLIENTES DE LOS VENDEDORES ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function RegistrarCliente(){
    var idi=document.getElementById("idi").value;
    var name=document.getElementById("nombre").value;
    var mail=document.getElementById("correo").value;
    var idVendedor=sessionStorage.getItem("idVendedor")
    // Proveedoresg=localStorage.getItem("BST")
    if( idi!=""&& name!=""&& mail!=""){
        var add = new Clienteobj(parseInt(idVendedor),parseInt(idi), name, mail );

        Proveedoresg=sessionStorage.getItem("BST")
        Proveedoresg=JSON.parse(Proveedoresg)
        var Proveedoresg = new BST_prov(Proveedoresg);
        if(Proveedoresg==null){ 
            var Proveedoresg= new BST_prov();           
            Proveedoresg.insert(add)
            sessionStorage.setItem("BST",JSON.stringify(Proveedoresg))
            alert("1. El Proveedor se ha ingresado correctamente")
            return
        }
        else if(Proveedoresg.intree(parseInt(idi))){
            alert("El id del Proveedor ya existe en el sistema.")
        }
        else{
            // Proveedoresg=JSON.parse(localStorage.getItem("BST"))
            Proveedoresg.insert(add)
            sessionStorage.setItem("BST",JSON.stringify(Proveedoresg))
            alert("El Proveedor se ha ingresado correctamente")
        }
        console.log("*********Lista de Proveedores*********")
        Proveedoresg.inorderBST(Proveedoresg.head);
    }else{
        alert("Rellene todos los campos")
    }
    
}
//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ MASSIVE CHARGE OF PROVEEDORES ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function cargaProveedor(){
    var input = document.getElementById('upload-json')
    // code = document.getElementById('code');
    //la tipica lectura de un JSON 
    
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var json;
        tempstring=String(e.target.result)
        //se parsea.
        // json = JSON.parse(e.target.result);
        json = JSON.parse(tempstring);
        console.log(json)
        var idi =    ""
        var name=   ""
        var adress= ""
        var tel=    ""
        var mail=   ""
        json.proveedores.forEach(function(items) {
            console.log('*********************');
            console.log('-->',items.id);
            console.log('-->',items.nombre);
            console.log('-->',items.direccion);
            console.log('-->',items.telefono);
            console.log('-->',items.correo);
            idi=items.id
            name=items.nombre
            adress=items.direccion
            tel=items.telefono
            mail=items.correo
            var add = new Proveedoresobj(parseInt(idi),name,adress,tel,mail);
            Proveedoresg=sessionStorage.getItem("BST") ;           
            Proveedoresg=JSON.parse(Proveedoresg);
            var Proveedoresg = new BST_prov(Proveedoresg);
            if(Proveedoresg==null){ 
                var Proveedoresg= new BST_prov();           
                Proveedoresg.insert(add);
                sessionStorage.setItem("BST",JSON.stringify(Proveedoresg));
                
            }else if(Proveedoresg.intree(parseInt(idi))){
                alert("El id del Proveedor ya existe en el sistema.");
            }
            else{
                Proveedoresg.insert(add);
                sessionStorage.setItem("BST",JSON.stringify(Proveedoresg));
            }
          });


    };
    alert("Se han cargado los Proveedores Correctamente.!!")
    reader.readAsText(file);
    
}
// testLD()

// sessionStorage.clear()
