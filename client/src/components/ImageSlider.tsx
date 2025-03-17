import React from 'react';

type CustomStyle = React.CSSProperties & {
  '--width'?: string;
  '--height'?: string;
  '--quantity'?: number;
  '--position'?: number;
};

const ImageSlider = () => {
  return (
    <div className='body'>
      <div className='main'>
        <div
          className="slider"
          style={{
            '--width': '100px',
            '--height': '50px',
            '--quantity': 7,
          } as CustomStyle}
        >
          <div className="list">
            {[...Array(7)].map((_, index) => (
              <div
                className="item"
                key={index}
                style={{ '--position': index + 1 } as CustomStyle}
              >
                <img src={`slider${index + 1}.png`} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
