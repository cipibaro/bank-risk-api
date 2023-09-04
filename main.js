/*
const Client = require('./models/client');
const CreditRatingSystem = require('./roughset/CreditRatingSystem');

const mongoose = require('mongoose');
const EmploymentIndustry = require('./models/employmentIndustry');
const Profession = require('./models/profession');

const MIN_INCOME = 1900;
const MIN_CREDIT_SCORE = 600;
const MAX_DEBT_PERCENTAGE = 40;

async function main() {
    try {
        const creditRatingSystem = new CreditRatingSystem();

        const employmentPts = await EmploymentIndustry.findOne({name: req.body.employmentIndustry});
        const professionPts = await Profession.findOne({name: req.body.profession});


        console.log("Nume: " + employmentPts.name + ", Scor: " + employmentPts.score);
        console.log("Nume: " + professionPts.name + ", Scor: " + professionPts.score);

        // Adjust the data to make John low risk with a higher income
        const coto = new Client(
            "Adrian",
            "Cotoila",
            1970208384971,
            "m",
            "Dragasani",
            "Vilcea",
            "02/08/1997",
            "OT",
            "345213",
            "Universitate",
            26,
            "Romana",
            false,
            true,
            0,
            "Concubinaj",
            2,
            2500,
            2,
            350,
            "Angajat",
            "Salariu",
            "Comert",
            "Consulant vanzari",
            "Foarte bun",
            "Foarte bun platnic",
            4,
        );

        const totalCreditScore = creditRatingSystem.evaluateCredit(coto);
        console.log(`${coto.firstName}'s Total Credit Score: ${totalCreditScore}`);
        const creditRating = creditRatingSystem.getCreditRating(coto, MIN_INCOME, MIN_CREDIT_SCORE, MAX_DEBT_PERCENTAGE);
        console.log(`${coto.firstName}'s Credit Rating: ${creditRating}`);

    } catch (error) {
        // Log the error or handle it appropriately
        console.error("An unexpected error occurred:", error);
    }
}

// Run the main function
main();
*/
