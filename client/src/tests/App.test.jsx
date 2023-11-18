/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import App from '../App';
import { sum } from './sum';
import Header from '../components/Header';

import { Carousel } from 'react-responsive-carousel';
import { axios } from 'axios';

describe('true is truthy and false is falsy', () => {
  it('true is truthy', () => {
    expect(true).toBe(true);
  });

  it('false is falsy', () => {
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

describe('If Typography is imported corectly', () => {
  test('Header', () => {
    const { container } = render(<Header />);
    const typographyElements = container.querySelectorAll(
      '.MuiTypography-root'
    );
    typographyElements.forEach((element) => {
      expect(element).toHaveClass('MuiTypography-root');
    });
  });
});

describe('Carousel images', () => {
  const mockImages = [
    { src: 'image1.jpg', alt: 'Image 1' },
    { src: 'image2.jpg', alt: 'Image 2' },
  ];
  test('renders the correct number of images', () => {
    const { getAllByAltText } = render(<Carousel images={mockImages} />);
    const images = getAllByAltText(/Image/i);
    expect(images).toHaveLength(mockImages.length);
  });
  test('renders the correct image sources', () => {
    const { getByAltText } = render(<Carousel images={mockImages} />);
    mockImages.forEach((image, index) => {
      const img = getByAltText(`Image ${index + 1}`);
      expect(img).toHaveAttribute('src', image.src);
    });
  });
});

describe('test connection', () => {
  test('test connection between frontend and backend', async () => {
    const response = await axios.get('/api/data');
    expect(response.status).toEqual(200);
  });
});
