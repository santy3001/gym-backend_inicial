const router = require('express').Router();
const ctrl   = require('../controllers/routine.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Rutinas
 *   description: Gestión de rutinas de entrenamiento
 */

/**
 * @swagger
 * /api/routines:
 *   get:
 *     summary: Obtener todas las rutinas
 *     tags: [Rutinas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de rutinas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Routine'
 */
router.get('/', verifyToken, ctrl.getAll);

/**
 * @swagger
 * /api/routines/{id}:
 *   get:
 *     summary: Obtener rutina por ID
 *     tags: [Rutinas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos de la rutina
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Routine'
 *       404:
 *         description: No encontrada
 */
router.get('/:id', verifyToken, ctrl.getById);

/**
 * @swagger
 * /api/routines:
 *   post:
 *     summary: Crear nueva rutina
 *     tags: [Rutinas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoutineInput'
 *     responses:
 *       201:
 *         description: Rutina creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Routine'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', verifyToken, ctrl.create);

/**
 * @swagger
 * /api/routines/{id}:
 *   put:
 *     summary: Actualizar rutina
 *     tags: [Rutinas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoutineInput'
 *     responses:
 *       200:
 *         description: Rutina actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Routine'
 */
router.put('/:id', verifyToken, ctrl.update);

/**
 * @swagger
 * /api/routines/{id}:
 *   delete:
 *     summary: Eliminar rutina
 *     tags: [Rutinas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rutina eliminada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.delete('/:id', verifyToken, ctrl.remove);

module.exports = router;
