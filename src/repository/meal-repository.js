import Meal from "../model/meal-model.js";
import User from "../model/user-model.js";

/*
const getAllPosts = async (order = 'ASC') => {
    const posts = await Post.findAll({ order: [['createdAt', order]] });
    return posts;
}
*/

const getMealsByClientId = async (clientId, order) => {
    try {
        const meals = await Meal.findAll({ where: { clientId: clientId }, order: [['createdAt', order]] });
        return meals;
    } catch (error) {
        console.log(error);
    }
}

const createMeal = async (pMeal) => {
    try {
        const newMeal = await Meal.create(pMeal);
        return newMeal;
    } catch (err) {
        console.log(err);
    }
}


const getMealById = async (mealId) => {
    const meal = await Meal.findOne({
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


const deleteMealById = async (pId) => {
    return await Meal.destroy({
        where: {
            id: pId
        }
    })
}

const updateMealById = async (pId, updatedMeal) => {
    try {
        const meal = await Meal.findByPk(pId);
        if (meal) {
            await Meal.update(updatedMeal, { where: { id: pId } });
            return
        }
        return { msg: "No post found with this ID" };
    } catch (error) {
        console.log(error);
    }
}








export default {
    getMealsByClientId,
    //getAllPosts,
    createMeal,
    getMealById,
    deleteMealById,
    updateMealById
}