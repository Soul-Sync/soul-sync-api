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
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Articles successfully retrieved
 *                 payload:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       thumbnail:
 *                         type: string
 *                       author:
 *                         type: string
 *                       link:
 *                         type: string
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '429':
 *         $ref: '#/components/responses/TooManyRequestsError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 * 
 * /article/{id}:
 *   get:
 *     summary: Get article by ID
 *     description: Retrieve an article by its ID
 *     tags: [Article]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the article to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Article successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Article successfully retrieved
 *                 payload:
 *                   type: object
 *                   properties:
 *                     article:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         title:
 *                           type: string
 *                         content:
 *                           type: string
 *                         thumbnail:
 *                           type: string
 *                         author:
 *                           type: string
 *                         link:
 *                           type: string
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '429':
 *         $ref: '#/components/responses/TooManyRequestsError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
