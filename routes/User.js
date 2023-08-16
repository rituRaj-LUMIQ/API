/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - email
 *         - gender
 *         - mobileNumber
 *         - birthday
 *         - city
 *         - state
 *         - country
 *         - address1
 *       properties:
 *          name:
 *           type: string
 *           description: Name of the user.
 *          age:
 *           type: number
 *           description: Age of user (Must be atleast 18 years old to create user profile).
 *          gender:
 *           type: string
 *           enum:
 *             - Male
 *             - Female
 *             - Other
 *           description: Gender of user (Only accepts ["Male", "Female", "Other"]).
 *          mobileNumber:
 *           type: string
 *           description: Mobile number must be 10 digits number.
 *          birthday:
 *           type: string
 *           description: string of format DD-MM-YYYY
 *          city:
 *           type: string
 *           description: City where you live.
 *          state:
 *           type: string
 *           description: State where you live.
 *          country:
 *           type: string
 *           description: Country  where you live.
 *          address1:
 *           type: string
 *           description: Your address.
 *          address2:
 *           type: string
 *           description: Your address.
 *    
 *     UserInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         age:
 *           type: number
 *         email:
 *           type: string
 *         gender:
 *           type: string
 *           enum:
 *             - Male
 *             - Female
 *             - Other
 *         mobileNumber:
 *           type: string
 *         birthday:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         country:
 *           type: string
 *         address1:
 *           type: string
 *         address2:
 *           type: string
 *     
 *     Error:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *         message:
 *           type: string
 *         error:
 *           type: string
 *         data:
 *           type: string 
 *       
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managing API
 * /user:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       '200':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   get:
 *     summary: Get a user by email
 *     parameters:
 *       - name: email
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Update a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Delete a user by email
 *     parameters:
 *       - name: email
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

const express = require('express')
const router = express.Router()
const User = require("../Models/User");
const { deleteUser, createUser, updateUser, findUser } = require('../controller/User');

router.route('/')
    .post(createUser)
    .delete(deleteUser)
    .put(updateUser)
    .get(findUser)

module.exports = router;