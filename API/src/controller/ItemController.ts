import {getRepository} from "typeorm";
import {Request, Response} from "express";
import {Items} from "../entity/Items";
import { validate } from "class-validator";

export class ItemController {

   //
    static getAll = async (req: Request, res: Response)=>{
        const useRepository = getRepository(Items);
        let items;
        try {
            items = await useRepository.find();
        } catch (error) {
            res.status(404).json({message: 'Somenthing goes wrong!'});
        }
        if (items.length > 0) {
            res.send(items);
        } else {
            res.status(404).json({message: 'Not result'});
        }
    }

    static getById = async (req: Request, res: Response)=>{
        const {id} = req.params;
        const itemsRepository = getRepository(Items);
        try {
            const items = await itemsRepository.findOneOrFail(id);
            res.send(items);
        } catch (error) {
            res.status(404).json({message:'Not Result of Items'});
        }
    }
    static newItem = async (req: Request, res: Response)=>{
        const {name, description, price, image} = req.body;
        const items = new Items();
       
        items.name = name;
        items.description = description;
        items.price = price;
        items.image = image;

        //validaciones
        const validationOpt = {validationError: {target: false, value: false}}
        const errors = await validate(items, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors)
        }

        const userRepository = getRepository(Items);
        try {
            await userRepository.save(items);
        } catch (error) {
            return res.status(409).json({message:'This item Already exist'});
        }
        res.send('Item is Created');
    }
    static editItem = async (req: Request, res: Response)=>{
        let item;
        const {id} = req.params;
        const{name,description,price, image}= req.body;

        const userRepository = getRepository(Items);
    // Try get Item
    try {
        item = await userRepository.findOneOrFail(id);
        item.name = name;
        item.description = description;
        item.price = price;
        item.image = image;
    } catch (error) {
        return res.status(404).json({message:'Item not found'});
    }
    //validate
    const validationOpt = {validationError: {target: false, value: false}}
    const errors = await validate(item, validationOpt );
        if (errors.length>0) {
            return res.status(400).json(errors);
        }
        // Try to save the user
        try {
            await userRepository.save(item);
        } catch (error) {
            return res.status(409).json({message:'Error in save Item'});
        }
        res.status(201).json({message:'Item Update'});
    }
    static deleteItem = async (req: Request, res: Response)=>{
        const {id} = req.params;
        const userRepository = getRepository(Items);

        let items: Items;

        try {
            items = await userRepository.findOneOrFail(id);
        } catch (error) {
            return res.status(404).json({message:'Item not found'});
        }
        //Remove user
        userRepository.delete(id);
        res.status(200).json({message:'Item deleted'});
    }
}

export default ItemController;