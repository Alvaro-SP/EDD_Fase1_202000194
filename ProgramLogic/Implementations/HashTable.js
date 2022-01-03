class nodoHash{//este es el nodo  que apunta a mi objeto de datos de ventas
    constructor(data){
        this.data=data;
        this.products= new LD_product();
    }
}
class HashTable{//tabla hash que contendra la transaccion de ventas
    constructor(){
        this.keys=this.start_array(7)
        this.keys_used=0;
        this.size=7;
        this.contcolision=0
        this.graph=""
    }
    start_array(size){
        var keys=[]
        for(var i=0; i<size,i++;){
            keys[i]=null
        };
        return keys
    }
    compute_hash(data){
        var result=0;
        result=data %this.size;
        return result;
    }
    solColision(index){
        var new_index=0;
        var i=0;
        var enabled=false;
        while(enabled==false){
            new_index=index+Math.pow(i,2)
            if(new_index>=this.size){
                new_index=new_index-this.size;
            }
            //se necesita validar que la posicion del nuevo indice sea disponible:
            if(this.keys[new_index]==null){
                enabled=true;
                this.contcolision++;
            }
            
            
            i++;
        }
        return new_index;
    }
    insert(newNode){
        // var newNode= new nodoHash(value)
        var index=this.compute_hash(newNode.data.idVenta);
        //si la posición está disponible
        if(this.keys[index]==null){
            this.keys[index]=newNode;
            this.keys_used++;
        }else{
            index=this.solColision(index);
            this.keys[index]=newNode;
            this.keys_used++;
        }
        var use_percent = this.keys_used/this.size;
        if(use_percent>=0.5){
            this.rehashing();//aqui se hace el rehashing suponiendo que el porcentaje de la tabla excede el 50% DE SU ESPACIO LLENO
        }
        this.insertProductVenta(newNode)
    }
    insertProductVenta(productnew){
        for(var i=0;i<this.size;i++){
            if(this.keys[i]!=null){
                if(this.keys[i].data.idVendedor==productnew.idVendedor && this.keys[i].data.idCliente==productnew.idCliente);
                var productNode=this.buscarNodoProducto(productnew.idproduct)
                console.log(productNode)
                if (productNode!=null || productNode!=[]){
                    this.keys[i].products.add(productNode);
                    console.log("se ha ingresado el producto en la Venta encontrada.")
                }
            }else{
                console.log("No se encontró el producto!!!");
            };
        }
    }
    rehashing(){
        //se busca el siguiente numero que sea primo
        let cousin = false;
        var newtam = this.size;
        while(cousin==false){
            newtam++; 
            var cont=0;
            for(let i=newtam;i>0;i--){
                // console.log("b", cont)
                // console.log(newtam%i)
                if(newtam%i ==0){
                    cont++;
                }
            }
            //se valida cuantas veces se dividió exactamente 
            if(cont==2){
                cousin=true;
            }
        }
        //se crea un nuevo arreglo con el tamaño del siguiente numero primo
        var keys_aux = this.keys;
        this.size=newtam;
        this.keys=this.start_array(newtam);
        this.keys_used=0;
        for(var i=0;i<keys_aux.length;i++){
            if(keys_aux[i]!=null){
                this.insert(keys_aux[i]);
            }
        }
        
    }
    buscarNodoProducto(idproduct){
        var list4=sessionStorage.getItem("products")
        if(list4==null){
            list4="[]"
        }
        json4 = JSON.parse(list4);
        console.log(json4)
        var idi,name1,price1,cant1= ""
        json4.forEach(function(items) {
            console.log('*********************');
            console.log('-->',items.id);
            console.log('-->',items.name);
            console.log('-->',items.price);
            console.log('-->',items.cant);
            idi=items.id;
            name1=items.name;
            price1=items.price;
            cant1=items.cant;
            if(idi==idproduct){
                return JSON.parse(items)
            }
            // var add = new Productosobj(parseInt(idi),name1,price1,cant1);
            // productnew.insertB(add);
            });
        return null;
    }
    show(){
        for(var i=0;i<this.size;i++){
            if(this.keys[i]!=null){
                console.log("--->"+this.keys[i].data);
            }else{
                console.log("**********************************")
            }
        }
    }
    graphTable(){
        this.graph="digraph HashTable{\n";
        this.graph+="node[shape = record,fillcolor=\"yellow\" color=\"black\" style=\"filled\" label=\"{Valor|Posición}|";
        for(var i=0;i<this.size;i++){
            
            if(this.keys[i]!=null){
                this.graph+="{"+this.keys[i].data.idVenta+"|"+i+"}|";
            }else{
                this.graph+="{ |"+i+"}|";
            }
        }
        this.graph+="\"]a;\n}"
    }
}
//! LISTA ENLAZADA DE LOS PRODUCTOS DE CADA VENTA
class nodeLD_product{
    constructor(data,next){
        this.data=data;
        this.next=next;
    };
};
class LD_product{
    constructor(){
        this.head = null;
        this.size = 0;
    };
    add(data){
        const newNode = new nodeLD_product(data, null);
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
            result += current.data.idVenta+' -> ';
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
/************************************************************ */
//TODO ------------------OBJETO VENTAS-------------
function Ventasobj(idVenta,idVendedor, idCliente, idproduct, cantidad){
    this.idVenta=idVenta;
    this.idVendedor=idVendedor;
    this.idCliente=idCliente;
    this.idproduct=idproduct;
    this.cantidad=cantidad;
}

var p1= new Ventasobj(1,1,1,1,100)
var p2= new Ventasobj(2,2,2,2,100)
var p3= new Ventasobj(3,3,3,3,100)
var p4= new Ventasobj(4,4,4,4,100)
var p5= new Ventasobj(5,5,5,5,100)

var tabla = new HashTable();

// tabla.insert(new nodoHash(10));
// tabla.insert(new nodoHash(8));
// tabla.insert(new nodoHash(2));
// tabla.insert(new nodoHash(9));
// tabla.insert(new nodoHash(81));
// tabla.insert(new nodoHash(12));
// tabla.insert(new nodoHash(90));
// tabla.insert(new nodoHash(181));
// tabla.insert(new nodoHash(112));
// tabla.insert(new nodoHash(190));    
tabla.insert(new nodoHash(p1));    
tabla.insert(new nodoHash(p2));    
tabla.insert(new nodoHash(p3));    
tabla.insert(new nodoHash(p4));    
tabla.insert(new nodoHash(p5));    


// tabla.insert(10);
// tabla.insert(8);
// tabla.insert(2);
// tabla.insert(9);
// tabla.insert(81);
// tabla.insert(12);
// tabla.insert(90);
// tabla.insert(181);
// tabla.insert(112);
// tabla.insert(190);

tabla.show();
tabla.graphTable()
console.log(tabla.graph)