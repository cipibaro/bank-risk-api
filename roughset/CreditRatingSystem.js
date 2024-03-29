const MIN_INCOME = 1900;
const MIN_CREDIT_SCORE = 60;
const MAX_DEBT_PERCENTAGE = 40;
class CreditRatingSystem {
    constructor() {
    }



    studiesPoints(client) {
        let studiesPoints = 0
        switch (client.studies) {
            case "Universitate":
                studiesPoints += 20;
                break;
            case "Liceu":
                studiesPoints += 10;
                break;
            case "Postlicela":
                studiesPoints += 5;
                break;
            case "Studii Primare":
                studiesPoints += 2;
                break;
            default:
                break;
        }

        console.log("Points from studies: " + studiesPoints);
        return studiesPoints;
    }

    agePoints(client) {
        let age = client.age;
        let agePoints = 0;
        if (age >= 18 && age <= 20)
            agePoints += age * 0.1;
        else if (age > 20 && age <= 28)
            agePoints += age * 0.2;
        else if (age > 28 && age <= 32)
            agePoints += age * 0.3;
        else if (age > 32 && age <= 36)
            agePoints += age * 0.4;
        else if (age > 36 && age <= 50)
            agePoints += age * 0.5;

        console.log("Points from age: " + agePoints);
        return agePoints;
    }

    pointsFromBoolean(value) {
        let points = value ? 5 : 0;
        console.log("Points from politic/car: " + points);
        return points
    }

    dependentsPoints(client) {
        let points = client.dependents !== 0 ? client.dependents * -10 : 0;
        console.log("Points from dependents: " + points);
        return points;
    }

    relationshipPoints(client) {
        let relationshipPoints = 0;
        switch (client.relationshipStatus) {
            case "Casatorit":
                relationshipPoints += client.relationshipAge >= 1 ? 2 : 0;
                relationshipPoints += client.relationshipAge >= 5 ? 3 : 0;
                relationshipPoints += client.relationshipAge >= 10 ? 5 : 0;
                break;
            case "Concubinaj":
                relationshipPoints += client.relationshipAge >= 1 ? 1 : 0;
                relationshipPoints += client.relationshipAge >= 5 ? 2 : 0;
                relationshipPoints += client.relationshipAge >= 10 ? 4 : 0;
                break;
            default:
                // No points for other relationship statuses
                break;
        }

        console.log("Points from relationShip: " + relationshipPoints);
        return relationshipPoints;
    }

    incomePoints(client) {
        let incomePoints = 0;
        let income = client.income;

        if (income >= 1900 && income <= 2200) {
            incomePoints += client.income * 0.01;
        } else if (income > 2200) {
            incomePoints += client.income * 0.012;
        }

        console.log("Points from income: " + incomePoints);
        return incomePoints;
    }

    employmentLengthPoints(client) {
        let points = client.lengthOfEmployment >= 2 ? client.lengthOfEmployment * 1.5 : 5;

        console.log("Points from employmentLength: " + points);
        return points;
    }

    debtPoints(client) {
        let points = client.outstandingDebt * -0.04;
        console.log("Points from debt: " + points);
        return points;
    }

    occupationPoints(client) {
        let occupationPoints = 0;
        switch (client.occupation) {
            case "Angajat":
                occupationPoints += 5;
                break;
            case "Pensionar":
                occupationPoints += 3
                break
            default:
                break;
        }
        console.log("Points from occupation: " + occupationPoints);
        return occupationPoints;
    }

    typeOfIncomePoints(client) {
        //Type of income points
        let typeOfIncomePoints = 0;
        switch (client.typeOfIncome) {
            case "Salariu":
                typeOfIncomePoints += 5;
                break;
            case "Pensie":
                typeOfIncomePoints += 3
                break
            default:
                break;
        }

        console.log("Points from typeOfIncome: " + typeOfIncomePoints);
        return typeOfIncomePoints;
    }

    creditHistoryPoints(client) {
        let creditHistoryPoints = 0;
        switch (client.creditHistory) {
            case "Foarte bun" :
                creditHistoryPoints = 10;
                break;
            case "Bun" :
                creditHistoryPoints = 5;
                break;
            case "Fara istoric" :
                creditHistoryPoints += 0;
                break;
            default:
                break;
        }

        console.log("Points from creditHistory: " + creditHistoryPoints);
        return creditHistoryPoints;
    }

    paymentHistoryPoints(client) {
        let paymentHistoryPoints = 0;
        switch (client.paymentHistory) {
            case "Foarte bun platnic" :
                paymentHistoryPoints += 10;
                break;
            case "Bun platnic":
                paymentHistoryPoints += 5;
                break;
            case "Rau platnic" :
                paymentHistoryPoints -= 50;
                break;
            default:
                paymentHistoryPoints += 0;
        }

        console.log("Points from paymentHistory: " + paymentHistoryPoints);
        return paymentHistoryPoints;
    }

    existingCreditAccountPoints(client) {
        let points = client.existingCreditAccounts >= 2 ? 5 : 5;
        console.log("Points from existingCreditAccount: " + points);
        return points;
    }

    dtiRatioPoints(client) {
        let dtiRatioPoints = 0;
        if (client.dtiRatio <= 0.3) {
            dtiRatioPoints = 20;
        } else if (client.dtiRatio <= 0.4) {
            dtiRatioPoints = 5;
        }

        console.log("Points from dtiRatioPoints: " + dtiRatioPoints);
        return dtiRatioPoints;
    }

    employmentIndustryPoints(client) {
        console.log("Points from employmentIndustry: " + client.employmentPts);
        return client.employmentPts;
    }

    professionPoints(client) {

        console.log("Points from profession: " + client.professionPts);
        return client.professionPts;
    }


    evaluateCredit(client) {
        try {
            let totalPoints = this.studiesPoints(client) +
                this.agePoints(client) +
                this.pointsFromBoolean(client.politicalExposure) +
                this.pointsFromBoolean(client.ownsCar) +
                this.dependentsPoints(client) +
                this.relationshipPoints(client) +
                this.incomePoints(client) +
                this.employmentLengthPoints(client) +
                this.debtPoints(client) +
                this.occupationPoints(client) +
                this.typeOfIncomePoints(client) +
                this.creditHistoryPoints(client) +
                this.paymentHistoryPoints(client) +
                this.existingCreditAccountPoints(client) +
                this.dtiRatioPoints(client) +
                this.employmentIndustryPoints(client) +
                this.professionPoints(client);

            client.creditScore = totalPoints;
            return totalPoints;

        } catch (error) {
            // Log the error or handle it appropriately
            console.error("Error occurred during credit evaluation:", error);
            // You can return a default value or throw a custom error here if needed
            throw new Error("Credit evaluation failed");
        }
    }

    belongsToLowerApproximation(client) {
        return (
            client.income >= MIN_INCOME &&
            client.creditScore >= MIN_CREDIT_SCORE &&
            client.outstandingDebt <= (client.income * MAX_DEBT_PERCENTAGE) / 100
        );
    }

    belongsToUpperApproximation(client) {
        const maxOutstandingDebt = (client.income * MAX_DEBT_PERCENTAGE) / 100;
        return (
            client.income >= MIN_INCOME &&
            client.creditScore < MIN_CREDIT_SCORE &&
            client.outstandingDebt > maxOutstandingDebt
        );
    }

    getCreditRating(client) {
        try {
            // Check for not creditworthy condition
           /* if (client.income < MIN_INCOME || client.outstandingDebt > (client.income * MAX_DEBT_PERCENTAGE) / 100) {
                return "Not creditworthy";
            }*/

            const lowerApproximation = this.belongsToLowerApproximation(client);
            const upperApproximation = this.belongsToUpperApproximation(client);

            if (lowerApproximation) {
                if (client.creditScore >= 80) {
                    return "Excellent Credit (Very Low Risk)";
                } else if (client.creditScore >= 70) {
                    return "Good Credit (Moderate Risk)";
                } else if (client.creditScore >= 60) {
                    return "Poor Credit (High Risk)";
                }
            } else if (upperApproximation) {
                if (client.creditScore >= 50) {
                    return "Possible creditworthy client (Upper Approximation)";
                }
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

module.exports = CreditRatingSystem;