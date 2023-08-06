








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
