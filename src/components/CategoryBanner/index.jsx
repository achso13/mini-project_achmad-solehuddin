import React from 'react';
import Container from '../Container';

export default function CategoryBanner({ category }) {
  return (
    <div className="mb-12 w-full bg-red-500 pt-32 pb-20">
      <Container>
        <div className="mt-5 py-5">
          <h1 className="my-3 text-center text-5xl font-bold text-gray-100">{category}</h1>
        </div>
      </Container>
    </div>
  );
}
