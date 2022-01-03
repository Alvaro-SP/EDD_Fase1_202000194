class nodoGrafo{
    constructor(data){
        this.data=data;
        this.siguiente=null;
        this.anterior=null;
        this.marca=false;
        this.ponderation=0;
        this.adyacentes=new listaAdyacente();
    }
}
class listaAdyacente{
    constructor(){
        this.head=null;
        this.end=null;
    }

    insertNodo(data){
        var newNodo=new nodoGrafo(data);
        newNodo.ponderation=data.val;
        if(this.head==null){
            this.head=newNodo;
            this.end=newNodo;
        }else{
            if(this.head==this.end){
                this.head.siguiente=newNodo;
                newNodo.anterior=this.head;
                this.end=newNodo;
            }else{
                newNodo.anterior=this.ultimo;
                this.end.siguiente=newNodo;
                this.end=newNodo;
            }
        }
    }
}
class GrafoRuta{
    constructor(){
        this.head=null;
        this.end=null;
        
        this.start=0;
        this.end=0;
    }
    insertRuta(data){
        var newNodo=new nodoGrafo(data);

        if(this.head==null){
            this.head=newNodo;
            this.end=newNodo;
        }else{
            if(this.head == this.end){
                this.head.siguiente = newNodo;
                newNodo.anterior = this.head;
                this.end = newNodo;
            }else{
                newNodo.anterior = this.end;
                this.end.siguiente = newNodo;
                this.end= newNodo;
            }
        }
    }
    searchNode(id){
        var aux = this.head;
        while(aux!=null){
            if(aux.data.id==id){
                return aux;
            }else{
                aux=aux.siguiente;
            }
        }
    }
    add_adjacent(data){
        var principal = this.searchNode(data.id);
        if(principal!=null){
            principal.adyacentes.insertNodo(data);
        }else{
            console.log("Nodo no existe en el origen.");
        };
    }
    genMatrizAdyacente(){
        var dis=[]
        var aux=this.head;
        aux = this.head;
        while(aux != null){
            // [
            //     ['A',   [['B', 20], ['C', 20]] ],
            //     ['B',   [['A', 30], ['C', 100]] ],
            //     ['C',   [['D', 10], ['A', 20]] ],
            //     ['D',   [['C', 10], ['B', 20]] ]
            // ]
            var distemp=[]
            let aux2 = aux.adyacentes.head;
            distemp.push(String(aux.data.id))
            var adydises=[]
            while(aux2 != null){
                adydises.push([String(aux2.data.idad), aux2.ponderation])
                // cadena+= "n"+aux.data.id+" -> n"+aux2.data.idad+" [label=\""+aux2.ponderation+"km\"]; \n";
                aux2 = aux2.siguiente;
            }
            distemp.push(adydises)
            dis.push(distemp);
            aux = aux.siguiente;
        }
        return dis
    }
    findShortPath(start, end){
        if (start === end) {
            var aux = this.searchNode(start);
            aux.marca=true;
			return this.gendot();
		} else {
            var aux3 = this.searchNode(start);
            aux3.marca=true;
			var matriz=this.genMatrizAdyacente();
            console.log(matriz)
            var d = new Dijkstras();
            d.setGraph(matriz);
            var path = d.getPath(start, end);
            console.log(path)
            console.log(typeof(path[0]))
            var aux=this.head;
            
            while(aux != null){
                
                console.log(String(aux.data.id))
                if(path.includes(String(aux.data.id))){
                    aux.marca=true;
                }
                aux = aux.siguiente;
            }
            var newpath=this.gendot()
            return newpath
		}
    }
    gendot(){
        var cadena="digraph GrafoPonderado{\n rankdir=\"LR\" \n";
        cadena+="bgcolor=\"dodgerblue3\" "
        cadena+= "node[shape = circle,fillcolor=\"yellow\" color=\"black\" style=\"filled\"];\n";
        var aux=this.head;
        while(aux != null){
            console.log(aux.marca)
            if(aux.marca==true){
                cadena+="n"+aux.data.id+"[label= \""+aux.data.id+"/"+aux.data.nombre+"\" fillcolor=\"green1\"];\n"
            }else{
                cadena+="n"+aux.data.id+"[label= \""+aux.data.id+"/"+aux.data.nombre+"\"];\n"
            }
            
            aux = aux.siguiente;
        }
        // graficar relaciones
        aux = this.head;
        while(aux != null){
            let aux2 = aux.adyacentes.head;
            while(aux2 != null){
                cadena+= "n"+aux.data.id+" -> n"+aux2.data.idad+" [label=\""+aux2.ponderation+"km\"]; \n";
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
        cadena += "}"
        console.log(cadena);
        return cadena
    }

    
}
/**
* @class Dijkstras
**/
var Dijkstras = (function () {

    var Dijkstras = function () {
        this.graph = [];
        this.queue;
        this.distance = [];
        this.previous = []
    }

    /**
    * Creates a graph from array.
    * Each element in the array should be in the format:
    * 	[NODE NAME, [[NODE NAME, COST], ...] ]
    *
    * For example: 	[
    *		['A', [['B', 20], ['C', 20]] ],
    *		['B', [['A', 30], ['C', 100]] ],
    *		['C', [['D', 10], ['A', 20]] ],
    *		['D', [['C', 10], ['B', 20]] ]
    *	]
    *
    * @param graphy Array of nodes and vertices.
    **/
    Dijkstras.prototype.setGraph = function (graph)
    {
        // Error check graph
        if (typeof graph !== 'object') {
            throw "graph isn't an object (" + typeof graph + ")";
        }

        if (graph.length < 1) {
            throw "graph is empty";
        }

        for (var index in graph) {
            // Error check each node
            var node = graph[index];
            if (typeof node !== 'object' || node.length !== 2) {
                throw "node must be an array and contain 2 values (name, vertices). Failed at index: " + index;
            }

            var nodeName = node[0];
            var vertices = node[1];
            this.graph[nodeName] = [];

            for (var v in vertices) {
                // Error check each node
                var vertex = vertices[v];
                if (typeof vertex !== 'object' || vertex.length !== 2) {
                    throw "vertex must be an array and contain 2 values (name, vertices). Failed at index: " + index + "[" + v + "]" ;
                }
                var vertexName = vertex[0];
                var vertexCost = vertex[1];
                this.graph[nodeName][vertexName] = vertexCost;
            }
        }
    }

    /**
    * Find shortest path
    *
    * @param source The starting node.
    * @param target The target node.
    * @return array Path to target, or empty array if unable to find path.
    */
    Dijkstras.prototype.getPath = function (source, target)
    {
        // Check source and target exist
        if (typeof this.graph[source] === 'undefined') {
            throw "source " + source + " doesn't exist";
        }
        if (typeof this.graph[target] === 'undefined') {
            throw "target " + target + " doesn't exist";
        }

        // Already at target
        if (source === target) {
            return [];
        }

        // Reset all previous values
        this.queue = new MinHeap();
        this.queue.add(source, 0);
        this.previous[source] = null;

        // Loop all nodes
        var u = null
        while (u = this.queue.shift()) {
            // Reached taget!
            if (u === target) {
                var path = [];
                while (this.previous[u] != null) {
                    path.unshift(u);
                    u = this.previous[u];
                }
                return path;
            }

            // all remaining vertices are inaccessible from source
            if (this.queue.getDistance(u) == Infinity) {
                return [];
            }

            var uDistance = this.queue.getDistance(u)
            for (var neighbour in this.graph[u]) {
                var nDistance = this.queue.getDistance(neighbour),
                    aDistance = uDistance + this.graph[u][neighbour];

                if (aDistance < nDistance) {
                    this.queue.update(neighbour, aDistance);
                    this.previous[neighbour] = u;
                }
            }
        }

        return [];
    }



    // Fibonacci Heap (min first)
    var MinHeap = (function() {
        var MinHeap = function () {
            this.min = null;
            this.roots = [];
            this.nodes = [];
        }

        MinHeap.prototype.shift = function()
        {
            var minNode = this.min;

            // Current min is null or no more after it
            if (minNode == null || this.roots.length < 1) {
                this.min = null;
                return minNode
            }

            // Remove it
            this.remove(minNode);

            // Consolidate
            if (this.roots.length > 50) {
                this.consolidate();
            }

            // Get next min
            var lowestDistance = Infinity,
                length = this.roots.length;

            for (var i = 0; i < length; i++) {
                var node = this.roots[i],
                    distance = this.getDistance(node);

                if (distance < lowestDistance) {
                    lowestDistance = distance;
                    this.min = node;
                }
            }

            return minNode;
        }

        MinHeap.prototype.consolidate = function()
        {
            // Consolidate
            var depths = [ [], [], [], [], [], [], [] ],
                maxDepth = depths.length - 1, // 0-index
                removeFromRoots = [];

            // Populate depths array
            var length = this.roots.length;
            for (var i = 0; i < length; i++) {
                var node = this.roots[i],
                depth = this.nodes[node].depth;

                if (depth < maxDepth) {
                    depths[depth].push(node);
                }
            }

            // Consolidate
            for (var depth = 0; depth <= maxDepth; depth++) {
                while (depths[depth].length > 1) {

                    var first = depths[depth].shift(),
                        second = depths[depth].shift(),
                        newDepth = depth + 1,
                        pos = -1;

                    if (this.nodes[first].distance < this.nodes[second].distance) {
                        this.nodes[first].depth = newDepth;
                        this.nodes[first].children.push(second);
                        this.nodes[second].parent = first;

                        if (newDepth <= maxDepth) {
                            depths[newDepth].push(first);
                        }

                        // Find position in roots where adopted node is
                        pos = this.roots.indexOf(second);

                    } else {
                        this.nodes[second].depth = newDepth;
                        this.nodes[second].children.push(first);
                        this.nodes[first].parent = second;

                        if (newDepth <= maxDepth) {
                            depths[newDepth].push(second);
                        }

                        // Find position in roots where adopted node is
                        pos = this.roots.indexOf(first);
                    }

                    // Remove roots that have been made children
                    if (pos > -1) {
                        this.roots.splice(pos, 1);
                    }
                }
            }
        }

        MinHeap.prototype.add = function(node, distance)
        {
            // Add the node
            this.nodes[node] = {
                node: node,
                distance: distance,
                depth: 0,
                parent: null,
                children: []
            };

            // Is it the minimum?
            if (!this.min || distance < this.nodes[this.min].distance) {
                this.min = node;
            }

            // Other stuff
            this.roots.push(node);
        }

        MinHeap.prototype.update = function(node, distance)
        {
            this.remove(node);
            this.add(node, distance);
        }

        MinHeap.prototype.remove = function(node)
        {
            if (!this.nodes[node]) {
                return;
            }

            // Move children to be children of the parent
            var numChildren = this.nodes[node].children.length;
            if (numChildren > 0) {
                for (var i = 0; i < numChildren; i++) {
                    var child = this.nodes[node].children[i];
                    this.nodes[child].parent = this.nodes[node].parent;

                    // No parent, then add to roots
                    if (this.nodes[child].parent == null) {
                        this.roots.push(child);
                    }
                }
            }

            var parent = this.nodes[node].parent;

            // Root, so remove from roots
            if (parent == null) {
                var pos = this.roots.indexOf(node);
                if (pos > -1) {
                    this.roots.splice(pos, 1);
                }
            } else {
                // Go up the parents and decrease their depth
                while (parent) {
                    this.nodes[parent].depth--;
                    parent = this.nodes[parent].parent
                }
            }
        }

        MinHeap.prototype.getDistance = function(node)
        {
            if (this.nodes[node]) {
                return this.nodes[node].distance;
            }
            return Infinity;
        }

        return MinHeap;
    })();

    return Dijkstras;
})();
//TODO ------------------OBJETO RUTAS-------------
function Rutasobj(id,nombre){
    this.id=id;
    this.nombre=nombre;
};
function Adyobj(id,idad,val){
    this.id=id;
    this.idad=idad;
    this.val=val;
};

var r1 = new Rutasobj(4,"ruta4")
var r2 = new Rutasobj(6,"ruta6")
var r3 = new Rutasobj(9,"ruta9")
var r4 = new Rutasobj(11,"ruta11")
var r5 = new Rutasobj(7,"ruta7")
var r6 = new Rutasobj(10,"ruta10")


var a2 = new Adyobj(4,6,5);
var a3 = new Adyobj(6,4,5);
var a4 = new Adyobj(6,9,2);
var a5 = new Adyobj(9,6,2);
var a6 = new Adyobj(7,9,4);
var a7 = new Adyobj(9,7,4);
var a8 = new Adyobj(4,10,4);
var a9 = new Adyobj(10,4,4);
var a10 = new Adyobj(9,11,9);
var a11= new Adyobj(11,9,9);
var a12 = new Adyobj(10,11,1);
var a13 = new Adyobj(11,10,1);
var a14 = new Adyobj(7,10,8);
var a15 = new Adyobj(10,7,8);
var a16 = new Adyobj(6,11,6);
var a17 = new Adyobj(11,6,6);



let grafo_prueba = new GrafoRuta();
grafo_prueba.insertRuta(r1);
grafo_prueba.insertRuta(r2);
grafo_prueba.insertRuta(r3);
grafo_prueba.insertRuta(r4);
grafo_prueba.insertRuta(r5);
grafo_prueba.insertRuta(r6);

//***** agregar adyacentes */

grafo_prueba.add_adjacent(a2);
grafo_prueba.add_adjacent(a3);
grafo_prueba.add_adjacent(a4);
grafo_prueba.add_adjacent(a5);
grafo_prueba.add_adjacent(a6);
grafo_prueba.add_adjacent(a7);
grafo_prueba.add_adjacent(a8);
grafo_prueba.add_adjacent(a9);
grafo_prueba.add_adjacent(a10);
grafo_prueba.add_adjacent(a11);
grafo_prueba.add_adjacent(a12);
grafo_prueba.add_adjacent(a13);
grafo_prueba.add_adjacent(a14);
grafo_prueba.add_adjacent(a15);
grafo_prueba.add_adjacent(a16);
grafo_prueba.add_adjacent(a17);

grafo_prueba.gendot();
grafo_prueba.findShortPath("7","6");