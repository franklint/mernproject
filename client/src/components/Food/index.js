import React, { useState } from 'react';


import apiCall from '../../utils/foodApi';
import { CardColumns, Card, Button, Form, Container } from 'react-bootstrap';

const FoodContainer = () => {

    const [formData, setFormData] = useState({ location: '', cuisineId: ''});

    const [foodData, setFoodData] = useState([]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    }
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const {location, cuisineId} = formData;

            const response = apiCall(location, cuisineId);

            console.log(location, cuisineId);
            if (!response) {
                throw new Error('What is going on?');
            }

            const callReturn = await response.then(data => data);

            const {name, menu_url, thumb} = callReturn;
            
            setFoodData([
                {
                    name: name,
                    menu: menu_url,
                    thumb: thumb
                }
            ])
            console.log(foodData);
    }

    return (
        <Container>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control 
                        type='text'
                        name='location'
                        value={formData.location}
                        onChange={handleChange}
                        placeholder='Enter city name'
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select Cuisine</Form.Label>
                    <Form.Control 
                        custom as='select'
                        name='cuisineId'
                        value={formData.cuisineId}
                        onChange={handleChange}
                    >
                        <option value='1'>Burgers</option>
                        <option value='55'>Itelian</option>
                        <option value='25'>Sushi</option>
                        <option value='30'>American</option>
                        <option value=''>Random</option>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='success' size='sm'>Submit</Button>
            </Form>
            <CardColumns>
                {foodData.map((food) => {
                    return(
                        <Card border='dark'>
                            {food.thumb ? (
                                <Card.Img src={food.thumb} alt={`Preview of ${food.name}`} variant='top'/>
                            ) : null}
                            <Card.Body>
                                <h3>{food.name}</h3>
                                <a href={food.menu} target='_blank' rel='noopener noreferrer'>Check Menu</a>
                            </Card.Body>
                        </Card>
                    )
                })   
                }
            </CardColumns>
        </Container>
    )
}

export default FoodContainer;