import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const review = await prisma.review.findUnique({
            where: {
                id: parseInt(params.id),
            },
        });

        if (!review) {
            return NextResponse.json({ error: 'Review not found' }, { status: 404 });
        }

        return NextResponse.json(review);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch review' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const { login, companyName, review, stars } = body;

        const updatedReview = await prisma.review.update({
            where: {
                id: parseInt(params.id),
            },
            data: {
                login,
                companyName,
                review,
                stars,
            },
        });

        return NextResponse.json(updatedReview);
    } catch {
        return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.review.delete({
            where: {
                id: parseInt(params.id),
            },
        });

        return NextResponse.json({ message: 'Review deleted successfully' });
    } catch {
        return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
    }
}
