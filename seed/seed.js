const ActivitySector = require("../models/employmentIndustry");
const Profession = require("../models/profession");
const Client = require("../models/client");

const mongoose = require("mongoose");


mongoose.connect('mongodb+srv://ciprian:pariurix.R0@cluster0.xnup7rd.mongodb.net/bank-risk-api')
    .then(() => {
        console.log("Seeding database!");
    }).catch((err) => {
    console.log(err);
});

const activities = [
    {
        name: "Agricultura",
        score: 4
    },
    {
        name: "Industria extractiva",
        score: 3
    },
    {
        name: "Energie, petrol si gaze si minerit energetic",
        score: 5
    },
    {
        name: "Industria alimentara, a bauturilor ai tutunului",
        score: 4
    },
    {
        name: "Industria textila, produse textile, imbracaminte. Pielarie si incaltaminte",
        score: 4
    },
    {
        name: "Exploatarea si prelucrarea primară a lemnului. Fabricarea hartiei si a produselor din hartie",
        score: 4
    },
    {
        name: "Industria chimica si petrochimica si activitati conexe",
        score: 3
    },
    {
        name: "Industria metalurgica",
        score: 3
    },
    {
        name: "Industria mobilei. Alte activitati industriale",
        score: 2
    },
    {
        name: "Constructii civile si industriale",
        score: 3
    },
    {
        name: "Comert",
        score: 5
    },
    {
        name: "Transporturi terestre si servicii conexe",
        score: 3
    },
    {
        name: "Transporturi pe apa si servicii conexe. Transporturi aeriene si servicii conexe",
        score: 4
    },
    {
        name: "Tehnologia informatiei si telecomunicatii",
        score: 15
    },
    {
        name: "Activitati financiare, bancare si de asigurari",
        score: 10
    },
    {
        name: "Servicii de asistenta, consultanta, suport. Alte activitati de servicii",
        score: 3
    },
    {
        name: "Sănătate. Activităţi sanitar-veterinare",
        score: 5
    },
    {
        name: "Invatamant",
        score: 5
    },

];


const professions = [
    {
        name: "Asistent financiar",
        score: 4
    },
    {
        name: "Actor",
        score: 3
    },
    {
        name: "Agent agricol",
        score: 3
    },
    {
        name: "Agent comert",
        score: 4
    },
    {
        name: "Agent de turism",
        score: 5
    },
    {
        name: "Agent imobiliar",
        score: 4
    },
    {
        name: "Analist financiar",
        score: 6
    },
    {
        name: "Arhitect",
        score: 5
    },
    {
        name: "Asistent director",
        score: 7
    },
    {
        name: "Asistent hr",
        score: 5
    },
    {
        name: "Asistent medical",
        score: 7
    },
    {
        name: "Asistent personal",
        score: 4
    },
    {
        name: "Asistent social",
        score: 5
    },
    {
        name: "Avocat",
        score: 8
    },
    {
        name: "Brutar",
        score: 4
    },
    {
        name: "Bucatar",
        score: 6
    },
    {
        name: "Casier",
        score: 4
    },
    {
        name: "Contabil",
        score: 7
    },
    {
        name: "Curier",
        score: 4
    },
    {
        name: "Developer",
        score: 8
    },
    {
        name: "Director general",
        score: 12
    },
    {
        name: "Educator",
        score: 4
    },
    {
        name: "Profesor",
        score: 6
    },
    {
        name: "Programator",
        score: 15
    },
    {
        name: "Inginer IT",
        score: 15
    },
    {
        name: "Inginer electronist",
        score: 7
    },
    {
        name: "Instructor auto",
        score: 6
    },
    {
        name: "Lacatus",
        score: 4
    },
    {
        name: "Mecanic auto",
        score: 5
    },
    {
        name: "Operator",
        score: 5
    },
    {
        name: "Muncitor calificat",
        score: 5
    },
    {
        name: "Psiholog",
        score: 8
    },
    {
        name: "Secretar",
        score: 5
    },
    {
        name: "Strungar",
        score: 4
    },
    {
        name: "Sudor",
        score: 4
    },
    {
        name: "Taximetrist",
        score: 3
    },
    {
        name: "Consulant vanzari",
        score: 5
    },
    {
        name: "Pensioar",
        score: 7
    }

]
const seedDB = async () => {
    await ActivitySector.deleteMany({});
    await ActivitySector.insertMany(activities)

    await Profession.deleteMany({});
    await Profession.insertMany(professions);

}

/*async function seedClients() {
    try {
        // Connect to your MongoDB database here
        // Replace the connection string with your actual MongoDB connection string

        const clients = [];

        for (let i = 0; i < 30; i++) {
            const client = new Client({
                _id: new mongoose.Types.ObjectId(),
                firstName: `ClientFirstName${i}`,
                lastName: `ClientLastName${i}`,
                cnp: '1234567890123', // Replace with appropriate CNP
                sex: i % 2 === 0 ? 'm' : 'f',
                placeOfBirth: 'ClientBirthPlace',
                countyOfb: 'ClientCountyOfBirth',
                dateOfBirth: new Date('1990-01-01'), // Replace with appropriate date of birth
                series: 'AB',
                seriesNumber: '123456',
                studies: 'Universitate',
                age: 30, // Replace with appropriate age
                nationality: 'ClientNationality',
                politicalExposure: i % 2 === 0 ? true : false,
                ownsCar: i % 2 === 0 ? true : false,
                dependents: 2, // Replace with appropriate number of dependents
                relationshipStatus: 'Casatorit',
                relationshipAge: 5, // Replace with appropriate relationship age
                income: 3000, // Replace with appropriate income
                lengthOfEmployment: 5, // Replace with appropriate length of employment
                outstandingDebt: 500, // Replace with appropriate outstanding debt
                occupation: 'Angajat',
                typeOfIncome: 'Salariu',
                employmentIndustry: new mongoose.Types.ObjectId(), // Replace with appropriate employment industry ObjectId
                profession: new mongoose.Types.ObjectId(), // Replace with appropriate profession ObjectId
                creditHistory: 'Bun',
                paymentHistory: 'Bun platnic',
                existingCreditAccounts: 1, // Replace with appropriate number of existing credit accounts
                dtiRatio: 0.16, // Replace with appropriate DTI ratio
            });

            clients.push(client);
        }

        // Insert all clients into the database
        await Client.insertMany(clients);

        console.log('Seed function executed successfully.');
    } catch (error) {
        console.error('Error seeding clients:', error);
    }
}
*/


//seedClients();

seedDB().then(() => {
    mongoose.connection.close();
});