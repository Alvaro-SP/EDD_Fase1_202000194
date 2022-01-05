
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
        // this.calendar=new allCalendar();
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
            return tmphead.data.cliente
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
            return tmphead.data;
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
                    tempMes.insert(id_mes, obj_evento.descripcion,obj_evento.dia,obj_evento.hora)
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
    //ROTACIONES
    //simple izquerda
    r_izquierda(nodo){
        let aux = nodo.izquierda;
        nodo.izquierda= aux.derecha;
        aux.derecha = nodo;
        nodo.altura = this.altura_maxima(this.altura(nodo.derecha),this.altura(nodo.izquierda)) +1;
        aux.altura = this.altura_maxima(nodo.altura.altura,this.altura(nodo.izquierda))+1;
        return aux;
    }
    //simple derecha
    r_derecha(nodo){
        let aux = nodo.derecha;
        nodo.derecha= aux.izquierda;
        aux.izquierda = nodo;
        nodo.altura = this.altura_maxima(this.altura(nodo.izquierda),this.altura(nodo.derecha)) +1;
        aux.altura = this.altura_maxima(nodo.altura.altura,this.altura(nodo.derecha))+1;
        return aux;
    }
    //rotacion izq-der
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
    generarDot(){
        let cadena="digraph arbol {\n";
        cadena+= this.generar_nodos(this.head);
        cadena+="\n";
        cadena+=this.enlazar(this.head);
        cadena+="\n}";
        console.log(cadena);
    }
    generar_nodos(raiz_actual){ 
        let nodos ="";
        if(raiz_actual != null){
            nodos+= "n"+raiz_actual.data.id+"[label=\""+raiz_actual.data.id+"\"]\n";
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
            }
            if(raiz_actual.derecha != null){
                cadena+="n"+raiz_actual.data.id + "-> n"+raiz_actual.derecha.data.id+"\n";
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
                    tempMes.graficar_matriz()
                    // console.log("Se agregó un EVENTO"," dia: ",obj_evento.dia," hora: ", obj_evento.hora, " motivo: ", obj_evento.descripcion)
                    return true
                // }
            }
            console.log("No existe ningun evento en el mes de: ", id_mes)
            return false
        }
        console.log("No existe un Vendedor con el id ingresado:", id_vendedor)
        return false
    }
    gendot_Clientes(id_vendedor){
        
    }
}
//*************************************************************************** */
//!---------------------------CLIENTES LISTA DOBLE -----------------------------
//TODO ------------------OBJETO CLIENTES-------------
function Clienteobj(id, name, mail){
    this.id=id;
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
    
    //REMOVER UN ELEMENTO DE LA LISTA BASADO EN DATA
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
    grapnlist(){
        if(!this.size){
            return null
        };
        let current = this.head;
        let cadena="";
        cadena+= "digraph Matriz{ \n";
        cadena+= "node[shape = box,width=0.7,height=0.7,fillcolor=\"yellow\" color=\"black\" style=\"filled\"];\n";
        cadena+= "edge[style = \"bold\"]; \n"
        //graficar el nodo matriz
        cadena+="node[label = Matriz fillcolor=\" red\"]Inicio;"
        while(current){
            cadena+="node[label = \""+current.data.id+"\n"+current.data.name+"\n"+current.data.mail+"\" fillcolor=\" orange\" ]x"+current.data.id+";\n"
            // result += current.data.id+' -> ';
            current=current.next;
        };
        current2=this.head
        while(current2){
            cadena+=current2.data.id+"->"+current2.next.data.id+"\n"+";\n"
            
            current2=current2.next;
        }    
        console.log(cadena)    
        return cadena

    }
};
//*************************************************************************** */
//!--------------------------- CALENDARIO -----------------------------
//TODO ------------------OBJETO EVENTO-------------
function Eventobj(idvendedor, idmes, hora, dia, descripcion){
    this.idvendedor=idvendedor;
    this.idmes=idmes;
    this.hora=hora;
    this.dia=dia;
    this.descripcion=descripcion;
}

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
    //REMOVER UN ELEMENTO DE LA LISTA BASADO EN DATA
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

//! MATRIZ DINÁMICA CON HORAS Y DIAS CON SU DESCRIPCIÓN.
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
}
//nodos cabeceras 
class nodoheaders{
    constructor(data){
        this.data=data;
        this.siguiente=null
        this.anterior=null
        this.matrizDescripciones=new matrizDescripciones();
    }
}//matriz descripciones tambien denominada matriz interna
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
}//lista de cabeceras en X y en Y
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
}//MATRIZ del CALENDARIO PRINCIPAL
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
        cadena+= "digraph Matriz{ \n";
        cadena+= "node[shape = box,width=0.7,height=0.7,fillcolor=\"azure2\" color=\"black\" style=\"filled\"];\n";
        cadena+= "edge[style = \"bold\"]; \n"
        //graficar el nodo matriz
        cadena+="node[label = Matriz fillcolor=\" red\" pos = \"-1,1!\"]principal;"
        //graficar cabeceras X
        let aux_x = this.headersX_hour.head;
        while(aux_x!=null){
            cadena+="node[label = "+aux_x.data+" fillcolor=\" orange\" pos = \""+aux_x.data+",1!\"]x"+aux_x.data+";\n"
            aux_x = aux_x.siguiente;
        }
        aux_x = this.headersX_hour.head;
        while(aux_x.siguiente != null){
            cadena+="x"+aux_x.data+"->"+"x"+aux_x.siguiente.data+";\n"
            cadena+="x"+aux_x.siguiente.data+"->"+"x"+aux_x.data+";\n"
            aux_x = aux_x.siguiente;
        }

        if(this.headersX_hour.head!= null){
            cadena+="principal->x"+this.headersX_hour.head.data+";\n";
        }
        //graficar cabeceras Y
        let aux_y = this.headersY_day.head;
        while(aux_y!=null){
            cadena+="node[label = "+aux_y.data+" fillcolor=\" orange\" pos = \"-1,-"+aux_y.data+"!\"]y"+aux_y.data+";\n"
            aux_y = aux_y.siguiente;
        }
        aux_y = this.headersY_day.head;
        while(aux_y.siguiente != null){
            cadena+="y"+aux_y.data+"->"+"y"+aux_y.siguiente.data+";\n"
            cadena+="y"+aux_y.siguiente.data+"->"+"y"+aux_y.data+";\n"
            aux_y = aux_y.siguiente;
        }

        if(this.headersX_hour.head!= null){
            cadena+="principal->y"+this.headersY_day.head.data+";\n";
        }
        //graficar nodos internos
        aux_x = this.headersX_hour.head;
        while(aux_x!=null){ //recorrer listas de x para graficar los nodos de sus lista interna
            let aux = aux_x.matrizDescripciones.head;
            while(aux!=null){
                cadena+="   node[label = "+aux.data+" fillcolor=\" green\" pos = \""+aux.x+",-"+aux.y+"!\"]x"+aux.x+"y"+aux.y+";\n"
                aux = aux.siguiente;
            }

            //graficar flechitas
            aux = aux_x.matrizDescripciones.head;
            while(aux.siguiente!= null){
                cadena+="   x"+aux.x+"y"+aux.y+"->x"+aux.siguiente.x+"y"+aux.siguiente.y+";\n";
                cadena+="   x"+aux.siguiente.x+"y"+aux.siguiente.y+"->x"+aux.x+"y"+aux.y+";\n";
                aux= aux.siguiente;
            }
            if(aux_x.matrizDescripciones.head!= null){
                cadena+="x"+aux_x.data+"->"+"x"+aux_x.matrizDescripciones.head.x+"y"+aux_x.matrizDescripciones.head.y+";\n";
            }

            aux_x = aux_x.siguiente;
        }

        aux_y = this.headersY_day.head;
        while(aux_y!=null){ //recorrer la lista de y para graficar cada lista
            //graficar flechitas Y
            let aux = aux_y.matrizDescripciones.head;
            while(aux.abajo!= null){
                cadena+="   x"+aux.x+"y"+aux.y+"->x"+aux.abajo.x+"y"+aux.abajo.y+";\n";
                cadena+="   x"+aux.abajo.x+"y"+aux.abajo.y+"->x"+aux.x+"y"+aux.y+";\n";
                aux= aux.abajo;
            }
            if(aux_y.matrizDescripciones.head!= null){
                cadena+="y"+aux_y.data+"->"+"x"+aux_y.matrizDescripciones.head.x+"y"+aux_y.matrizDescripciones.head.y+";\n";
            }
            aux_y = aux_y.siguiente;
        }

        cadena+= "\n}"
        console.log(cadena);
    }

}
var v1 =new Vendedoresobj(1, "alvaro", "juanito", "edad", "ail", "pass")
var v2 =new Vendedoresobj(2, "ema", "juanito", "edad", "ail", "pass")
var v3 =new Vendedoresobj(3, "socop", "juanito", "edad", "ail", "pass")
var c1 =new Clienteobj(1, "cliente1", "mail")
var c2 =new Clienteobj(2, "cliente2", "asfd")
var c3 =new Clienteobj(3, "cliente3", "asfd")
var e1 = new Eventobj(1, 12, "10", 24, "nochebuena")
var e2 = new Eventobj(1, 12, "10", 25, "NAVIDAD")
var e3 = new Eventobj(1, 12, "10", 25, "NAVIDAD")
var e4 = new Eventobj(1, 12, "10", 25, "NAVIDAD")
var e5 = new Eventobj(1, 12, "10", 25, "NAVIDAD")

// var va = new AVL_vend();
var vendedornew = new AVL_vend();
var list=[]
list.push(v1)
list.push(v2)
list.push(v3)
var jsoncreate=JSON.stringify(list)
console.log(jsoncreate)
json = JSON.parse(jsoncreate);
console.log(json)
var idi =    ""
var name=   ""
var adress= ""
var tel=    ""
var mail=   ""
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
    mail=items.correo
    pass=items.pass
    var add = new Vendedoresobj(parseInt(idi),username,nombre,edad,mail,pass);
    
    vendedornew.insertar(add)



    // if(Proveedoresg==null){ 
    //     var Proveedoresg= new BST_prov();           
    //     Proveedoresg.insert(add);
    //     sessionStorage.setItem("BST",JSON.stringify(Proveedoresg));
        
    // }else if(Proveedoresg.intree(parseInt(idi))){
    //     alert("El id del Proveedor ya existe en el sistema.");
    // }
    // else{
    //     Proveedoresg.insert(add);
    //     sessionStorage.setItem("BST",JSON.stringify(Proveedoresg));
    // }
    });
// va.insertar(v1)
// va.insertar(v2)
// va.insetar_Cliente(1,c1)
// va.insetar_Cliente(1,c2)
// console.log("insert mes")
// va.insetar_Mes(1,1)
// va.insetar_Mes(1,2)
// va.insetar_Mes(1,12)
// console.log("insert evento")
// va.insetar_Evento(1,2,e1)
// va.insetar_Evento(1,1,e1)
// va.insetar_Evento(1,12,e1)

// va.insetar_Mes(1,8)
// va.insetar_Evento(1,12,e2)
// va.generarDot()

// console.log(va)
// console.log(va.intreeClient(1,1))
function recu(){
    var lista_tem = JSON.parse(sessionStorage.getItem("vendedor"));    
    va = new AVL_vend();
    lista_tem = CircularJSON.parse(lista_tem);

    Object.assign(va,lista_tem);
    // console.log(lista_tem)
    // console.log(va)
    // console.log("hoisadjfoiasdfj")
    // va.inOrden()
    // // son cada uno de mis vendedores
    // Vendedoraux=lista_tem.head
    // Vendedoraux2=lista_tem.head
    // Vendedoraux3=lista_tem.head
    // //ESTE ES EL WHILE PARA RECUPERAR
    // while(Vendedoraux!= null){
    //     //Recuperación de los CLIENTES
    //     // try {
            
    //     var clientetemp = Vendedoraux.cliente;
    //     // if(clientetemp!=null){
            
    //     var clientenew = new LD_client();
    //     Object.assign(clientenew,clientetemp);
    //     Vendedoraux.cliente = clientenew;
    //     console.log("objeto con funciones del cliente:")
    //     console.log(Vendedoraux.cliente);
    //     console.log(Vendedoraux);
    //         // console.log(Vendedoraux.cliente);
    //     // }else{
    //     //     var clientenew = new LD_client();
    //     //     Vendedoraux.cliente = clientenew;
    //     // }
            
    //     // } catch (error) {
    //     //     var clientenew = new LD_client();
    //     //     Vendedoraux.cliente = clientenew;
    //     // }        
        
        
    //     Vendedoraux = Vendedoraux.siguiente;
    // }
    // va.inOrden()
    // while (Vendedoraux2!=null){
    //     //Recuperacion de los meses
    //     // try {
    //     var mesestemp = Vendedoraux2.mes;
    //     var mesesnew = new LD_Month();
    //     Object.assign(mesesnew,mesestemp);
    //     Vendedoraux2.mes=mesesnew;
    //     console.log(Vendedoraux2.mes)
    //     // } catch (error) {
    //     //     var mesesnew = new LD_Month();
    //     //     Vendedoraux.mes = mesesnew;
    //     // }

    //     Vendedoraux2=Vendedoraux2.siguiente
    // }
    console.log("con las funciones de meses: ")
    console.log(va)
    // while(Vendedoraux3!=null){
    //     var calendaraux = mesestemp
    //     console.log(calendaraux.calendar)
    //     //Recuperacion de la matriz
    //     while(calendaraux!=null){
    //         console.log("///")
    //         try {
    //             var calendartemp = calendaraux.calendar
    //             var calendarnew = new allCalendar();
    //             Object.assign(calendarnew,calendartemp)
    //             calendaraux.calendar=calendarnew

    //             var hourtemp = calendartemp.headersX_hour
    //             var daytemp = calendartemp.headersY_day
    //             var headersX_hournew = new listheaders();
    //             var headersY_daynew = new listheaders();
    //             Object.assign(headersX_hournew,hourtemp)
    //             Object.assign(headersY_daynew,daytemp)
    //             calendartemp.headersX_hour=headersX_hournew
    //             calendartemp.headersY_day=headersY_daynew

    //             console.log(calendaraux.calendar )
    //         } catch (error) {
    //             var calendartemp = calendaraux.calendar
    //             var calendarnew = new allCalendar();
    //             console.log(calendarnew)
    //             calendaraux.calendar=calendarnew
    //             var headersX_hournew = new listheaders();
    //             var headersY_daynew = new listheaders();
    //             calendartemp.headersX_hour=headersX_hournew
    //             calendartemp.headersY_day=headersY_daynew
                
    //             console.log(calendaraux.calendar)
    //         }
    //         calendaraux2=calendaraux2.next
    //     }
    //     Vendedoraux3=Vendedoraux3.siguiente
    // }
    
    //FIN DEL WHILE PARA RECUPERAR

    // console.log(lista_tem)
    if(lista_tem!=null){
        console.log("insertando un mes nuevamente")
        // va.insetar_Mes(1,10)
        // va.inOrden()
        va.insetar_Cliente(c3)
        va.insetar_Evento(1,10,e3)
        console.log(va)
        // console.log(va.intreeClient(2))
        console.log("ESTA ENTRANDO A LA SEGUNDA VEZ")
        // lista.inOrden(lista.head)
        console.log(va)
        var lista_temp = CircularJSON.stringify(va);
        var lista_temp2=JSON.stringify(lista_temp)
        sessionStorage.setItem("vendedor",lista_temp2)
        
    }else{
        console.log("ESTA ENTRANDO A LA PRIMERA VEZ")
        var va = new AVL_vend();
        va.insertar(v1)
        va.insertar(v2)
        va.insetar_Cliente(1,c1)
        va.insetar_Cliente(1,c2)
        console.log("insert mes")
        va.insetar_Mes(1,1)
        va.insetar_Mes(1,2)
        va.insetar_Mes(1,12)
        console.log("insert evento")
        va.insetar_Evento(1,2,e1)
        va.insetar_Evento(1,1,e1)
        va.insetar_Evento(1,12,e1)
        var lista_temp = CircularJSON.stringify(va);
        var lista_temp2=JSON.stringify(lista_temp)
        sessionStorage.setItem("vendedor",lista_temp2)
    }
}

// sessionStorage.clear()
// recu()
