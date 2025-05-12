import { Request, Response } from 'express';
import { createActivityService, deleteActivityService, getActivitiesService } from "./services";

interface ApiGatewayRequest extends Request {
    apiGateway?: {
        event: {
            body: string;
            isBase64Encoded?: boolean;
        };
    };
}

export async function getActivitiesController(req: Request, res: Response): Promise<void> {
    try {
        const { userId, endDate } = req.params;
        res.json(await getActivitiesService(userId, endDate));
    } catch (error) {
        console.error('Error fetching activities', error);
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
}

export async function createActivityController(req: ApiGatewayRequest, res: Response): Promise<void> {
    try {
        let body;
        if (process.env.NODE_ENV === 'development') {
            body = req.body;
        } else {
            const raw = req.apiGateway?.event.body;
            const decoded = req.apiGateway?.event.isBase64Encoded
                ? Buffer.from(raw ?? '', 'base64').toString()
                : raw;
            body = JSON.parse(decoded ?? '{}');
        }
        const { userId, endDate, data: activity } = body;
        res.json(await createActivityService(userId, endDate, activity));
    } catch (error) {
        console.error('Error creating activity', error);
        res.status(500).json({ error: 'Failed to create activity' });
    }
}

export async function deleteActivityController(req: Request, res: Response): Promise<void> {
    try {
        const { userId, endDate, activityId } = req.params;
        res.json(await deleteActivityService(userId, endDate, activityId));
    } catch (error) {
        console.error('Error deleting activity', error);
        res.status(500).json({ error: 'Failed to delete activity' });
    }
}