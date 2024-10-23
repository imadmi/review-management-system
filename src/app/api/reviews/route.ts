import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET() {
    try {
        const reviews = await prisma.review.findMany({
            orderBy: {
                id: 'desc',
            },
        });
        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { login, companyName, review, stars } = body;

        if (!login || !companyName || !review || !stars) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newReview = await prisma.review.create({
            data: {
                login,
                companyName,
                review,
                stars,
            },
        });

        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
    }
}
