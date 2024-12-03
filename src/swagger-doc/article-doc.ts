/**
 * @swagger
 * /article:
 *   get:
 *     summary: Get all articles
 *     description: Retrieve a list of all articles
 *     tags: [Article]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Articles successfully retrieved
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
 *                   type: array
 *                   items:
 *       '401':
 *          $ref: '#/components/responses/UnauthorizedError'
 *       '429':
 *          $ref: '#/components/responses/TooManyRequestsError'
 *       '500':
 *          $ref: '#/components/responses/InternalServerError'
 *  
*/