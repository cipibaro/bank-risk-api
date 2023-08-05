function getRatingStudies(client) {
    let rating = 0;

    switch (client.studies) {
        case "Liceu" :
            rating += 100;
            break;
        case "Postlicela" :
            rating += 50;
            break;
        case "Studii Primare":
            rating += 0;
            break;
        default:
            rating += 200;
    }

    console.log("Rating from Studies: " + rating);

    return rating;
}


function getRatingBoolean(input) {

    if (input) {
        console.log("Rating from bool: " + 50);
        return 50;
    }
    return 0;

}

function getRatingPeopleInCare(client) {
    if (client.peopleInCare !== 0) {
        console.log("Rating from people in care: " + client.peopleInCare * -100);
        return client.peopleInCare * -100;
    }
    return 0;
}

function getRatingRelationship(client) {
    let rating = 0;
    switch (client.relationshipStatus) {

        case "Casatorit" :
            rating += 20 * client.relationshipAge;
            break;
        case "Concubinaj":
            rating += 10 * client.relationshipAge;
            break;
        default:
            rating += 0;
    }

    console.log("Rating from relationship " + rating);
    return rating;
}

function getRatingAge(client) {
    let rating = 0;
    let age = client.age;

    if (age >= 18 && age <= 20)
        rating += age * -age;
    else if (age > 20 && age <= 24)
        rating += age * 0.5;
    else if (age > 24 && age <= 28)
        rating += age * 4;
    else if (age > 28 && age <= 32)
        rating += age * 5;
    else if (age > 32 && age <= 36)
        rating += age * 6;
    else if (age > 36 && age <= 50)
        rating += age * 8;
    console.log("Rating from age: " + rating);
    return rating;
}

function getRatingIncome(client) {
    let score = 0
    let income = client.income;

    if (income >= 1900 && income <= 2200)
        score += client.income * 0.1;
    else if (income > 2200)
        score += client.income * 0.12;

    console.log("Rating from income " + score);
    return score;
}

function getRatingYearsOfWork(client) {

    if (client.yearsOfWork > 1) {
        console.log("Rating from years of work " + client.yearsOfWork * 100);
        return client.yearsOfWork * 100;
    }
    return 0;
}

function getRatingDebt(client) {
    console.log("Rating from debt " + client.debt * -0.7);
    return client.debt * -0.7
}


function evaluateRisk(rating, DTI) {
    return rating < 600 || DTI > 0.4;
}


module.exports = {
    score: function (client) {
        return getRatingStudies(client)
            + getRatingBoolean(client.politicalExposure)
            + getRatingBoolean(client.carOwner)
            + getRatingPeopleInCare(client)
            + getRatingRelationship(client)
            + getRatingIncome(client)
            + getRatingAge(client)
            + getRatingDebt(client)
            + getRatingYearsOfWork(client)
    },

    debtToIncomeRatio: function (debt, income) {
        return (debt / income) * 100;
    },

    evaluateRisk: function (rating, DTI) {
        return rating < 600 || DTI > 0.4;
    }

};
