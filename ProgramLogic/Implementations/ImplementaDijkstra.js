// Resuelve la distancia más corta desde el vértice del índice a otros vértices
function dijkstra(path,index){
    var m = path && path.length;
    var n = m && path[0].length;

    if(m && n && m===n && index < n){
        // Inicializar distancia
        var dis = [];
        var i;
        for(i = 0; i< n;i++){
            dis.push(path[index][i]);
        }
        var flag = [];// Se usa para identificar si se determina la distancia del número de índice a otros vértices
        for(i = 0; i < n; i++ ){
            flag.push(false)
        }
        flag[index] = true;

        var min,minIndex;
        for(i = 0;i < n;i++){
            min = Infinity;
            // Encuentre el índice correspondiente a la distancia más corta desde los puntos inciertos restantes al índice
            for(var j = 0; j < n; j++){
                if(!flag[j] && dis[j] < min){
                    min = dis[j];
                    minIndex = j;
                }
            }
            flag[minIndex] = true;// Identifica que la distancia desde el índice hasta este vértice ha sido confirmada
            for(var k = 0; k < n; k++){
                // Juzgar si hay un camino entre minIndex y k
                if(path[minIndex][k] < Infinity){
                    // Actualizar distancia
                    if(dis[k] > dis[minIndex] + path[minIndex][k]){
                        dis[k] = dis[minIndex] + path[minIndex][k];
                    }
                }
            }
        }
        return dis;
    }
    else{
        console.log("se han obtenido datos erroneos. Verificar")
        throw new Error("Los datos son incorrectos")
    }
}
dijkstra([[0,1,2],[1,0,2],[0,1,2]],0)
