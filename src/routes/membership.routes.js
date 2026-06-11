const router = require('express').Router();
const ctrl   = require('../controllers/membership.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Membresías
 *   description: Gestión de membresías del gimnasio
 */

/**
 * @swagger
 * /api/memberships:
 *   get:
 *     summary: Obtener todas las membresías
 *     tags: [Membresías]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de membresías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Membership'
 */
router.get('/', verifyToken, ctrl.getAll);

/**
 * @swagger
 * /api/memberships/{id}:
 *   get:
 *     summary: Obtener membresía por ID
 *     tags: [Membresías]
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
 *         description: Datos de la membresía
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 *       404:
 *         description: No encontrada
 */
router.get('/:id', verifyToken, ctrl.getById);

/**
 * @swagger
 * /api/memberships/user/{userId}:
 *   get:
 *     summary: Obtener membresías de un usuario específico
 *     tags: [Membresías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Membresías del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Membership'
 */
router.get('/user/:userId', verifyToken, ctrl.getByUser);

/**
 * @swagger
 * /api/memberships:
 *   post:
 *     summary: Crear nueva membresía
 *     tags: [Membresías]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MembershipInput'
 *     responses:
 *       201:
 *         description: Membresía creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', verifyToken, ctrl.create);

/**
 * @swagger
 * /api/memberships/{id}:
 *   put:
 *     summary: Actualizar membresía
 *     tags: [Membresías]
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
 *             $ref: '#/components/schemas/MembershipInput'
 *     responses:
 *       200:
 *         description: Membresía actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 */
router.put('/:id', verifyToken, ctrl.update);

/**
 * @swagger
 * /api/memberships/{id}:
 *   delete:
 *     summary: Eliminar membresía
 *     tags: [Membresías]
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
 *         description: Membresía eliminada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.delete('/:id', verifyToken, ctrl.remove);

module.exports = router;
