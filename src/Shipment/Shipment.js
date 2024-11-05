import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { UserContext } from '../App';

    const Shipment = () => {
        const { register, handleSubmit, watch, formState: { errors } } = useForm();
        const [loggedInUser, setLoggedInUser] = useContext(UserContext);
        const onSubmit = data => console.log(data);
    
        console.log(watch("example")); 
    
        return (
        
        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
            
            <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder='Enter Your Name' />
            {errors.name && <span className='error'>Name is required</span>}

            <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder='Enter Your Email' />
            {errors.email && <span className='error'>Email is required</span>}

            <input defaultValue={loggedInUser.address}  {...register("address", { required: true })} placeholder='Enter Your Adress' />
            {errors.address && <span className='error'>Adress is required</span>}

            <input defaultValue={loggedInUser.phone} {...register("phoneNumber", { required: true })} placeholder='Enter Your Mobile Number' />
            {errors.phoneNumber && <span className='error'>Phone Number is required</span>}
            
            <input type="submit" />
        </form>
        );
    };

    export default Shipment;