// components/common/PageHeader.jsx
import React from 'react';

const PageHeader = ({
  title,
  subtitle,
  highlight,
  highlightColor = 'text-teal-700',
  icon: Icon,
  iconClassName = 'text-teal-700',
  iconSize,
  className = '',
  titleClassName = 'text-3xl text-[#0F172A] font-semibold mb-4',
  subtitleClassName = 'text-[#475569]',
  subtitleMaxWidth = 'max-w-2xl mx-auto',
  children,
}) => {
  return (
    <div className={`text-center ${className}`}>
      {/* Icon (optional) */}
      {Icon && (
        <div className="flex justify-center mb-4">
          <Icon size={iconSize} className={iconClassName} />
        </div>
      )}

      {/* Title with optional highlight */}
      <h1 className={titleClassName}>
        {highlight ? (
          <>
            {title.split(highlight)[0]}
            <span className={highlightColor}>{highlight}</span>
            {title.split(highlight)[1]}
          </>
        ) : (
          title
        )}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className={`${subtitleClassName} ${subtitleMaxWidth} mx-auto`}>
          {subtitle}
        </p>
      )}

      {/* children */}
      {children}
    </div>
  );
};

export default PageHeader;
