class Client {
    constructor(
        firstName,
        lastName,
        cnp,
        sex,
        placeOfBirth,
        countyOfBirth,
        dateOfBirth,
        series,
        seriesNumber,
        studies,
        age,
        nationality,
        politicalExposure,
        ownsCar,
        dependents,
        relationshipStatus,
        relationshipAge,
        income,
        lengthOfEmployment,
        outstandingDebt,
        occupation,
        typeOfIncome,
        employmentIndustry,
        profession,
        creditHistory,
        paymentHistory,
        existingCreditAccounts
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.cnp = cnp
        this.sex = sex;
        this.placeOfBirth = placeOfBirth;
        this.countyOfBirth = countyOfBirth;
        this.dateOfBirth = dateOfBirth;
        this.series = series;
        this.seriesNumber = seriesNumber
        this.studies = studies;
        this.age = age;
        this.nationality = nationality;
        this.politicalExposure = politicalExposure;
        this.ownsCar = ownsCar;
        this.dependents = dependents;
        this.relationshipStatus = relationshipStatus;
        this.relationshipAge = relationshipAge;
        this.income = income;
        this.lengthOfEmployment = lengthOfEmployment;
        this.outstandingDebt = outstandingDebt;
        this.occupation = occupation;
        this.typeOfIncome = typeOfIncome;
        this.employmentIndustry = employmentIndustry;
        this.profession = profession;
        this.creditHistory = creditHistory;
        this.paymentHistory = paymentHistory;
        this.existingCreditAccounts = existingCreditAccounts;
        this.creditScore = 0;
        this.dtiRatio = income / outstandingDebt;
    }
}

class CreditRatingSystem {
    constructor() {
        // ... (if needed, you can store the array of clients here)
    }

    evaluateCredit(client) {
        try {
            // Studies Points
            let studiesPoints = 0
            switch (client.studies) {
                case "Universitate":
                    studiesPoints += 200;
                    break;
                case "Liceu":
                    studiesPoints += 100;
                    break;
                case "Postlicela":
                    studiesPoints += 50;
                    break;
                case "Studii Primare":
                    studiesPoints += 25;
                    break;
                default:
                    studiesPoints += 0;
            }

            // Age Points (higher age gets more points)
            let age = client.age;
            let agePoints = 0;
            if (age >= 18 && age <= 20)
                agePoints += age * -age;
            else if (age > 20 && age <= 24)
                agePoints += age * 0.5;
            else if (age > 24 && age <= 28)
                agePoints += age * 4;
            else if (age > 28 && age <= 32)
                agePoints += age * 5;
            else if (age > 32 && age <= 36)
                agePoints += age * 6;
            else if (age > 36 && age <= 50)
                agePoints += age * 8;


            // Political Exposure Points
            let politicalExposurePoints = client.politicalExposure ? 50 : 0;

            // Owns Car Points
            let ownsCarPoints = client.ownsCar ? 50 : 0;

            // Dependents Points (more dependents get more points)
            let dependentsPoints = client.dependents !== 0 ? client.dependents * -100 : 0;

            // Relationship Points
            let relationshipPoints = 0;
            switch (client.relationshipStatus) {
                case "Casatorit":
                    relationshipPoints += client.relationshipAge >= 1 ? 20 : 0;
                    relationshipPoints += client.relationshipAge >= 5 ? 30 : 0;
                    relationshipPoints += client.relationshipAge >= 10 ? 50 : 0;
                    break;
                case "Concubinaj":
                    relationshipPoints += client.relationshipAge >= 1 ? 10 : 0;
                    relationshipPoints += client.relationshipAge >= 5 ? 20 : 0;
                    relationshipPoints += client.relationshipAge >= 10 ? 40 : 0;
                    break;
                default:
                    // No points for other relationship statuses
                    break;
            }

            // Income Points (higher income gets more points)
            let incomePoints = 0;
            let income = client.income;

            if (income >= 1900 && income <= 2200)
                incomePoints += client.income * 0.1;
            else if (income > 2200)
                incomePoints += client.income * 0.12;

            // Employment Length Points (longer employment gets more points)
            let employmentLengthPoints = client.lengthOfEmployment >= 2 ? client.lengthOfEmployment * 50 : 50;

            // Debt Points (lower debt gets more points)
            let debtPoints = client.outstandingDebt * -0.4;

            // Occupation Points
            let occupationPoints = 0;
            switch (client.occupation) {
                case "Angajat":
                    occupationPoints += 50;
                    break;
                case "Pensionar":
                    occupationPoints += 30
                    break
                default:
                    break;
            }

            //Type of income points
            let typeOfIncomePoints = 0;
            switch (client.typeOfIncome) {
                case "Salariu":
                    typeOfIncomePoints += 50;
                    break;
                case "Pensie":
                    typeOfIncomePoints += 30
                    break
                default:
                    break;
            }

            // Credit History Points
            let creditHistoryPoints = 0;
            switch (client.creditHistory) {
                case "Foarte bun" :
                    creditHistoryPoints = 100;
                    break;
                case "Bun" :
                    creditHistoryPoints = 50;
                    break;
                case "Fara istoric" :
                    creditHistoryPoints += 0;
                    break;
                default:
                    creditHistoryPoints += 0;
                    break;
            }

            // Payment History Points (Good history gets more points)

            let paymentHistoryPoints = 0;
            switch (client.paymentHistory) {
                case "Foarte bun platnic" :
                    paymentHistoryPoints += 100;
                    break;
                case "Bun platnic":
                    paymentHistoryPoints += 50;
                    break;
                case "Rau platnic" :
                    paymentHistoryPoints -= 500;
                    break;
                default:
                    paymentHistoryPoints += 0;
            }

            // Existing Credit Account Points (more accounts get more points)
            let existingCreditAccountPoints = client.existingCreditAccounts >= 2 ? 50 : 0;


            // DTI Ratio Points
            let dtiRatioPoints = 0;
            if (client.dtiRatio <= 0.3) {
                dtiRatioPoints = 200;
            } else if (client.dtiRatio <= 0.4) {
                dtiRatioPoints = 50;
            }


            // Calculate total credit score
            let totalPoints =
                studiesPoints +
                agePoints +
                politicalExposurePoints +
                ownsCarPoints +
                dependentsPoints +
                relationshipPoints +
                incomePoints +
                employmentLengthPoints +
                debtPoints +
                occupationPoints +
                typeOfIncomePoints +
                creditHistoryPoints +
                paymentHistoryPoints +
                existingCreditAccountPoints +
                dtiRatioPoints;


            client.creditScore = totalPoints;
            return totalPoints;

        } catch (error) {
            // Log the error or handle it appropriately
            console.error("Error occurred during credit evaluation:", error);
            // You can return a default value or throw a custom error here if needed
            throw new Error("Credit evaluation failed");
        }
    }

    belongsToLowerApproximation(client, minIncome, minCreditScore, maxDebtPercentage) {
        return (
            client.income >= minIncome &&
            client.creditScore >= minCreditScore &&
            client.outstandingDebt <= (client.income * maxDebtPercentage) / 100
        );
    }

    belongsToUpperApproximation(client, minIncome, minCreditScore, maxDebtPercentage) {
        const maxOutstandingDebt = (client.income * maxDebtPercentage) / 100;
        return (
            client.income >= minIncome &&
            client.creditScore >= minCreditScore &&
            client.outstandingDebt > maxOutstandingDebt
        );
    }

    getCreditRating(client, minIncome, minCreditScore, maxDebtPercentage) {
        try {
            if (client.income < minIncome || client.creditScore < minCreditScore) {
                return "Not creditworthy";
            }

            const lowerApproximation = this.belongsToLowerApproximation(client, minIncome, minCreditScore, maxDebtPercentage);
            const upperApproximation = this.belongsToUpperApproximation(client, minIncome, minCreditScore, maxDebtPercentage);

            if (lowerApproximation) {
                if (client.creditScore >= 800) {
                    return "Excellent Credit (Very Low Risk)";
                } else if (client.creditScore >= 750) {
                    return "Very Good Credit (Low Risk)";
                } else if (client.creditScore >= 700) {
                    return "Good Credit (Moderate Risk)";
                } else if (client.creditScore >= 650) {
                    return "Fair Credit (Moderate to High Risk)";
                } else if (client.creditScore >= 600) {
                    return "Poor Credit (High Risk)";
                }
            } else if (upperApproximation) {
                return "Possible creditworthy client (Upper Approximation)";
            } else {
                return "Not creditworthy";
            }
        } catch (error) {
            // Log the error or handle it appropriately
            console.error("Error occurred during credit rating calculation:", error);
            // You can return a default value or throw a custom error here if needed
            throw new Error("Credit rating calculation failed");
        }
    }
}

function main() {
    try {
        const creditRatingSystem = new CreditRatingSystem();
        const minIncome = 1900;
        const minCreditScore = 600;
        const maxDebtPercentage = 40;

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
            21,
            "Romana",
            false,
            true,
            0,
            "Concubinaj",
            2,
            1900,
            2,
            350,
            "Angajat",
            "Salariu",
            "Comerț",
            "Consilier vanzari",
            "Bun",
            "Foarte bun platnic",
            5,
        );

        // Get John's total credit score
        const totalCreditScore = creditRatingSystem.evaluateCredit(coto);
        console.log(`${coto.firstName}'s Total Credit Score: ${totalCreditScore}`);

        const creditRatingLowRisk = creditRatingSystem.getCreditRating(
            coto,
            minIncome,
            minCreditScore,
            maxDebtPercentage
        );

        console.log(`${coto.firstName}'s Credit Rating: ${creditRatingLowRisk}`);
    } catch (error) {
        // Log the error or handle it appropriately
        console.error("An unexpected error occurred:", error);
    }
}

// Run the main function
main();
