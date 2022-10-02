alert("Você tem 60 seguntos para o proximo jogador!!");
var personagens;
var cenario;
var imagens = [null, null, null, null, null];
var context;
window.onload = () => {
    context = document.querySelector("#canvas").getContext("2d");

    geraCenario();

    imagens[0] = new Image();
    imagens[1] = new Image();
    imagens[2] = new Image();
    imagens[3] = new Image();
    imagens[4] = new Image();

    imagens[0].src = "img/piso.png";
    imagens[0].onload = () => {
        imagens[1].src = "img/parede.png";
        imagens[1].onload = () => {
            imagens[2].src = "img/personagem.png";
            imagens[2].onload = () => {
                imagens[3].src = "img/princesa.png";
                imagens[3].onload = () => {
                    imagens[4].src = "img/oponente.png";
                    imagens[4].onload = () => {
                        desenha();
                    };
                };
            };
        };
    };
    document.addEventListener("keydown", (evt) => {
        switch (evt.keyCode) {
            case(37):
                moveJogador(1);
                break;
            case(38):
                moveJogador(2);
                break;
            case(39):
                moveJogador(0);
                break;
            case(40):
                moveJogador(3);
                break;
        }

    });
};
var geraCenario = () => {
    personagens = [
        {img: 2, x: 1, y: 1},
        {img: 3, x: 9, y: 6},
        {img: 4, x: 14, y: 1},
        {img: 4, x: 5, y: 9},
        {img: 4, x: 17, y: 13}

    ];
    cenario = [
        //0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    for(var i = 2; i<13; i++){
        for(var j=2;j<18;j++){
            var n =parseInt(Math.random()*4);
            if(n === 0){
                cenario[i][j]=1;
            }
        }
    }
    for(var k = 0;k<personagens.length;k++){
        var p = personagens[k];
        cenario[p.y][p.x]=0;
    }
};


var desenha = () => {
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 20; j++) {
            console.log(j, i);
            context.drawImage(imagens[cenario[i][j]], j * 40, i * 40);
        }
    }
    for (var k = 0; k < personagens.length; k++) {
        var p = personagens[k];
        context.drawImage(imagens[p.img], p.x * 40, p.y * 40);
    }
};
var direita = (personagem) => {
    if (cenario[personagem.y][personagem.x + 1] === 0) {


        personagem.x++;
        desenha();
    }
};
var esquerda = (personagem) => {
    if (cenario[personagem.y][personagem.x - 1] === 0) {
        personagem.x--;
        desenha();
    }
};
var cima = (personagem) => {
    if (cenario[personagem.y - 1][personagem.x] === 0) {
        personagem.y--;
        desenha();
    }
};
var baixo = (personagem) => {
    if (cenario[personagem.y + 1 ][personagem.x] === 0) {
        personagem.y++;
        desenha();
    }
};
var persegue = (perseguidor, perseguido) => {
    var orientacao = parseInt(Math.random() * 2);
    if (orientacao === 0) {
        if (perseguidor.y > perseguido.y) {
            cima(perseguidor);
        } else {
            baixo(perseguidor);
        }
    } else {
        if (perseguidor.x > perseguidor.x) {
            esquerda(perseguidor);
        } else {
            direita(perseguidor);
        }
    }
};
var foge = (fugitivo, perseguidor) => {
    var orientacao = parseInt(Math.random() * 2);
    if (orientacao === 0) {
        if (fugitivo.y > perseguidor.y) {
            baixo(fugitivo);
        } else {
            cima(fugitivo);
        }
    } else {
        if (fugitivo.x > perseguidor.x) {
            direita(fugitivo);
        } else {
            esquerda(fugitivo);
        }
    }
};
var moveJogador = (direcao) => {
    var jogador = personagens[0];
    var princesa = personagens[1];

    switch (direcao) {
        case(0):
            direita(jogador);
            break;
        case(1):
            esquerda(jogador);
            break;
        case(2):
            cima(jogador);
            break;
        case(3):
            baixo(jogador);
            break;
    }
    for (var k = 2; k < personagens.length; k++) {
        var oponente = personagens[k];
        if ((oponente.x === jogador.x && oponente.y === jogador.y) || (oponente.x === princesa.x && oponente.y === princesa.y)) {
            alert("End!!");
            geraCenario();
        } else {
            if (k % 2 === 0) {
                persegue(oponente, jogador);
            } else {
                persegue(oponente, princesa);
            }
        }
    }
    if (princesa.x === jogador.x && princesa.y === jogador.y) {
        alert("You Win!!");
        geraCenario();
    } else {
        foge(princesa, jogador);
    }
    desenha();
};
var apaga = () => {
    document.querySelector("#msg").innerHTML = "<h1>Passe para o proximo jogador</h1>";
};
setTimeout(apaga, 60000);



//var perdeu = () =>{ 
//var jogador = personagens[0];

//var oponente = personagens[2];
//if(oponente.x === jogador.x && oponente.y === jogador.y){

//alert("End!!");

//}
//};
//var exibeTime = () => {
//              var dataTela = "";
//         var data = "";
//         dataTela += data.getMinutes() + ":";
//         dataTela += data.getSeconds() + ":";

//         document.querySelector("#time").innerHTML = dataTela;
//     };
//     setInterval(exibeTime, 1000);



