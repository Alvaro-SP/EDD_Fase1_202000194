// var CircularJSON = CircularJSON || require('../ProgramLogic/circular-json.node.js');
// var CircularJSON = import('../circular-json.js');
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
    //! BUSCAR UN PROVEEDOR OBJETO POR SU ID
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
    
    //! ELIMINAR UN PROVEEDOR POR SU ID
    removeProv(id) {
        if (!this.head) {
            return false;
        } else {
            this.head=this.removeProveedor(this.head, id);
        }
    }
    // auxiliar de eliminar
    removeProveedor(tmphead, id) {
        if (!tmphead) {//primero que nada se valida si no esta nulo,
            console.log("es nulo")
            return null;
        }
        
        //luego se ve si es id es menor que el valor del id de la raiz y nos movemos al hijo izquierdo
        if (id < tmphead.data.id) {
            tmphead.izquierda = this.removeProveedor(tmphead.izquierda, id);
            console.log("es menor")
            return tmphead;
        
        // si el valor es mayor que la raiz nos movemos al hijo derecho talcual un recorrido
        } else if (id > tmphead.data.id) {
            tmphead.derecha = this.removeProveedor(tmphead.derecha, id);
            console.log("es mayor")
            return tmphead;
            // encontramos el valor a remover del nodo.
        } else {
            console.log("entrando al else:")
            // si no existen nodos hijos osea llegamos a las hojas entonces toca eliminar ese nodo.
            if (!tmphead.izquierda && !tmphead.derecha) {
                tmphead = null;
                console.log("no hay ni izquierda ni derecha")
                return tmphead;
            }
            //si hay un hijo izquierdo
            // if (tmphead==this.head){}
            if (!tmphead.izquierda) {
                console.log("tiene un hijo izquierdo:")
                tmphead = tmphead.derecha;
                return tmphead;
            //si hay un hijo derecho
            } else if (!tmphead.derecha) {
                console.log("tiene un hijo derecho:")
                tmphead = tmphead.izquierda;
                return tmphead;
            }
            // si tiene los dos hijos nodo
            // se debe obtener el valor minimo del arbol hacia la derecha para asegurar que reemplazaremos el eliminado por ese nodo
            let minRight = this.findNode(tmphead.derecha);
            console.log("si se cambia la cabeza:")
            console.log(minRight)
            tmphead.data = minRight.data
            // ahora solo validamos de que se eliminó el nodo en el cual reemplazamos
            tmphead.derecha = this.removeProveedor(tmphead.derecha, minRight.data.id);
            return tmphead;
        }
    }//buscar el nodo mas a la izquierda
    findNode(tmphead) {
        console.log("entrando a buscarel nodo a borrar:")
        if (!tmphead.izquierda) {
            console.log("ya no hay mas a la izquierda:")
          return tmphead
        } else {
          return this.findNode(tmphead.izquierda)
        }
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
                this.dot += tmphead.data.id+'->'+tmphead.izquierda.data.id+';'
                // this.dot += tmphead.data.id+'--'+tmphead.izquierda.data.id+'[label = \"'+tmphead.izquierda.data.id+'\\n'+tmphead.izquierda.data.name+'\\n'+tmphead.izquierda.data.adress+'\\n'+tmphead.izquierda.data.tel+'\\n'+tmphead.izquierda.data.mail+'\"]'+';'
            }
            if (tmphead.derecha != null) {
                // this.dot += tmphead.data.id+'[label = \"'+tmphead.data.id+'\\n'+tmphead.data.name+'\\n'+tmphead.data.adress+'\\n'+tmphead.data.tel+'\n'+tmphead.data.mail+'\"]'+'--'+tmphead.derecha.data.id+'[label = \"'+tmphead.derecha.data.id+'\\n'+tmphead.derecha.data.name+'\\n'+tmphead.derecha.data.adress+'\\n'+tmphead.derecha.data.tel+'\\n'+tmphead.derecha.data.mail+'\"]'+';'
                this.dot += tmphead.data.id+'->'+tmphead.derecha.data.id+';'
            }
            this.enlazar(tmphead.izquierda)
            this.enlazar(tmphead.derecha)
        }
    }
    dotgen(tmphead){
        // let cadena="digraph arbol {\n";
        this.dot +=this.genNodos(tmphead);
        this.enlazar(tmphead)
        return this.dot
        // this.dot +="}"
        // console.log(this.dot)
    }
    serialize() {
        return JSON.stringify(this)
      }
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
//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ DELETE OF PROVEEDORES ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function deleteProveedor(){
    var idi=document.getElementById("idi").value;
    if(idi!=""){
        Proveedoresg=sessionStorage.getItem("BST")
        Proveedoresg=JSON.parse(Proveedoresg)
        var Proveedoresg = new BST_prov(Proveedoresg);
        if(Proveedoresg!=null){ 
            if(Proveedoresg.intree(parseInt(idi))){
                console.log("antes de borrar")
                console.log(Proveedoresg)
                Proveedoresg.removeProv(parseInt(idi))
                // console.log(Proveedoresg.removeProv(parseInt(idi)))
                console.log("despues de borrar")
                console.log(Proveedoresg)
                sessionStorage.setItem("BST",JSON.stringify(Proveedoresg))
                alert("El Proveedor se ha eliminado correctamente")
                return
            }else{
                alert("El Proveedor no se encuentra en el sistema.")
            }
        }
        else{
            alert("Aun no hay Proveedores")
        }
        // console.log("*********Lista de Proveedores*********")
        // Proveedoresg.inorderBST(Proveedoresg.head);
    }else{
        alert("Favor ingresar un ID")
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
                console.log("El id del Proveedor ya existe en el sistema.");
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
//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ CHART OF PROVEEDORES ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function networkProveedores() {
    Proveedoresg=sessionStorage.getItem("BST")
    Proveedoresg=JSON.parse(Proveedoresg)
    var Proveedoresg = new BST_prov(Proveedoresg);
    
    var dotfortext= "digraph Chart";
    // dotfortext+= "node[shape = box,fillcolor=\"yellow\" color=\"black\" style=\"filled\"];\n";
    
    Proveedoresg.dot = '{'
    if (Proveedoresg.head!=null){
        // Proveedoresg.genNodos(Proveedoresg.head)
        Proveedoresg.dotgen(Proveedoresg.head)        
    }
    
    Proveedoresg.dot += '}'
    dotfortext+=Proveedoresg.dot
    // return Proveedoresg.dot
     // create a network
    document.getElementById("textar").value = dotfortext;
    var container = document.getElementById("mynetwork");
    var DOTstring = Proveedoresg.dot
    
    // var DOTstring = "{1_Alvaro [label = \"Estructuras\nHola\nPrueba\nsocop2412@gmail.com\"];\n 1_Alvaro--2_Alvaro;2_Alvaro--3_Alvaro;}"
    
    console.log(DOTstring)
    // console.log("Holaa esta es una prueba.")

    var parsedData = vis.parseDOTNetwork(DOTstring);
    var data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    }
    var options = {
        nodes: {
            shape: 'box',
            borderWidth: 2,                
            color:"yellow",
        },        
        layout: {
            hierarchical: {
                levelSeparation: 150,
                nodeSpacing: 190,
                parentCentralization: true,
                direction: 'UD',        // UD, DU, LR, RL
                sortMethod: 'directed',  // hubsize, directed
                shakeTowards: 'roots'  // roots, leaves                        
            },
        },                        
    };
    var network = new vis.Network(container, data, options);
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



//*************************************************************************** */
//!---------------------------VENDEDORES AVL -----------------------------
//TODO ------------------OBJETO VENDEDORES-------------
function Vendedoresobj(id, username, name, edad, mail, pass){
    this.id=id;
    this.username=username;
    this.name=name;
    this.edad=edad;
    this.mail=mail;
    this.pass=pass;
}
//! ÁRBOL AVL DE LOS VENDEDORES
class nodeAVL{
    constructor(data){
        this.data = data;
        this.izquierda = null;
        this.derecha = null;
        this.altura = 0;
        this.cliente=new LD_client();
        this.mes=new LD_Month();
    }
}
class AVL_vend{
    constructor(){
        this.head = null;
    }

    insertar(valor){
        console.log(valor.id)
        
            let nuevo = new nodeAVL(valor);

            if(this.head == null){
                this.head= nuevo;
            }else{
                if(!this.intree(valor.id)){
                    this.head = this.insertar_nodo(this.head,nuevo);
                }else{
                    console.log("este valor ya se encuentra en el sistema.")
                }
            }
        
        
    }

    insertar_nodo(raiz_actual,nuevo){
        if(raiz_actual != null){
            //recorrer hijos
            if(raiz_actual.data.id > nuevo.data.id){
                raiz_actual.izquierda = this.insertar_nodo(raiz_actual.izquierda,nuevo);
                //validaciones
                
                if(this.altura(raiz_actual.derecha)-this.altura(raiz_actual.izquierda)==-2){
                    console.log("entra a rotacion IZQUIERDA");
                    //if(this.altura(raiz_actual.izq.der)-this.altura(raiz_actual.izq.izq))
                    if(nuevo.data.id < raiz_actual.izquierda.data.id){ //-1 ROTACION IZQUIERDA
                        console.log("entra a rotacion IZQUIERDA IZQUIERDA");
                        raiz_actual = this.r_izquierda(raiz_actual);
                    }else{ //1 ROTACION IZQ-DERECHA
                        console.log("entra a rotacion IZQUIERDA DERECHA");
                        raiz_actual = this.r_izq_der(raiz_actual);
                    }
                }
            }else if(raiz_actual.data.id < nuevo.data.id){
                raiz_actual.derecha = this.insertar_nodo(raiz_actual.derecha,nuevo);
                //validaciones
                if(this.altura(raiz_actual.derecha)-this.altura(raiz_actual.izquierda)==2){
                    // console.log("entra a rotacion DERECHA");
                    if(nuevo.data.id > raiz_actual.derecha.data.id){ // 1 ROTACION DERECHA
                        // console.log("entra a rotacion DERECHA DERECHA");
                        raiz_actual=this.r_derecha(raiz_actual);
                    }else{//-1 ROTACION DERECHA IZQUIERDA
                        // console.log("entra a rotacion DERECHA IZQUIERDA");
                        raiz_actual = this.r_der_izq(raiz_actual);
                    }
                }

            }else{
                console.log("NO SE PUEDE INSERTAR EL DATO PORQUE YA EXISTE");
            }

            raiz_actual.altura = this.altura_maxima(this.altura(raiz_actual.derecha),this.altura(raiz_actual.izquierda))+1;
            return raiz_actual;
        }else{
            raiz_actual = nuevo;
            return raiz_actual;
        }
    }
    //! BUSCAR UN VENDEDOR POR SU ID
    searchVendedor(id){        
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
            return null;
        }
        return null;
    }
    
    //! BUSCAR LOS CLIENTES DE UN VENDEDOR POR SU ID
    searchClients(id){        
        if(this.head!=null){
            return this.searchClientsaux(id,this.head);
        }
    }
    searchClientsaux(id, tmphead){        
        // document.getElementById("log").innerHTML+=tmphead.data+' '
        if (tmphead.data.id===id){

            console.log(tmphead.data.id)
            return tmphead
        }
        if (id < tmphead.data.id) {
            if(tmphead.izquierda!=null){
                return this.searchClientsaux(id, tmphead.izquierda);
            }            
        } else if (id > tmphead.data.id) {
            if(tmphead.derecha!=null){
            return this.searchClientsaux(id, tmphead.derecha);
            }
        } else {
            return null;
        }
        return null;
    }
    //! SABER SI EXISTE UN VENDEDOR EN EL ARBOL POR SU ID
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
    //! SABER SI EXISTE UN CLIENTE EN UN VENDEDOR DADOS SUS ID's
    intreeClient(idvend, idclient){        
        if(this.head!=null){
            return this.intreeClientaux(idvend, idclient,this.head);
        }
    }
    intreeClientaux(id, idclient,tmphead){        
        // document.getElementById("log").innerHTML+=tmphead.data+' '
        // console.log(tmphead)
        if (tmphead.data.id == id){
            if(tmphead.cliente.isinList(idclient)){
                return true
            }else{
                return false
            }
            
        }
        if (id < tmphead.data.id) {
            if(tmphead.izquierda!=null){
                return this.intreeClientaux(id,idclient, tmphead.izquierda);
            } 
        } else if (id > tmphead.data.id) {
            if(tmphead.derecha!=null){
                return this.intreeClientaux(id,idclient, tmphead.derecha);
                }
        } else {
            return false
        }
        return false;
    }
    //! BUSCAR UN PROVEEDOR POR SU ID
    searchTODOVendedor(id){        
        if(this.head!=null){
            return this.searchTODOVendedoraux(id,this.head);
        }
    }
    searchTODOVendedoraux(id, tmphead){        
        // document.getElementById("log").innerHTML+=tmphead.data+' '
        if (tmphead.data.id===id){
            return tmphead
        }
        if (id < tmphead.data.id) {
            if(tmphead.izquierda!=null){
                return this.searchTODOVendedoraux(id, tmphead.izquierda);
            }            
        } else if (id > tmphead.data.id) {
            if(tmphead.derecha!=null){
            return this.searchTODOVendedoraux(id, tmphead.derecha);
            }
        } else {
            return null;
        }
        return null;
    }
    //! INSERTAR EL CLIENTE EN EL VENDEDOR POR SU ID
    insetar_Cliente(id_vendedor,obj_cliente){
        let aux= this.head;
        var tempVendedor=this.searchTODOVendedor(id_vendedor)

        if (tempVendedor!=null){
            //antes que nada valido si el id del vendedor existe en mi arbol AVL
            if(!this.intreeClient(id_vendedor,obj_cliente.id)){
                tempVendedor.cliente.add(obj_cliente)
                console.log("Se ha ingresado el CLIENTE en el Vendedor",tempVendedor.data.id)
                return true
            }
            
            // console.log(this.intree(id_vendedor))
            // if(this.intree(id_vendedor)){
            //     console.log(obj_cliente.id)
            //     if(this.intreeClient(id_vendedor,obj_cliente.id)){
            //         return this.insetar_Clienteaux(id_vendedor,this.head,obj_cliente);
            //     }
                
            // }else{
            //     console.log("el id del vendedor no se encontró")
            //     return null;
            // }
        }
        console.log("No existe un Vendedor con el id ingresado")
        return false
    }

    insetar_Clienteaux(id, tmphead,obj_cliente){        
        if (tmphead.data.id===id){
            tmphead.cliente.add(obj_cliente)
            console.log("se insertó el cliente ",obj_cliente.id," en el id vendedor: ", tmphead.data.id)
            return 
        }
        if (id < tmphead.data.id) {
            if(tmphead.izquierda!=null){
                return this.insetar_Clienteaux(id, tmphead.izquierda,obj_cliente);
            }            
        } else if (id > tmphead.data.id) {
            if(tmphead.derecha!=null){
            return this.insetar_Clienteaux(id, tmphead.derecha,obj_cliente);
            }
        } else {
            return tmphead.data;
        }
        return null;
    }

    //! ELIMINAR EL CLIENTE EN EL VENDEDOR POR SU ID
    delete_Cliente(id_vendedor,idcliente){
        let aux= this.head;
        var tempVendedor=this.searchTODOVendedor(id_vendedor)

        if (tempVendedor!=null){
            //antes que nada valido si el id del vendedor existe en mi arbol AVL
            if(this.intreeClient(id_vendedor,idcliente)){
                tempVendedor.cliente.deleteData(idcliente)
                console.log("Se ha eliminado el CLIENTE en el Vendedor",tempVendedor.data.id)
                alert("Se ha eliminado el CLIENTE en el Vendedor",tempVendedor.data.id)
                return true
            }
            
            // console.log(this.intree(id_vendedor))
            // if(this.intree(id_vendedor)){
            //     console.log(obj_cliente.id)
            //     if(this.intreeClient(id_vendedor,obj_cliente.id)){
            //         return this.insetar_Clienteaux(id_vendedor,this.head,obj_cliente);
            //     }
                
            // }else{
            //     console.log("el id del vendedor no se encontró")
            //     return null;
            // }
        }
        console.log("No existe un Vendedor con el id ingresado")
        return false
    }

    delete_Clienteaux(id, tmphead,idcliente){        
        if (tmphead.data.id===id){
            tmphead.cliente.deleteCliente(idcliente)
            console.log("se eliminó el cliente ",idcliente," en el id vendedor: ", tmphead.data.id)
            return 
        }
        if (id < tmphead.data.id) {
            if(tmphead.izquierda!=null){
                return this.delete_Clienteaux(id, tmphead.izquierda,idcliente);
            }            
        } else if (id > tmphead.data.id) {
            if(tmphead.derecha!=null){
            return this.delete_Clienteaux(id, tmphead.derecha,idcliente);
            }
        } else {
            return tmphead.data;
        }
        return null;
    }
    //! SABER SI EXISTE UN MES EN UN VENDEDOR DADOS SUS ID's
    intreemonth(tempVendedor, id_mes){
        console.log(tempVendedor)  
        return tempVendedor.mes.isinListMonth(id_mes)     
        // if(this.head!=null){
        //     return this.intreemonthaux(idvend, id_mes,this.head);
        // }
    }
    intreemonthaux(id, id_mes,tmphead){        
        // document.getElementById("log").innerHTML+=tmphead.data+' '
        // console.log(tmphead)
        if (tmphead.data.id == id){
            if(tmphead.mes.isinListMonth(id_mes)){
                return true
            }else{
                return false
            }
            
        }
        if (id < tmphead.data.id) {
            if(tmphead.izquierda!=null){
                return this.intreemonthaux(id,id_mes, tmphead.izquierda);
            } 
        } else if (id > tmphead.data.id) {
            if(tmphead.derecha!=null){
                return this.intreemonthaux(id,id_mes, tmphead.derecha);
                }
        } else {
            return false
        }
        return false;
    }
    //! BUSCAR EL MES DEL VENDEDOR ACTUAL POR SUS ID's
    // searhVENDEDORMonth(id_mes, tempVendedor){        
    //     if(tempVendedor!=null){
    //         return this.searhVENDEDORMonthaux(id_mes,tempVendedor);
    //     }
    // }
    // searhVENDEDORMonthaux(id,tempVendedor){        
    //     // document.getElementById("log").innerHTML+=tmphead.data+' '
    //     if (tempVendedor.mes.isinMonth()){
    //         return tmphead
    //     }
    //     if (id < tmphead.data.id) {
    //         if(tmphead.izquierda!=null){
    //             return this.searhVENDEDORMonthaux(id, tmphead.izquierda);
    //         }            
    //     } else if (id > tmphead.data.id) {
    //         if(tmphead.derecha!=null){
    //         return this.searhVENDEDORMonthaux(id, tmphead.derecha);
    //         }
    //     } else {
    //         return null;
    //     }
    //     return null;
    // }
    //! INSERTAR EL MES EN EL VENDEDOR POR SU ID
    insetar_Mes(id_vendedor,id_mes){
        
        var tempVendedor=this.searchTODOVendedor(id_vendedor)
        if (tempVendedor!=null){
            //antes que nada valido si el id del mes existe en mi arbol AVL
            console.log("esta en el arbol? -->",this.intreemonth(tempVendedor,id_mes))
            if(!this.intreemonth(tempVendedor,id_mes)){
                tempVendedor.mes.addMonth(id_mes)
                console.log("Se ha ingresado el MES en el Vendedor",tempVendedor.data.id)
                return true;
            }
        }
        console.log("No existe un Vendedor con el id ingresado")
        return false
    }
    //! INSERTAR UN EVENTO EN UN MES EN EL VENDEDOR POR SU ID
    insetar_Evento(id_vendedor,id_mes,obj_evento){
        var tempVendedor=this.searchTODOVendedor(id_vendedor)
        if (tempVendedor!=null){
            //antes que nada valido si el id del vendedor existe en mi arbol AVL
            var tempMes=tempVendedor.mes.getMonth(id_mes) //Va a buscar en la lista doble de mes del Vendedor y con la funcion getMonth se obtiene la lista calendar para meterle el evento.
            // var tempMes=this.searhVENDEDORMonth(id_mes,tempVendedor);
            console.log(tempMes)
            if(tempMes!=null){
                // if(!this.intreemonth(id_vendedor,obj_evento.idmes)){
                    //se inserta en el allCalendar (que es mi calendario), la descripcion dia y hora para crear la matriz dinámica.
                    tempMes.insert(obj_evento.descripcion,obj_evento.dia,obj_evento.hora)
                    tempMes.showCalendar()
                    console.log("Se agregó un EVENTO"," dia: ",obj_evento.dia," hora: ", obj_evento.hora, " motivo: ", obj_evento.descripcion)
                    return true
                // }
            }
            console.log("No existe ningun evento en el mes de: ", id_mes)
        }
        console.log("No existe un Vendedor con el id ingresado:", id_vendedor)
        return false
    }
    revisarbalance(node) {
        if (node == null) {
            return node;
        }
        // La altura del subárbol izquierdo es mayor que la altura del subárbol derecho El factor de equilibrio del nodo primario es -2  
        if (this.altura(node.izquierda) - this.altura(node.derecha) > 1) {
            if (this.altura(node.izquierda.izquierda) >= this.altura(node.izquierda.derecha)) {
                // Si la altura del subárbol izquierdo del subárbol izquierdo es mayor o igual que la altura del subárbol derecho del subárbol izquierdo, los subnodos izquierdos son -1 y 0
                // giro directo a la derecha
                node = this.r_derecha(node);
            } else {
                // Si el nodo secundario izquierdo es 1, debe girar a la izquierda y luego a la derecha
                node = this.r_izq_der(node);
            }
                         // La altura del subárbol derecho es mayor que la altura del subárbol izquierdo en 1 y el factor de equilibrio del nodo primario es 2
        } else if (this.altura(node.derecha) - this.altura(node.izquierda) > 1) {
            if (this.altura(node.derecha.derecha) >= this.altura(node.derecha.izquierda)) {
                // Si la altura del subárbol derecho del subárbol derecho es mayor o igual que la altura del subárbol izquierdo del subárbol derecho
                // Rotación simple izquierda directa
                node = this.r_izquierda(node);
            } else {
                // De lo contrario, se requiere doble rotación derecha e izquierda
                node = this.r_der_izq(node);
            }
        }
        return node;
    }
     //! Eliminar el Vendedor expecificando su id 
    eliminarVendedor(node, data) {
        if( node === null){
            return null;
        }
        // Si es menor que, elimine en el subárbol izquierdo
        if(data < node.data.id){
            node.leftChild =  this.eliminarVendedor(node.izquierda, data);
            node = this.revisarbalance(node);

            return node
        }else if(data > node.data.id){
            node.derecha = this.eliminarVendedor(node.derecha, data);
            node = this.revisarbalance(node);

            return node
        }else{
        // Los datos eliminados son iguales a node.key

        // Si este nodo tiene dos nodos secundarios
            if(!!node.izquierda && !!node.derecha){
                let tempNode = node.derecha;

                while ( null !== tempNode.izquierda){
            // Encuentra el nodo más pequeño en el subárbol derecho
                    tempNode = tempNode.izquierda;
                }
                
            // El nodo más pequeño en el subárbol derecho se asigna al nodo actual
                node.data.id =  tempNode.data.id ;
            // Eliminar el nodo con el valor más pequeño en el subárbol derecho
                node.derecha = this.eliminarVendedor(node.derecha, tempNode.data.id);
                node = this.revisarbalance(node);

                return node;

            }else {
                                // Solo hay un nodo hoja
                                // nodo hoja
                if( null === node.izquierda && null === node.derecha){
                    node = null;
                    return node;
                }
                                // Solo correcto
                if( null === node.izquierda){
                    node = node.derecha;
                    return node;
                }else if( null === node.derecha){
                                        // Solo queda
                    node = node.izquierda;
                    return node;
                }
            }

        }
    }
    
    //conocer la altura del arbol de forma recursiva
    altura(nodo){
        if(nodo != null){
            return nodo.altura;
        }else{
            return -1;
        }
    }
    altura_maxima(h1,h2){
        if(h2>=h1){ //************************ MAYOR O IGUAL */
            return h2;
        }else{
            return h1;
        }

    }
    //!ROTACIONES de los vendedores
    //rotacion simple izquerda
    r_izquierda(nodo){
        let aux = nodo.izquierda;
        nodo.izquierda= aux.derecha;
        aux.derecha = nodo;
        nodo.altura = this.altura_maxima(this.altura(nodo.derecha),this.altura(nodo.izquierda)) +1;
        aux.altura = this.altura_maxima(nodo.altura.altura,this.altura(nodo.izquierda))+1;
        return aux;
    }
    //rotacion simple derecha
    r_derecha(nodo){
        let aux = nodo.derecha;
        nodo.derecha= aux.izquierda;
        aux.izquierda = nodo;
        nodo.altura = this.altura_maxima(this.altura(nodo.izquierda),this.altura(nodo.derecha)) +1;
        aux.altura = this.altura_maxima(nodo.altura.altura,this.altura(nodo.derecha))+1;
        return aux;
    }
    //rotacion rotacion izq-der
    r_izq_der(nodo){
        nodo.izquierda = this.r_derecha(nodo.izquierda);
        let aux = this.r_izquierda(nodo);
        return aux;
    }
    //rotacion der-izq
    r_der_izq(nodo){
        nodo.derecha = this.r_izquierda(nodo.derecha);
        let aux = this.r_derecha(nodo);
        return aux;
    }    
    //*Ordenamientos
    preorden(raiz_actual){
        if(raiz_actual != null){
            console.log(raiz_actual.data.id);
            this.preorden(raiz_actual.izquierda);
            this.preorden(raiz_actual.derecha);
        }
    }
    inOrden(raiz_actual){
        if(raiz_actual != null){
            this.inOrden(raiz_actual.izquierda);
            console.log("***************")
            console.log(raiz_actual.data.id);
            // raiz_actual.cliente.mostrar()
            // console.log("altura= "+(this.altura(raiz_actual.derecha)-this.altura(raiz_actual.izquierda)))
            raiz_actual.cliente.print();
            raiz_actual.mes.print()
            // raiz_actual.mes.showCalendar1()
            this.inOrden(raiz_actual.derecha);
        }
    }
    postOrden(raiz_actual){
        if(raiz_actual != null){
            this.postOrden(raiz_actual.izquierda);
            this.postOrden(raiz_actual.derecha);
            console.log(raiz_actual.data.id);
        }
    }
    //*Generación de los Dots
    gendot_Vendedores(){
        // let cadena="digraph arbol {\n";
        let cadena="";
        cadena+= this.generar_nodos(this.head);
        cadena+="\n";
        cadena+=this.enlazar(this.head);
        
        console.log(cadena);
        return cadena;
    }
    generar_nodos(raiz_actual){ 
        let nodos ="";
        let labeltemp ="";
        if(raiz_actual != null){
            labeltemp="[label = \""+raiz_actual.data.id+"\n"+raiz_actual.data.username+"\n"+raiz_actual.data.name+"\n"+raiz_actual.data.edad+"\n"+raiz_actual.data.mail+"\n"+raiz_actual.data.pass+"\"];\n"
            nodos+= "n"+raiz_actual.data.id+labeltemp;
            nodos+=this.generar_nodos(raiz_actual.izquierda);
            nodos+=this.generar_nodos(raiz_actual.derecha);
        }
        return nodos;
    }
    enlazar(raiz_actual){
        let cadena="";
        if(raiz_actual != null){
            cadena += this.enlazar(raiz_actual.izquierda);
            cadena += this.enlazar(raiz_actual.derecha);
            //validaciones
            if(raiz_actual.izquierda != null){
                cadena+="n"+raiz_actual.data.id + "-> n"+raiz_actual.izquierda.data.id+"\n";
                // cadena+="n"+raiz_actual.izquierda.data.id + "-> n"+raiz_actual.data.id+"\n";
            }
            if(raiz_actual.derecha != null){
                cadena+="n"+raiz_actual.data.id + "-> n"+raiz_actual.derecha.data.id+"\n";
                // cadena+="n"+raiz_actual.derecha.data.id + "-> n"+raiz_actual.data.id+"\n";
            }
        }
        return cadena;
    }
    //*Generacion de Dot del calendario
    gendot_Calendar(id_vendedor,id_mes){
        var tempVendedor=this.searchTODOVendedor(id_vendedor)
        if (tempVendedor!=null){
            //antes que nada valido si el id del vendedor existe en mi arbol AVL
            var tempMes=tempVendedor.mes.getMonth(id_mes) //Va a buscar en la lista doble de mes del Vendedor y con la funcion getMonth se obtiene la lista calendar para meterle el evento.
            
            if(tempMes!=null){
                // if(!this.intreemonth(id_vendedor,obj_evento.idmes)){
                    //se inserta en el allCalendar (que es mi calendario), la descripcion dia y hora para crear la matriz dinámica.
                    // tempMes.insert(id_mes, obj_evento.descripcion,obj_evento.dia,obj_evento.hora)
                    var dotob=tempMes.graficar_matriz();
                    // console.log("Se agregó un EVENTO"," dia: ",obj_evento.dia," hora: ", obj_evento.hora, " motivo: ", obj_evento.descripcion)
                    return dotob;
                // }
            }
            console.log("No existe ningun evento en el mes de: ", id_mes)
            document.getElementById("textar").value = "No existe ningun evento en el mes";
            alert("No existe ningun evento en ese mes")
            return null
        }
        console.log("No existe un Vendedor con el id ingresado:", id_vendedor)
        return null
    }
    gendot_Clientes(id_vendedor){
        var clientsinAVL = this.searchClients(id_vendedor)
        console.log(clientsinAVL)
        console.log("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
        if(clientsinAVL!=null){
            var dotgen=clientsinAVL.cliente.graphlist()
            // { element: undefined, index: -1 };
            return dotgen
        }else{
            return ""
        }
        
    }
}
//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ REGISTER OF VENDEDORES ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function RegistrarVendedor(){
    var idi=document.getElementById("idi").value;
    var username=document.getElementById("username").value;
    var name=document.getElementById("nombre").value;
    var edad=document.getElementById("edad").value;
    var mail=document.getElementById("correo").value;
    var pass=document.getElementById("contra").value;
    
    // Proveedoresg=localStorage.getItem("BST")
    if(username!="" && idi!=""&& name!=""&& edad!=""&& pass!=""&& mail!=""){
        var add = new Vendedoresobj(parseInt(idi), username, name, edad, mail, pass);
        // var lista_tem = JSON.parse(sessionStorage.getItem("vendedor"));
        var list=sessionStorage.getItem("sales")  
        if(list==null){
            list="[]"
        }       
        console.log("AGREGANDO UN VENDEDOR-----------")
        console.log(list)
        listjson = JSON.parse(list);
        console.log(listjson)

        var existevende=false
        listjson.forEach(function(items) {
                if(items.id==idi){
                    console.log("ya existe un vendedor aqui")
                    existevende=true
                }
        });
        if(!existevende){
            console.log("insertando un vendedor")
            listjson.push(add)
            var jsoncreate=JSON.stringify(listjson)
            sessionStorage.setItem("sales",jsoncreate)
            alert(" El Vendedor se ha ingresado correctamente")
        }else{
            alert("El id del VENDEDOR ya existe en el sistema.")
        }
    }else{
        alert("Rellene todos los campos")
    }
    
}
//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ DELETE OF VENDEDORES ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function deleteVendedor(){
    var idi=document.getElementById("idi").value;
    if(idi!=""){
        var list=sessionStorage.getItem("sales")  
        if(list==null){
            list="[]"
        }
        console.log("ELIMINANDO UN VENDEDOR-----------")
        listjson = JSON.parse(list);
        var existevende=false
        var pos=0
        var posaux=0
        listjson.forEach(function(items) {
                if(items.id==idi){
                    console.log("si se encontró el vendedor aqui")
                    existevende=true
                    posaux=pos
                }
                pos++;
        });
        if(!existevende){
            
            alert(" El Vendedor NO se encontró en el sistema")
        }else{
            console.log("eliminando un vendedor")
            listjson.splice(posaux,1)
            var jsoncreate=JSON.stringify(listjson)
            sessionStorage.setItem("sales",jsoncreate)
            alert("El id del VENDEDOR se ha ELIMINADO.")
        } 
        // if(Vendedoresg!=null){ 
        //     if(Vendedoresg.intree(parseInt(idi))){
        //         console.log("antes de borrar")
        //         console.log(Vendedoresg)
        //         Vendedoresg.eliminarVendedor(Vendedoresg.head,parseInt(idi))
        //         // console.log(Vendedoresg.removeProv(parseInt(idi)))
        //         console.log("despues de borrar")
        //         console.log(Vendedoresg)
        //         sessionStorage.setItem("avl",JSON.stringify(Vendedoresg))
        //         alert("El Vendedoresg se ha eliminado correctamente")
        //         return
        //     }else{
        //         alert("El Vendedoresg no se encuentra en el sistema.")
        //     }
        // }
        // else{
        //     alert("Aun no hay Vendedores")
        // }
        // console.log("*********Lista de Vendedoresg*********")
        // Vendedoresg.inorder(Vendedoresg.head);
    }else{
        alert("Favor ingresar un ID del Vendedor")
    }
}

//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ MASSIVE CHARGE OF VENDEDORES ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function cargaVendedores(){
    var input = document.getElementById('upload-json')
    //la tipica lectura de un JSON 
    // {
    //     "id":1,
    //     "nombre":"juan",
    //     "edad": 25,
    //     "correo": "juan@gmail.com",
    //     "password": "juanito1234"
    // },
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
        var age= ""
        var pass=    ""
        var mail,usernamel=   ""
        json.vendedores.forEach(function(items) {
            console.log('*********************');
            console.log('-->',items.id);
            console.log('-->',items.username);
            console.log('-->',items.nombre);
            console.log('-->',items.edad);
            console.log('-->',items.correo);
            console.log('-->',items.password);
            idi=items.id
            usernamel=items.username
            name=items.nombre
            age=items.edad
            mail=items.correo
            pass=items.password
            var add = new Vendedoresobj(parseInt(idi),usernamel,name,age,mail,pass);
            //!AGREGO CADA UNO DE LOS VENDEDORES.
            var list=sessionStorage.getItem("sales") 
            if(list==null){
                list="[]"
            }        
            console.log("AGREGANDO UN VENDEDOR-----------")
            listjson = JSON.parse(list);
            var existevende=false
            listjson.forEach(function(items) {
                    if(items.id==idi){
                        console.log("ya existe un vendedor aqui")
                        existevende=true
                    }
            });
            if(!existevende){
                console.log("insertando un vendedor")
                listjson.push(add)
                var jsoncreate=JSON.stringify(listjson)
                sessionStorage.setItem("sales",jsoncreate)
                console.log(" El Vendedor se ha ingresado correctamente")
            }else{
                console.log("El id del VENDEDOR ya existe en el sistema.")
            }
        });


    };
    alert("Se han cargado los VENDEDORES Correctamente.!!")
    reader.readAsText(file);
    
}
//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ CHART OF VENDEDORES ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function genReportVendedor(){
    var newalv = CargaListas();
    var dotfortext= "digraph Chart{ \n";
    dotfortext+= "node[shape = box,fillcolor=\"yellow\" color=\"black\" style=\"filled\"];\n";
    var dotgen="{\n";
    var auxdotgen=newalv.gendot_Vendedores();
    dotgen+=auxdotgen
    dotfortext+=auxdotgen
    dotgen+="\n}";
    dotfortext+="\n}";
    console.log(dotgen)
    
    document.getElementById("textar").value = dotfortext;
    //create a network
      var container = document.getElementById("mynetwork");
      var DOTstring = dotgen
      
      // var DOTstring = "{1_Alvaro [label = \"Estructuras\nHola\nPrueba\nsocop2412@gmail.com\"];\n 1_Alvaro--2_Alvaro;2_Alvaro--3_Alvaro;}"
      
      console.log(DOTstring)
      // console.log("Holaa esta es una prueba.")

      var parsedData = vis.parseDOTNetwork(DOTstring);
      var data = {
          nodes: parsedData.nodes,
          edges: parsedData.edges
      }
      var options = {
          nodes: {
              shape: 'box',
              borderWidth: 2,                
              color:"yellow",
          },        
          layout: {
              hierarchical: {
                  levelSeparation: 150,
                  nodeSpacing: 170,
                  parentCentralization: false,
                  direction: 'UD',        // UD, DU, LR, RL
                  sortMethod: 'directed',  // hubsize, directed
                  shakeTowards: 'roots'  // roots, leaves                        
              },
          },                        
      };
      var network = new vis.Network(container, data, options);



}



//*************************************************************************** */
//!---------------------------CLIENTES LISTA DOBLE -----------------------------
//TODO ------------------OBJETO CLIENTES-------------
function Clienteobj(id,idvendedor, name, mail){
    this.id=id;
    this.idvendedor=idvendedor;
    this.name=name;
    this.mail=mail;
}

//! LISTA ENLAZADA DE MIS CLIENTES
class nodeLD_client{
    constructor(data,next){
        this.data=data;
        this.next=next;
    };
};
class LD_client{
    constructor(){
        this.head = null;
        this.size = 0;
    };
    add(data){
        const newNode = new nodeLD_client(data, null);
        if(!this.head){
            this.head=newNode
        }else{
            let temp = this.head; //registro de la cabeza
            while(temp.next){
                temp=temp.next;
            };
            temp.next=newNode;
        };
        this.size++; //aumenta el tamaño de la lista.
    };
    
    //REMOVER UN ELEMENTO DE LA LISTA BASADO EN EL ID DEL CLIENTE
    deleteData(data){
        let current = this.head;
        let previous = null;
        while(current!=null){
            if(current.data.id===data){
                if(!previous){
                    this.head=current.next;

                }else{
                    previous.next=current.next;
                };
                this.size--;
                return current.data;
            };
            previous=current;
            current=current.next;
        };
        return null;
    };
    //REVISAR SI UN CLIENTE SE ENCUENTRA EN LA LISTA
    isinList(id){
        if(!this.size){
            return null
        };
        let current = this.head;
        // let result= '';
        while(current){
            // result += current.data.id+' -> ';
            if(current.data.id==id){
                return true
            }
            current=current.next;
        };
        // result += 'X';
        // console.log(result)
        return false;

        // let aux=this.head;
        // while(aux!=null){
        //     console.log(aux.data.id)
        //     if(aux.data.id==id){
        //         return true
        //     }
        //     aux=aux.siguiente;
        // }
        // console.log("no se hallo")
        // return false
    };
    //REVISAR SI LA LISTA ESTA VACÍA
    isEmpty(){
        return this.size === 0;
    };
    getSize(){
        return this.size;
    };
    //FUNCIÓN IMPRIMIR
    print(){
        if(!this.size){
            return null
        };
        let current = this.head;
        let result= '';
        while(current){
            result += current.data.id+' -> ';
            current=current.next;
        };
        result += 'X';
        console.log(result)
        return result;
    };
    graphlist(){
        if(!this.size){
            return null
        };
        let current = this.head;
        var current2=this.head
        let cadena="";
        let dot="";
        cadena+= "digraph Matriz{ \n";
        cadena+= "node[shape = box,width=0.7,height=0.7,fillcolor=\"yellow\" color=\"black\" style=\"filled\"];\n";
        cadena+= "edge[style = \"bold\"]; \n"
        //graficar el nodo matriz
        cadena+="node[label = \"Clientes\" fillcolor=\" red\"]Inicio;"
        dot+="Inicio[label = \"Clientes\" fillcolor=\" red\"];"
        while(current){
            cadena+="node[label = \""+current.data.id+"\n"+current.data.name+"\n"+current.data.mail+"\" fillcolor=\" orange\" ]x"+current.data.id+";\n"
            dot+="x"+current.data.id+"[label = \""+current.data.id+"\n"+current.data.name+"\n"+current.data.mail+"\" fillcolor=\" orange\" ];\n"
            // result += current.data.id+' -> ';
            current=current.next;
        };
        console.log(dot)
        while(current2.next){
            cadena+="x"+current2.data.id+"->"+"x"+current2.next.data.id+";\n"
            cadena+="x"+current2.next.data.id+"->"+"x"+current2.data.id+";\n"
            dot+="x"+current2.data.id+"->"+"x"+current2.next.data.id+";\n"
            dot+="x"+current2.next.data.id+"->"+"x"+current2.data.id+";\n"
            
            current2=current2.next;
        }  
        cadena+="}"  
        console.log(cadena)    
        return dot

    }
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
function borrarSesion(){
    sessionStorage.clear()
}

//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ REGISTER OF CLIENTES DE LOS VENDEDORES ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function RegistrarCliente(){
    var idcurrent=sessionStorage.getItem("idcurrent")
    var idi=document.getElementById("idi").value;
    var name=document.getElementById("nombre").value;
    var mail=document.getElementById("correo").value;    
    // Proveedoresg=localStorage.getItem("BST")
    if(idi!=""&& name!=""&& mail!=""){
        var add = new Clienteobj(idi,parseInt(idcurrent),name,mail);
        // var lista_tem = JSON.parse(sessionStorage.getItem("vendedor"));
        var list=sessionStorage.getItem("clients")  
        if(list==null){
            list="[]"
        }      
        console.log("AGREGANDO UN CLIENTE-----------")
        console.log(list)
        listjson = JSON.parse(list);
        console.log(listjson)


        var existecliente=false
        listjson.forEach(function(items) {
                if(items.id==idi && items.idvendedor==idcurrent){
                    console.log("ya existe un cliente en el vendedor")
                    existecliente=true
                }
        });
        if(!existecliente){
            console.log("insertando un cliente")
            listjson.push(add)
            var jsoncreate=JSON.stringify(listjson)
            sessionStorage.setItem("clients",jsoncreate)
            alert(" El cliente se ha ingresado correctamente")
        }else{
            alert("El id del VENDEDOR ya existe en el sistema.")
        }
    }else{
        alert("Rellene todos los campos")
    }
    
}
//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ DELETE OF CLIENTES DE LOS VENDEDORES ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function deleteCliente(){
    var idcurrent=sessionStorage.getItem("idcurrent")
    var idi=document.getElementById("idi").value;   
    // Proveedoresg=localStorage.getItem("BST")
    if(idi!=""){
        var list=sessionStorage.getItem("clients")  
        if(list==null){
            list="[]"
        }      
        console.log("ELIMINANDO UN CLIENTE-----------")
        listjson = JSON.parse(list);
        var existecliente=false;
        var pos=0
        var posaux=0
        listjson.forEach(function(items) {
                if(items.id==idi && items.idvendedor==idcurrent){
                    console.log("si se encontró  el cliente aqui")
                    existecliente=true;
                    posaux=pos;
                }
                pos++;
        });
        if(!existecliente){
            alert(" El Cliente NO se encontró en el sistema")
        }else{
            console.log("eliminando un cliente")
            listjson.splice(posaux,1)
            var jsoncreate=JSON.stringify(listjson)
            sessionStorage.setItem("clients",jsoncreate)
            alert("El id del CLIENTE se ha ELIMINADO.")
        }
    }else{
        alert("Rellene todos los campos")
    }
    
}
//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ MASSIVE CHARGE OF CLIENTES ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function cargaClientes(){
    var input = document.getElementById('upload-json')
    //la tipica lectura de un JSON 
    //      {
    //     "id":1,
    //     "clientes":[
    //         {
    //             "id":1,
    //             "nombre":"cliente1",
    //             "correo":"cliente1@gmail.com"
    //         },
    //         {
    //             "id":2,
    //             "nombre":"cliente2",
    //             "correo":"cliente2@gmail.com"
    //         },
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var json;
        tempstring=String(e.target.result)
        //se parsea.
        // json = JSON.parse(e.target.result);
        json = JSON.parse(tempstring);
        console.log(json)
        var idivendedor =""
        var idi =""
        var name=""
        var mail=""
        json.vendedores.forEach(function(items0) {
            idivendedor=items0.id
            items0.clientes.forEach(function(items) {
                // console.log("----Tiene al cliente: ",it2.id," ",it2.nombre," ",it2.correo)
            
                console.log('*********************');
                console.log('-->',items.id);
                console.log('-->',items.nombre);
                console.log('-->',items.correo);
                idi=items.id
                name=items.nombre
                mail=items.correo
                var add = new Clienteobj(idi,parseInt(idivendedor),name,mail);
                //!AGREGO CADA UNO DE LOS CLIENTES.
                var list=sessionStorage.getItem("clients")  
                if(list==null){
                    list="[]"
                }       
                console.log("AGREGANDO UN CLIENTE -----------")
                listjson = JSON.parse(list);
                var existecliente=false
                listjson.forEach(function(items) {
                        if(items.id==idi && items.idvendedor==idivendedor){
                            console.log("ya existe un cliente en el vendedor")
                            existecliente=true
                        }
                });
                if(!existecliente){
                    console.log("insertando un cliente")
                    listjson.push(add)
                    var jsoncreate=JSON.stringify(listjson)
                    sessionStorage.setItem("clients",jsoncreate)
                    console.log(" El cliente se ha ingresado correctamente")
                }else{
                    console.log("El id del CLIENTE ya existe en el VENDEDOR.")
                }
        });

    });
    };
    alert("Se han cargado los CLIENTES Correctamente.!!")
    reader.readAsText(file);
    
}
//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ CHART OF CLIENTES ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function genReportClients(){
    var newalv = CargaListas();
    var idvendedor=document.getElementById("vendid").value;
    var dotfortext= "digraph Chart{ \n";
    dotfortext+= "node[shape = box,fillcolor=\"yellow\" color=\"black\" style=\"filled\"];\n";
    
    var dotgen="{\n"
    var auxdotgen=newalv.gendot_Clientes(parseInt(idvendedor));
    dotgen+=auxdotgen
    dotfortext+=auxdotgen
    dotgen+="\n}";
    dotfortext+="\n}";
    console.log(dotgen)
    document.getElementById("textar").value = dotfortext;
    var DOTstring = dotgen
    
    // var DOTstring = "{1_Alvaro [label = \"Estructuras\nHola\nPrueba\nsocop2412@gmail.com\"];\n 1_Alvaro--2_Alvaro;2_Alvaro--3_Alvaro;}"
    var container = document.getElementById("mynetwork");
    console.log(DOTstring)
    // console.log("Holaa esta es una prueba.")
    
    var parsedData = vis.parseDOTNetwork(DOTstring);
    var data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    }
    var options = {
        nodes: {
            shape: 'box',
            borderWidth: 2,                
            color:"yellow",
        },        
        layout: {
            hierarchical: {
                levelSeparation: 200,
                nodeSpacing: 200,
                parentCentralization: false,
                direction: 'UD',        // UD, DU, LR, RL
                sortMethod: 'directed',  // hubsize, directed
                shakeTowards: 'roots'  // roots, leaves                        
            },
        },                        
    };
    var network = new vis.Network(container, data, options);
}


//*************************************************************************** */
//!--------------------------- CALENDARIO -----------------------------
//TODO ------------------OBJETO EVENTO-------------
function Eventobj(idvendedor, idmes, hora, dia, descripcion){
    this.idvendedor=idvendedor;
    this.idmes=idmes;
    this.hora=hora;
    this.dia=dia;
    this.descripcion=descripcion;
};

//! LISTA ENLAZADA DE LOS MESES DEL AÑO
class nodeLD_Month{
    constructor(data,next){
        this.data=data;
        this.next=next;
        this.calendar=new allCalendar();
    };
};

class LD_Month{
    constructor(){
        this.head = null;
        this.size = 0;
    };
    addMonth(data){
        const newNode = new nodeLD_Month(data, null);
        if(!this.head){
            this.head=newNode
        }else{
            let temp = this.head; 
            while(temp.next){
                temp=temp.next;
            };
            temp.next=newNode;
        };
        this.size++; //increase the size of my month list
    };
    //AGREGAR EN UN LUGAR EN ESPECÍFICO
    insertAt(data, index){
        if(index<0 || index>this.size){
            return null;
        };
        const newNode = new nodeLD_Month(data);
        let actual = this.head;
        let previous;

        if (index===0){
            newNode.next = actual;
            this.head=newNode;

        }else{
            for(let i=0; i<index; i++){
                previous = actual;
                actual = actual.next;
            };
            newNode.next=actual;
            previous.next=newNode;
        };
        this.size++;
    };
    //REMOVER UN ELEMENTO DE LA LISTA BASADO EN EL MES
    deleteData(data){
        let current = this.head;
        let previous = null;
        while(current!=null){
            if(current.data.id===data){
                if(!previous){
                    this.head=current.next;

                }else{
                    previous.next=current.next;
                };
                this.size--;
                return current.data;
            };
            previous=current;
            current=current.next;
        };
        return null;
    };
    //REMOVER UN ELEMENTO DE LA LISTA BASADO EN UN INDICE
    removeFrom(index){
        if(index<0 || index>this.size){
            return null;
        };
        let actual = this.head;
        let previous = null;
        if(index===0){
            this.head=actual.next;
        }else{
            for(let i=0; i<index; i++){
                previous = actual;
                actual = actual.next;
            };
            previous.next=actual.next;
        };
        this.size--;
        return actual.data;
    };
    //REVISAR SI UN MES SE ENCUENTRA EN LA LISTA
    isinListMonth(id){
        if(!this.size){
            return false
        };
        let current = this.head;
        // let result= '';
        while(current){
            // result += current.data.id+' -> ';
            if(current.data==id){
                return true
            }
            current=current.next;
        };
        return false;
    };
    getMonth(id){
        if(!this.size){
            return null
        };
        let current = this.head;
        // let result= '';
        while(current){
            // result += current.data.id+' -> ';
            if(current.data==id){
                return current.calendar
            }
            current=current.next;
        };
        return null;
    };
    //REVISAR SI LA LISTA ESTA VACÍA
    isEmpty(){
        return this.size === 0;
    };
    getSize(){
        return this.size;
    };
    insertCalendar(id,descripcion,dia,hora){
        if(!this.size){
            return null
        };
        let current = this.head;
        // let result= '';
        while(current){
            // result += current.data.id+' -> ';
            if(current.data==id){
                current.calendar.insert(descripcion,dia,hora)
                console.log("evento guardado con éxito")
                return true
                // return current.calendar
            }
            current=current.next;
        };
        return null;
    }
    //FUNCIÓN IMPRIMIR
    print(){
        if(!this.size){
            return null
        };
        let current = this.head;
        let result= '';
        while(current){
            result += current.data+' -> ';
            current=current.next;
        };
        result += 'X';
        console.log(result)
        return result;
    };
    showCalendar1(id_mes){
        var calen=this.getMonth(id_mes)
        console.log(calen)
        calen.showCalendar()
    }
};

//*************************************************************************** */
//!------------------MATRIZ DINÁMICA CON HORAS Y DIAS CON SU DESCRIPCIÓN.------------------
//todo -------OBJETO DE DIAS Y HORAS
class nodo{ //my node that have all tha pointers of my ortogonal list
    constructor(data,x,y){
        this.data=data;
        this.x=x;
        this.y=y
        this.siguiente=null;
        this.anterior=null;
        this.arriba=null;
        this.abajo=null;
    }
};
//nodos cabeceras 
class nodoheaders{
    constructor(data){
        this.data=data;
        this.siguiente=null
        this.anterior=null
        this.matrizDescripciones=new matrizDescripciones();
    }
};//matriz descripciones tambien denominada matriz interna
class matrizDescripciones{
    constructor(){
        this.head=null;
    }
    insertx(data,x,y){
        var newnode= new nodo(data,x,y);
        //here se valida que la cabeza principal no esté vacia y si lo esta alli le meto el nodo
        if (this.head==null){
            this.head = newnode;
        }else{
            //si el nuevo nodo es menor que la cabeza en y
            if(newnode.y<this.head.y){
                //agrego el nodo despues de esa misma cabeza como enla misma linea por decirlo así.
                newnode.siguiente=this.head;
                this.head.anterior=newnode;
                this.head=newnode;
            }else{
                var aux=this.head;
                //si no es menor que la cabeza recorro 
                while(aux!=null){
                    // si en nuevo nodo es menor que mi cabeza
                    if (newnode.y<aux.y){
                        //agrego el nuevo nodo y hago los cambios de punteros correspondientes.
                        newnode.siguiente=aux;
                        newnode.anterior=aux.anterior;
                        aux.anterior.siguiente=newnode;
                        aux.anterior=newnode;
                        break;
                    }else if(newnode.x==aux.x && newnode.y==aux.y){
                        //si el nuevo nodo en x es igual al auxiliar x y el nuevo y es igual al aux y
                        //termina el ciclo
                        break;
                    }else{
                        //si el siguiente de auxiliar es nulo se agrega el nodo.
                        if(aux.siguiente==null){
                            aux.siguiente=newnode;
                            newnode.anterior=aux;
                            break;
                        }else{
                            aux=aux.siguiente
                        }
                    }
                }
            }
        }
    }
    //Now i insert the Y node place
    inserty(data,x,y){
        var newnode= new nodo(data,x,y);
        if (this.head==null){
            // si es null obviously i add the new node like a header 
            this.head = newnode;
        }else{
            console.log(newnode.y)
            console.log(this.head.y)
            // si el nuevo nodo y es menor que la cabeza y
            if(newnode.y<this.head.y){
                //agrego el nodo en ese lugar then..
                newnode.abajo=this.head;
                this.head.arriba=newnode;
                this.head=newnode;
            }else{
                //sino es menor
                var aux=this.head;
                //se recorre hasta que se encuentre al menor
                while(aux!=null){
                    //si ahora si es menor en Y
                    if (newnode.y<aux.y){
                        //se agrega el nodo con todos los pointers y se agrega el nodo
                        newnode.abajo=aux; 
                        newnode.arriba=aux.arriba;
                        aux.arriba.abajo=newnode;
                        aux.arriba=newnode;
                        break;
                    }else if(newnode.x==aux.x && newnode.y==aux.y){
                        //si el nuevo nodo X es igual al auxiliar X 
                        //Y SI el nuevo nodo Y es igual al auxiliar Y  se sale
                        break;
                    }else{
                        if(aux.abajo==null){
                            aux.abajo=newnode;
                            newnode.arriba=aux;
                            break;
                        }else{
                            aux=aux.abajo
                        }
                    }
                }
            }
        }
    }
    showX(){
        var aux = this.head;
        while(aux!=null){
            //here only i can print.
            console.log("NODO: ",aux.data," -->",aux,x, ",",aux.y)
            aux=aux.siguiente
        }
    }
    showY(){
        var aux = this.head;
        while(aux!=null){
            //here only i can print.
            console.log("NODO: ",aux.data," -->",aux,x, ",",aux.y)
            aux=aux.abajo
        }
    }
};//lista de cabeceras en X y en Y
class listheaders{
    constructor(){
        this.head=null;
    }
    insertHeader(newnode){
        // var newnode=new nodoheaders();
        if (this.head==null){
            this.head=newnode;
        }else{
            //if el dato del nuevo nodo es menor que el dato de la cabeza
            if(newnode.data<this.head.data){
                //agrego el dato 
                newnode.siguiente=this.head;
                this.head.anterior=newnode;
                this.head=newnode;  
            }else{
                var aux=this.head;
                while(aux!=null){
                    // if el nuevo nodo es menor a la cabeza guardada
                    if(newnode.data<aux.data){
                        newnode.siguiente=aux;
                        newnode.anterior=aux.anterior;
                        aux.anterior.siguiente=newnode;
                        aux.anterior=newnode;
                        break;
                    }else{
                        //si el auxiliar del nuevo nodo es nulo se agrega alli el nodo
                        if(aux.siguiente==null){
                            aux.siguiente=newnode;
                            newnode.anterior=aux;
                            break;
                        }else{
                            //esto sirve para seguir recorriendo el ciclo si nada se cumplió anteriormente.
                            aux=aux.siguiente;
                        }
                    }
                }
            }
            
        }
    }
    searchHeader(data){
        var aux = this.head;
        while(aux!=null){
            if(aux.data==data){
                return aux;
            }else{
                aux=aux.siguiente;
            }
        }
        return null;
    }
    show(){
        var aux=this.head;
        while(aux!=null){
            console.log("NODO: ");
            aux=aux.siguiente;
        }
    }
};//MATRIZ del CALENDARIO PRINCIPAL
class allCalendar{
    constructor(){
        this.headersX_hour=new listheaders();
        this.headersY_day=new listheaders();
    }
    insert(data,x,y){
        //in these case i search my headers in my listheaders and save in variables
        var nodeheader_X = this.headersX_hour.searchHeader(x);
        var nodoheader_Y = this.headersY_day.searchHeader(y);
        if(nodeheader_X==null){
            //si no encontró dicha variable que en este caso son mis horas, 
            //procedo a insertar mi cabecera donde corresponda
            nodeheader_X=new nodoheaders(x);
            this.headersX_hour.insertHeader(nodeheader_X);
        }
        if (nodoheader_Y==null){
            //si no encontró dicha variable que en este caso son mis dias, 
            //procedo a insertar mi cabecera donde corresponda
            nodoheader_Y=new nodoheaders(y);
            this.headersY_day.insertHeader(nodoheader_Y);
        }
        //now i insert my values (Descripciones) in the header like
        nodeheader_X.matrizDescripciones.insertx(data,x,y)
        nodoheader_Y.matrizDescripciones.inserty(data,x,y)
        

    }
    showCalendar(){
        console.log("Headers en X (Hours)");
        let aux = this.headersX_hour.head;
        while(aux != null){
            console.log("   position->"+aux.data);
            let aux2 = aux.matrizDescripciones.head;
            while(aux2!= null){
                console.log("       -"+aux2.data);
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }

        console.log("Headers en Y (Days)");
        aux = this.headersY_day.head;
        while(aux != null){
            console.log("   position->"+aux.data);
            let aux2 = aux.matrizDescripciones.head;
            while(aux2!= null){
                console.log("       -"+aux2.data);
                aux2 = aux2.abajo;
            }
            aux = aux.siguiente;
        }
    }
    
    graficar_matriz(){
        let cadena="";
        var dot="";
        cadena+= "digraph Matriz{ \n";
        cadena+= "node[shape = box,width=0.7,height=0.7,fillcolor=\"azure2\" color=\"black\" style=\"filled\"];\n";
        cadena+= "edge[style = \"bold\"]; \n"
        //graficar el nodo matriz
        dot+="inicio[label = \"Cabeza\" ];\n"

        cadena+="node[label = \"Dias y Horas\" fillcolor=\" red\" pos = \"-1,1!\"]principal;\n"
        //graficar cabeceras X
        let aux_x = this.headersX_hour.head;
        while(aux_x!=null){
            // var labeltemp="\""+aux_x.data.id+"\n"+raiz_actual.data.username+"\n"+raiz_actual.data.name+"\n"+raiz_actual.data.edad+"\n"+raiz_actual.data.mail+"\n"+raiz_actual.data.pass+"\""
            cadena+="node[label = \""+"Hora: "+aux_x.data+"\" fillcolor=\" orange\" pos = \""+aux_x.data+",1!\"]x"+aux_x.data+";\n"
            dot+="x"+aux_x.data+"[label = \""+"Hora: "+aux_x.data+"\" ];\n"
            aux_x = aux_x.siguiente;
        }
        aux_x = this.headersX_hour.head;
        while(aux_x.siguiente != null){
            dot+="x"+aux_x.data+"->"+"x"+aux_x.siguiente.data+";\n"
            dot+="x"+aux_x.siguiente.data+"->"+"x"+aux_x.data+";\n"

            cadena+="x"+aux_x.data+"->"+"x"+aux_x.siguiente.data+";\n"
            cadena+="x"+aux_x.siguiente.data+"->"+"x"+aux_x.data+";\n"
            aux_x = aux_x.siguiente;
        }

        if(this.headersX_hour.head!= null){
            dot+="inicio->x"+this.headersX_hour.head.data+";\n";
            dot+="x"+this.headersX_hour.head.data+"->inicio"+";\n";
            cadena+="principal->x"+this.headersX_hour.head.data+";\n";
            cadena+="x"+this.headersX_hour.head.data+"->principal"+";\n";
        }
        //graficar cabeceras Y
        let aux_y = this.headersY_day.head;
        while(aux_y!=null){
            dot+="y"+aux_y.data+"[label = \""+"Dia: "+aux_y.data+"\" ];\n"
            cadena+="node[label = \""+"Dia: "+aux_y.data+"\" fillcolor=\" orange\" pos = \"-1,-"+aux_y.data+"!\"]y"+aux_y.data+";\n"
            aux_y = aux_y.siguiente;
        }
        aux_y = this.headersY_day.head;
        while(aux_y.siguiente != null){
            dot+="y"+aux_y.data+"->"+"y"+aux_y.siguiente.data+";\n"
            dot+="y"+aux_y.siguiente.data+"->"+"y"+aux_y.data+";\n"

            cadena+="y"+aux_y.data+"->"+"y"+aux_y.siguiente.data+";\n"
            cadena+="y"+aux_y.siguiente.data+"->"+"y"+aux_y.data+";\n"
            aux_y = aux_y.siguiente;
        }

        if(this.headersX_hour.head!= null){//duplique
            dot+="inicio->y"+this.headersY_day.head.data+";\n";
            dot+="y"+this.headersY_day.head.data+"->inicio;\n";
            cadena+="principal->y"+this.headersY_day.head.data+";\n";
            cadena+="y"+this.headersY_day.head.data+"->principal;\n";
        }
        
        aux_x = this.headersX_hour.head;
        while(aux_x!=null){ 
            let aux = aux_x.matrizDescripciones.head;
            while(aux!=null){
                dot+="x"+aux.x+"y"+aux.y+"[label = \""+"Motivo: "+aux.data+"\" fillcolor=\" green\"];\n"
                cadena+="node[label = "+"\"Motivo:"+aux.data+"\" fillcolor=\" green\" pos = \""+aux.x+",-"+aux.y+"!\"]x"+aux.x+"y"+aux.y+";\n"
                aux = aux.siguiente;
            }

            
            aux = aux_x.matrizDescripciones.head;
            while(aux.siguiente!= null){
                cadena+="x"+aux.x+"y"+aux.y+"->x"+aux.siguiente.x+"y"+aux.siguiente.y+";\n";
                cadena+="x"+aux.siguiente.x+"y"+aux.siguiente.y+"->x"+aux.x+"y"+aux.y+";\n";
                dot+="x"+aux.x+"y"+aux.y+"->x"+aux.siguiente.x+"y"+aux.siguiente.y+";\n";
                dot+="x"+aux.siguiente.x+"y"+aux.siguiente.y+"->x"+aux.x+"y"+aux.y+";\n";
                aux= aux.siguiente;
            }
            if(aux_x.matrizDescripciones.head!= null){//duplique
                cadena+="x"+aux_x.data+"->"+"x"+aux_x.matrizDescripciones.head.x+"y"+aux_x.matrizDescripciones.head.y+";\n";
                cadena+="x"+aux_x.matrizDescripciones.head.x+"y"+aux_x.matrizDescripciones.head.y+"->"+"x"+aux_x.data+";\n";
                dot+="x"+aux_x.data+"->"+"x"+aux_x.matrizDescripciones.head.x+"y"+aux_x.matrizDescripciones.head.y+";\n";
                dot+="x"+aux_x.matrizDescripciones.head.x+"y"+aux_x.matrizDescripciones.head.y+"->"+"x"+aux_x.data+";\n";
            }

            aux_x = aux_x.siguiente;
        }

        aux_y = this.headersY_day.head;
        while(aux_y!=null){
            
            let aux = aux_y.matrizDescripciones.head;
            while(aux.abajo!= null){
                cadena+="   x"+aux.x+"y"+aux.y+"->x"+aux.abajo.x+"y"+aux.abajo.y+";\n";
                cadena+="   x"+aux.abajo.x+"y"+aux.abajo.y+"->x"+aux.x+"y"+aux.y+";\n";

                dot+="   x"+aux.x+"y"+aux.y+"->x"+aux.abajo.x+"y"+aux.abajo.y+";\n";
                dot+="   x"+aux.abajo.x+"y"+aux.abajo.y+"->x"+aux.x+"y"+aux.y+";\n";
                aux= aux.abajo;
            }
            if(aux_y.matrizDescripciones.head!= null){//duplique
                cadena+="y"+aux_y.data+"->"+"x"+aux_y.matrizDescripciones.head.x+"y"+aux_y.matrizDescripciones.head.y+";\n";
                cadena+="x"+aux_y.matrizDescripciones.head.x+"y"+aux_y.matrizDescripciones.head.y+"->"+"y"+aux_y.data+";\n";
                dot+="y"+aux_y.data+"->"+"x"+aux_y.matrizDescripciones.head.x+"y"+aux_y.matrizDescripciones.head.y+";\n";
                dot+="x"+aux_y.matrizDescripciones.head.x+"y"+aux_y.matrizDescripciones.head.y+"->"+"y"+aux_y.data+";\n";
            }
            aux_y = aux_y.siguiente;
        }

        cadena+= "\n}"
        console.log(cadena);
        document.getElementById("textar").value = cadena;
        return dot
    }

};

//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ MASSIVE CHARGE OF EVENTOS ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function cargaEventos(){
    var input = document.getElementById('upload-json')
    //la tipica lectura de un JSON 
    // {
    //     "id":1,
    //     "eventos":
    //         [
    //         {
    //             "mes":1,
    //             "dia":10,
    //             "hora":7,
    //             "desc":"reunion"
    //         },
    //         {
    //             "mes":5,
    //             "dia":15,
    //             "hora":13,
    //             "desc":"Almuerzo"
    //         }
    //         ]
    //     },
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var json;
        tempstring=String(e.target.result)
        //se parsea.
        // json = JSON.parse(e.target.result);
        json = JSON.parse(tempstring);
        console.log(json)
        var idivendedor =""
        var mesl =""
        var dial=""
        var horal=""
        var descl=""
        json.vendedores.forEach(function(items0) {
            idivendedor=items0.id
            items0.eventos.forEach(function(items) {
                console.log('*********************');
                console.log('-->',items.mes);
                console.log('-->',items.dia);
                console.log('-->',items.hora);
                console.log('-->',items.desc);
                mesl=items.mes
                dial=items.dia
                horal=items.hora
                descl=items.desc
                var add = new Eventobj(parseInt(idivendedor),mesl,dial,horal,descl);
                //!AGREGO CADA UNO DE LOS EVENTOS.
                var list=sessionStorage.getItem("events") 
                if(list==null){
                    list="[]"
                }         
                console.log("AGREGANDO UN EVENTO -----------")
                listjson = JSON.parse(list);
                var existevento=false
                listjson.forEach(function(items) {
                        if(items.idvendedor==idivendedor && items.idmes==mesl && items.hora==horal &&items.dia==dial){
                            console.log("ya existe un evento en ese dia y hora y mes en el vendedor")
                            existevento=true
                        }
                });
                if(!existevento){
                    console.log("insertando un Evento")
                    listjson.push(add)
                    var jsoncreate=JSON.stringify(listjson)
                    sessionStorage.setItem("events",jsoncreate)
                    console.log(" El Evento se ha ingresado correctamente")
                }else{
                    console.log("El Evento ya existe en ese dia, hora y mes seleccionados.")
                }
        });

    });
    };
    alert("Se han cargado los CLIENTES Correctamente.!!")
    reader.readAsText(file);
    
}
//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ REGISTER OF EVENTOS ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function RegistrarEvento(){
    var idcurrent=sessionStorage.getItem("idcurrent")
    var descrip=document.getElementById("descrip").value;
    var hora=document.getElementById("hora").value;
    var dia=document.getElementById("dia").value;
    /* Para obtener el valor */
    var cod = document.getElementById("meses").value;    
    /* Para obtener el texto o valor*/
    var combo = document.getElementById("meses");
    var mes = combo.options[combo.selectedIndex].value;
    // Proveedoresg=localStorage.getItem("BST")
    if(descrip!="" && hora!=""&& dia!=""&& mes!=""){
        var add = new Eventobj(parseInt(idcurrent), parseInt(mes), hora, dia, descrip);
        var list=sessionStorage.getItem("events")  
        if(list==null){
            list="[]"
        }      
        //!AGREGO EL EVENTO.      
        console.log("AGREGANDO UN EVENTO -----------")
        listjson = JSON.parse(list);
        var existevento=false
        listjson.forEach(function(items) {
                if(items.idvendedor==idcurrent && items.idmes==mes && items.hora==hora &&items.dia==dia){
                    console.log("ya existe un evento en ese dia y hora y mes en el vendedor")
                    existevento=true
                }
        });
        if(!existevento){
            console.log("insertando un Evento")
            listjson.push(add)
            var jsoncreate=JSON.stringify(listjson)
            sessionStorage.setItem("events",jsoncreate)
            alert(" El Evento se ha ingresado correctamente")
        }else{
            alert("El Evento ya existe en ese dia, hora y mes seleccionados.")
        }
    }else{
        alert("Rellene todos los campos")
    }
    
}
//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ CHART OF EVENTOS ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function genReportCalendar(){
    var avlVendedores=CargaListas()
    var id_vend=sessionStorage.getItem("idcurrent")
    var combo = document.getElementById("meses");
    var mes = combo.options[combo.selectedIndex].value;
    var dotgen="{\n"
    dotgen += avlVendedores.gendot_Calendar(parseInt(id_vend),parseInt(mes));
    dotgen+="\n}"
    // create a network
    var container = document.getElementById("mynetwork");
    var DOTstring = dotgen
    
    // var DOTstring = "{1_Alvaro [label = \"Estructuras\nHola\nPrueba\nsocop2412@gmail.com\"];\n 1_Alvaro--2_Alvaro;2_Alvaro--3_Alvaro;}"
    
    console.log(DOTstring)
    // console.log("Holaa esta es una prueba.")

    var parsedData = vis.parseDOTNetwork(DOTstring);
    var data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    }
    var options = {
        nodes: {
            shape: 'box',
            borderWidth: 1,                
            color:"yellow",
        },        
        layout: {
            hierarchical: {
                levelSeparation: 100,
                nodeSpacing: 100,
                parentCentralization: false,
                direction: 'UD',        // UD, DU, LR, RL
                sortMethod: 'directed',  // hubsize, directed
                shakeTowards: 'leaves',  // roots, leaves                        
            },
        },                        
    };
    var network = new vis.Network(container, data, options);
    // return dotgen;
    
}
//?↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ CHART OF EVENTOS ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function genReportCalendar2(){
    var avlVendedores=CargaListas()
    var id_vend=document.getElementById("vendid").value;
    var combo = document.getElementById("meses");
    var mes = combo.options[combo.selectedIndex].value;
    if(id_vend!="" && mes!=""){
        
        var dotgen="{\n"
        console.log(id_vend)
        dotgen += avlVendedores.gendot_Calendar(parseInt(id_vend),parseInt(mes));
        dotgen+="\n}"
        // create a network
        var container = document.getElementById("mynetwork");
        var DOTstring = dotgen
        
        // var DOTstring = "{1_Alvaro [label = \"Estructuras\nHola\nPrueba\nsocop2412@gmail.com\"];\n 1_Alvaro--2_Alvaro;2_Alvaro--3_Alvaro;}"
        
        console.log(DOTstring)
        // console.log("Holaa esta es una prueba.")

        var parsedData = vis.parseDOTNetwork(DOTstring);
        var data = {
            nodes: parsedData.nodes,
            edges: parsedData.edges
        }
        var options = {
            nodes: {
                shape: 'box',
                borderWidth: 1,                
                color:"yellow",
            },        
            layout: {
                hierarchical: {
                    levelSeparation: 100,
                    nodeSpacing: 100,
                    parentCentralization: false,
                    direction: 'UD',        // UD, DU, LR, RL
                    sortMethod: 'directed',  // hubsize, directed
                    shakeTowards: 'leaves',  // roots, leaves                        
                },
            },                        
        };
        var network = new vis.Network(container, data, options);
        // return dotgen;
    }
}
// var list=[]
// var jsoncreate=JSON.stringify(list)
// sessionStorage.setItem("sales",jsoncreate)
// sessionStorage.setItem("clients",jsoncreate)
// sessionStorage.setItem("events",jsoncreate)

// testLD()
// CargaListas()
// sessionStorage.clear()

//*************************************************************************** */
//!---------------------------El famosisimo LOGIN -----------------------------

function login() {
    var usuarioingresado = document.querySelector("#user").value;
    var contrasenaingresada = document.querySelector("#contra").value;
    
    // //sino=true
    if (usuarioingresado == "" && contrasenaingresada == "") {
        alert("Por favor llene todos los campos.");
    }else {
        if (((usuarioingresado == "Admin") || (usuarioingresado == "admin") || (usuarioingresado == "ADMIN")) && ((contrasenaingresada == "1234" || (contrasenaingresada == "admin") || (contrasenaingresada == "ADMIN")))) {
            location.href = "\pages/Admin/PanelAdmin.html"
            console.log("hola") 
        }else{
            // sessionStorage.setItem("idVendedor",contrasenaingresada)
            avlVendedores=CargaListas()
            console.log(avlVendedores)
            avlVendedores.inOrden(avlVendedores.head)
            var list=sessionStorage.getItem("sales")
            if(list==null){
                list="[]"
            }
            var idiVende;
            listjson = JSON.parse(list);
            console.log(list)
            listjson.forEach(function(items) {
                if(items.username==usuarioingresado && items.pass==contrasenaingresada){
                    console.log("Bienvenido")
                    idiVende=items.id
                }
            });
            vendedor=avlVendedores.searchVendedor(parseInt(idiVende));
            if(vendedor!=null){
                console.log("Bienvenido: ****************")
                console.log(vendedor.username)
                sessionStorage.setItem("namecurrent",vendedor.username)
                sessionStorage.setItem("idcurrent",vendedor.id)
                location.href = "\pages/Vendedores/PanelVendedor.html"
            }else{
                alert("No autenticado :v")
            }
            // location.href = "\pages/Admin/PanelAdmin.html"
            // document.getElementById("elIdDeLaCapa").innerHTML=variable;
        }    
}
}
function CargaListas(){
    var list=sessionStorage.getItem("sales")
    var list2=sessionStorage.getItem("clients")
    var list3=sessionStorage.getItem("events")
    //instancio mi arbol
    var vendedornew = new AVL_vend();
    //!cargo mis vendedores  ---> Vendedoresobj(id, username, name, edad, mail, pass)
    // var list=[]
    // list.push(v1)
    // list.push(v2)
    // list.push(v3)
    // var jsoncreate=JSON.stringify(list)
    // console.log(jsoncreate)
    if(list==null){
        list="[]"
    }
    if(list2==null){
        list2="[]"
    }
    if(list3==null){
        list3="[]"
    }
    json = JSON.parse(list);
    console.log(json)
    var idi,username,nombre,edad,mail,pass= ""
    // var username=""
    // var nombre=""
    // var edad= ""
    // var mail= ""
    // var pass= ""
    json.forEach(function(items) {
        console.log('*********************');
        console.log('-->',items.id);
        console.log('-->',items.username);
        console.log('-->',items.name);
        console.log('-->',items.edad);
        console.log('-->',items.mail);
        console.log('-->',items.pass);
        idi=items.id
        username=items.username
        nombre=items.name
        edad=items.edad
        mail=items.mail
        pass=items.pass
        var add = new Vendedoresobj(parseInt(idi),username,nombre,edad,mail,pass);
        vendedornew.insertar(add)
        });
    
    //!cargo mis clientes --> Clienteobj(id,idvendedor, name, mail)
    // var list2=[]
    // list2.push(c1)
    // list2.push(c2)
    // list2.push(c3)
    // var jsoncreate2=JSON.stringify(list2)
    // console.log(jsoncreate2)
    json2 = JSON.parse(list2);
    console.log(json2)
    var idicliente,idvenCl,namecl,mailcl= ""
    json2.forEach(function(items) {
        console.log('*********************');
        console.log('-->',items.id);
        console.log('-->',items.idvendedor);
        console.log('-->',items.name);
        console.log('-->',items.mail);
        idicliente=items.id
        idvenCl=items.idvendedor
        namecl=items.name
        mailcl=items.mail
        var add = new Clienteobj(parseInt(idicliente),parseInt(idvenCl),namecl,mailcl);
        vendedornew.insetar_Cliente(parseInt(idvenCl),add)
        });
    //!cargo mis Eventos --> Eventobj(idvendedor, idmes, hora, dia, descripcion)
    // var list3=[]
    // list3.push(e1)
    // list3.push(e2)
    // list3.push(e3)
    // var jsoncreate3=JSON.stringify(list3)
    // console.log(jsoncreate3)
    json3 = JSON.parse(list3);
    console.log(json3)
    var idiev,idmes,hour,day,description= ""
    json3.forEach(function(items) {
        console.log('*********************');
        console.log('-->',items.idvendedor);
        console.log('-->',items.idmes);
        console.log('-->',items.hora);
        console.log('-->',items.dia);
        console.log('-->',items.descripcion);
        idiev=items.idvendedor
        idmes=items.idmes
        hour=items.hora
        day=items.dia
        description=items.descripcion
        var add = new Eventobj(parseInt(idiev),parseInt(idmes),hour,day,description);
        vendedornew.insetar_Mes(parseInt(idiev),parseInt(idmes))
        vendedornew.insetar_Evento(parseInt(idiev),parseInt(idmes),add)
        });
    // vendedornew.gendot_Calendar(2,)
    console.log(vendedornew)
    return vendedornew;
}

function onloadName(){
    var myname=sessionStorage.getItem("namecurrent")
    document.getElementById("prin").innerHTML = myname;
    document.getElementById("parrafo").innerHTML = myname;
    var txt="Bienvenido "+myname+" (Vendedor)"
    document.getElementById("tituo").innerHTML = txt;
}
// borrarSesion()

// function Copytext() {
//     /* Get the text field */
//     var copyText = document.getElementById("textar").value;
  
//     /* Select the text field */
//     copyText.select();
//     copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
//     /* Copy the text inside the text field */
//     navigator.clipboard.writeText(copyText.value);
    
//     /* Alert the copied text */
//     alert("Copied the text: " + copyText.value);
//   }
