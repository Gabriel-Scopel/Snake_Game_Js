window.onload=function(){
    var stage = document.getElementById('stage');
    var ctx = stage.getContext('2d');
    document.addEventListener("keydown", keyPush);

    ctx.fillStyle = 'black'; //definindo a cor de preenchimento do canvas
    ctx.fillRect(0, 0, stage.width, stage.height); //preenchendo a cor de fundo do canvas
    
    setInterval(game, 60); //chamando a função game a cada 60 ms
    
    const vel = 1; //velocidade da cobrinha
    var vx = vy = 0; //velocidade inicial da cobrinha
    var px = py = 10; //pontos do quadro de inicio
    var tp = 20; //comprimento do quadradinho da cobrinha(correspondente a 1 quadradinho)
    var qp = 20; //quantidade de peças que dividimos o canvas
    var ax = ay = 15; //posição inicial da maçã 
    var trail = []; //array qye arnazena os elementos que formarão o rastro da cobra
    var tail = 5; //tamanho da cauda da cobra


    function game(){
        //movimentando a cobrinha por meio de um incremento com a velocidade
        px += vx;
        py += vy;
        
        //alterando a posição da cobrinha caso ele chegue na borda do canvas, fazendo com que saia na borda oposta
        if(px<0){
            px = qp-1
        };
        if(px>qp-1){
            px=0
        };
        if(py<0){
            py=qp-1
        };
        if(py>qp-1){
            py=0
        };


        ctx.fillStyle = 'black'; //definindo a cor de preenchimento do canvas
        ctx.fillRect(0, 0, stage.width, stage.height);//preenchendo a cor de fundo do canvas
    
        ctx.fillStyle = 'red' //defininado a cor da maçã
        ctx.fillRect(ax*tp, ay*tp, tp, tp) //preenchendo a cor de fundo da maçã

        //pintando o rastro da cobra
        ctx.fillStyle='grey'
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x*tp, trail[i].y*tp, tp-1,tp-1);
            //verificando se há colisão, ou seja, se a posição da cabeça é igual a posição da calda
            if (trail[i].x == px && trail[i].y == py)
            {
                vx = vy=0;
                tail =5;
            }
        }
        //criando a movimentação da cobrinha 
        trail.push({x:px, y:py})
        while(trail.length>tail){
            trail.shift();

        }
        //caso a maça seja comida, nossa cauda será incrementada e uma nova maça deve surgir em um lugar aleatório
        if (ax==px && ay==py){
            tail++;
            ax = Math.floor(Math.random()*qp);
            ay = Math.floor(Math.random()*qp);
        }
        
        }
        //Movimentando a cobrinha de acordo com a tecla pressionada
        function keyPush(event){
 
            switch (event.keyCode) {
                case 37: // Left
                    vx = -vel;
                    vy = 0;
                    break;
                case 38: // up
                    vx = 0;
                    vy = -vel;
                    break;
                case 39: // right
                    vx = vel;
                    vy = 0;
                    break;
                case 40: // down
                    vx = 0;
                    vy = vel;
                    break;          
                default:
                    
                    break;
            }

    }


}