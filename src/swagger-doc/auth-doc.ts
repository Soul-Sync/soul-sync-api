/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with email and password
 *     description: Authenticate user and return access token with user information
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: lusiana@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: lusiana
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 payload:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     token_type:
 *                       type: string
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         email:
 *                           type: string
 *                         name:
 *                           type: string
 *                         date_of_birth:
 *                           type: string
 *                           format: date
 *                         gender:
 *                           type: string
 *                         avatar:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *       '401':
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 * 
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user and return access token with user information
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 payload:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     token_type:
 *                       type: string
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         email:
 *                           type: string
 *                         name:
 *                           type: string
 *                         date_of_birth:
 *                           type: string
 *                           format: date
 *                         gender:
 *                           type: string
 *                         avatar:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *       '401':
 *          $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *          $ref: '#/components/responses/NotFoundError'
 *       '429':
 *          $ref: '#/components/responses/TooManyRequestsError'
 *       '500':
 *          $ref: '#/components/responses/InternalServerError'
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Logout user and invalidate access token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '429':
 *         $ref: '#/components/responses/TooManyRequestsError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */