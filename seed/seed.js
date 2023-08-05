const ActivitySector = require("../models/activitySector");
const Profession = require("../models/profession");
const mongoose = require("mongoose");


mongoose.connect('mongodb+srv://ciprian:pariurix.R0@cluster0.xnup7rd.mongodb.net/bank-risk-api')
    .then(() => {
        console.log("Seeding database!");
    }).catch((err) => {
    console.log(err);
});

const activities = [
    {
        name: "Agricultură",
        score: 40
    },
    {
        name: "Industria extractivă",
        score: 30
    },
    {
        name: "Energie, petrol şi gaze şi minerit energetic",
        score: 50
    },
    {
        name: "Industria alimentară, a băuturilor şi tutunului",
        score: 45
    },
    {
        name: "Industria textilă, produse textile, îmbrăcăminte. Pielărie şi încălţăminte",
        score: 40
    },
    {
        name: "Exploatarea şi prelucrarea primară a lemnului. Fabricarea hârtiei şi a produselor din hârtie",
        score: 40
    },
    {
        name: "Industria chimică şi petrochimică şi activităţi conexe",
        score: 35
    },
    {
        name: "Industria metalurgică",
        score: 30
    },
    {
        name: "Industria mobilei. Alte activităţi industriale",
        score: 25
    },
    {
        name: "Construcţii civile şi industriale",
        score: 30
    },
    {
        name: "Comerţ",
        score: 15
    },
    {
        name: "Transporturi terestre şi servicii conexe",
        score: 35
    },
    {
        name: "Transporturi pe apă şi servicii conexe. Transporturi aeriene şi servicii conexe",
        score: 30
    },
    {
        name: "Tehnologia informaţiei şi telecomunicaţii",
        score: 75
    },
    {
        name: "Activităţi financiare, bancare şi de asigurări",
        score: 45
    },
    {
        name: "Servicii de asistenţă, consultanţă, suport. Alte activităţi de servicii",
        score: 30
    },
    {
        name: "Sănătate. Activităţi sanitar-veterinare",
        score: 50
    },
    {
        name: "Învăţământ",
        score: 50
    },

];


const professions = [
    {
        name: "Asistent financiar",
        score: 45
    },
    {
        name: "Actor",
        score: 35
    },
    {
        name: "Agent agricol",
        score: 30
    },
    {
        name: "Agent comert",
        score: 45
    },
    {
        name: "Agent de turism",
        score: 50
    },
    {
        name: "Agent imobiliar",
        score: 45
    },
    {
        name: "Analist financiar",
        score: 60
    },
    {
        name: "Arhitect",
        score: 55
    },
    {
        name: "Asistent director",
        score: 70
    },
    {
        name: "Asistent hr",
        score: 50
    },
    {
        name: "Asistent medical",
        score: 75
    },
    {
        name: "Asistent personal",
        score: 45
    },
    {
        name: "Asistent social",
        score: 55
    },
    {
        name: "Avocat",
        score: 80
    },
    {
        name: "Brutar",
        score: 45
    },
    {
        name: "Bucatar",
        score: 65
    },
    {
        name: "Casier",
        score: 45
    },
    {
        name: "Contabil",
        score: 70
    },
    {
        name: "Curier",
        score: 40
    },
    {
        name: "Developer",
        score: 80
    },
    {
        name: "Director general",
        score: 120
    },
    {
        name: "Educator",
        score: 45
    },
    {
        name: "Profesor",
        score: 65
    },
    {
        name: "Programator",
        score: 80
    },
    {
        name: "Inginer IT",
        score: 100
    },
    {
        name: "Inginer electronist",
        score: 70
    },
    {
        name: "Instructor auto",
        score: 60
    },
    {
        name: "Lacatus",
        score: 40
    },
    {
        name: "Mecanic auto",
        score: 55
    },
    {
        name: "Operator",
        score: 50
    },
    {
        name: "Muncitor calificat",
        score: 50
    },
    {
        name: "Psiholog",
        score: 80
    },
    {
        name: "Secretar",
        score: 50
    },
    {
        name: "Strungar",
        score: 40
    },
    {
        name: "Sudor",
        score: 40
    },
    {
        name: "Taximetrist",
        score: 30
    },
    {
        name: "Consulant vanzari",
        score: 50
    },
    {
        name: "Pensioar",
        score: 70
    }

]
const seedDB = async () => {
    await ActivitySector.deleteMany({});
    await ActivitySector.insertMany(activities)

    await Profession.deleteMany({});
    await Profession.insertMany(professions);
};

seedDB().then(() => {
    mongoose.connection.close();
});