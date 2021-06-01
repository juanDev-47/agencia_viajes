import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (req, res) => { // req - lo que enviamos : res - lo que express nos responde

    // consultar 3 viajes 

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Testimonial.findAll({limit: 3}));
    try {
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error)
    }
    

}

const paginaNosotros = (req, res) => { // req - lo que enviamos : res - lo que express nos responde

    const viajes = 'Viaje a Alemania'; // asi se crean variables para enviarlas a la vista desde routing

    res.render('nosotros', {
        viajes,   // asi se enviaria a la vista, en este caso nosotros la viriable
        pagina: 'nosotros'
    });
}

const paginaViajes = async (req, res) => { // req - lo que enviamos : res - lo que express nos responde
    // consultar base de datos
    const viajes = await Viaje.findAll();

    console.log(viajes);

    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes,
    })
}

const paginaTestimoniales = async (req, res) => { // req - lo que enviamos : res - lo que express nos responde
    
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        })
    } catch (error) {
        console.log(error)
    }
}

// muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const { viaje } = req.params;
    
    try {
        const resultado = await Viaje.findOne({ where: {slug: viaje}});

        res.render('viaje', {
            pagina: 'Informacion viaje',
            resultado
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales, paginaDetalleViaje
}