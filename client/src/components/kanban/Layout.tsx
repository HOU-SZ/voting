import React, { useState } from 'react';
import classnames from 'classnames';

import './Layout.css';

export default function Layout(props: any) {
  const { children, direction } = props;

  return (
    <>
    <div className={classnames('layout-column',`column-direction-${direction}`)}>
      {children}
    </div>
    </>
  )
}