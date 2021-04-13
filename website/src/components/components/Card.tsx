import React, { FC } from 'react';
import { cleanProps, generateClass } from '../../utils';

export type cardProps = {
  id?: string,
  color?: "primary" | "success" | "danger" | "warning" | "info" | "dark" | "light" | "normal",
  radius?: "none" | "small" | "normal" | "curve" | "pill",
  shadow?: "none" | "small" | "medium" | "large",
  header?: React.ReactNode | string,
  footer?: React.ReactNode | string,
  cardTitle?: string,
  outline?: boolean,
  disabled?: boolean,
  className?: string,
};

const CardComponent = (props: cardProps) => {
  const parentProps = { ...props };
  cleanProps(parentProps);

  return (
    <div {...parentProps} className={generateClass(props, 'card')}>
      {props.header && <div className="card-header">{props.header}</div>}
      <div className="card-body">
        {props.cardTitle && <h5 className="card-title">{props.cardTitle}</h5>}
        {props.children}
      </div>
      {props.footer && <div className="card-footer">{props.footer}</div>}
    </div>
  );
};

const Card: FC<cardProps> = React.forwardRef((props) => <CardComponent {...props} />);
Card.defaultProps = {
  color: "normal",
  radius: "normal",
  shadow: "none",
};
export { Card };
