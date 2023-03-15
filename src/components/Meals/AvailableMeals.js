import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from '../styles/AvailableMeals.module.css'

const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            const response = await fetch("https://react-http-ec8db-default-rtdb.firebaseio.com/meals.json")
            if (!response.ok) {
                throw new Error('Something Went Wrong!');
            }

            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                })
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        };
        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);

        });
    }, []);

    if (isloading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading....</p>
            </section>
        )
    }
    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>
        )
    }

    const mealsList = meals.map((meal) => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
