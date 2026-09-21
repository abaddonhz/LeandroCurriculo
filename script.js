/* =========================================================
   BOOT / INICIALIZAÇÃO DO SISTEMA
   ========================================================= */

/*
    Comando que será digitado primeiro,
    simulando alguém iniciando o sistema pelo terminal.
*/

const bootCommand = 'root@leandro:~$ ./start_portfolio';


/*
    Mensagens exibidas depois que o comando é executado.
*/

const bootLines = [
    '[ OK ] kernel inicializado',
    '[ OK ] carregando modelos de desenvolvimento',
    '[ OK ] montando projetos na database',
    '[ OK ] estabilizando segurança do curriculo',
    '[ OK ] identidade verificada'
];


/* Elementos da tela de boot */

const bootText = document.querySelector('#bootText');
const enter = document.querySelector('#enter');


/* Controle das animações */

let commandIndex = 0;
let bi = 0;


/* =========================================================
   DIGITA O COMANDO INICIAL
   ========================================================= */

function typeBootCommand() {

    /*
        Enquanto ainda existirem letras no comando,
        mostra uma letra por vez.
    */

    if (commandIndex < bootCommand.length) {

        bootText.textContent =
            bootCommand.slice(0, commandIndex + 1) + '█';

        commandIndex++;

        /*
            VELOCIDADE DA DIGITAÇÃO

            45 = velocidade atual.

            Menor = mais rápido
            Maior = mais lento
        */

        setTimeout(typeBootCommand, 45);

    } else {

        /*
            Quando terminar de digitar,
            remove o cursor e pula duas linhas.
        */

        bootText.textContent =
            bootCommand + '\n\n';


        /*
            Espera meio segundo antes
            de começar as respostas.
        */

        setTimeout(boot, 500);
    }
}


/* =========================================================
   MENSAGENS DO BOOT
   ========================================================= */

function boot() {

    if (bi < bootLines.length) {

        bootText.textContent += bootLines[bi++] + '\n';

        setTimeout(boot, 620);

    } else {

        /* Cria o ACCESS GRANTED separado */
        const granted = document.createElement('div');

        granted.className = 'access-granted';
        granted.textContent = 'ACCESS GRANTED.';

        bootText.insertAdjacentElement('afterend', granted);


        /* Toca o som */
        const accessSound = new Audio('sounds/access.mp3');

        accessSound.volume = 0.25;

        accessSound.play().catch(() => {});


        /* Mostra ENTER SYSTEM depois */
        setTimeout(() => {

            enter.classList.remove('hidden');

        }, 700);
    }
}


/* =========================================================
   INICIA O BOOT
   ========================================================= */

/*
    Não usamos mais boot() diretamente.

    Primeiro o comando é digitado.
    Depois ele chama boot() automaticamente.
*/

typeBootCommand();


/* =========================================================
   BOTÃO ENTER SYSTEM
   ========================================================= */

/*
    Quando a pessoa clica em ENTER SYSTEM:

    1. Remove a tela de boot
    2. Mostra o site
    3. Inicia o texto animado
*/

enter.onclick = () => {

    document.querySelector('#boot').remove();

    document
        .querySelector('#app')
        .classList.remove('hidden');

    typeText();
};


/* =========================================================
   TEXTO DIGITADO NA HOME
   ========================================================= */

/*
    São as frases que ficam sendo digitadas
    abaixo de LEANDRO ALVES.

    Pode adicionar ou remover frases.
*/

const phrases = [
    'Developer. Technology enthusiast.',
    'Building systems. Creating experiences.',
    'Code // Hardware // Creative'
];


/*
    pi  = qual frase está sendo mostrada
    ci  = posição da letra atual
    del = se está apagando o texto
*/

let pi = 0;
let ci = 0;
let del = false;


function typeText() {

    const el = document.querySelector('#typed');

    const s = phrases[pi];


    /* Mostra parte da frase */

    el.textContent = s.slice(0, ci);


    /* DIGITANDO */

    if (!del && ci < s.length) {

        ci++;
    }


    /* APAGANDO */

    else if (del && ci > 0) {

        ci--;
    }


    /* TERMINOU DE ESCREVER */

    else if (ci === s.length) {

        del = true;

        /*
            Espera 1,3 segundos antes de apagar.
        */

        return setTimeout(typeText, 1300);
    }


    /* TERMINOU DE APAGAR */

    else {

        del = false;

        /*
            Vai para a próxima frase.
        */

        pi = (pi + 1) % phrases.length;
    }


    /*
        VELOCIDADE:

        28 = velocidade apagando
        55 = velocidade escrevendo
    */

    setTimeout(
        typeText,
        del ? 28 : 55
    );
}


/* =========================================================
   ANO AUTOMÁTICO DO RODAPÉ
   ========================================================= */

/*
    Pega automaticamente o ano atual.

    Então você não precisa trocar:
    2026 → 2027 → 2028...
*/

document.querySelector('#year').textContent =
    new Date().getFullYear();


/* =========================================================
   TERMINAL
   ========================================================= */

/*
    Pega:

    #output = tela onde aparecem as respostas
    #cmd    = campo onde a pessoa digita
*/

const out = document.querySelector('#output');
const cmd = document.querySelector('#cmd');


/* =========================================================
   COMANDOS DO TERMINAL
   ========================================================= */

/*
    Aqui você controla TODOS os comandos.

    Formato:

    comando: 'resposta'
*/

const commands = {

    help:
        'Comandos: whoami, skills, projects, experience, contact, clear',

    whoami:
        'Leandro Alves // Developer & Technology enthusiast // São Vicente, SP',

    skills:
        'HTML · CSS · JavaScript · Python · Lua · Node.js · Hardware · Photoshop · Inteligência Artificial · Gestão de Projetos · Marketing com IA',

    projects:
        'ABADDON // Game Development // Digital Design // AI-assisted Projects & Marketing',

    experience:
        'Estoquista, Casa de rações [02.2025 → 04.2025] // Ensino Médio Completo',

    contact:
        'leandroalvscruz@gmail.com'
};


/* =========================================================
   FUNCIONAMENTO DO TERMINAL
   ========================================================= */

/*
    Fica esperando a pessoa apertar uma tecla
    dentro do terminal.
*/

cmd.addEventListener('keydown', e => {

    /*
        Se NÃO for ENTER, não faz nada.
    */

    if (e.key !== 'Enter') return;


    /*
        Pega o que foi digitado.

        trim()
        remove espaços extras.

        toLowerCase()
        transforma tudo em minúsculo.

        Então:

        HELP
        Help
        help

        funcionam igualmente.
    */

    const v =
        cmd.value
            .trim()
            .toLowerCase();


    /* Cria uma nova linha */

    const p =
        document.createElement('p');


    /*
        Mostra o comando digitado:

        visitor@leandro:~$ help
    */

    p.innerHTML =
        '<strong>visitor@leandro:~$</strong> '
        + escapeHtml(cmd.value);


    out.appendChild(p);


    /* =====================================================
       COMANDO CLEAR
       ===================================================== */

    if (v === 'clear') {

        /*
            Limpa completamente o terminal.
        */

        out.innerHTML = '';
    }


    /* =====================================================
       OUTROS COMANDOS
       ===================================================== */

    else {

        const r =
            document.createElement('p');


        /*
            Procura o comando na lista.

            Se existir:
            mostra a resposta.

            Se não existir:
            command not found
        */

        r.textContent =
            commands[v]
            || 'command not found: ' + v;


        out.appendChild(r);
    }


    /*
        Limpa o campo depois de apertar ENTER.
    */

    cmd.value = '';


    /*
        Faz o terminal rolar automaticamente
        para a última mensagem.
    */

    out.scrollTop =
        out.scrollHeight;
});


/* =========================================================
   PROTEÇÃO DO TERMINAL
   ========================================================= */

/*
    Evita que algo digitado pelo visitante
    seja interpretado como HTML.

    Exemplo:

    <h1>teste</h1>

    será tratado como texto normal.
*/

function escapeHtml(s) {

    return s.replace(
        /[&<>'"]/g,

        c => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[c])
    );
}


/* =========================================================
   MATRIX / CÓDIGOS NO FUNDO
   ========================================================= */

/*
    Seleciona o <canvas id="matrix">
    que está no index.html.
*/

const canvas =
    document.querySelector('#matrix');

const ctx =
    canvas.getContext('2d');


let cols;
let drops;


/* =========================================================
   TAMANHO DO MATRIX
   ========================================================= */

function resize() {

    /*
        Faz o canvas ocupar toda a tela.
    */

    canvas.width =
        innerWidth;

    canvas.height =
        innerHeight;


    /*
        Define quantas colunas de código
        cabem na tela.

        18 = distância entre as colunas.
    */

    cols =
        Math.floor(
            canvas.width / 18
        );


    /*
        Cria as posições iniciais.
    */

    drops =
        Array(cols).fill(1);
}


/* Executa quando o site abre */

resize();


/*
    Executa novamente se a pessoa
    mudar o tamanho da janela.
*/

addEventListener(
    'resize',
    resize
);


/* =========================================================
   ANIMAÇÃO MATRIX
   ========================================================= */

setInterval(() => {

    /*
        Cria o rastro escuro atrás
        dos números.
    */

    ctx.fillStyle =
        'rgba(5,8,6,.12)';

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /*
        COR DOS NÚMEROS
    */

    ctx.fillStyle =
        '#5cff8d';


    /*
        TAMANHO / FONTE
    */

    ctx.font =
        '12px monospace';


    /*
        Percorre todas as colunas.
    */

    drops.forEach((y, i) => {

        /*
            Escolhe aleatoriamente:
            1 ou 0
        */

        const t =
            Math.random() > .5
                ? '1'
                : '0';


        /*
            Desenha o número.
        */

        ctx.fillText(
            t,
            i * 18,
            y * 18
        );


        /*
            Quando chega no final da tela,
            existe uma pequena chance
            da coluna recomeçar.
        */

        if (
            y * 18 > canvas.height
            && Math.random() > .98
        ) {

            drops[i] = 0;
        }


        /*
            Move a coluna para baixo.
        */

        drops[i]++;
    });


    /*
        65 = atualização da animação.

        Menor = Matrix mais rápida
        Maior = Matrix mais lenta
    */

}, 65);
