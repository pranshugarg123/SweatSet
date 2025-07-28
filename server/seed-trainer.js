import express from 'express';
import bycrypt from 'bcryptjs';
import {Trainer} from './src/models/Trainer.js';
import connectDB from './src/db/db.js';

connectDB();

async function seed() {
    try{
        const trainerCount = await Trainer.countDocuments();
        if(trainerCount === 0){
            const hashedPassword = await bycrypt.hash('password', 10);
            const newTrainer = new Trainer({
                username: 'aditya',
                name: 'Aditya Pandey',
                email: 'asadityasonu@gmail.com',
                password: hashedPassword,
            });

            await newTrainer.save();
            console.log('Trainer seeded');
        }else{
            console.log('Trainer already seeded');
        }
    }catch(error){
        console.error(error);
    } finally {
        process.exit();
    }
}

seed();