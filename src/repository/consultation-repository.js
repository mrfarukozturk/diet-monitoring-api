import Consultation from "../model/consultation-model.js";
import User from "../model/user-model.js";


const getConsultationsByClientId = async (clientId, order) => {
	//User.hasMany(Consultation, { foreignKey: 'authorId' });

	User.hasMany(Consultation, { foreignKey: 'authorId' });
	//User.hasMany(Consultation, { foreignKey: 'dieticianId' });
	//User.hasMany(Consultation, { foreignKey: 'clientId' });
	
	//User.hasOne(Consultation, { foreignKey: 'authorId' });
	Consultation.belongsTo(User, { foreignKey: 'authorId' });


	try {
		const consultations = await Consultation.findAll({
			where: { clientId: clientId },
			include : { 
				model:User,

			},

			order: [['createdAt', order],['id', order]] 


		});
		return consultations;
	} catch (error) {
		console.log(error);
	}
}


const getConsultationsByDieticienId = async (dieticianId, order) => {
	try {
		const consultations = await Consultation.findAll({ where: { dieticienId: dieticianId }, order: [['createdAt', order]] });
		return consultations;
	} catch (error) {
		console.log(error);
	}
}


const createConsultation = async (pConsultation) => {
	try {
		const newConsultation = await Consultation.create(pConsultation);
		return newConsultation;
	} catch (err) {
		console.log(err);
	}
}


const getConsultationById = async (consultationId) => {
	const consultation = await Consultation.findOne({
		where: { id: consultationId },
		/*include: [
				{
						model: User,
						attributes: ["name"]
				}
		]*/
	});
	return consultation;
}


const deleteConsultationById = async (pId) => {
	return await Consultation.destroy({
		where: {
			id: pId
		}
	})
}

const updateConsultationById = async (pId, updatedConsultation) => {
	try {
		const consultation = await Consultation.findByPk(pId);
		if (consultation) {
			await Consultation.update(updatedConsultation, { where: { id: pId } });
			return
		}
		return { msg: "No consultation found with this ID" };
	} catch (error) {
		console.log(error);
	}
}








export default {
	getConsultationsByClientId,
	getConsultationsByDieticienId,
	createConsultation,
	getConsultationById,
	deleteConsultationById,
	updateConsultationById
}