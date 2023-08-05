const ActivitySector = require("../models/activitySector");
const Proffesion = require("../models/proffesion");
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
        name: "asistent financiar",
        score: 45
    },
    {
        name: "actor",
        score: 35
    },
    {
        name: "agent agricol",
        score: 30
    },
    {
        name: "agent comert",
        score: 45
    },
    {
        name: "agent de turism",
        score: 50
    },
    {
        name: "agent imobiliar",
        score: 45
    },
    {
        name: "analist financiar",
        score: 60
    },
    {
        name: "arhitect",
        score: 55
    },
    {
        name: "asistent director",
        score: 70
    },
    {
        name: "asistent hr",
        score: 50
    },
    {
        name: "asistent medical",
        score: 75
    },
    {
        name: "asistent personal",
        score: 45
    },
    {
        name: "asistent social",
        score: 55
    },
    {
        name: "avocat",
        score: 80
    },
    {
        name: "brutar",
        score: 45
    },
    {
        name: "bucatar",
        score: 65
    },
    {
        name: "casier",
        score: 45
    },
    {
        name: "contabil",
        score: 70
    },
    {
        name: "curier",
        score: 40
    },
    {
        name: "developer",
        score: 80
    },
    {
        name: "director general",
        score: 80
    },
    {
        name: "educator",
        score: 65
    },
    {
        name: "profesor",
        score: 65
    },
    {
        name: "programator",
        score: 80
    },
    {
        name: "inginer it",
        score: 80
    },
    {
        name: "inginer electronist",
        score: 70
    },
    {
        name: "instructor auto",
        score: 60
    },
    {
        name: "lacatus",
        score: 40
    },
    {
        name: "mecanic auto",
        score: 55
    },
    {
        name: "operator",
        score: 50
    },
    {
        name: "muncitor calificat",
        score: 50
    },
    {
        name: "psiholog",
        score: 80
    },
    {
        name: "secretar",
        score: 50
    },
    {
        name: "strungar",
        score: 40
    },
    {
        name: "sudor",
        score: 40
    },
    {
        name: "taximetrist",
        score: 30
    },
    {
        name: "consulant vanzari",
        score: 50
    },

]
const seedDB = async () => {
    await ActivitySector.deleteMany({});
    await ActivitySector.insertMany(activities)

    await Proffesion.deleteMany({});
    await Proffesion.insertMany(professions);
};

seedDB().then(() => {
    mongoose.connection.close();
});