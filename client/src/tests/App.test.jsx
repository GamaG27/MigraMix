/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import App from '../App';
import { sum } from './sum';

import { Carousel } from 'react-responsive-carousel';
import { Typography } from '@mui/material';

describe('true is truthy and false is falsy', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
  });

  test('false is falsy', () => {
    expect(false).toBe(false);
  });
});

describe(sum, () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe(App, () => {
  test('renders', () => {
    render(<App title="React" />);
    screen.debug();
  });
});

describe('If Typography is imported corectly', () => [
  test('should have class', () => {
    render(<Typography>Hello World</Typography>);
    const typographyElement = screen.getByText('Hello World');
    expect(typographyElement).toHaveClass('MuiTypography-root');
  }),
]);

// describe('Carousel images', () => {
//   const mockImages = [
//     { src: 'image1.jpg', alt: 'Image 1' },
//     { src: 'image2.jpg', alt: 'Image 2' },
//   ];
//   test('renders the correct number of images', () => {
//     const { getAllByAltText } = render(<Carousel images={mockImages} />);
//     const images = getAllByAltText(/Image/i);
//     expect(images).toHaveLength(mockImages.length);
//   });
//   test('renders the correct image sources', () => {
//     const { getAllByAltText } = render(<Carousel images={mockImages} />);
//     mockImages.forEach((image, index) => {
//       const img = getAllByAltText(`Image ${index + 1}`)[0];
//       expect(img).toHaveAttribute('src', image.src);
//     });
//   });
// });

// describe('Carousel', () => {
//   const slides = ['Slide 1', 'Slide 2', 'Slide 3'];

//   test('renders the correct number of slides', () => {
//     render(
//       <Carousel>
//         {slides.map((slide, index) => (
//           <div key={index}>{slide}</div>
//         ))}
//       </Carousel>
//     );
//     const slidesElements = screen.getAllByRole('img');
//     expect(slidesElements).toHaveLength(slides.length);
//   });

//   test('changes the slide when the user interacts with the carousel', async () => {
//     render(
//       <Carousel>
//         {slides.map((slide, index) => (
//           <div key={index}>{slide}</div>
//         ))}
//       </Carousel>
//     );
//     const nextButton = screen.getByRole('button', { name: /next/i });
//     fireEvent.click(nextButton);
//     const currentSlide = screen.getByRole('img', { name: slides[0] });
//     expect(currentSlide).toBeInTheDocument();
//   });
// });

describe('Carousel', () => {
  const slides = ['Slide 1', 'Slide 2', 'Slide 3'];

  test('renders the correct number of slides', () => {
    render(
      <Carousel>
        {slides.map((slide, index) => (
          <div key={index}>{slide}</div>
        ))}
      </Carousel>
    );
    const slidesElements = screen.getAllByRole('img');
    expect(slidesElements).toHaveLength(slides.length);
  });

  test('changes the slide when the user interacts with the carousel', async () => {
    render(
      <Carousel>
        {slides.map((slide, index) => (
          <div key={index}>{slide}</div>
        ))}
      </Carousel>
    );
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    const currentSlide = screen.getByRole('img', { name: slides[0] });
    expect(currentSlide).toBeInTheDocument();
  });
});
