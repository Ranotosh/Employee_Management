import{ISkill} from './ISkill';
export interface IEmployee{
    id: number,
    fullname:string,
    email: string,
    phone: string,
    contactpref:string,
    skills:ISkill[]
}