import React from 'react';
import { Grid, Typography, Pagination } from '@mui/material';
import ReviewCard from './ReviewCard';
import { Employee } from '../Types/types';

type ReviewListProps = {
    displayedEmployees: Employee[];
    startIndex: number;
    endIndex: number;
    totalEmployees: number;
    page: number;
    totalPages: number;
    onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    onEditReview: (employee: Employee) => void;
    onDeleteReview: (id: number) => void;
};

const ReviewList: React.FC<ReviewListProps> = ({
    displayedEmployees,
    startIndex,
    endIndex,
    totalEmployees,
    page,
    totalPages,
    onPageChange,
    onEditReview,
    onDeleteReview,
}) => (
    <>
        <Grid container spacing={3}>
            {displayedEmployees.map((employee) => (
                <Grid item xs={12} sm={6} md={4} key={employee.id}>
                    <ReviewCard
                        employee={employee}
                        onEdit={onEditReview}
                        onDelete={onDeleteReview}
                    />
                </Grid>
            ))}
        </Grid>
        <div className="p-4 flex justify-between items-center mt-4">
            <Typography variant="body2" color="text.secondary">
                Showing {startIndex + 1} to {Math.min(endIndex, totalEmployees)} out of{' '}
                {totalEmployees} entries
            </Typography>
            <Pagination count={totalPages} page={page} onChange={onPageChange} shape="rounded" />
        </div>
    </>
);

export default ReviewList;
