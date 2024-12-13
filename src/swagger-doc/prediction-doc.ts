// {
//     "Gender": 1,
//     "WorkOrStudent": 0,
//     "Pressure": 4,
//     "Satisfaction": 3,
//     "SleepDr": 2,
//     "DietHabits": 1,
//     "SuicidalTh": 0,
//     "WSHours": 8,
//     "FinancialStress": 3,
//     "FamHistory": 1
// }
/**
* @swagger
* /predict:
*   post:
*     summary: Predict
*     description: Predict Users Questionnaire
*     tags: 
*       - Prediction
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               Gender:
*                 type: number
*                 example: 1
*               WorkOrStudent:
*                 type: number
*                 example: 0
*               Pressure:
*                 type: number
*                 example: 4
*               Satisfaction:
*                 type: number
*                 example: 3
*               SleepDr:
*                 type: number
*                 example: 2
*               DietHabits:
*                 type: number
*                 example: 1
*               SuicidalTh:
*                 type: number
*                 example: 0
*               WSHours:
*                 type: number
*                 example: 8
*               FinancialStress:
*                 type: number
*                 example: 3
*               FamHistory:
*                 type: number
*                 example: 1
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
*                   example: success
*                 message:
*                   type: string
*                   example: Prediction successful
*                 result:
*                   type: string
*                   example: Depression
*       500:
*         $ref: '#/components/responses/InternalServerError'
*/
