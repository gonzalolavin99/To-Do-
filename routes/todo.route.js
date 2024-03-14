import { todoModel } from "../model/todo.model";
import { Router } from "express";
const router = Router();

//GET /todos
router.get("/", async (req, res) => {});

//GET /todos/:id
router.get("/:id", async (req, res) => {});

//POST /todos
router.post("/", async(req,res)=>{})

//PUT  /todos/:id
router.put('/:id',async (req,res)=> {});

//DELETE /todos/:id
router.delete('/:id',async (req,res)=>{});

export  default router;