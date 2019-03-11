var bestCycle = {nbNodes:0, cost:0, path:[]};

function DFS(rootId)
{
    var queue = [];
    var ch = {nbNodes:0, cost:0, path:[]};
    var newCh = {nbNodes:0, cost:0, path:[]};
    var i,j,k,cpt,bestCost = 1000;
    var ch = {nbNodes:1, cost:0, path:[]};
    ch.path.push(rootId);
    queue.push(ch);
    delete ch;
    while (queue.length != 0)
    {
        var ch = queue.pop();
        if (ch.nbNodes==nodes.length)//Cycle formé
        {
            ch.path.push(rootId);
            if (ch.path.length > 3)
            {
                ch.nbNodes = ch.nbNodes+1;
                var edgesTemp = network.getConnectedEdges(nodes._data[ch.path[ch.path.length-2]].id);
                
                for (var k=0;k<edgesTemp.length;k++)
                {
                    if ((edgesTemp[k].toId == rootId) || (edgesTemp[k].fromId == rootId))
                    {
                        var v = parseInt(edgesTemp[k].title);//Poids de l'arête
                    }
                }
                delete edgesTemp;
                ch.cost = ch.cost+v;
            }
            if (ch.cost<bestCost)
                {   
                    bestCycle.path = [];
                    bestCost = ch.cost;
                    for (i=0;i<nodes.length+1;i++) bestCycle.path.push(ch.path[i]);//Mise à jour du meilleur cycle
                    bestCycle.nbNodes = ch.nbNodes;
                    bestCycle.cost = ch.cost;
                }
        }
        else
        {
            i = ch.path[ch.path.length-1];//Dernier sommet du chemin
            for (j=0;j<nodes.length;j++)
            {
                var newCh = {nbNodes:0, cost:0, path:[]};
                if (j != rootId && j != i && !ch.path.includes(j,0))
                {           
                    for (k=0;k<ch.path.length;k++)
                    { 
                        newCh.path.push(ch.path[k]);
                    }   
                    newCh.path.push(j);
                    newCh.nbNodes = ch.nbNodes+1;
                    var edgesTemp = network.getConnectedEdges(nodes._data[i].id);
                    for (var k=0;k<edgesTemp.length;k++)
                    {
                        if ((edgesTemp[k].toId == j && edgesTemp[k].fromId == nodes._data[i].id) || (edgesTemp[k].toId == nodes._data[i].id  && edgesTemp[k].fromId == j)) 
                        { 
                            var v = parseInt(edgesTemp[k].title);//Poids de l'arête
                        }
                    }
                    delete edgesTemp;
                    newCh.cost = ch.cost + v;//TODO poids de l'arête
                    queue.push(newCh);
                }
                delete newCh;
            }
        }
        delete ch;
    }
    for (k in edges._data)
    {
        var j,m;
        j = bestCycle.path.indexOf(edges._data[k].from);
        if (j+1 == bestCycle.path.indexOf(edges._data[k].to))
        {
            edges._data[k].color = {color:samirColor};
        }
        else
        {
            m = bestCycle.path.indexOf(edges._data[k].to);
            if (m+1 == bestCycle.path.indexOf(edges._data[k].from))
            {
                edges._data[k].color = {color:samirColor};
            }
        }
        if (((edges._data[k].to == rootId) && (edges._data[k].from == bestCycle.path[bestCycle.nbNodes-1])) || ((edges._data[k].from == rootId) && (edges._data[k].to == bestCycle.path[bestCycle.nbNodes-2]))) edges._data[k].color = {color:samirColor};
        network = new vis.Network(container, data, options);   
    }  
    console.log(JSON.stringify(bestCycle));
}

function findHamiltonianCycle()
{
    var t0 = performance.now();
    DFS(0);
    var t1 = performance.now();
    pvc ();
    var t2 = performance.now();
    
    addNodeLine("m1",bestCycle.cost,t1-t0,samirColor);
    addNodeLine("m2",cycle.cost,t2-t1,raoufColor);
}