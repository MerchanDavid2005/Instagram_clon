"use strict"

const cuerpoFotos = document.getElementById("cuerpo-fotos")
let cajitas = ""

let limite = 5
let id = 1

const crearCuerpo = async () => {

    const respuesta = await traerDatos()

    for(let i of respuesta){

        console.log(i)
        let caja = document.createElement("div")
        caja.classList.add(`caja`)
        caja.setAttribute("numero", `${id}`)
        let perfil = document.createElement("div")
        perfil.innerHTML = `
            <div class="avatar"> <img src='${i.user.profile_image.large}'> </div>
            <p class="name"> ${i.user.username} </p>
            <p class="location"> ${i.user.location} </p>
        `
        perfil.classList.add("informacion-persona")
        let foto = document.createElement("img")
        foto.src = i.links.download
        let descripcion = document.createElement("p")
        descripcion.classList.add("descripcion")
        descripcion.innerHTML = `<strong> Description: </strong> ${i.description}`
        caja.append(perfil)
        caja.append(foto)
        caja.append(descripcion)
        cuerpoFotos.append(caja)
        id++

    }

    cajitas = document.querySelectorAll(".caja")

    const observer = new IntersectionObserver(visibilidad)

    for(let i of cajitas){

        observer.observe(i)

    }

}

const traerDatos = async () => {

    const data = await fetch(`https://api.unsplash.com/photos/random?count=${5}`, {

        method: 'GET',
        headers: {
            "Authorization": 'Client-ID TCXUbgPHK2wQ2Nyn3xA-gcAEDD4PbkszFCjOqdF5baw'
        }

    })

    return data.json()

}

crearCuerpo()

const visibilidad = (element) => {

    if(element[0].isIntersecting){

        element[0].target.style.transform = "scale(1)"

        if(element[0].target.attributes[1].value == String(limite)){

            crearCuerpo()
            limite += 5

        }

    }else{

        element[0].target.style.transform = "scale(0.5)"

    }

}
