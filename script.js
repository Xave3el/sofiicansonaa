/* =====================================================
   IMÁGENES
===================================================== */

const images = [

    {
        src: "imagenes/foto1.jpeg",
        target: false
    },

    {
        src: "imagenes/foto2.jpg",
        target: false
    },

    {
        src: "imagenes/foto3.jpg",
        target: false
    },

    {
        src: "imagenes/foto5.jpeg",
        target: true
    },

    {
        src: "imagenes/foto4.jpg",
        target: false
    }

];


/* =====================================================
   CREAR LAS IMÁGENES
===================================================== */

const space = document.getElementById("space");

const objects = [];

images.forEach((item) => {

    const photo = document.createElement("div");

    photo.classList.add("photo");

    const img = document.createElement("img");

    img.src = item.src;

    img.draggable = false;

    photo.appendChild(img);

    space.appendChild(photo);


    /* Posición inicial */

    let x = Math.random() * 80 + 10;
    let y = Math.random() * 65 + 18;


    /* Velocidad */

    let vx = (Math.random() - 0.5) * 0.035;
    let vy = (Math.random() - 0.5) * 0.035;


    /* Rotación */

    let rotation = Math.random() * 10 - 5;

    let rotationSpeed =
        (Math.random() - 0.5) * 0.02;


    objects.push({

        element: photo,
        image: img,

        x: x,
        y: y,

        vx: vx,
        vy: vy,

        rotation: rotation,
        rotationSpeed: rotationSpeed,

        target: item.target

    });


    /* =================================================
       CLICK EN IMAGEN
    ================================================= */

    photo.addEventListener("click", () => {

        if (item.target) {

            showMessage();

        } else {

            photo.classList.remove("wrong");

            /* Reinicia la animación */

            void photo.offsetWidth;

            photo.classList.add("wrong");

        }

    });

});


/* =====================================================
   MOVIMIENTO DE LAS IMÁGENES
===================================================== */

function animateImages() {

    objects.forEach((obj) => {

        obj.x += obj.vx;
        obj.y += obj.vy;

        obj.rotation += obj.rotationSpeed;


        /* Rebote horizontal */

        if (obj.x < 7 || obj.x > 93) {

            obj.vx *= -1;

        }


        /* Rebote vertical */

        if (obj.y < 15 || obj.y > 88) {

            obj.vy *= -1;

        }


        obj.element.style.left =
            obj.x + "%";

        obj.element.style.top =
            obj.y + "%";


        obj.image.style.transform =
            `rotate(${obj.rotation}deg)`;

    });


    requestAnimationFrame(animateImages);

}

animateImages();



/* =====================================================
   MENSAJE FINAL
===================================================== */

const modal =
    document.getElementById("modal");

const closeButton =
    document.getElementById("closeButton");


function showMessage() {

    modal.classList.add("show");

}


closeButton.addEventListener("click", () => {

    modal.classList.remove("show");

});


/* Cerrar haciendo clic fuera */

modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        modal.classList.remove("show");

    }

});



/* =====================================================
   ESTRELLAS
===================================================== */

const canvas =
    document.getElementById("stars");

const ctx =
    canvas.getContext("2d");


let stars = [];


function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createStars();

}


function createStars() {

    stars = [];

    const amount =
        Math.floor(
            (window.innerWidth * window.innerHeight) / 7000
        );


    for (let i = 0; i < amount; i++) {

        stars.push({

            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height,

            size: Math.random() * 1.5,

            speed:
                Math.random() * 0.15 + 0.03,

            opacity:
                Math.random() * 0.8 + 0.2

        });

    }

}


function animateStars() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    stars.forEach((star) => {

        star.y += star.speed;


        /* Cuando sale por abajo */

        if (star.y > canvas.height) {

            star.y = 0;

            star.x =
                Math.random() * canvas.width;

        }


        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(255,255,255,${star.opacity})`;

        ctx.fill();

    });


    requestAnimationFrame(animateStars);

}


window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();

animateStars();