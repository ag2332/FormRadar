import React from 'react';
import { twMerge } from 'tailwind-merge';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

export type HeadingProps = {
  text?: string;
  tag?:  HeadingType;
  style?:  HeadingType;
  dataDisplay?: string | number;
  className?: string;
};


const Heading: React.FC<HeadingProps> = ({ text, tag = 'h2', style, className }) => {
  const Tag = tag as any;
  const baseClasses = 'break-words';

  const styleClasses = {
    h1: 'heading-h1',
    h2: 'heading-h2',
    h3: 'heading-h3',
    h4: 'heading-h4',
    h5: 'heading-h5',
    h6: 'heading-h6',
    p: 'heading-h2',
  };

  const componentClasses = twMerge(baseClasses, styleClasses[style ?? tag], className);

  return <Tag className={`${componentClasses}`} dangerouslySetInnerHTML={{ __html: text ?? '' }} />;
};

export default Heading;