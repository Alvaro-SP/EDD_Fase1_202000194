//! Creación de mi Arbol B de grado 5
//primero que nada se crea el nodo que necesitaremos para  nuestro arbol
class nodoBTree{
    constructor(data){
        this.data=data
        this.izquierda=null  //sirven como apuntadores del arbol de tipo paginas
        this.derecha=null
        this.siguiente=null  //sirven como apuntadores de lista del nodo 
        this.prev=null
    }
}
//* Lista para guardar los valores 
class lista_Btreenode{
    constructor(){
        this.head=null
        this.end=null
        this.size=0
    }
    insertar(nuevo){
        if(this.head==null){
            this.head=nuevo
            this.end=nuevo;
            this.size++;
            return true;
        }else{// esto valida si solo se tiene un dato en el arbol
            if(this.head == this.end){ 
                if(nuevo.data.id < this.head.data.id){
                    nuevo.siguiente = this.head;
                    this.head.prev = nuevo;
                    //cambiar punteros de paginas
                    this.head.izquierda = nuevo.der;

                    this.head = nuevo;
                    this.size++;
                    return true;
                }else if(nuevo.data.id> this.end.data.id){
                    this.end.siguiente = nuevo;
                    nuevo.prev = this.end;
                    //cambiar punteros de paginas
                    this.end.der = nuevo.izquierda;

                    this.end = nuevo;
                    this.size++;
                    return true;
                }else{ // el dato es igual al primero
                    console.log("Ya existe un dato con ese valor en la lista");
                    return false;
                }
            }else{ //ahora bien si se tiene mas de un dato
                if(nuevo.data.id < this.head.data.id){
                    //si el dato es menor que mi cabeza
                    nuevo.siguiente = this.head;
                    this.head.prev = nuevo;
                    //se cambian los punteros de mi pagina
                    this.head.izquierda = nuevo.derecha;

                    this.head = nuevo;
                    this.size++;
                    return true;
                }else if(nuevo.data.id> this.end.data.id){
                    this.end.siguiente = nuevo;
                    nuevo.prev = this.end;
                    //cambiar punteros de paginas
                    this.end.derecha = nuevo.izquierda;

                    this.end = nuevo;
                    this.size++;
                    return true;
                }else{
                    let aux = this.head;
                    while(aux != null){
                        if(nuevo.data.id < aux.data.id){
                            nuevo.siguiente = aux;
                            nuevo.prev = aux.prev;
                            // se cambian los punteros de las paginas
                            aux.izquierda= nuevo.derecha;
                            aux.prev.derecha = nuevo.izquierda;
                            
                            aux.prev.siguiente = nuevo;
                            aux.prev = nuevo;
                            this.size++;
                            return true;
                        }else if(nuevo.data.id == aux.data.id){
                            console.log("Ya existe un dato con ese valor en la lista");
                            return false;
                        }else{
                            aux = aux.siguiente;
                        }
                    }
                }
            }
        }
    }
}
// Página del  arbol necesaria para crear el Arobol B
class mypage{
    constructor(){
        this.root=false
        this.maxkey=4
        this.minkey=2
        this.size=0
        this.keys=new lista_Btreenode();
    }
    insertInpage(node){
        if(this.keys.insertar(node)){
            this.size=this.keys.size;
            if(this.size<5){
                return this;
            }else if(this.size==5){
                return this.divPage(this)
            }
        }
    }

    divPage(page){
        var temp = page.keys.head;
        //con esto nos ubicamos en la posicion a la mitad de nuestra lista para subdividir
        for(var i=0; i<2; i++){
            temp=temp.siguiente;
        }
        var first = page.keys.head;
        var second = page.keys.head.siguiente;
        var third = temp.siguiente;
        var fourth = page.keys.end;

        first.siguiente = null;
        first.prev = null;

        second.siguiente = null;
        second.prev = null;

        third.siguiente = null;
        third.prev = null;

        fourth.siguiente = null;
        fourth.prev = null;

        temp.siguiente = null;
        temp.prev = null;

        // Aqui se crean las nuevas paginas.
        var page_left = new mypage();
        page_left.insertInpage(first);
        page_left.insertInpage(second);
        // ahora inserto la pagina derecha.
        var pag_fight = new mypage()
        pag_fight.insertInpage(third);
        pag_fight.insertInpage(fourth);

        temp.izquierda = page_left;
        temp.derecha = pag_fight;

        return temp;

    }

    isSheet(page){
        if(page.keys.head.izquierda==null){
            return true;
        }else{
            return false;
        }
    }
}
//Now i can declare my Tree B class that being the principal class.
class myTreeB{
    constructor(){
        this.root=null;
        this.order=5;
        this.heigth=0;
        this.dot=""
    }
    insertB(data){
        var newNode = new nodoBTree(data);
        if(this.root==null){
            this.root= new mypage();
            this.root.root=true;
            this.root=this.root.insertInpage(newNode);
        }else{
            if(this.heigth==0){
                var response = this.root.insertInpage(newNode);
                // si la raiz o cabeza no se ha dividido ...
                if(response instanceof mypage){
                    this.root = response;
                }else{
                    this.heigth++;
                    this.root = new mypage();
                    this.root = this.root.insertInpage(response);
                }
            }else{ 
                //ssi ya hay mas de una pagina tenemos que recorrer el arbol para despues insertar el nuevo nodo.
                if(this.root == null){
                    console.log("La raiz esta vacia.")
                    return;
                }   
                var response = this.insertar_recorrer(newNode,this.root);
                if(response instanceof nodoBTree){ // la root se dividio
                    this.heigth++;
                    this.root = new mypage();
                    this.root = this.root.insertInpage(response);
                }else if(response instanceof mypage){
                    this.root = response;
                }
            }
        }
    }

    insertar_recorrer(newnode, actual_page){
        if(actual_page.isSheet(actual_page)){
            var response = actual_page.insertInpage(newnode);
            return response;
        }else{// si el dato es menor que la cabeza de mi clave de la pagina actual se va a la izquierda
            if(newnode.data.id < actual_page.keys.head.data.id){ 
                var response = this.insertar_recorrer(newnode,actual_page.keys.head.izquierda);
                //en este instante la pagina esta dividida y necesito insertar en la pagina actual
                if(response instanceof nodoBTree){  //verifico que la respuesta sea instancia del nodo
                    return actual_page.insertInpage(response);
                }else if(response instanceof mypage){
                    actual_page.keys.head.izquierda = response;
                    return actual_page;
                }
                //sino se va a la derecha porque el dato del nuevo nodo es mayor
            }else if(newnode.data.id > actual_page.keys.end.data.id){ 
                var response = this.insertar_recorrer(newnode,actual_page.keys.end.derecha);
                if(response instanceof nodoBTree){
                    return actual_page.insertInpage(response);
                }else if(response instanceof mypage){
                    actual_page.keys.end.derecha = response;
                    return actual_page;
                }
            }else{ 
                // va en los apuntadores de los nodos de en medio
                var aux = actual_page.keys.head;

                while(aux != null){
                    if(newnode.data.id < aux.data.id){
                        var response = this.insertar_recorrer(newnode, aux.izquierda);
                        if(response instanceof nodoBTree){ 
                            return actual_page.insertInpage(response);
                        }else if(response instanceof mypage){
                            aux.izquierda = response;
                            aux.prev.derecha = response;
                            return actual_page;
                        }
                    }else if(newnode.data.id == aux.data.id){
                        return actual_page;
                    }else{
                        aux = aux.siguiente;
                    }
                }
            }
        }
        return this;
    }

    gendot(){
        var cadena="digraph B_Tree{\n";
        this.dot="{\m"
        cadena+="rankr=TB;\n";
        this.dot+="rankr=TB;\n";

        cadena+="node[shape = box,fillcolor=\"yellow\" color=\"black\" style=\"filled\"];\n";
        cadena+= this.graph_nodes(this.root);
        this.dot+= this.graph_nodes2(this.root);
        cadena+=  this.enlazar(this.root);
        this.dot+=  this.enlazar(this.root);
        cadena+="}\n"
        this.dot+="}\n"
        return cadena;
    }

    graph_nodes(raiz_actual){
        var cadena="";

        if(raiz_actual.isSheet(raiz_actual)){ 
            cadena+="node[shape=record label= \"<p0>"
            var contador=0;
            var aux = raiz_actual.keys.head;
            while(aux!=null){
                contador++;//+"/"+aux.data.name+"/"+aux.data.price+"/"+aux.data.cant
                cadena+="|{"+aux.data.id+"/"+aux.data.name+"/"+aux.data.price+"/"+aux.data.cant+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raiz_actual.keys.head.data.id+";\n";
            return cadena;
        }else{
            cadena+="node[shape=record label= \"<p0>"
            var contador=0;
            var aux = raiz_actual.keys.head;
            while(aux!=null){
                contador++;
                cadena+="|{"+aux.data.id+"/"+aux.data.name+"/"+aux.data.price+"/"+aux.data.cant+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raiz_actual.keys.head.data.id+";\n";

            //recorrer los hicos de cada clave
            aux = raiz_actual.keys.head;
            while(aux != null){
                cadena+= this.graph_nodes(aux.izquierda);
                aux = aux.siguiente;
            }
            cadena+= this.graph_nodes(raiz_actual.keys.end.derecha);
            return cadena;
        }   
    }

    graph_nodes2(raiz_actual){
        var cadena="";

        if(raiz_actual.isSheet(raiz_actual)){ 
            cadena+="node[shape=record fillcolor=\"yellow\" label= \""
            var contador=0;
            var aux = raiz_actual.keys.head;
            while(aux!=null){
                contador++;
                cadena+="|{"+aux.data.id+"}|";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raiz_actual.keys.head.data.id+";\n";
            return cadena;
        }else{
            cadena+="node[shape=record fillcolor=\"yellow\" label= \""
            var contador=0;
            var aux = raiz_actual.keys.head;
            while(aux!=null){
                contador++;
                cadena+="|{"+aux.data.id+"}|";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raiz_actual.keys.head.data.id+";\n";

            //recorrer los hicos de cada clave
            aux = raiz_actual.keys.head;
            while(aux != null){
                cadena+= this.graph_nodes2(aux.izquierda);
                aux = aux.siguiente;
            }
            cadena+= this.graph_nodes2(raiz_actual.keys.end.derecha);
            return cadena;
        }   
    }

    enlazar(raiz_actual){
        let cadena="";
        if(raiz_actual.isSheet(raiz_actual)){
            return ""+raiz_actual.keys.head.data.id+";\n";
        }else{
            

            let aux = raiz_actual.keys.head;
            let contador =0;
            let current_root_txt = raiz_actual.keys.head.data.id;
            while(aux != null){
                cadena+= "\n"+current_root_txt+":p"+contador+"->"+this.enlazar(aux.izquierda);
                contador++;
                aux = aux.siguiente;
            }
            cadena+="\n"+current_root_txt+":p"+contador+"->"+this.enlazar(raiz_actual.keys.end.derecha);
            return cadena;
        }
    }
}

function B(){
    /************************************************************ */
    //TODO ------------------OBJETO PRODUCTOS-------------
    function Productosobj(id,  name, price, cant){
        this.id=id;
        this.name=name;
        this.price=price;
        this.cant=cant;
    }
    var p1= new Productosobj(1,"name",2,3)
    var p2= new Productosobj(2,"name",2,3)
    var p3= new Productosobj(3,"name",2,3)
    var p4= new Productosobj(4,"name",2,3)
    var p5= new Productosobj(15,"name",2,3)
    var p6= new Productosobj(16,"name",2,3)
    var p7= new Productosobj(45,"name",2,3)
    let arbol = new myTreeB();
    // arbol.insertB(5);
    // arbol.insertB(1);
    // arbol.insertB(7);
    // arbol.insertB(3);
    // arbol.insertB(13);
    // arbol.insertB(8);
    // arbol.insertB(35);
    // arbol.insertB(14);
    // arbol.insertB(10);
    // arbol.insertB(9);
    // arbol.insertB(12);
    // arbol.insertB(17);
    // arbol.insertB(22);
    // arbol.insertB(25);
    // arbol.insertB(100);
    // arbol.insertB(150);
    // arbol.insertB(220);
    // arbol.insertB(325);
    arbol.insertB(p1);
    arbol.insertB(p2);
    arbol.insertB(p3);
    arbol.insertB(p4);
    arbol.insertB(p5);
    arbol.insertB(p6);
    arbol.insertB(p7);

    console.log(arbol.gendot());

    console.log(arbol.dot)
    return arbol.dot
}
B()