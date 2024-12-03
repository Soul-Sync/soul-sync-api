/**
 * @swagger
 * /question:
 *   get:
 *     summary: Get all questions
 *     description: Retrieve a list of all questions
 *     security:
 *       - bearerAuth: []
 *     tags: [Question]
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
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: ed040451-cdf6-4092-a31f-72b21c89436a
 *                           question:
 *                             type: string
 *                             example: Apa gender anda?
 *                           options:
 *                             type: object
 *                             example: { "0": "Laki-laki", "1": "Perempuan" }
 *                           sort:
 *                             type: number
 *                             example: 1
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2024-11-23T00:54:08.000Z
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2024-11-23T00:54:08.000Z
 *       '401':
 *          $ref: '#/components/responses/UnauthorizedError'
 *       '429':
 *          $ref: '#/components/responses/TooManyRequestsError'
 *       '500':
 *          $ref: '#/components/responses/InternalServerError'
 */