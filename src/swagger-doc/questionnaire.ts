/**
 * @swagger
 * /questionnaire:
 *   get:
 *     summary: Get all questionnaires
 *     description: Retrieve a list of all questionnaires
 *     tags: [Questionnaire]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       user_id:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       status:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       429:
 *         $ref: '#/components/responses/TooManyRequestsError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *   post:
 *     summary: Create a new questionnaire
 *     description: Create a new questionnaire
 *     tags: [Questionnaire]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answer:
 *                 type: object
 *                 properties:
 *                   Gender:
 *                     type: number
 *                   WorkOrStudent:
 *                     type: number
 *                   Pressure:
 *                     type: number
 *                   Satisfaction:
 *                     type: number
 *                   SleepDr:
 *                     type: number
 *                   DietHabits:
 *                     type: number
 *                   SuicidalTh:
 *                     type: number
 *                   WSHours:
 *                     type: number
 *                   FinancialStress:
 *                     type: number
 *                   FamHistory:
 *                     type: number
 *     responses:
 *       200:
 *         description: Questionnaire created successfully
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
 *                     id:
 *                       type: string
 *                       example: "1"
 *                     user_id:
 *                       type: string
 *                       example: "1"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-06-01T00:00:00.000Z"
 *                     status:
 *                       type: string
 *                       example: "1"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       429:
 *         $ref: '#/components/responses/TooManyRequestsError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 * /questionnaire/{id}:
 *   get:
 *     summary: Get questionnaire by ID
 *     description: Retrieve a questionnaire by its ID
 *     tags: [Questionnaire]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the questionnaire to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Questionnaire successfully retrieved
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
 *                     questionnaire:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         user_id:
 *                           type: string
 *                         date:
 *                           type: string
 *                           format: date-time
 *                         status:
 *                           type: string
 *                         music_recommendation:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                               title:
 *                                 type: string
 *                               artist:
 *                                 type: string
 *                               thumbnail:
 *                                 type: string
 *                               link:
 *                                 type: string
 *                         theraphy_recommendation:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       429:
 *         $ref: '#/components/responses/TooManyRequestsError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 * 
 */
