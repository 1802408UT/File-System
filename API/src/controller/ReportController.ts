import {getRepository} from "typeorm";
import {Request, Response} from "express";
import {Report} from "../entity/Report";
import { validate } from "class-validator";

export class ReportController {

   //
    static getAll = async (req: Request, res: Response)=>{
        const reportRepository = getRepository(Report);
        let report;
        try {
            report = await reportRepository.find();
        } catch (error) {
            res.status(404).json({message: 'Somenthing goes wrong!'});
        }
        if (report.length > 0) {
            res.send(report);
        } else {
            res.status(404).json({message: 'Not result'});
        }
    }

    static getById = async (req: Request, res: Response)=>{
        const {id} = req.params;
        const reportRepository = getRepository(Report);
        try {
            const report = await reportRepository.findOneOrFail(id);
            res.send(report);
        } catch (error) {
            res.status(404).json({message:'Not Result of Items'});
        }
    }
    static newItem = async (req: Request, res: Response)=>{
        const {product, price, movimiento, vendedor} = req.body;
        const report = new Report();
       
        report.product = product;
        report.price = price;
        report.movimiento = movimiento;
        report.vendedor = vendedor;

        //validaciones
        const validationOpt = {validationError: {target: false, value: false}}
        const errors = await validate(report, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors)
        }

        const userRepository = getRepository(Report);
        try {
            await userRepository.save(report);
        } catch (error) {
            return res.status(409).json({message:'This report Already exist'});
        }
        res.send('This report is Created');
    }
    static editItem = async (req: Request, res: Response)=>{
        let report;
        const {id} = req.params;
        const{product, price, movimiento, vendedor}= req.body;

        const reportRepository = getRepository(Report);
    // Try get Item
    try {
        report = await reportRepository.findOneOrFail(id);
        report.product = product;
        report.price = price;
        report.movimiento = movimiento;
        report.vendedor = vendedor;
    } catch (error) {
        return res.status(404).json({message:'Report not found'});
    }
    //validate
    const validationOpt = {validationError: {target: false, value: false}}
    const errors = await validate(report, validationOpt );
        if (errors.length>0) {
            return res.status(400).json(errors);
        }
        // Try to save the user
        try {
            await reportRepository.save(report);
        } catch (error) {
            return res.status(409).json({message:'Error in save'});
        }
        res.status(201).json({message:'Report Update'});
    }
    static deleteItem = async (req: Request, res: Response)=>{
        const {id} = req.params;
        const userRepository = getRepository(Report);

        let report: Report;

        try {
            report = await userRepository.findOneOrFail(id);
        } catch (error) {
            return res.status(404).json({message:'Report not found'});
        }
        //Remove user
        userRepository.delete(id);
        res.status(200).json({message:'Report deleted'});
    }
}

export default ReportController;