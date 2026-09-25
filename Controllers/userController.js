import pool from "../config/db.js"

export const getuser=async()=>{
    try{
        const response=await pool.query("SELECT * FROM profile");
        res.status(200).json({
            message:"Data succesfully fetched" ,
            data:response.rows
        })
    }catch(error){
        next(error);
    }
}

export const createuser=async()=>{
    const {id,username,age , email,phone , address}=req.body;
    try{
        const response=await pool.query("INSERT INTO {id,username,age ,email,phone , address} VALUES ($1,$2,$3,$4 ,$5 ,$6) RETURNING *",[id,username,email,phone , address ,age]);
        res.status(201).json({
            message:"Data CREATE succesfully " ,
            data:response.rows[0]
        })
    }catch(error){
        next(error);
    }
};

export const putuser=async()=>{
    const id=req.params.id;
    const {username, age , email,phone , address }=req.body;
    try{
        const response=await pool.query("UPDATE user SET id=$1 username=$2 age= $3 email=$4 phone=$5 , address = $6 RETURNING id",[id,username, age , email,phone , address]);
        res.status(200).json({
            message:"Data update succesfully " ,
            data:id
        })
    }catch(error){
        next(error);
    }
}

