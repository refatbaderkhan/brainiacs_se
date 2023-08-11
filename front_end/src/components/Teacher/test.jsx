import React, { useState, useRef, useEffect } from 'react';
import '../../styles/Carousel.css';

const Carousel = ({ students }) => {
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const carouselRef = useRef(null);

  const handleDragStart = (e) => {
    e.preventDefault();
    setStartX(e.clientX);
    setIsDragging(true);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const offsetX = e.clientX - startX;
    carouselRef.current.scrollLeft = scrollLeft - offsetX;
  };

  const handleDragEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      setScrollLeft(carouselRef.current.scrollLeft);
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
    }
  };

  const getColor = (id) => {
    const colors = ['#FF5733', '#33FF65', '#33B8FF', '#A333FF', '#FF3333'];
    return colors[id % colors.length];
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, []);

  return (
    <div
      className="carousel"
      ref={carouselRef}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      style={{ display: 'flex', overflowX: 'scroll' }}
    >
      <div style={{ display: 'flex' }}>
        {students.map((student) => (
          <div
            key={student.id}
            className="student-image"
            style={{
              backgroundColor: getColor(student.id),
              flex: '0 0 auto',
            }}
          >
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
