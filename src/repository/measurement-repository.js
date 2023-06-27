import Measurement from "../model/measurement-model.js";
import User from "../model/user-model.js";


const getMeasurementsByClientId = async (clientId, order) => {
    try {
        const measurements = await Measurement.findAll({ where: { clientId: clientId }, order: [['createdAt', order]] });
        return measurements;
    } catch (error) {
        console.log(error);
    }
}

const createMeasurement = async (pMeasurement) => {
    try {
        const newMeasurement = await Measurement.create(pMeasurement);
        return newMeasurement;
    } catch (err) {
        console.log(err);
    }
}










const getMeasurementById = async (mealId) => {
    const meal = await Measurement.findOne({
        where: { id: mealId },
        /*include: [
            {
                model: User,
                attributes: ["name"]
            }
        ]*/
    });
    return meal;
}


const deleteMeasurementById = async (pId) => {
    return await Measurement.destroy({
        where: {
            id: pId
        }
    })
}

const updateMeasurementById = async (pId, updatedMeasurement) => {
    try {
        const measurement = await Measurement.findByPk(pId);
        if (measurement) {
            await Measurement.update(updatedMeasurement, { where: { id: pId } });
            return
        }
        return { msg: "No Measurement found with this ID" };
    } catch (error) {
        console.log(error);
    }
}








export default {
    getMeasurementsByClientId,
    createMeasurement,
    getMeasurementById,
    deleteMeasurementById,
    updateMeasurementById
}