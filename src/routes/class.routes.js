const router = require('express').Router();
const ctrl   = require('../controllers/class.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Clases
 *   description: Gestión de clases grupales del gimnasio
 */

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Obtener todas las clases
 *     tags: [Clases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 */
router.get('/', verifyToken, ctrl.getAll);

/**
 * @swagger
 * /api/classes/{id}:
 *   get:
 *     summary: Obtener clase por ID
 *     tags: [Clases]
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
 *         description: Datos de la clase
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: No encontrada
 */
router.get('/:id', verifyToken, ctrl.getById);

/**
 * @swagger
 * /api/classes:
 *   post:
 *     summary: Crear nueva clase
 *     tags: [Clases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassInput'
 *     responses:
 *       201:
 *         description: Clase creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', verifyToken, ctrl.create);

/**
 * @swagger
 * /api/classes/{id}:
 *   put:
 *     summary: Actualizar clase
 *     tags: [Clases]
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
 *             $ref: '#/components/schemas/ClassInput'
 *     responses:
 *       200:
 *         description: Clase actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 */
router.put('/:id', verifyToken, ctrl.update);

/**
 * @swagger
 * /api/classes/{id}/enroll:
 *   post:
 *     summary: Inscribir usuario en una clase
 *     tags: [Clases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la clase
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId]
 *             properties:
 *               userId:
 *                 type: string
 *                 example: '664abc123def456...'
 *     responses:
 *       200:
 *         description: Usuario inscrito exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       400:
 *         description: Capacidad llena o usuario ya inscrito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/:id/enroll', verifyToken, ctrl.enroll);

/**
 * @swagger
 * /api/classes/{id}:
 *   delete:
 *     summary: Eliminar clase
 *     tags: [Clases]
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
 *         description: Clase eliminada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.delete('/:id', verifyToken, ctrl.remove);

module.exports = router;
